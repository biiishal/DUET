var Duet = function() {
	var STATE = { START: 0, PLAY: 1, HIT: 2, OVER:3, LVLCLR:4 };
	var KEY = { LEFT:97, RIGHT:100, ESC:27, SPACE:32 };
	var GAMESTATE = STATE.START;
	var PAUSE = false;
	var GAMEINT = 1;
	var that = this;
	var gameLoop;
	var canvas = document.getElementById('canvas');
	var canvasContainer = document.getElementById('canvas-container');
	var screenOverlay;
	var screenMsg;
	var MSG = {	START: "HIT SPACE TO START", 
							PAUSE: "HIT ESC TO RESUME", 
							OVER: "GAME OVER!", 
							LVLCLR: "LEVEL CLEARED! PRESS SPACE TO CONTINUE",
							NEWHS: "NEW HIGHSCORE: "};
	var orbitCx = canvas.width/2;
	var orbitCy = canvas.height/1.3;
	var angleInterval = 15;
  var angle = 0;
  var angleIncr = 0.9;
  var keyPressInterval;
  var orbit, redCircle, blueCircle;
	var obstacles = [];
	var collisionDetector;
	var scoreCounter = 0;
	var levelCounter = 0;
	var currentLevel = level[levelCounter];
	var playerData = {life: 1, score: 0, highScore: 0};
	var obsFactory = new ObstacleFactory();


	var loadLevel = function() {	
			//loading obstacles
	
		for(var i = 0; i<currentLevel.obs.length; i++) {
		obstacles[i] = obsFactory.getObstacle(currentLevel.obs[i].code, currentLevel.SPD, currentLevel.obs[i].IY);
		}
	}

	var reset = function() {
		obstacles.splice(0,obstacles.length);
		levelCounter = 0;
		currentLevel = level[levelCounter];
		playerData.life = 1;
		playerData.score = 0;
	}
	

	this.load = function() {
		//Set Listeners
		document.addEventListener('keypress', onKeyPress);
		document.addEventListener('keyup', onKeyUp);
		document.addEventListener('keydown', onKeyDown);

		

		//Create the player
		orbit = new Orbit(orbitCx, orbitCy, 100, null, 'gray');
		redCircle = new RedCircle(orbitCx-100, orbitCy, 10, 'red');
		blueCircle = new BlueCircle(orbitCx+100, orbitCy, 10, 'blue');

		//initial call to canvas draw function
		var drawer = new Drawer(canvas, orbit, redCircle, blueCircle, obstacles, playerData);
		window.requestAnimationFrame(drawer.redraw);


		//create start, pause and gameover screens
		screenOverlay = document.createElement('div');
		screenMsg = document.createElement('p');
		screenOverlay.id = 'screen-overlay';

		screenMsg = document.createElement('p');
		screenOverlay.appendChild(screenMsg);

		screenMsg.innerHTML = MSG.START;
		canvasContainer.appendChild(screenOverlay);

		// obstacles[0] = obsFactory.getObstacle('RHRR', 1.2, -100);

		collisionDetector = new CollisionDetector();

	}

	var changeState = function() {
		clearInterval(gameLoop);
	  gameLoop = setInterval(that.game, GAMEINT);
	}

	this.game = function() {
		switch(GAMESTATE) {
			case STATE.PLAY:
			scoreCounter++;
			if(scoreCounter%250 == 0){playerData.score++;
				// console.log('obstacles[obstacles.length-1]',obstacles[obstacles.length-1]);
				if(obstacles[obstacles.length-1].crossedFinish()) GAMESTATE = STATE.LVLCLR;
			}
				for(var i = 0; i < obstacles.length; i++) {
			    obstacles[i].updatePos();
			    // console.log('obstacles[obstacles.length-1]',obstacles[obstacles.length-1]);
			    if(collisionDetector.detectCollision(redCircle, obstacles[i])) {
			    	playerData.life--;
			    	GAMESTATE = STATE.HIT;
			    	obstacles[i].changeColor('red');
			    } 
			    if(collisionDetector.detectCollision(blueCircle, obstacles[i])) {
			    	playerData.life--;
			    	GAMESTATE = STATE.HIT;
			    	obstacles[i].changeColor('blue');
			    } 
		  	}
		  	break;

	  	case STATE.HIT:
	  	console.log('GAMESTATE', GAMESTATE);
  		changeState();
  		for(var i = 0; i < obstacles.length; i++) {
  			redCircle.revolveAround(orbitCx, orbitCy, .5);
  			blueCircle.revolveAround(orbitCx, orbitCy, .5);
  			if(playerData.life == 0) GAMESTATE = STATE.OVER;
		   if(obstacles[i].reversePos()) GAMESTATE = STATE.PLAY;  
	  	}
  		break;

	    case STATE.START:
	    console.log('GAMESTATE', GAMESTATE);
	    if(level[levelCounter])loadLevel();
	    else MSG.LVLCLR = 'NO MORE LEVELS';
    	changeState();
    	GAMESTATE = STATE.PLAY;
    	break;

	    case STATE.OVER:
	    console.log('GAMESTATE', GAMESTATE);
	    clearInterval(gameLoop);
	    if(playerData.score > playerData.highScore) {
	    	playerData.highScore = playerData.score;
	    	screenMsg.innerHTML = MSG.OVER + ' <p>' +MSG.NEWHS+ playerData.highScore + '</p>'; 
	    }
	    else screenMsg.innerHTML = MSG.OVER;
			canvasContainer.appendChild(screenOverlay);
			break;


    	case STATE.LVLCLR:
    	console.log('GAMESTATE', GAMESTATE);
    	currentLevel = level[++levelCounter];
    	screenMsg.innerHTML = MSG.LVLCLR;
			canvasContainer.appendChild(screenOverlay);
    	clearInterval(gameLoop);
    	GAMESTATE = STATE.START;
    	// document.body.removeChild(screenOverlay);
    	break;
		}
	}

	//EVENT LISTENING
  var onKeyPress = function(ev) {
    // console.log("onKeyPress", ev.keyCode);

    if (!keyPressInterval) {
        switch(ev.keyCode){
            case KEY.LEFT:
                keyPressInterval = setInterval(function() {
                // console.log('first',angle);
                if(angle < 5)
                angle += angleIncr;
                redCircle.revolveAround(orbitCx, orbitCy, angle);
                blueCircle.revolveAround(orbitCx, orbitCy, angle);
                }, angleInterval);
            break;

            case KEY.RIGHT:
                keyPressInterval = setInterval(function() {
                  // console.log('first',angle);
                if(angle > -5)
                angle -= angleIncr;
                redCircle.revolveAround(orbitCx, orbitCy, angle);
                blueCircle.revolveAround(orbitCx, orbitCy, angle);
                }, angleInterval);
            break;
        }
    }
  }

  var onKeyUp = function(ev) {
    if(angle>0) angle -= angleIncr*3;
    else angle += angleIncr*3;
    // console.log('keyup',angle);
    clearInterval(keyPressInterval);
    keyPressInterval = undefined;
  }

  var onKeyDown = function(ev) {
    switch(ev.keyCode){
      case KEY.ESC:
      if(GAMESTATE == STATE.PLAY){
	      if(!PAUSE){
	        clearInterval(gameLoop);
	        document.removeEventListener('keypress', onKeyPress);
	        document.removeEventListener('keyup', onKeyUp);
	        PAUSE = !PAUSE;
	      }
	      else {
	        gameLoop = setInterval(that.game, GAMEINT);
	        document.addEventListener('keypress', onKeyPress);
	        document.addEventListener('keyup', onKeyUp);
	        PAUSE = !PAUSE;
	      }  
    	}
      break;

      case KEY.SPACE:   
      // console.log('space pressed');
      if(document.getElementById('screen-overlay'))canvasContainer.removeChild(screenOverlay);
      if(GAMESTATE == STATE.START)that.game();
      if(GAMESTATE == STATE.OVER){
      	reset();
      	GAMESTATE = STATE.START;
      	changeState();
      }
      break;
    }
  }
}