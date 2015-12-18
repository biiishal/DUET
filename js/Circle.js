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

Circle.prototype.revolveAround = function rotate(cx, cy, angle) {
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (this.x - cx)) + (sin * (this.y - cy)) + cx,
      ny = (cos * (this.y - cy)) - (sin * (this.x - cx)) + cy;
  this.x = nx;
  this.y = ny;
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