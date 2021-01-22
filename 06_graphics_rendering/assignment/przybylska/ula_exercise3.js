function setup() {
  createCanvas(400, 400, WEBGL);
  
  
}

function draw() {
  background(220);

  strokeWeight(1);
  //fill(255, 255, 255);
  
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  
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


//front
beginShape();
  vertex(v1.x, v1.y);
  vertex(v2.x, v1.y);
  vertex(v2.x, v2.y);
  vertex(v3.x, v2.y);
  vertex(v3.x, v3.y);
  vertex(v1.x, v3.y);
  endShape(CLOSE);

  //back
  beginShape();
  vertex(v1.x, v1.y, -20);
  vertex(v2.x, v1.y, -20);
  vertex(v2.x, v2.y, -20);
  vertex(v3.x, v2.y, -20);
  vertex(v3.x, v3.y, -20);
  vertex(v1.x, v3.y, -20);
  endShape(CLOSE);

  //backside1
  beginShape();
  vertex(v1.x, v1.y);
  vertex(v2.x, v1.y, -20);
  vertex(v1.x, v3.y);
  vertex(v1.x, v3.y, -20);
  endShape(CLOSE);

  //bottom
  beginShape();
  vertex(v1.x, v3.y);
  vertex(v1.x, v3.y, -20);
  vertex(v3.x, v3.y);
  vertex(v3.x, v3.y, -20);
  endShape(CLOSE);

  //L-fill
  beginShape();
  vertex(v2.x, v2.y);
  vertex(v3.x, v2.y);
  vertex(v3.x, v2.y, -20);
  endShape(CLOSE);

  //L-fill2
  beginShape();
  vertex(v2.x, v2.y);
  vertex(v2.x, v2.y, -20);
  vertex(v3.x, v2.y, -20);
  endShape(CLOSE);

  //front
  beginShape();
  vertex(v3.x, v2.y);
  vertex(v3.x, v2.y, -20);
  vertex(v3.x, v3.y, -20);
  endShape(CLOSE);

  //top
  beginShape();
  vertex(v1.x, v1.y)
  vertex(v1.x, v1.y, -20)
  vertex(v2.x, v1.y)
  vertex(v2.x, v1.y, -20);
  endShape(CLOSE);

  //L-middle
  beginShape();
  vertex(v2.x, v2.y);
  vertex(v2.x, v2.y,-20);
  vertex(v2.x, v1.y)
  vertex(v2.x, v1.y, -20)
  endShape(CLOSE);


 pop();

}
