
// Extend sketch01 and use the rotate function. 
// Rotate both shapes in the opposite direction.

let vectors;

let angle = 0;
let angleopposite = 0;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
  
    vectors  = [
      createVector(30, 20),
      createVector(85, 20),
      createVector(85, 75),
      createVector(30, 75)
    ];
  }
  
  function draw() {
    background(220);
    
  
    push();
    translate (200, 200);
    rotate(angle);
    ellipse(0, 0, 50, 20);
    pop();

    angle = angle + 1;

    function square () {
    beginShape();
    vectors.forEach(v => {
      vertex(v.x, v.y);
    }); 
    endShape(CLOSE);

}

    push();
    translate (200, 200);
    rotate(angleopposite);
    square();
    pop();

    angleopposite = angleopposite - 1;
  
  }