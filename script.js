const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const balls = [];

let x = 100;
let y = 100;
let LEFT, UP, RIGHT, DOWN;
let friction = 0.1;

// draw ball //

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.move = false;
    this.vel_x = 0;
    this.vel_y = 0;
    this.acc_x = 0;
    this.acc_y = 0;
    this.acceleration = 1;
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

  display() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.acc_x * 100, this.y + this.acc_y * 100);
    this.strokeStyle = "blue";
    context.stroke();

    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.vell_x * 50, this.y + this.vel_y * 50);
    this.strokeStyle = "white";
    context.stroke();
  }
}

// end //

// move ball //

const keyControl = (ball) => {
  addEventListener("keydown", (e) => {
    console.log(e.key);
    switch (e.key) {
      case "a":
        LEFT = true;
      case "w":
        UP = true;
      case "d":
        RIGHT = true;
      case "s":
        DOWN = true;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.key) {
      case "a":
        LEFT = false;
      case "w":
        UP = false;
      case "d":
        RIGHT = false;
      case "s":
        DOWN = false;
    }
  });

  if (LEFT) {
    ball.acc_x = -ball.acceleration;
  }
  if (UP) {
    ball.acc_y = -ball.acceleration;
  }
  if (RIGHT) {
    ball.acc_x = ball.acceleration;
  }
  if (DOWN) {
    ball.acc_y = ball.acceleration;
  }
  if (!UP && !DOWN) {
    ball.acc_y = 0;
  }
  if (!RIGHT && !LEFT) {
    ball.acc_x = 0;
  }
  ball.vel_x += ball.acc_x;
  ball.vel_x += ball.acc_y;
  ball.vel_x *= 1 - friction;
  ball.vel_y *= 1 - friction;
  ball.x += ball.vel_x;
  ball.y += ball.vel_y;
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
    b.display();
  });
  requestAnimationFrame(animationFrame);
};

const ball1 = new Ball(x, y, 20);
const ball2 = new Ball(400, 500, 30);
ball1.move = true;
// ball2.move = true;

requestAnimationFrame(animationFrame);
