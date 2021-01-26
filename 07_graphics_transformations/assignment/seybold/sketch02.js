//sketch02
// How do i rotate the vector-shape around its own center instead of the origin? 

let vectors;
let angle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  rectMode(CENTER);


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
  beginShape();
  translate(100,100);
  rotate(-angle);
  noStroke();
  vectors.forEach(v => {
  vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();

  push();
  translate(200, 200);
  rotate(angle)

  noStroke();
  fill(100, 100, 255);
  rect(0,0,50);
  pop();

  angle = angle + 0.5;

  
}
