// example src: https://p5js.org/reference/#/p5.Vector/lerp

let step = 0.01;
let amount = 0;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let v0 = createVector(0, 0);

  let v1 = createVector(mouseX, mouseY);
  drawArrow(v0, v1, 'red');

  let v2 = createVector(90, 90);
  drawArrow(v0, v2, 'blue');

  if (amount > 1 || amount < 0) {
    step *= -1;
  }
  amount += step;
  let v3 = p5.Vector.lerp(v1, v2, amount);

  drawArrow(v0, v3, 'purple');
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}