var windowHeight, windowWidth, scrollMax, scrollPosition, optimalHeight, scrollOld = 0, previousStep, currentStep;

$(function(){
	setScalingVars();
	scroll();
});

$(window).resize(function(){
	setScalingVars();
});

$(window).load(function(){
	positionGroups();
});

function setScalingVars(){
	optimalHeight = 850,
	windowHeight  = $(window).height(),
	windowWidth	  = $(window).width(),
	windowScale   = windowHeight / optimalHeight,
	scrollScale   = optimalHeight / windowHeight,
	floorPosition	= windowHeight * 0.75;
	setStaticVars();
	positionFloor();
}

function item(selector,startTime,endTime,animations){
	this.selector = selector;
	this.container = this.selector.parents().eq(0);
	this.originalHeight = parseInt(selector.css('height').replace('px',''));
	this.originalWidth  = parseInt(selector.css('width').replace('px',''));
	this.currentBottom  = parseInt(selector.css('bottom').replace('px',''));
	this.adjustedHeight = this.originalHeight * windowScale;
	this.adjustedWidth  = this.originalWidth * windowScale;
	this.startTime      = startTime;
	this.endTime				= endTime;
	this.animations     = animations;
	this.count					= 0;
	this.selector.css({'height':this.adjustedHeight,'width':this.adjustedWidth});
}

function setStaticVars(){
	scrollMax = document.getElementById('scroll-container').scrollHeight - windowHeight,
	floor			= $('#ledge'),
	group1		= $('#group-1'),
	group2		= $('#group-2'),
	item[1]			= new item($('#item-1'),0,3.7,['accelerate',100]),
	item[2]			= new item($('#item-2'),0,3.7,['accelerate',150]),
	item[3]			= new item($('#item-3'),0,3.7,['accelerate',50]),
	item[4]			= new item($('#item-4'),0,3.7,['accelerate',100]),
	item[5]			= new item($('#item-5')),
	item[6]			= new item($('#item-6'),0,3.7,['accelerate',100]),
	item[7]			= new item($('#item-7'),6,13,['freeze','spin']);
	item[8]			= new item($('#item-8'),6,12,['slide','left-right',7]);
}

function positionFloor(){
	floor.css({'top':floorPosition});
}

function positionGroups(){
	var group1height = group1.height()*windowScale;
			group2height = group2.height()*windowScale;
			console.log(group1height);
	group1.css({'top':floorPosition-group1height,'height':group1height});
	group2.css({'top':(group1.offset().top+group1height)+(windowHeight*0.6),'height':group2height});

}

function scroll(){
	$('#scroll-container').scroll(function(){
		scrollPosition = $(this).scrollTop(),
		scrollAdjusted = scrollPosition*scrollScale,
		scrollPercent	 = (scrollPosition / scrollMax) * 100,
		scrollAmount   = scrollPosition - scrollOld,
		scrollOld			 = scrollPosition;
		scrollAnimation();
	});
}

function change(number){
	var thisItem = $('.view-'+number);
	$('#item-7 img').not('.view-'+number).hide().addClass('off');
	if (thisItem.hasClass('off')){
		thisItem.show().removeClass('off').addClass('on');
	} else {
		thisItem.hide().removeClass('on').addClass('off');
	}
}

function spin(itemNumber,progress){
	var step = 100 / 13;
	switch(true){
		case (progress < step):
			currentStep = 1;
			break;
		case (progress < (step*2)):
			currentStep = 2;
			break;
		case (progress < (step*3)):
			currentStep = 3;
			break;
		case (progress < (step*4)):
			currentStep = 4;
			break;
		case (progress < (step*5)):
			currentStep = 5;
			break;				
		case (progress < (step*6)):
			currentStep = 6;
			break;
		case (progress < (step*7)):
			currentStep = 7;
			break;
		case (progress < (step*8)):
			currentStep = 8;
			break;
		case (progress < (step*9)):
			currentStep = 9;
			break;
		case (progress < (step*10)):
			currentStep = 10;
			break;	
		case (progress < (step*11)):
			currentStep = 11;
			break;
		case (progress < (step*12)):
			currentStep = 12;
			break;
		case (progress < (step*13)):
			currentStep = 13;
			break;	
	}
	
	if (currentStep != previousStep){
		change(currentStep);
	}
	previousStep = currentStep;
}

function accelerate(itemNumber){
	var thisItem 					 = item[itemNumber],
			originalBottom		 = 0,
			currentTime 			 = scrollPercent,
			totalTime  			 	 = thisItem.endTime - thisItem.startTime,
			progress    			 = (currentTime - thisItem.startTime)/totalTime,
			animationVariable  = thisItem.animations[1],
			bottomMax					 = totalTime * animationVariable;
	thisItem.currentBottom = bottomMax * progress;
	thisItem.selector.css({'bottom':thisItem.currentBottom});
}

function slide(itemNumber){
	var thisItem 					 = item[itemNumber],
			pairedItem				 = item[thisItem.animations[2]],
			originalLeft		   = (thisItem.animations[1]=='left-right') ? -thisItem.adjustedWidth : windowWidth+thisItem.adjustedWidth,
			currentTime 			 = scrollPercent,
			totalTime  			 	 = thisItem.endTime - thisItem.startTime,
			progress    			 = (currentTime - thisItem.startTime)/totalTime,
			leftMax					   = (thisItem.animations[1]=='left-right') ? pairedItem.selector.offset().left + pairedItem.adjustedWidth + 200: windowWidth*0.25;
	if (progress > 0.96 && thisItem.count == 0 && scrollAmount > 0) {
		thisItem.selector.find('.blur').hide().removeClass('show');
		thisItem.selector.find('.text').show().addClass('show');
		thisItem.count = 1;
	} else if (progress < 0.96 && thisItem.count == 1 && scrollAmount < 0) {
		thisItem.selector.find('.blur').show().addClass('show');
		thisItem.selector.find('.text').hide().removeClass('show');
		thisItem.count = 0;
	}
	thisItem.currentLeft   = (leftMax * progress)+originalLeft;
	thisItem.selector.css({'left':thisItem.currentLeft});
}

function move(itemNumber){
	var currentItem = item[itemNumber],
			currentTime = scrollPercent,
			totalTime   = currentItem.endTime - currentItem.startTime,
			progress    = ((currentTime - currentItem.startTime)/totalTime)*100;
	
	// SLIDE ANIMATION
	if ($.inArray('slide', currentItem.animations) != -1 && currentTime > currentItem.startTime && currentTime < currentItem.endTime) {
		slide(itemNumber);
	}		
			
	// ACCELERATE ANIMATION
	if ($.inArray('accelerate', currentItem.animations) != -1 && currentTime > currentItem.startTime && currentTime < currentItem.endTime) {
		accelerate(itemNumber);
	}
			
	// SPIN ANIMATION		
	if ($.inArray('spin', currentItem.animations) != -1 && currentTime > currentItem.startTime && currentTime < currentItem.endTime) {
		spin(itemNumber,progress);
	}		
	
	
	// FREEZE ANIMATION
	if ($.inArray('freeze', currentItem.animations) != -1 && currentTime > currentItem.startTime && currentTime < currentItem.endTime) {
		currentItem.container.css({'position':'fixed','top':currentItem.container.offset().top});
	} else if ( scrollAmount > 0 && $.inArray('freeze', currentItem.animations) != -1 && currentItem.count!=1 && currentTime > currentItem.endTime) {
		currentItem.container.css({'position':'absolute','top':scrollPosition+currentItem.container.offset().top});
		currentItem.count = 1;
	} else if ( scrollAmount < 0 && $.inArray('freeze', currentItem.animations) != -1 && currentItem.count!=0 && currentTime < currentItem.startTime) {
		currentItem.container.css({'position':'absolute','top':scrollPosition+currentItem.container.offset().top});
		currentItem.count = 0;
	}
}

function scrollAnimation(){
	
	console.log('scrollPosition: '+scrollPosition+' scrollAmount: '+scrollAmount+' scrollAdjusted: '+scrollAdjusted+' scrollPercent: '+scrollPercent+' scrollScale: '+scrollScale);
	
	$('.item').each(function(index){
		move(index+1);	
	});
	
}