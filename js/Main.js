var STATE = { START: 0, PLAY: 1, HIT: 2 };
var KEY = { LEFT:97, RIGHT:100, ESC:27 };
var GAMESTATE = STATE.START;
var PAUSE = false;

var Duet = function() {
	var GAMEINT = 1;
	var that = this;
	var gameLoop;
	var canvas = document.getElementById('canvas');
	var orbitCx = canvas.width/2;
	var orbitCy = canvas.height/1.3;
	var angleInterval = 15;
  var angle = 0;
  var angleIncr = 0.9;
  var keyPressInterval;
  var orbit, redCircle, blueCircle;
	var obstacles = [];
	var collisionDetector;

	// var obs = [ {code: 'SC', IY: -100},
	// 						{code: 'RUL', IY: -400},
	// 						{code: 'RUR', IY: -600},
	// 						{code: 'RHL', IY: -800},
	// 						{code: 'RHL', IY: -1000},
	// 						{code: 'RHL', IY: -1200},
	// 						{code: 'RHR', IY: -1400},
	// 						{code: 'RHL', IY: -1600},
	// 						{code: 'RHR', IY: -1800},
	// 						{code: 'RHL', IY: -2000},
	// 						{code: 'RHR', IY: -2200},
	// 						{code: 'RHC', IY: -2400},
	// 						{code: 'SC', IY: -2600},
	// 						{code: 'RUL', IY: -3000},
	// 						{code: 'RUR', IY: -3200},
	// 						{code: 'RHR', IY: -3400},
	// 						{code: 'RHR', IY: -3600},
	// 						{code: 'RHR', IY: -3800},
	// 						{code: 'RHR', IY: -4000},
	// 						{code: 'RHL', IY: -4200},
	// 						{code: 'RHR', IY: -4400},
	// 						{code: 'RHL', IY: -4600},
	// 						{code: 'RHR', IY: -4800},
	// 						{code: 'RHC', IY: -5000}
	// 						];
	// console.log(obs);
	// var emp = JSON.parse('level.json');
	var level = {SPD: 1.5, obs};

	

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
		var drawer = new Drawer(canvas, orbit, redCircle, blueCircle, obstacles);
		window.requestAnimationFrame(drawer.redraw);

		var obsFactory = new ObstacleFactory();
		for(var i = 0; i<obs.length; i++) {
		obstacles[i] = obsFactory.getObstacle(level.obs[i].code, level.SPD, level.obs[i].IY);
		}

		collisionDetector = new CollisionDetector();

	}

	var changeState = function() {
		clearInterval(gameLoop);
	  gameLoop = setInterval(that.game, GAMEINT);
	}

	this.game = function() {
		switch(GAMESTATE) {
			case STATE.PLAY:
				for(var i = 0; i < obstacles.length; i++) {
			    obstacles[i].updatePos();
			    if(collisionDetector.detectCollision(redCircle, obstacles[i])) {
			    	GAMESTATE = STATE.HIT;
			    	obstacles[i].changeColor('red');
			    } 
			    if(collisionDetector.detectCollision(blueCircle, obstacles[i])) {
			    	GAMESTATE = STATE.HIT;
			    	obstacles[i].changeColor('blue');
			    } 
		  	}
		  	break;

	  	case STATE.HIT:
	  		changeState();
	  		for(var i = 0; i < obstacles.length; i++) {
	  			redCircle.revolveAround(orbitCx, orbitCy, .5);
	  			blueCircle.revolveAround(orbitCx, orbitCy, .5);
			   if(obstacles[i].reversePos()) GAMESTATE = STATE.PLAY;  
		  	}
	  		break;

	    case STATE.START:
	    	changeState();
	    	GAMESTATE = STATE.PLAY;
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
  }
}