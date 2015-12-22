var Drawer = function(canvas, orbit, redCircle, blueCircle, obstacles) {
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var that = this;
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

	this.redraw = function() {
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
	  
	  window.requestAnimationFrame(that.redraw);
	};

}