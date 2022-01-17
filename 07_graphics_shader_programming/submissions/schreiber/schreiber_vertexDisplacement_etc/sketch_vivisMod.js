// <reference path="../../node_modules/@types/p5/global.d.ts" />

//with copied and adapted code from Tim Rumpf!

//this variable will hold our shader object
let myShader;
let my3Dmodel;

let timer;

function preload() {
  
  myShader = loadShader("shader2.vert", "shader.frag");

  //testing importing a model (I have seen it in Tim Rumpf's submission & want to do it as well)
  my3Dmodel = loadModel('./Malefizz.obj');
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



  if (mouseIsPressed == true)
  {
    myShader.setUniform("uAmplitudeX", 1.0);
    //myShader.setUniform("uAmplitudeY", 1.0);
    myShader.setUniform("uAmplitudeY", 0.5);
  }
  if (mouseIsPressed == false)
  {
    myShader.setUniform("uAmplitudeX", 0.1);
    myShader.setUniform("uAmplitudeY", 0.05);
    //frameCount = 0;
  }

  //geometry was flipped, so I had to add PI (rotate takes radians!):
  rotateZ(PI);
  
  // Rotate our geometry continoously:
  //rotateY(((Math.ceil(frameCount / 180) % 2) - 1) * (frameCount % PI) * 0.05);
  //rotateY(sin(frameCount * 0.05));
  // ^^^doesn't work veryx well with added mapping

  // Draw some geometry to the screen
  // We're going to tessellate the sphere a bit so we have some more geometry to work with
  //sphere(width / 5, 200, 200);

  //have to heavily scale the model, as maya works in cm, not m
  scale(150);
  
  console.log("KeyCode pressed: " + key)
  
  keyPressed();
  keyReleased();
  
  //rotateX(map(mouseY, 0, height, -PI, PI));
  //rotateY(map(mouseX, 0, width, PI, -PI));
  //rotateZ(PI);
  
  //HOW DOES THIS JUST WORK?? crazy!
  model(my3Dmodel);
  
}

function keyPressed() {
  //y = Yes! headshake:
  if (key == 'y')
  {
    //rotateZ(PI);
    rotateX(sin(frameCount * 0.05) * 0.75 );
  }
  //n = No! headshake:
  if (key == 'n')
  {
    rotateZ(PI);
    rotateY(sin(frameCount * 0.05));;
  }

  //control the geometry with your mouse:
  if (key == 'c')
  {
    //rotateZ(PI);
    rotateX(map(mouseY, 0, height, -PI, PI));
    rotateY(map(mouseX, 0, width, PI, -PI));
  }
  else
  {
    rotateZ(PI);
  }
}

function keyReleased() {
  
  if (key )
  {
    //rotateX(lerp(my3Dmodel.x, 0, 0.1));
    
    rotateZ(PI);
    rotateX(0);
    rotateY(0);
  }

  if (key == 'n')
  {
    rotateZ(PI);
    rotateX(0);
    rotateY(0);
  }

  if (key == 'c')
  {
    rotateZ(PI);
    rotateX(0);
    rotateY(0);
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
