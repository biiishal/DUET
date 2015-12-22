// var ANGLEINTERVAL = 15;
// var ANGLE = 0;
// var ANGLEINC = 0.9;
// var KEY = { LEFT:97, RIGHT:100, ESC:27 };
// var keyPressInterval;
// var STATE = { START: 0, PLAY: 1, HIT: 2 };
// var GAMESTATE = STATE.START;
// var PAUSE = false;
// var gameLoop;
// var reverseInterval;


// //EVENT LISTENING UTILITY
// function onKeyPress(ev) {
//   //console.log("onKeyPress", ev.keyCode);

//   if (!keyPressInterval) {
//       switch(ev.keyCode){
//           case KEY.LEFT:
//               keyPressInterval = setInterval(function() {
//               // console.log('first',ANGLE);
//               if(ANGLE < 5)
//               ANGLE += ANGLEINC;
//               redCircle.revolveAround(orbitCx, orbitCy, ANGLE);
//               blueCircle.revolveAround(orbitCx, orbitCy, ANGLE);
//               }, ANGLEINTERVAL);
//           break;

//           case KEY.RIGHT:
//               keyPressInterval = setInterval(function() {
//                 // console.log('first',ANGLE);
//               if(ANGLE > -5)
//               ANGLE -= ANGLEINC;
//               redCircle.revolveAround(orbitCx, orbitCy, ANGLE);
//               blueCircle.revolveAround(orbitCx, orbitCy, ANGLE);
//               }, ANGLEINTERVAL);
//           break;
//       }
//   }
// }

// function onKeyUp() {
//   if(ANGLE>0) ANGLE -= ANGLEINC*3;
//   else ANGLE += ANGLEINC*3;
//   // console.log('keyup',ANGLE);
//   clearInterval(keyPressInterval);
//   keyPressInterval = undefined;
// }

// function onKeyDown(ev) {
//   switch(ev.keyCode){
//     case KEY.ESC:
//       if(!PAUSE){
//         clearInterval(gameLoop);
//         document.removeEventListener('keypress', onKeyPress);
//         document.removeEventListener('keyup', onKeyUp);
//         PAUSE = !PAUSE;
//       }
//       else {
//         gameLoop = setInterval(game, GAMEINT);
//         document.addEventListener('keypress', onKeyPress);
//         document.addEventListener('keyup', onKeyUp);
//         PAUSE = !PAUSE;
//       }     
//   }
// }
