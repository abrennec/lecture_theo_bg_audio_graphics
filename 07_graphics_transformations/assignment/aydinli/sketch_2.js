

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
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);

  push();
  translate(300,300);
  rotate(PI/3);
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();


  push();
  translate(0,300);
  rotate(PI/4)
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();


  push();
  translate(300,0);
  rotate(PI/4)
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();
  
}

