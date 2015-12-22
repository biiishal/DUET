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
};

Obstacle.prototype.updatePos = function() {	
	if(this.y < 700 && this. y > -200) this.onScreen = true;
	else this.onScreen = false;
	this.y +=this.dy;
	this.x +=this.dx;	
}

Obstacle.prototype.reversePos = function() {
	if(this.y < 700 && this. y > -200) this.onScreen = true;
	else this.onScreen = false;
	if(this.initialY <=this.y) {
		this.y -=this.dy*4;
		this.x -=this.dx*4;
		return;
	}
	else return true;
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
	
	// SquareStillCenter.prototype.updatePos.call(this);
}
inheritsFrom(SquareC, Obstacle);


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
};
inheritsFrom(RectangleHorzC, Obstacle);

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
};
inheritsFrom(RectangleHorzR, Obstacle);