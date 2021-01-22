function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // beginShape();
  // vertex(20, 20);
  // vertex(40, 20);
  // vertex(40, 40);
  // vertex(60, 40);
  // vertex(60, 60);
  // vertex(20, 60);
  // endShape(CLOSE);

let v1 = createVector(20, 20);
let v2 = createVector(40, 40);
let v3 = createVector(60, 60);

fill(255, 255, 255);

beginShape();
  vertex(v1.x, v1.y);
  vertex(v2.x, v1.y);
  vertex(v2.x, v2.y);
  vertex(v3.x, v2.y);
  vertex(v3.x, v3.y);
  vertex(v1.x, v3.y);
  endShape(CLOSE);

}
