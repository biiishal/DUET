var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var FPS = 5;
var ANGLE = 0;
var ANGLEINC = 1;
var KEY = { LEFT:97, RIGHT:100, ESC:27 };
var keyPressInterval;


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
    console.log('onScreen', obstacles[i].onScreen);
   if(obstacles[i].onScreen)drawRectFill(obstacles[i]);
  }

  ctx.restore();


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
              ANGLE -= ANGLEINC;
              }, FPS);
          break;

          case KEY.RIGHT:
              keyPressInterval = setInterval(function() {
              ANGLE += ANGLEINC;
              }, FPS);
          break;
      }
  }
}

function onKeyUp() {
  clearInterval(keyPressInterval);
  keyPressInterval = undefined;
}
