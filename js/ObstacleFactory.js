var ObstacleFactory = function(){
	this.getObstacle = function(code, dy, initialY) {
		switch(code){
			case 'SC': //Square Center
			return(new SquareC(dy, initialY));
			break;

			case 'SCR': //Square Center Moving Right
			return(new SquareCRight(dy, initialY));
			break;

			case 'SCL': //Square Center Moving Left
			return(new SquareCLeft(dy, initialY));
			break;

			case 'RUL': //Rectangle Upright Left
			return(new RectangleUprightL(dy, initialY));
			break;

			case 'RUR': //Rectangle Upright Right
			return(new RectangleUprightR(dy, initialY));
			break;

			case 'RHC': //Rectangle Horizontal Center
			return(new RectangleHorzC(dy, initialY));
			break;
 
			case 'RHCR': //Rectangle Horizontal Center Moving Right
			return(new RectangleHorzCRight(dy, initialY));
			break;

			case 'RHCL': //Rectangle Horizontal Center Moving Left
			return(new RectangleHorzCLeft(dy, initialY));
			break;

			case 'RHL': //Rectangle Horizontal Left
			return(new RectangleHorzL(dy, initialY));
			break;

			case 'RHR': //Rectangle Horizontal Right
			return(new RectangleHorzR(dy, initialY));
			break;

			case 'RHLR': //Rectangle Horizontal Left Moving Right
			return(new RectangleHorzLR(dy, initialY));
			break;

			case 'RHRL': //Rectangle Horizontal Right Moving Left
			return(new RectangleHorzRL(dy, initialY));
			break;
		}
	}	
}