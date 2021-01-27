
// Extend sketch01 and use the rotate function. 
// Rotate both shapes in the opposite direction.

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
  
  push();
  translate(200,200);
  rotate(PI);
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();
  
  
  push();
  translate(200,200);
  rotate(PI/4);
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();
  
}


