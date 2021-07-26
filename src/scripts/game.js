import Ball from './ball.js';
import Inputs from './input.js';

class Game {
  constructor(gameWidth, gameHeight) {
    const thisGame = this;
    thisGame.gameHeight = gameHeight;
    thisGame.gameWidth = gameWidth;
  }

  start() {
    const thisGame = this;

    thisGame.ball = new Ball(thisGame);
    thisGame.ball2 = new Ball(thisGame);
    thisGame.inputKeys = new Inputs(thisGame);

    thisGame.gameObjects = [thisGame.ball, thisGame.ball2, thisGame.inputKeys];
  }

  draw(context) {
    const thisGame = this;

    thisGame.gameObjects.forEach((object) => object.draw(context));
  }

  update(deltaTime) {
    const thisGame = this;
    thisGame.gameObjects.forEach((object) => object.update(deltaTime));
  }
}

export default Game;
