//Create the player
var orbit = new Orbit(0, 0, 100, null, 'gray');
var redCircle = new RedCircle(0, 0, 10, 'red');
var blueCircle = new BlueCircle(0, 0, 10, 'blue');
console.log(orbit.r);


//Create Test Obstacles
var sq = new SquareStillCenter(0, 1.2, 'green');
var rectUpR = new RectangleUprightR(0, 1.2 );
var rectUpL = new RectangleUprightL(0, 1.2 );
var rectHorzC = new RectangleHorzC(0,1.2, 'blue');

var obstacles = [sq, rectUpR, rectUpL, rectHorzC];

//Adding keypress and keyup event listeners
document.addEventListener('keypress', onKeyPress);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('keydown', onKeyDown);

//initial call to canvas draw function
window.requestAnimationFrame(redraw);

// game loop
// gameLoop = setInterval(function(){
// 	  for(var i = 0; i < obstacles.length; i++) {
//     obstacles[i].updatePos();
//     // collisionDetector.testCollision(redCircle, obstacles[i]);
//     // collisionDetector.testCollision(blueCircle, obstacles[i]);
//   }
// }, GAMEINT);

var game = function() {
		for(var i = 0; i < obstacles.length; i++) {
    obstacles[i].updatePos();
    // collisionDetector.testCollision(redCircle, obstacles[i]);
    // collisionDetector.testCollision(blueCircle, obstacles[i]);
  }
}

gameLoop = setInterval(game, GAMEINT);
