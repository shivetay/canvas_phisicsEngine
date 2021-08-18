const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const drawBall = (x, y, r) => {
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.strokeStyle = 'blue';
  context.stroke();

  context.fillStyle = 'black';
  context.fill();
};

drawBall(100, 100, 20);
drawBall(200, 200, 50);
