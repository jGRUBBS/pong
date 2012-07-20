var windowHeight, windowWidth, scrollMax, scrollPosition;

$(function(){
	setScalingVars();
	scroll();
});

$(window).resize(function(){
	setScalingVars();
});

function setScalingVars(){
	windowHeight  = $(window).height(),
	windowWidth	  = $(window).width(),
	floorPosition	= windowHeight * 0.75;
	setStaticVars();
	positionFloor();
}

function setStaticVars(){
	scrollMax = document.getElementById('scroll-container').scrollHeight - windowHeight,
	floor			= $('#ledge'),
	item1			= $('#item-1'),
	item2			= $('#item-2'),
	item3			= $('#item-3'),
	item4			= $('#item-4'),
	item5			= $('#item-5'),
	item6			= $('#item-6');
	item7			= $('#item-7');
	item8			= $('#item-8');
}

function positionFloor(){
	floor.css({'top':floorPosition});
}

function scroll(){
	$('#scroll-container').scroll(function(){
		scrollPosition = $(this).scrollTop(),
		scrollPercent	 = (scrollPosition / scrollMax) * 100;
		scrollAnimation();
	});
}

function scrollAnimation(){
	
	console.log(scrollPosition);
	
	// group 1
	
	item1.css({'top':'-'+scrollPercent*65+'px'});
	item4.css({'top':'-'+scrollPercent*65+'px'});
	item6.css({'top':'-'+scrollPercent*65+'px'});
	item3.css({'top':'-'+scrollPercent*85+'px'});
	item5.css({'top':'-'+scrollPercent*100+'px'});
	item2.css({'top':'-'+scrollPercent*120+'px'});
	
	// group 2
	
	// bottle
	var item7startPos = -100,
			item7endPos		= -80;
	item7.css({'top':'-'+scrollPercent+'px'});
	
}