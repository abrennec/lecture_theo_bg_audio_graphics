// <reference path="../../node_modules/@types/p5/global.d.ts" />
//this variable will hold our shader object

let shader1, shader2;
let cureentShader1, cureentShader2;
let sphereDet = 2;
let sphereDet2 = 500;
let sphereDet3 = 2;
let sphereDet4 = 500;
let secondShader = true;

function preload() {
  
  shader1 = loadShader("shader1.vert", "shader.frag");
  shader2 = loadShader("shader2.vert", "shader.frag");
  shader3 = loadShader("shader3.vert", "shader.frag");
  shader4 = loadShader("shader4.vert", "shader.frag");
  
}

function setup() {
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  currentShader1 =shader1;
  currentShader2 =shader2;
}

function draw() {
  background(0);
  
  shader(currentShader1);

  // Send the frameCount to the shader
  currentShader1.setUniform("uFrameCount", frameCount);

  // Rotate our geometry on the X and Y axes
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.005);

  // Draw some geometry to the screen
  // We're going to tessellate the sphere a bit so we have some more geometry to work with
  //sphere(width / 5, 200, 200);
  sphere(200,sphereDet2,sphereDet);
  if(secondShader){
  shader(currentShader2);
  currentShader2.setUniform("uFrameCount", frameCount);
  sphere(200,sphereDet4,sphereDet3);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if (key == '3'){
    secondShader = false;
    currentShader1 = shader1;
    currentShader2 = shader2;
    sphereDet = 200;
    sphereDet2 = 200;
  } else  if (key == '2'){
    secondShader = true;
    currentShader1 = shader3;
    currentShader2 = shader3;
    sphereDet = 200;
    sphereDet2 = 500;
  }else  if (key == '1'){
    secondShader = false;
    currentShader1 = shader1;
    currentShader2 = shader2;
    sphereDet = 2;
    sphereDet2 = 500;
  }else  if (key == '4'){
    secondShader = false;
    currentShader1 = shader3;
    currentShader2 = shader3;
    sphereDet = 100   ;
    sphereDet2 = 500;
  }
}