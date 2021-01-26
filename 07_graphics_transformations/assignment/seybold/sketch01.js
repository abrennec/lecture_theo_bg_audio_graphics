//sketch01

let vectors;

function setup() {
  createCanvas(400, 400);

  vectors  = [
    createVector(30, 20),
    createVector(85, 20),
    createVector(85, 75),
    createVector(30, 75)
  ];
}

function draw() {
  background(220);

  beginShape();
  noStroke();
  vectors.forEach(v => {
  vertex(v.x, v.y);
  }); 
  endShape(CLOSE);

  push();
  noStroke();
  translate(200, 200);
  fill(100, 100, 255);
  ellipse(0,0,50);
  pop();
}
