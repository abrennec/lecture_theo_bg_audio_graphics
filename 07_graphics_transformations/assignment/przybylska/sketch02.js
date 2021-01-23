
// Extend sketch01 and use the rotate function. 
// Rotate both shapes in the opposite direction.

let vectors;
let angle = 0;
let x = 50;
let y = 50;

function setup() {
  createCanvas(400, 400);
  //angleMODE(DEGREES);

  vectors  = [
    createVector(30, 20),
    createVector(85, 20),
    createVector(85, 75),
    createVector(30, 75)
  ];
}

function draw() {
  background(220);

  //first coordinate system, starting 0,0
  //rotate clockwise
  push();
  translate(x,y);
  rotate(angle);
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  angle = angle + 0.1;
  pop();

  //seond rectangle - translated to coordinate system starting 100,100
  // roatating counterclockwise
  //push();
  translate (2 * x,2 * y)
  rotate(-angle);
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  angle = angle + 0.1 
  //pop();
}