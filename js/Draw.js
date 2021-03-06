var Drawer = function(canvas, orbit, redCircle, blueCircle, obstacles, playerData) {
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

	var drawScore = function(score) {
		ctx.font = "14px Oswald";
		ctx.fillStyle = "#D1C800";
		ctx.fillText("SCORE: " + score,310,20);
	}

	var drawLife = function(life) {
		ctx.font = "14px Oswald";
		ctx.fillStyle = "#D1C800";
		ctx.fillText("LIFE: " + life,10,20);
	}

	var drawLevel = function(level) {
		ctx.font = "14px Oswald";
		ctx.fillStyle = "#D1C800";
		ctx.fillText("LEVEL: " + level,174,20);
	}

	this.redraw = function() {
	  // paint bg
	  ctx.fillStyle = 'rgba(0,0,0,0.3)';
		ctx.fillRect(0,0,canvas.width,canvas.height);

	  //draw the circles
	  drawCircleStroke(orbit);
		drawCircleFill(redCircle);
	  drawCircleFill(blueCircle);

	  for(var i = 0; i < obstacles.length; i++) {
	   if(obstacles[i].onScreen)drawRectFill(obstacles[i]);
	  }

	  drawScore(playerData.score);
	  drawLife(playerData.life);
	  drawLevel(playerData.level);
	  
	  window.requestAnimationFrame(that.redraw);
	};

}