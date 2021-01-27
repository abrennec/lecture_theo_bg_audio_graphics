//sketch03 

function setup() {
    createCanvas(600, 600, WEBGL);
    noFill();
  }
  
  function draw() {
    background(200);
    rotateY(PI / 6);
    stroke(150);

    //box 
    push();
    translate(80, 0)
    box(100);
    pop();

    //rotate box
    push();
    translate(-80,0)
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
    box(120);
    pop();
  }