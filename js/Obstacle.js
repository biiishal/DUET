//Inheritance Function
var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

//Parent Obstacle Class

var Obstacle = function(dx, dy, y, fs) {
	this.x; 
	this.y = y;
	this.w;
	this.h;
	this.dx = dx;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.onScreen = false;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;	
	this.counter = 0;
	this.beating = false;
};

Obstacle.prototype.updatePos = function() {	
	if(this.y < 700 && this. y > -200) this.onScreen = true;
	else this.onScreen = false;
	this.y +=this.dy;
	this.x +=this.dx;	
	// console.log(this.w, this.h);
	// console.log('counter', this.counter);

	if(this.dx != 0)
	{if(this.x+this.w >= 400 || this.x <= 0) this.dx = this.dx * -1;}

	if(this.counter == 90) {
		if(!this.beating) {
			this.x -= 1;
			this.y -= 1;
			this.w += 2;
			this.h += 2;
			this.beating = true;
			this.counter = 0;
		}
		else{
			this.x += 1;
			this.y += 1;
			this.w -= 2;
			this.h -= 2;
			this.beating = false;
			this.counter = 0;
		}
	}
	this.counter++;
}

Obstacle.prototype.reversePos = function() {
	if(this.y < 700 && this. y > -200) this.onScreen = true;
	else this.onScreen = false;
	if(this.initialY <=this.y) {
		this.y -=45;
		// this.x -=10;
		return;
	}
	else return true;
}

Obstacle.prototype.crossedFinish = function() {
	if(this.y > 600) return true;
	else return false;
}

Obstacle.prototype.changeColor = function(color) {
	this.fs = color;
}


//Square Obstacle
var SquareC = function(dy, y, fs) {
	this.x = 150;
	this.y = y;
	this.w = 80;
	this.h = 80;
	this.dx=0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	// this.onScreen = false;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;	
	this.counter = 0;
	this.beating = false;
	
	// SquareStillCenter.prototype.updatePos.call(this);
}
inheritsFrom(SquareC, Obstacle);

//Square Obstacle Center Moving Right
var SquareCRight = function(dy, y, fs) {
	this.x = 150;
	this.y = y;
	this.w = 80;
	this.h = 80;
	this.dx = 0.2;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	// this.onScreen = false;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;	
	this.counter = 0;
	this.beating = false;
	
// 	Obstacle.prototype.updatePos.call(this);
}
inheritsFrom(SquareCRight, Obstacle);

//Square Obstacle Center Moving Left
var SquareCLeft = function(dy, y, fs) {
	this.x = 150;
	this.y = y;
	this.w = 80;
	this.h = 80;
	this.dx = -0.2;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	// this.onScreen = false;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;	
	this.counter = 0;
	this.beating = false;
}
inheritsFrom(SquareCLeft, Obstacle);


//Rectangle Upright Right
var RectangleUprightR = function(dy, y, fs) {
	this.x = 100;
	this.y = y;
	this.w = 30;
	this.h = 150;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;
};
inheritsFrom(RectangleUprightR, Obstacle);


//Rectangle Upright Left
var RectangleUprightL = function(dy, y, fs) {
	this.x = 300;
	this.y = y;
	this.w = 30;
	this.h = 150;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;
};
inheritsFrom(RectangleUprightL, Obstacle);


//Rectangle Horizontol Center
var RectangleHorzC = function(dy, y, fs) {
	this.x = 150;
	this.y =  y;
	this.w = 70;
	this.h = 30;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;
};
inheritsFrom(RectangleHorzC, Obstacle);

//Rectangle Horizontol Center Moving Right
var RectangleHorzCRight = function(dy, y, fs) {
	this.x = 150;
	this.y =  y;
	this.w = 70;
	this.h = 30;
	this.dx = 0.17;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;
};
inheritsFrom(RectangleHorzCRight, Obstacle);

//Rectangle Horizontol Center Moving Left
var RectangleHorzCLeft = function(dy, y, fs) {
	this.x = 150;
	this.y =  y;
	this.w = 70;
	this.h = 30;
	this.dx = -0.17;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;
};
inheritsFrom(RectangleHorzCLeft, Obstacle);

//Rectangle Horizontol Left
var RectangleHorzL = function(dy, y, fs) {
	this.x = 0;
	this.y =  y;
	this.w = 200;
	this.h = 30;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;
};
inheritsFrom(RectangleHorzL, Obstacle);

//Rectangle Horizontol Right
var RectangleHorzR = function(dy, y, fs) {
	this.x = 200;
	this.y =  y;
	this.w = 200;
	this.h = 30;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	if(!fs)this.fs = 'white';
	else this.fs = fs;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;
};
inheritsFrom(RectangleHorzR, Obstacle);