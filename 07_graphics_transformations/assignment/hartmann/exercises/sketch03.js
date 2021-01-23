// Source and reference: https://p5js.org/reference/#/p5/applyMatrix

// In this example, you find the rotation matrix displayed in 
// homogeneous coordinates and specifying a rotation around the 
// y-axis. Now please execute the following steps:
// 1) Re-position the two box objects such that they are side by side
//    with a short distance in between them.

function setup() {
    createCanvas(200, 200, WEBGL);
    noFill();
  }
  
  function draw() {
    background(200);
    rotateY(PI / 6);
    stroke(153);
    push();
    translate(40,0,0);
    box(35);
    pop();

    push();
    translate(-40,0,0);
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
    pop();
  }
  