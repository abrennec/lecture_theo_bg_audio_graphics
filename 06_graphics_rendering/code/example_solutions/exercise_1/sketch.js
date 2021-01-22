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
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
}
