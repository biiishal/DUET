var EventHandler = function() {
  var angelInterval = 15;
  var angle = 0;
  var angleIncr = 0.9;
  var KEY = { LEFT:97, RIGHT:100, ESC:27 };
  var keyPressInterval;

  //EVENT LISTENING UTILITY
  this.onKeyPress = function(ev) {
    //console.log("onKeyPress", ev.keyCode);

    if (!keyPressInterval) {
        switch(ev.keyCode){
            case KEY.LEFT:
                keyPressInterval = setInterval(function() {
                // console.log('first',angle);
                if(angle < 5)
                angle += angleIncr;
                redCircle.revolveAround(orbitCx, orbitCy, angle);
                blueCircle.revolveAround(orbitCx, orbitCy, angle);
                }, angelInterval);
            break;

            case KEY.RIGHT:
                keyPressInterval = setInterval(function() {
                  // console.log('first',angle);
                if(angle > -5)
                angle -= angleIncr;
                redCircle.revolveAround(orbitCx, orbitCy, angle);
                blueCircle.revolveAround(orbitCx, orbitCy, angle);
                }, angelInterval);
            break;
        }
    }
  }

  this.onKeyUp = function(ev) {
    if(angle>0) angle -= angleIncr*3;
    else angle += angleIncr*3;
    // console.log('keyup',angle);
    clearInterval(keyPressInterval);
    keyPressInterval = undefined;
  }

  this.onKeyDown = function(ev) {
    switch(ev.keyCode){
      case KEY.ESC:
      if(!PAUSE){
        clearInterval(gameLoop);
        document.removeEventListener('keypress', onKeyPress);
        document.removeEventListener('keyup', onKeyUp);
        PAUSE = !PAUSE;
      }
      else {
        gameLoop = setInterval(game, GAMEINT);
        document.addEventListener('keypress', onKeyPress);
        document.addEventListener('keyup', onKeyUp);
        PAUSE = !PAUSE;
      }     
    }
  }
}