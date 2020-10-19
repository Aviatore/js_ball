var loop;
var height = 500;
var width = 1000;
var canvas;
var ctx;
var frameRate = 1/60;

window.addEventListener('load', setUp);


function setUp() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  console.log('setup');
}

var ball = {
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 20,
    y: 10
  },
  mass: 0.1,
  radius: 5,
  restitution: -0.5
}
var Cd = 0.47;
var rho = 1.22;
var A = Math.PI * ball.radius * ball.radius / 10000;
var ag = 9.81;


function drawBall() {
  ctx.save();
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.translate(ball.position.x, ball.position.y);
  ctx.beginPath();
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
}

function loops() {
  let Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
  let Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

  Fx = (isNaN(Fx) ? 0 : Fx);
  Fy = (isNaN(Fy) ? 0 : Fy);

  var ax = Fx / ball.mass;
  var ay = ag + (Fy / ball.mass);

  ball.velocity.x += ax * frameRate;
  ball.velocity.y += ay * frameRate;

  ball.position.x += ball.velocity.x * frameRate * 100;
  ball.position.y += ball.velocity.y * frameRate * 100;

  if (ball.position.y > height - ball.radius) {
    ball.velocity.y *= ball.restitution;
    ball.position.y = height - ball.radius;
  }
  if (ball.position.x > width - ball.radius) {
    ball.velocity.x *= ball.restitution;
    ball.position.x = width - ball.radius;
  }
  if (ball.position.x < ball.radius) {
    ball.velocity.x *= ball.restitution;
    ball.position.x = ball.radius;
  }

  draw();
  loop = requestAnimationFrame(loops);
}

function start() {
  loop = requestAnimationFrame(loops);
  // loop = setInterval(draw, 1000 / 60);
  // draw(ctx, canvas, startPositionX, startPositionY);
}
function stop() {
  cancelAnimationFrame(loop);
  // clearInterval(loop);
}
