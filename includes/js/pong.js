var ball, increment, ball_position = {}, right_paddle, left_paddle, 
		paused = false, left_paddle_position = {}, right_paddle_position = {}, speed, score_1 = 0, score_2 = 0;

$(function(){
	
	ball  	     = $('#ball'),
	left_paddle  = $('#paddle-1'),
	right_paddle = $('#paddle-2'),
	court				 = $('#pong-court'),
	increment    = 10,
	speed				 = 50;
	
	ballDirection();
	start();
	
});

function start(){
	ball_move    = setInterval(ballMove, speed);
}

function random(){
	return Math.round(Math.random()*100);
}

function direction(){
	return ((random() % 2 == 0) ? '+=' : '-=') + increment + 'px';
}

function ballDirection(){
	ball_left = direction(),
	ball_top  = direction();
}

function computerOpponent(){
	left_paddle.css({'top':(ball_position.y-30)});
}

function ballMove(){
	
	ball_position = { x: ball.position().left, y: ball.position().top };
	right_paddle_position = { 'top': right_paddle.position().top, 'bottom': right_paddle.position().top+75, 'left': right_paddle.position().left, 'right': right_paddle.position().left+10 };
	left_paddle_position = { 'top': left_paddle.position().top, 'bottom': left_paddle.position().top+75, 'left': left_paddle.position().left, 'right': left_paddle.position().left+10 };
	
	court.css({'border-right':'1px solid #66ff00', 'border-left':'1px solid #66ff00'});
	
	//////// WALLS //////////////////
	
	// ball reached the left wall
	
	if ( ball_position.x <= 1 ) {
		ball_left = ball_left.replace('-=','+=');
		court.css({'border-left':'3px solid #ffbb00'});
		score_2++;
		$('#score-2 span').html(score_2);
	}
	
	// ball reached the top wall
	
	if ( ball_position.y <= 1 ) {
		ball_top = ball_top.replace('-=','+=');
	}
	
	// ball reached the right wall
	
	if ( ball_position.x >= 690 ) {
		ball_left = ball_left.replace('+=','-=');
		court.css({'border-right':'3px solid #ffbb00'});
		score_1++;
		$('#score-1 span').html(score_1);
	}
	
	// ball reached the bottom wall
	
	if ( ball_position.y >= 490 ) {
		ball_top = ball_top.replace('+=','-=');
	}
	
	//////// PADDLES //////////////////
	
	// hit right-side of left_paddle
	
	if ( ball_position.x <= 61 && ball_position.x >= 51 && ball_position.y >= left_paddle_position.top && ball_position.y <= left_paddle_position.bottom ) {
		ball_left = (ball_left.match('+=')==true) ? ball_left.replace('+=','-=') : ball_left.replace('-=','+=');
	}
	
	// hit left-side of left_paddle
	
	if ( ball_position.x <=51 && ball_position.x >=41 && ball_position.y >= left_paddle_position.top && ball_position.y <= left_paddle_position.bottom ) {
		ball_left = (ball_left.match('-=')==true) ? ball_left.replace('-=','+=') : ball_left.replace('+=','-=');
	}
	
	// hit left-side of right_paddle
	
	if ( ball_position.x >= 630 && ball_position.x <= 640 && ball_position.y >= right_paddle_position.top && ball_position.y <= right_paddle_position.bottom ) {
		ball_left = (ball_left.match('-=')==true) ? ball_left.replace('-=','+=') : ball_left.replace('+=','-=');
	}
	
	// hit right-side of right_paddle
	
	if ( ball_position.x >=640 && ball_position.x <=651 && ball_position.y >= right_paddle_position.top && ball_position.y <= right_paddle_position.bottom ) {
		ball_left = (ball_left.match('+=')==true) ? ball_left.replace('+=','-=') : ball_left.replace('-=','+=');
	}
	

	ball.stop().animate({'left':ball_left,'top':ball_top}, speed);
	computerOpponent();
	
}

$(window).keypress(function(e){
	
	// keypress 'o'
	if ( e.keyCode == 111 ) {
		right_paddle.css({'top':'-=10px'});
	}
	
	// keypress 'l'
	else if ( e.keyCode == 108 ) {
		right_paddle.css({'top':'+=10px'});
	}
	
	// keypress 'w'
	else if ( e.keyCode == 119 ) {
		left_paddle.css({'top':'-=10px'});
	}
	
	// keypress 's'
	else if ( e.keyCode == 115 ) {
		left_paddle.css({'top':'+=10px'});
	}
	
	else if ( e.keyCode == 32 ) {
		if (paused) {
			start();
			paused = false;
		} else {
			clearInterval(ball_move);
			paused = true;
		}
	}
	
});