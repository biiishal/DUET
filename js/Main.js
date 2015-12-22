var canvas = document.getElementById('canvas');
var orbitCx = canvas.width/2;
var orbitCy = canvas.height/1.3;

var GAMEINT = 1;
//Create the player
var orbit = new Orbit(orbitCx, orbitCy, 100, null, 'gray');
var redCircle = new RedCircle(orbitCx-100, orbitCy, 10, 'red');
var blueCircle = new BlueCircle(orbitCx+100, orbitCy, 10, 'blue');
console.log(orbit.r);



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
var drawer = new Drawer(canvas, redCircle, blueCircle, obstacles);
window.requestAnimationFrame(drawer.redraw);

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
