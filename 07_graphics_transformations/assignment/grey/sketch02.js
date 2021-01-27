
// Extend sketch01 and use the rotate function. 
// Rotate both shapes in the opposite direction.

let vectors;
let angleTri = 0;
let angleRect = 0;

function setup() {
  createCanvas(400, 400);

  vectorsRect  = [
    createVector(-50, -50),
    createVector(50,-50),
    createVector(50, 50),
    createVector(-50, 50)
  ];

  vectorsTri = [
    createVector(0, -40),
    createVector(40, 40),
    createVector(-40, 40),
  ];

  angleMode(DEGREES);
}

function draw() {
  background(220);
  push();
  translate(100, 100);
  rotate(angleRect);
  beginShape();
  vectorsRect.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();

    
  push();
  translate(300, 300);
  rotate(angleTri);
  beginShape();
  vectorsTri.forEach(v => {
    vertex(v.x, v.y);
  });
  endShape(CLOSE);
  pop();

  angleTri = angleTri + 1;
  angleRect = angleRect - 1;

  


  
}


