// exercise 01 

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
background(200);
  
let v1 = createVector(110, 10);
let v2 = createVector(10, 110);
let v3 = createVector(110, 110);
let v4 = createVector(10, 10);

fill(200, 50, 50)
beginShape(TRIANGLE_STRIP);
  
  vertex(v1.x, v1.y);
  vertex(v2.x, v2.y);
  vertex(v3.x, v3.y);
  vertex(v4.x, v4.y);

  endShape(CLOSE);
}
