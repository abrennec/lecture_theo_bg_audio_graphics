
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

  vectorsRect  = [
    createVector(30, 20),
    createVector(85, 20),
    createVector(85, 75),
    createVector(30, 75)
  ];

  vectorsTri = [
    createVector(57, 20),
    createVector(30, 75),
    createVector(85, 75),
  ];
}

function draw() {
  background(220);

  beginShape();
  vectorsRect.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);

  translate(150, 150);

  beginShape();
  vectorsTri.forEach(v => {
    vertex(v.x, v.y);
  });
  endShape(CLOSE);

  
}


