// Source and reference: https://p5js.org/reference/#/p5/applyMatrix

// In this example, you find the rotation matrix displayed in 
// homogeneous coordinates and specifying a rotation around the 
// y-axis. Now please execute the following steps:
// 1) Re-position the two box objects such that they are side by side
//    with a short distance in between them.

function setup() {
    createCanvas(400, 400, WEBGL);
    noFill();
  }
  
  function draw() {

    let step = frameCount % 20;

    background(200);
    rotateY(PI / 6);
    stroke(153);
   
   //small black box
    push();
    applyMatrix(1, 0, 0, 1, 80, 0);
    box(35);
    pop();
    

   //big rotating box
    let rad = millis() / 1000;
    // Set rotation angles
    let ct = cos(rad);
    let st = sin(rad);
    // Matrix for rotation around the Y axis
    applyMatrix(  ct, 0.0,  st,  0.0,
                 0.0, 1.0, 0.0,  0.0,
                 -st, 0.0,  ct,  0.0,
                 0.0, 0.0, 0.0,  1.0);
    stroke(255);
    box(50);
  }
  