
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
  translate(57.5, 47.5); // 30 + 55/2 // 20 + 55/2
  rotate(frameCount * -0.01 );
  beginShape();
  vectors.forEach(v => {
    vertex(v.x - 57.5, v.y - 47.5);
  }); 
  endShape(CLOSE);
  pop();

  push();
  translate(width/2, height/2); //getting to the center
  rotate(frameCount * 0.01 );

  beginShape();
  vertex(-50, -85);
  vertex(50, -85);
  vertex(100, 0);
  vertex(50, 85);
  vertex(-50, 85);
  vertex(-100, 0);
  endShape(CLOSE); 

  pop();

}