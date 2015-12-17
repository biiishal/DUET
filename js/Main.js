//Create the player
var orbit = new Orbit(0, 0, 100, null, 'gray');
var redCircle = new RedCircle(0, 0, 10, 'red');
var blueCircle = new BlueCircle(0, 0, 10, 'blue');
console.log(orbit.r);


//Create Test Obstacles
var sq = new SquareStillCenter(0, 5, 'green');
var rectUpR = new RectangleUprightR(0, 5 );
var rectUpL = new RectangleUprightL(0, 5 );
var rectHorzC = new RectangleHorzC(0,5, 'blue');

//Adding keypress and keyup event listeners
document.addEventListener('keypress', onKeyPress);
document.addEventListener('keyup', onKeyUp);

//initial call to canvas draw function
window.requestAnimationFrame(redraw);