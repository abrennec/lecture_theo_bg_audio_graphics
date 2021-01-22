
let vectors;

function setup() {
  createCanvas(100, 100, WEBGL);

  vectors  = [
    createVector(0, 35),
    createVector(35, 0),
    createVector(0, -35),
    createVector(-35, 0),
  ];
}

function draw() {
  background(220);
  fill(237, 34, 93);
  noStroke();

  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
}