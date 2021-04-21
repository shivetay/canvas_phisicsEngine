import Ball from './ball';

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

    thisGame.gameObjects = [thisGame.ball, thisGame.ball2];
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
