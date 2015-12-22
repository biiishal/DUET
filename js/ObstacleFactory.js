var ObstacleFactory = function(){
	this.getObstacle = function(code, dy, initialY) {
		switch(code){
			case 'SC':
			return(new SquareC(dy, initialY));
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

			case 'RHL':
			return(new RectangleHorzL(dy, initialY));
			break;

			case 'RHR':
			return(new RectangleHorzR(dy, initialY));
			break;
		}
	}	
}