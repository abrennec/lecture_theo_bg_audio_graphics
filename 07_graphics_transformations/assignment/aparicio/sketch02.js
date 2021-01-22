
// Extend sketch01 and use the rotate function. 
// Rotate both shapes in the opposite direction.
// This is a simple shape definition. Add another shape to 
// this 2d scene (specify the geometry or load a predefined shape)
// and check out the following functions in order to position
// the second shape inside of your scene:
// - push()
// - pop()
// - translate()

let vectors;
let angle = 2;

function setup() {
  createCanvas(700, 400);
  angleMode(DEGREES);

  //Vektorpunkte erstellen
  vectors  = [
    createVector(0, 0), 
    createVector(0, 200), 
    createVector(150, 200),
    createVector(150, 150),
    createVector(50, 150),
    createVector(50, 0)
  ];

  vectors2 = [
    createVector(0, 0), 
    createVector(0, 200), 
    createVector(50, 200),
    createVector(50, 150),
    createVector(100, 200),
    createVector(150, 200),
    createVector(50, 100),
    createVector(150, 0),
    createVector(100,0),
    createVector(50, 50),
    createVector(50, 0)
  ]
 
}

//Jeden Vektorpunkt durchgehen in der Reihenfolge für oben und da entlang eine Form malen
function draw() {
    background(0);
    noStroke();


    

  push();
  translate(100,100);
  rotate(angle);
  angle += 1;
  
    // LISA
  fill(255);
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);

  //mit translate können die gleichen Vektoren genutzt werden
  fill(200,0,50);
  translate(-5, -5, 0)
  beginShape();
  vectors.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);

  pop();
  


  //KEN
  push();
 
  translate(400,100);
  rotate(-angle);


  fill(255);
  beginShape();
  vectors2.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);



  fill(200,0,50);
  translate(-5, -5, 0)
  beginShape();
  vectors2.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);

  pop();
}