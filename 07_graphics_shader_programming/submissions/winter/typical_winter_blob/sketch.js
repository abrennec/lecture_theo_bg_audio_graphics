// <reference path="../../node_modules/@types/p5/global.d.ts" />
//this variable will hold our shader object

let myShader;

function preload() {
  
  myShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  
  shader(myShader);

  // Send the frameCount to the shader
  myShader.setUniform("uFrameCount", frameCount);

  // Rotate our geometry on the X and Y axes
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.005);

  // Draw some geometry to the screen
  // We're going to tessellate the sphere a bit so we have some more geometry to work with
  sphere(width / 10, 200, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
