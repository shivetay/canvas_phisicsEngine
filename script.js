const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const balls = [];

let x = 100;
let y = 100;
let LEFT, UP, RIGHT, DOWN;

// draw ball //

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.move = false;
    balls.push(this);
  }

  drawBall() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.strokeStyle = "blue";
    context.stroke();

    context.fillStyle = "red";
    context.fill();
  }
}

// end //

// move ball //

const keyControl = (ball) => {
  addEventListener("keydown", (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:
        LEFT = true;
      case 38:
        UP = true;
      case 39:
        RIGHT = true;
      case 40:
        DOWN = true;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 37:
        LEFT = false;
      case 38:
        UP = false;
      case 39:
        RIGHT = false;
      case 40:
        DOWN = false;
    }
  });

  if (LEFT) {
    ball.x--;
  }
  if (UP) {
    ball.y--;
  }
  if (RIGHT) {
    ball.x++;
  }
  if (DOWN) {
    ball.y++;
  }
};

// end //

// bal rerender //

const animationFrame = () => {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  balls.forEach((b) => {
    b.drawBall();
    if (b.move) {
      keyControl(b);
    }
  });
  requestAnimationFrame(animationFrame);
};

const ball1 = new Ball(200, 200, 20);
const ball2 = new Ball(400, 500, 30);
ball1.move = true;
// ball2.move = true;

requestAnimationFrame(animationFrame);
