var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var GAMEINT = 2;
var ANGLEINTERVAL = 5;
var ANGLE = 0;
var ANGLEINC = 1;
var KEY = { LEFT:97, RIGHT:100, ESC:27 };
var keyPressInterval;
var STATE = { START: 0, PLAY: 1, PAUSE: false, HIT: 3 };
var gameLoop;


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
  ctx.save();

  // paint bg
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, w, h);

  // set origin to center
  ctx.translate(w / 2, h / 1.3);

  // draw orbit
  drawCircleStroke(orbit);

  ctx.save();
  // rotate + move along x
  ctx.rotate(Math.PI / 180 * ANGLE);
  ctx.translate(100, 0);
  //drawing circles
	drawCircleFill(redCircle);
  ctx.restore();

  ctx.save();
  ctx.rotate(Math.PI / 180 * ANGLE);
  ctx.translate(-100, 0);
  drawCircleFill(blueCircle);

  ctx.restore();

  ctx.restore();

  //square
  ctx.save();
  // if(sq.updatePos()) drawRectFill(sq);
  // if(rectUpR.updatePos()) drawRectFill(rectUpR);
  // if(rectUpL.updatePos()) drawRectFill(rectUpL);
  // if(rectHorzC.updatePos()) drawRectFill(rectHorzC);

  for(var i = 0; i < obstacles.length; i++) {
   if(obstacles[i].onScreen)drawRectFill(obstacles[i]);
   // drawRectFill(obstacles[i]);
  }

  ctx.restore();


  window.requestAnimationFrame(redraw);
};


//===================================================================//

//EVENT LISTENING UTILITY
function onKeyPress(ev) {
  console.log("onKeyPress", ev.keyCode);

  if (!keyPressInterval) {
      switch(ev.keyCode){
          case KEY.LEFT:
              keyPressInterval = setInterval(function() {
              ANGLE -= ANGLEINC;
              }, ANGLEINTERVAL);
          break;

          case KEY.RIGHT:
              keyPressInterval = setInterval(function() {
              ANGLE += ANGLEINC;
              }, ANGLEINTERVAL);
          break;
      }
  }
}

function onKeyUp() {
  clearInterval(keyPressInterval);
  keyPressInterval = undefined;
}

function onKeyDown(ev) {
  console.log('state.pause', STATE.PAUSE);
  console.log('sq.x', sq.x);
  console.log('sq.y', sq.y);
  console.log('redCircle.x', redCircle.x);
  console.log('redCircle.x', redCircle.x);
  switch(ev.keyCode){
    case KEY.ESC:
      if(!STATE.PAUSE){
        clearInterval(gameLoop);
        document.removeEventListener('keypress', onKeyPress);
        document.removeEventListener('keyup', onKeyUp);
        STATE.PAUSE = !STATE.PAUSE;
      }
      else {
        gameLoop = setInterval(game, GAMEINT);
        document.addEventListener('keypress', onKeyPress);
        document.addEventListener('keyup', onKeyUp);
        STATE.PAUSE = !STATE.PAUSE;
      }     
  }
}
