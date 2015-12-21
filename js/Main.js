//Create the player
var orbit = new Orbit(orbitCx, orbitCy, 100, null, 'gray');
var redCircle = new RedCircle(orbitCx-100, orbitCy, 10, 'red');
var blueCircle = new BlueCircle(orbitCx+100, orbitCy, 10, 'blue');
console.log(orbit.r);


//Create Test Obstacles
var sq = new SquareStillCenter(0, 1.2, 'green');
var rectUpR = new RectangleUprightR(0, 1.2 );
var rectUpL = new RectangleUprightL(0, 1.2 );
var rectHorzC = new RectangleHorzC(0,1.2, 'blue');

var obstacles = [sq, rectUpR, rectUpL, rectHorzC];
var cd = new CollisionDetector();

//Adding keypress and keyup event listeners
document.addEventListener('keypress', onKeyPress);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('keydown', onKeyDown);

//initial call to canvas draw function
window.requestAnimationFrame(redraw);

var game = function() {
		for(var i = 0; i < obstacles.length; i++) {
    obstacles[i].updatePos();
    if(cd.detectCollision(redCircle, obstacles[i])) clearInterval(gameLoop);
    if(cd.detectCollision(blueCircle, obstacles[i])) clearInterval(gameLoop);
  }
}

gameLoop = setInterval(game, GAMEINT);
