//Inheritance Function
var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

//Parent Circle Class

var Circle = function(x, y, r, fs, ss) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.fs = fs;
	this.ss = ss;
};

Circle.prototype.revolveAround = function(cx, cy, angle) {
	angle = angle * Math.PI / 180;
	this.x = Math.cos(angle) * (this.x-cx) - Math.sin(angle) * (this.y-cy) + cx;
	this.y = Math.sin(angle) * (this.x-cx) + Math.cos(angle) * (this.y-cy) + cy;
}

var Orbit = function(x, y, r, fs, ss) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.fs = fs;
	this.ss = ss;
}
inheritsFrom(Orbit, Circle);

var BlueCircle = function(x, y, r, fs, ss) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.fs = fs;
	this.ss = ss;
}
inheritsFrom(BlueCircle, Circle);

var RedCircle = function(x, y, r, fs, ss) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.fs = fs;
	this.ss = ss;
}
inheritsFrom(RedCircle, Circle);