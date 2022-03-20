const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const balls = [];

let x = 100;
let y = 100;
let LEFT, UP, RIGHT, DOWN;
let friction = 0.1;

// Vectros //
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    //x and y sum of x and y of current vectors
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtr(v) {
    //x and y diff of x and y of current vectors
    return new Vector(this.x - v.x, this.y - v.y);
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  multi(n) {
    return new Vector(this.x * n, this.y * n);
  }

  unit() {
    if (this.mag() === 0) {
      return new Vector(0, 0);
    }
    return new Vector(this.x / this.mag(), this.y / this.mag());
  }

  normal() {
    return new Vector(-this.y, this.x).unit();
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  drawVect(start_x, start_y, n, color) {
    context.beginPath();
    context.moveTo(start_x, start_y);
    context.lineTo(start_x + this.x * n, start_y + this.y * n);
    context.strokeStyle = color;
    context.stroke();
  }
}

// draw ball //

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.move = false;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
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

  // display velocity and acc line //
  display() {
    this.vel.drawVect(700, 500, 10, "red");
    this.acc.unit().drawVect(700, 500, 50, "blue");
    // this.acc.normal().drawVect(700, 500, 50, "orange");

    context.beginPath();
    context.arc(700, 500, 50, 0, 2 * Math.PI);
    context.strokeStyle = "black";
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
        break;
      case "w":
        UP = true;
        break;
      case "d":
        RIGHT = true;
        break;
      case "s":
        DOWN = true;
        break;
    }
  });

  addEventListener("keyup", (e) => {
    switch (e.key) {
      case "a":
        LEFT = false;
        break;
      case "w":
        UP = false;
        break;
      case "d":
        RIGHT = false;
        break;
      case "s":
        DOWN = false;
        break;
    }
  });

  if (LEFT) {
    ball.acc.x = -ball.acceleration;
  }
  if (UP) {
    ball.acc.y = -ball.acceleration;
  }
  if (RIGHT) {
    ball.acc.x = ball.acceleration;
  }
  if (DOWN) {
    ball.acc.y = ball.acceleration;
  }
  if (!UP && !DOWN) {
    ball.acc.y = 0;
  }
  if (!RIGHT && !LEFT) {
    ball.acc.x = 0;
  }

  //acceleration values added to the velocity components
  ball.acc = ball.acc.unit(ball.acceleration);
  ball.vel = ball.vel.add(ball.acc);
  //velocity gets multiplied by a number between 0 and 1
  ball.vel = ball.vel.multi(1 - friction);
  //velocity values added to the current x, y position
  ball.x += ball.vel.x;
  ball.y += ball.vel.y;
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

// end //

requestAnimationFrame(animationFrame);
