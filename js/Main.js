//Create the player
var orbit = new Orbit(orbitCx, orbitCy, 100, null, 'gray');
var redCircle = new RedCircle(orbitCx-100, orbitCy, 10, 'red');
var blueCircle = new BlueCircle(orbitCx+100, orbitCy, 10, 'blue');
console.log(orbit.r);


//Create Test Obstacles
// var sq = new SquareC(0, 1.2, -100, 'green');
// var rectUpR = new RectangleUprightR(0, 1.2 );
// var rectUpL = new RectangleUprightL(0, 1.2 );
// var rectHorzC = new RectangleHorzC(0,1.2, 'blue');

var obsFactory = new ObstacleFactory();

var obs = [ {code: 'SC', IY: -100},
						{code: 'RUL', IY: -400},
						{code: 'RUR', IY: -600},
						{code: 'RHL', IY: -800},
						{code: 'RHL', IY: -1000}
						];

console.log('obs[0].code', obs[0].code);
var level1 = {SPD: '1.2', obs};
var obstacles = [];

for(var i = 0; i<obs.length; i++) {
	obstacles[i] = obsFactory.getObstacle(obs[i].code, 1.2, obs[i].IY);
}

var cd = new CollisionDetector();

//Adding keypress and keyup event listeners
document.addEventListener('keypress', onKeyPress);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('keydown', onKeyDown);

//initial call to canvas draw function
window.requestAnimationFrame(redraw);

var changeState = function() {
	clearInterval(gameLoop);
  gameLoop = setInterval(game, GAMEINT);
}

var game = function() {
	switch(GAMESTATE) {
		case STATE.PLAY:
			for(var i = 0; i < obstacles.length; i++) {
		    obstacles[i].updatePos();
		    if(cd.detectCollision(redCircle, obstacles[i])) {
		    	GAMESTATE = STATE.HIT;
		    	obstacles[i].changeColor('red');
		    } 
		    if(cd.detectCollision(blueCircle, obstacles[i])) {
		    	GAMESTATE = STATE.HIT;
		    	obstacles[i].changeColor('blue');
		    } 
	  	}
	  	break;

  	case STATE.HIT:
  		changeState();
  		for(var i = 0; i < obstacles.length; i++) {
  			redCircle.revolveAround(orbitCx, orbitCy, 1);
  			blueCircle.revolveAround(orbitCx, orbitCy, 1);
		   if(obstacles[i].reversePos()) GAMESTATE = STATE.PLAY;  
	  	}
  		break;

    case STATE.START:
    	changeState();
    	GAMESTATE = STATE.PLAY;
	}
}

game();
