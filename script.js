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
    this.pos = new Vector(x, y);
    this.r = r;
    this.move = false;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.acceleration = 1;
    balls.push(this);
  }

  drawBall() {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
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

  reposition() {
    //acceleration values added to the velocity components
    this.acc = this.acc.unit().multi(this.acceleration);
    this.vel = this.vel.add(this.acc);
    //velocity gets multiplied by a number between 0 and 1
    this.vel = this.vel.multi(1 - friction);
    //velocity values added to the current x, y position
    this.pos = this.pos.add(this.vel);
  }
}

// end //

// move ball //

const keyControl = (ball) => {
  addEventListener("keydown", (e) => {
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
};

// end //

// collision //

const round = (number, precision) => {
  let factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

const coll_det_bb = (b1, b2) => {
  if (b1.r + b2.r >= b2.pos.subtr(b1.pos).mag()) {
    return true;
  } else {
    return false;
  }
};

//penetration resolution
//repositions the balls based on the penetration depth and the collision normal
const pen_res_bb = (b1, b2) => {
  let dist = b1.pos.subtr(b2.pos);
  let pen_depth = b1.r + b2.r - dist.mag();
  let pen_res = dist.unit().multi(pen_depth / 2);
  b1.pos = b1.pos.add(pen_res);
  b2.pos = b2.pos.add(pen_res.multi(-1));
};

const coll_res_bb = (b1, b2) => {
  //collision normal vector
  let normal = b1.pos.subtr(b2.pos).unit();
  //relative velocity vector
  let relVel = b1.vel.subtr(b2.vel);
  //separating velocity - relVel projected onto the collision normal vector
  let sepVel = Vector.dot(relVel, normal);
  //the projection value after the collision (multiplied by -1)
  let new_sepVel = -sepVel;
  //collision normal vector with the magnitude of the new_sepVel
  let sepVelVec = normal.multi(new_sepVel);

  //adding the separating velocity vector to the original vel. vector
  b1.vel = b1.vel.add(sepVelVec);
  //adding its opposite to the other balls original vel. vector
  b2.vel = b2.vel.add(sepVelVec.multi(-1));
};

const momentumDisplay = () => {
  let momentum = ball1.vel.add(ball2.vel).mag();
  context.fillText("Momentum: " + round(momentum, 4), 670, 400);
};

// end //

// bal rerender //

const animationFrame = () => {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  balls.forEach((b, index) => {
    b.drawBall();
    if (b.move) {
      keyControl(b);
    }
    for (let i = index + 1; i < balls.length; i++) {
      if (coll_det_bb(balls[index], balls[i])) {
        pen_res_bb(balls[index], balls[i]);
        coll_res_bb(balls[index], balls[i]);
      }
    }

    b.display();
    b.reposition();
  });
  momentumDisplay();

  requestAnimationFrame(animationFrame);
};

const ball1 = new Ball(x, y, 20);
const ball2 = new Ball(400, 500, 30);
const ball3 = new Ball(500, 550, 50);
ball1.move = true;
// ball2.move = true;

// end //

requestAnimationFrame(animationFrame);
