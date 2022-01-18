/* The examples presented here have been adapted from other sources, in particular:

- https://itp-xstory.github.io/p5js-shaders/#/
- https://github.com/aferriss/p5jsShaderExamples

 .. as well as the additional material linked in the script / readme.md of this session.*/

let myShader;

let deer;

function preload() {
  
  myShader = loadShader("shader.vert", "shader.frag");
  
  deer = loadModel("deer.obj");
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
  sphere(height/4, 200, 200);
  
  /*
  push();
  rotateX(PI);
  translate(30,-200,0);
  scale(0.3);
  model(deer);
  pop();
  */
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
