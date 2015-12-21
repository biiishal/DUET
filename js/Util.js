var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var GAMEINT = 1;
var w = canvas.width;
var h = canvas.height;
var orbitCx = w/2;
var orbitCy = h/1.3;

var ANGLEINTERVAL = 15;
var ANGLE = 0;
var ANGLEINC = 0.8;
var KEY = { LEFT:97, RIGHT:100, ESC:27 };
var keyPressInterval;
var STATE = { START: 0, PLAY: 1, HIT: 2 };
var GAMESTATE = STATE.START;
var PAUSE = false;
var gameLoop;
var reverseInterval;


//CANVAS DRAWING UTILITY
var drawCircle = function(el) {
	ctx.beginPath();el
	ctx.arc(el.x, el.y, el.r, 0, 2*Math.PI, true);	
	ctx.closePath();	
}

var drawRectFill = function(el) {
  ctx.beginPath();
  ctx.fillStyle = el.fs;
  ctx.fillRect(el.x, el.y, el.w, el.h);
  ctx.closePath();
}

var drawCircleFill = function(el) {
	ctx.fillStyle = el.fs;
	drawCircle(el);
	ctx.fill();
}

var drawCircleStroke = function(el) {
	ctx.strokeStyle = el.ss;
	drawCircle(el);
	ctx.stroke();
}

var redraw = function() {
  // paint bg
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, w, h);

  //draw the circles
  drawCircleStroke(orbit);
	drawCircleFill(redCircle);
  drawCircleFill(blueCircle);

  for(var i = 0; i < obstacles.length; i++) {
   if(obstacles[i].onScreen)drawRectFill(obstacles[i]);
   // drawRectFill(obstacles[i]);
  }
  
  window.requestAnimationFrame(redraw);
};


//===================================================================//

//EVENT LISTENING UTILITY
function onKeyPress(ev) {
  //console.log("onKeyPress", ev.keyCode);

  if (!keyPressInterval) {
      switch(ev.keyCode){
          case KEY.LEFT:
              keyPressInterval = setInterval(function() {
              // console.log('first',ANGLE);
              if(ANGLE < 5)
              ANGLE += ANGLEINC;
              redCircle.revolveAround(orbitCx, orbitCy, ANGLE);
              blueCircle.revolveAround(orbitCx, orbitCy, ANGLE);
              }, ANGLEINTERVAL);
          break;

          case KEY.RIGHT:
              keyPressInterval = setInterval(function() {
                // console.log('first',ANGLE);
              if(ANGLE > -5)
              ANGLE -= ANGLEINC;
              redCircle.revolveAround(orbitCx, orbitCy, ANGLE);
              blueCircle.revolveAround(orbitCx, orbitCy, ANGLE);
              }, ANGLEINTERVAL);
          break;
      }
  }
}

function onKeyUp() {
  if(ANGLE>0) ANGLE -= ANGLEINC;
  else ANGLE += ANGLEINC;
  // console.log('keyup',ANGLE);
  clearInterval(keyPressInterval);
  keyPressInterval = undefined;
}

function onKeyDown(ev) {
  switch(ev.keyCode){
    case KEY.ESC:
      if(!PAUSE){
        clearInterval(gameLoop);
        document.removeEventListener('keypress', onKeyPress);
        document.removeEventListener('keyup', onKeyUp);
        PAUSE = !PAUSE;
      }
      else {
        gameLoop = setInterval(game, GAMEINT);
        document.addEventListener('keypress', onKeyPress);
        document.addEventListener('keyup', onKeyUp);
        PAUSE = !PAUSE;
      }     
  }
}
