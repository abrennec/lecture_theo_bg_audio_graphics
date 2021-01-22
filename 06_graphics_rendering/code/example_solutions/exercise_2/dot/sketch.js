// code ported from https://github.com/nature-of-code/noc-examples-processing/blob/master/chp06_agents/SimpleScalarProjection/SimpleScalarProjection.pde

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  
  let a = createVector(20, 300);
  let b = createVector(500, 250);
  let mouse = createVector(mouseX, mouseY);
  
  stroke(0);
  strokeWeight(2);
  line(a.x, a.y, b.x, b.y);
  line(a.x, a.y, mouse.x, mouse.y);
  fill(0);
  ellipse(a.x, a.y, 8, 8);
  ellipse(b.x, b.y, 8, 8);
  ellipse(mouse.x, mouse.y, 8, 8);
  
  let norm = scalarProjection(mouse, a, b);
  strokeWeight(1);
  stroke(50);
  line(mouse.x, mouse.y, norm.x, norm.y);

  noStroke();
  fill(255, 0, 0);
  ellipse(norm.x, norm.y, 16, 16);
}


function scalarProjection(p, a, b) {
  let ap = p5.Vector.sub(p, a);
  let ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}