import Game from './game.js';

class Inputs {
  /* key binding switch for arrows */
  constructor() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        // left
        case 37:
          'move', { x: -1, y: 0 };
          break;

        //up
        case 38:
          'move', { x: 0, y: -1 };
          console.log('up');
          break;

        // right
        case 39:
          'move', { x: 1, y: 0 };
          break;

        //down
        case 40:
          'move', { x: 0, y: 1 };
          break;

        default:
          break;
      }
    });
  }

  /*
  handleKeys = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      // left
      case 37:
        this.broadcast('move', { x: -1, y: 0 });
        break;

      //up
      case 38:
        this.broadcast('move', { x: 0, y: -1 });
        break;

      // right
      case 39:
        this.broadcast('move', { x: 1, y: 0 });
        break;

      //down
      case 40:
        this.broadcast('move', { x: 0, y: 1 });
        break;

      default:
        break;
    }
  };
  */

  /* add/remove event listeners for keys */
  // bindKeys() {
  //   document.addEventListener('keydown', this.handleKeys);
  // }
  // unbindKeys() {
  //   document.removeEventListener('keydown', this.handleKeys);
  // }
}
export default Inputs;
