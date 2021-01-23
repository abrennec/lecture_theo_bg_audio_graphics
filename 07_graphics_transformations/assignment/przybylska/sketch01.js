
// This is a simple shape definition. Add another shape to 
// this 2d scene (specify the geometry or load a predefined shape)
// and check out the following functions in order to position
// the second shape inside of your scene:
// - push()
// - pop()
// - translate()

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

  //first coordinate system, starting 0,0
  push();
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();

  //seond rectangle - translated to coordinate system starting 100,100
  push();
  translate (100,100)
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);
  pop();
}


