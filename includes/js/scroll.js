var windowHeight, windowWidth, scrollMax, scrollPosition, optimalHeight, scrollOld = 0, previousStep, currentStep;

$(function(){
	$('#scroll-container').css({'opacity':'0'});
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

function item(selector,startTime,endTime,animations,pause,resume){
	this.selector = selector;
	this.container = this.selector.parents().eq(0);
	this.originalHeight = parseInt(selector.css('height').replace('px',''));
	this.originalWidth  = parseInt(selector.css('width').replace('px',''));
	this.currentBottom  = parseInt(selector.css('bottom').replace('px',''));
	this.currentLeft		= parseInt(selector.css('left').replace('px',''));
	this.adjustedHeight = this.originalHeight * windowScale;
	this.adjustedWidth  = this.originalWidth * windowScale;
	this.adjustedLeft   = this.currentLeft * windowScale;
	this.startTime      = startTime;
	this.endTime				= endTime;
	this.pause					= pause;
	this.resume					= resume;
	this.animations     = animations;
	this.count					= 0;
	// console.log(this.currentLeft);
	this.selector.css({'height':this.adjustedHeight,'width':this.adjustedWidth});
}

function setStaticVars(){
	scrollMax = document.getElementById('scroll-container').scrollHeight - windowHeight,
	floor			= $('#ledge'),
	group1		= $('#group-1'),
	group2		= $('#group-2'),
	group3		= $('#group-3'),
	group4		= $('#group-4'),
	group5    = $('#group-5'),
	group6    = $('#group-6'),
	group7    = $('#group-7'),
	group8    = $('#group-8'),
	group9    = $('#group-9'),
	item[1]			= new item($('#item-1'),0,7.4,['accelerate',100]),
	item[2]			= new item($('#item-2'),0,7.4,['accelerate',150]),
	item[3]			= new item($('#item-3'),0,7.4,['accelerate',50]),
	item[4]			= new item($('#item-4'),0,7.4,['accelerate',100]),
	item[5]			= new item($('#item-5')),
	item[6]			= new item($('#item-6'),0,7.4,['accelerate',100]),
	item[7]			= new item($('#item-7'),12,24,['freeze','spin']),
	item[8]			= new item($('#item-8'),12,29.4,['slide','left-right',7],22,24.6),
	item[9]			= new item($('#item-9'),37.4,41,['freeze']),
	item[10]		= new item($('#item-10'),23.4,48.6,['slide','left-right',9],36,41),
	item[11]		= new item($('#item-11'),42.6,82,['slide','left-right',9],55.2,61.8),
	item[12]		= new item($('#item-12'),42.6,82,['slide','right-left',9],55.2,57.8),
	item[13]		= new item($('#item-13'),78,120,['slide','left-right',9],92,120),
	item[14]		= new item($('#item-14'));
}

function positionFloor(){
	floor.css({'top':floorPosition});
}

function positionGroups(){
	var group1height = group1.height()*windowScale,
			group1width	 = group1.width()*windowScale,
			group2height = group2.height()*windowScale,
			group4height = group4.height()*windowScale;
			
			// console.log(group1height);
	
	for(var i=1;i<15;i++){
		if (i<7){
			// GROUP 1
			item[i].selector.css({'left':item[i].adjustedLeft});
		} else if (i==7 || i==9 || i==14) {
			// BOTTLE SPIN
			item[i].selector.css({'margin':'0 '+(-item[i].adjustedWidth/2)+'px'});
		} else if (i==8 || i==10 || i==11 || i==13) {
			// BOTTLE SPIN TEXT
			item[i].selector.css({'left':-item[i].adjustedWidth});
		} else if (i==12) {
			item[i].currentLeft = windowWidth;
			item[i].selector.css({'left':item[i].currentLeft});
		}
	}
			
	group1.css({'top':floorPosition-group1height,'height':group1height,'width':group1width,'margin':'0 '+(-(group1width/2))+'px'});
	var group2top = (group1.offset().top+group1height)+(windowHeight*0.6);
	group2.css({'top':group2top,'height':group2height});
	group3.css({'top':windowHeight/2});
	group4.css({'top':(group2top+(windowHeight*2)+item[9].adjustedHeight),'height':group4height});
	group5.css({'top':windowHeight/2});
	group6.css({'top':(windowHeight/2)+(item[11].adjustedHeight/2)});
	group7.css({'top':windowHeight/2});
	group8.css({'top':windowHeight/2});
	group9.css({'top':scrollMax+(item[13].adjustedHeight*2),'height':item[14].adjustedHeight});
	$('#scroll-container').animate({'opacity':'1'},400);
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
			originalLeft		   = (thisItem.animations[1]=='left-right') ? -thisItem.adjustedWidth : windowWidth,
			currentTime 			 = scrollPercent;
			endTime1					 = thisItem.pause,
			endTime2					 = thisItem.endTime,
			startTime1				 = thisItem.startTime,
			startTime2				 = thisItem.resume,
			totalTime1  			 = endTime1 - startTime1,
			totalTime2				 = endTime2 - startTime2,
			progress1    			 = (currentTime - startTime1)/totalTime1,
			progress2    			 = (currentTime - startTime2)/totalTime2,
			leftMax1					 = (thisItem.animations[1]=='left-right') ? pairedItem.selector.offset().left + pairedItem.adjustedWidth + thisItem.adjustedWidth : originalLeft - windowWidth*0.25;
			leftMax2					 = (thisItem.animations[1]=='left-right') ? windowWidth + thisItem.adjustedWidth : thisItem.adjustedWidth + windowWidth*0.25;
	
	if (progress1 > 0.96 && progress2 < 0) {
		thisItem.selector.find('.blur').hide().removeClass('show');
		thisItem.selector.find('.text').show().addClass('show');
		thisItem.count = 1;
	} else {
		thisItem.selector.find('.blur').show().addClass('show');
		thisItem.selector.find('.text').hide().removeClass('show');
		thisItem.count = 0;
	} 
	
	console.log(progress2);
	
	if (progress1 < 1){
		console.log('leftMax1: '+leftMax1);
		thisItem.currentLeft   = (thisItem.animations[1]=='left-right') ? (leftMax1 * progress1)+originalLeft : originalLeft - (leftMax1 * progress1);
		thisItem.newLeft			 = thisItem.currentLeft
		thisItem.selector.css({'left':thisItem.currentLeft});
	} else if (progress2 > 0 && progress2 < 1) {
		thisItem.currentLeft   = (thisItem.animations[1]=='left-right') ? (leftMax2 * progress2)+thisItem.newLeft : thisItem.newLeft - (leftMax2 * progress2);
		thisItem.selector.css({'left':thisItem.currentLeft});
		thisItem.count = 0;
	}
}

function move(itemNumber){
	var currentItem = item[itemNumber],
			currentTime = scrollPercent,
			totalTime   = currentItem.endTime - currentItem.startTime - 0.5,
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
	
	// console.log('scrollPosition: '+scrollPosition+' scrollAmount: '+scrollAmount+' scrollAdjusted: '+scrollAdjusted+' scrollPercent: '+scrollPercent+' scrollScale: '+scrollScale);
	
	$('.item').each(function(index){
		move(index+1);	
	});
	
}