function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(220);

  let v0 = createVector(100, 40, 0);
  let v1 = createVector(0, 20, 70);
  let vCross = v0.cross(v1).normalize().mult(30);

  strokeWeight(2);
  rotateX(frameCount * 0.005);
  rotateZ(frameCount * 0.005);

  stroke('black');
  beginShape(TRIANGLES);
  vertex(0, 0, 0);
  vertex(v0.x, v0.y, v0.z);
  vertex(v1.x, v1.y, v1.z);
  endShape(CLOSE);

  stroke('red');
  beginShape(LINES);
  vertex(0, 0, 0);
  vertex(vCross.x, vCross.y, vCross.z);
  endShape(CLOSE);
}