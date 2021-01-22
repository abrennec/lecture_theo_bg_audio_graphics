// Source and reference: https://p5js.org/reference/#/p5/applyMatrix

// In this example, you find the rotation matrix displayed in 
// homogeneous coordinates and specifying a rotation around the 
// y-axis. Now please execute the following steps:
// 1) Re-position the two box objects such that they are side by side
//    with a short distance in between them.

  

const sketch3 = (p) => {

  let vectors;

  p.setup = function() {
    p.createCanvas(100, 100, p.WEBGL);
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
    
    let rad = p.millis() / 1000;
    // Set rotation angles
    let ct = p.cos(rad);
    let st = p.sin(rad);
    p.stroke(205, 130, 150);
    p.box(35);
    // Matrix for rotation around the Y axis
    p.applyMatrix(ct, 0.0,  st,  0.005,
                  0.0, 1.0, 0.0, 0.005,
                  -st, 0.0,  ct, 0.005,
                  0.0, 0.0, 0.0, 1.0);
    p.stroke(255);
    p.box(50);
  }
}

const s3 = new p5(sketch3, "s3");