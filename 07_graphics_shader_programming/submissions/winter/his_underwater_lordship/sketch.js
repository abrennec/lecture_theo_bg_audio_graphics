// <reference path="../../node_modules/@types/p5/global.d.ts" />
//this variable will hold our shader object
let animationMax = 0.5; 
let animationMin = -0.5;
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

  smooth();
  
  shader(myShader);

  let scaleValue = sin(frameCount*0.004);

  let animationValue = sin(frameCount*0.005);

  let animationMax = cos(frameCount*0.001);
  let animationMin = cos(frameCount*0.0001);

  let brightnessAnimation = cos(frameCount*0.003);
  let saturationAnimation = sin(frameCount*0.005);

  let animationValueMapped = map(animationValue, -1, 1, map(animationMax, -1, 1, 0.1, 2), map(animationMin, -1, 1, -0.1, -2));

  // Send the frameCount to the shader
  myShader.setUniform("uScaleValue", map(scaleValue, -1, 1, -0.9, 0.7));
  myShader.setUniform("uFrameCount", animationValueMapped);
  myShader.setUniform("uMouseX", map(mouseX, 0, width, -4, 4));
  myShader.setUniform("uMouseY", map(mouseY, 0, height, 0, 3));
  myShader.setUniform("uBrightnessAnimation", map(brightnessAnimation, 0, 1, 0.8, 0.99));
  myShader.setUniform("uSaturationAnimation", map(saturationAnimation, 0, 1, 0.8, 0.99));

  // Rotate our geometry on the X and Y axes
  //rotateX(frameCount * 0.0005);
  //rotateY(frameCount * 0.00015);

  // Draw some geometry to the screen
  // We're going to tessellate the sphere a bit so we have some more geometry to work with
  sphere(width / 10, 200, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
