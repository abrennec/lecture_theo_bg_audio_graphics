
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
  background(0);

  //Vektorpunkte erstellen
  vectors  = [
    createVector(100, 100), 
    createVector(100, 300), 
    createVector(250, 300),
    createVector(250, 250),
    createVector(150, 250),
    createVector(150, 100)
  ];
 
}

//Jeden Vektorpunkt durchgehen in der Reihenfolge für oben und da entlang eine Form malen
function draw() {
  fill(255);
  noStroke();
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
}


