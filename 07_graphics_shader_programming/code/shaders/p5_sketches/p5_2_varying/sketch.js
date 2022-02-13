


//this variable will hold our shader object
let simpleShader;

function preload() {

  simpleShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {

  shader(simpleShader);
  background(0);

  push();
  rotate(frameCount * 0.01);
  ellipse(-200, -100, 200);
  pop();


  push();
  rotate(sin(frameCount * 0.01));
  rect(0, 0, width, height);
  pop();



  // orange
  push();
  // fill(200, 100, 0);
  beginShape();
  vertex(-50, -85, -100);
  vertex(50, -85, -100);
  vertex(100, 0, -100);
  vertex(50, 85, -100);
  vertex(-50, 85, -100);
  vertex(-100, 0, -100);
  endShape(CLOSE);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

