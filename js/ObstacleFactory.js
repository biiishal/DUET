var ObstacleFactory = function(){
	this.getObstacle = function(code, dy, initialY) {
		switch(code){
			case 'SC':
			return(new SquareC(dy, initialY));
			break;

			case 'SCR':
			return(new SquareCRight(dy, initialY));
			break;

			case 'SCL':
			return(new SquareCLeft(dy, initialY));
			break;

			case 'RUL':
			return(new RectangleUprightL(dy, initialY));
			break;

			case 'RUR':
			return(new RectangleUprightR(dy, initialY));
			break;

			case 'RHC':
			return(new RectangleHorzC(dy, initialY));
			break;

			case 'RHCR':
			return(new RectangleHorzCRight(dy, initialY));
			break;

			case 'RHL':
			return(new RectangleHorzL(dy, initialY));
			break;

			case 'RHR':
			return(new RectangleHorzR(dy, initialY));
			break;

			// case 'RHRR':
			// return(new RectangleHorzRRotate(dy, initialY));
			// break;
		}
	}	
}