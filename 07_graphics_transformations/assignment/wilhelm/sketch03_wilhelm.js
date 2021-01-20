// Source and reference: https://p5js.org/reference/#/p5/applyMatrix

// In this example, you find the rotation matrix displayed in 
// homogeneous coordinates and specifying a rotation around the 
// y-axis. Now please execute the following steps:
// 1) Re-position the two box objects such that they are side by side
//    with a short distance in between them.

  

const sketch3 = (p) => {

  let vectors;

  p.setup = function() {
    p.createCanvas(100, 100, WEBGL);
    p.noFill();
  
    vectors  = [
      p.createVector(30, 20),
      p.createVector(85, 20),
      p.createVector(85, 75),
      p.createVector(30, 75)
    ];
  }
  
  p.draw = function() {
    p.background(200);
    p.rotateY(PI / 6);
    p.stroke(153);
    p.box(35);
    let rad = millis() / 1000;
    // Set rotation angles
    let ct = cos(rad);
    let st = sin(rad);
    // Matrix for rotation around the Y axis
    p.applyMatrix(ct, 0.0,  st,  0.0,
                  0.0, 1.0, 0.0,  0.0,
                  -st, 0.0,  ct,  0.0,
                  0.0, 0.0, 0.0,  1.0);
    p.stroke(255);
    box(50);
  }
}

const s3 = new p5(sketch2, "s3");