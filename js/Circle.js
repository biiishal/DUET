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