function setup() {
    createCanvas(400, 400, WEBGL);
    background(240, 240, 240);
  }
  
  function draw(){
    background(240, 240, 240);
    rotateY(millis() / 1500);
    rotateX(millis() / 2250);
    rotateZ(millis() / 750);
    createShape();
  }
  
  function createShape(){
    stroke(237, 34, 93);
    strokeWeight(1);
    beginShape(TRIANGLES);
    // F R O N T
    // BOTTOM
    vertex(-10, 10, 10);
    vertex(0, 35, 10);
    vertex(10, 10, 10);
    // RIGHT
    vertex(10, 10, 10);
    vertex(35, 0, 10);
    vertex(10, -10, 10);
    // TOP
    vertex(10, -10, 10);
    vertex(0, -35, 10);
    vertex(-10, -10, 10);
    // LEFT
    vertex(-10, -10, 10);
    vertex(-35, 0, 10);
    vertex(-10, 10, 10);
     // CENTER LEFT
    vertex(-10, -10, 10);
    vertex(-10, 10, 10);
    vertex(10, 10, 10);
    // CENTER RIGHT
    vertex(-10, -10, 10);
    vertex(10, -10, 10);
    vertex(10, 10, 10);
    
    // L E F T
    // TOP BOTTOM LEFT
    vertex(0, -35, -10);
    vertex(-10, -10, 10);
    vertex(-10, -10, -10);
    // TOP TOP RIGHT
    vertex(0, -35, -10);
    vertex(0, -35, 10);
    vertex(-10, -10, 10);
    // MID TOP TOP RIGHT
    vertex(-10, -10, 10);
    vertex(-10, -10, -10);
    vertex(-35, 0, 10);
    // MID TOP BOTTOM LEFT
    vertex(-10, -10, -10);
    vertex(-35, 0, 10);
    vertex(-35, 0, -10);
    // MID BOTTOM TOP RIGHT
    vertex(-10, 10, 10);
    vertex(-10, 10, -10);
    vertex(-35, 0, 10);
    // MID BOTTOM BOTTOM LEFT
    vertex(-10, 10, -10);
    vertex(-35, 0, 10);
    vertex(-35, 0, -10);
    // BOTTOM BOTTOM LEFT
    vertex(0, 35, -10);
    vertex(-10, 10, 10);
    vertex(-10, 10, -10);
    // BOTTOM TOP RIGHT
    vertex(0, 35, -10);
    vertex(0, 35, 10);
    vertex(-10, 10, 10);
    
    // R I G H T
    // TOP BOTTOM LEFT
    vertex(0, -35, -10);
    vertex(10, -10, 10);
    vertex(10, -10, -10);
    // TOP TOP RIGHT
    vertex(0, -35, -10);
    vertex(0, -35, 10);
    vertex(10, -10, 10);
    // MID TOP TOP RIGHT
    vertex(10, -10, 10);
    vertex(10, -10, -10);
    vertex(35, 0, 10);
    // MID TOP BOTTOM LEFT
    vertex(10, -10, -10);
    vertex(35, 0, 10);
    vertex(35, 0, -10);
    // MID BOTTOM TOP RIGHT
    vertex(10, 10, 10);
    vertex(10, 10, -10);
    vertex(35, 0, 10);
    // MID BOTTOM BOTTOM LEFT
    vertex(10, 10, -10);
    vertex(35, 0, 10);
    vertex(35, 0, -10);
    // BOTTOM BOTTOM LEFT
    vertex(0, 35, -10);
    vertex(10, 10, 10);
    vertex(10, 10, -10);
    // BOTTOM TOP RIGHT
    vertex(0, 35, -10);
    vertex(0, 35, 10);
    vertex(10, 10, 10);
    
    
    // B A C K
    // BOTTOM
    vertex(-10, 10, -10);
    vertex(0, 35, -10);
    vertex(10, 10, -10);
    // RIGHT
    vertex(10, 10, -10);
    vertex(35, 0, -10);
    vertex(10, -10, -10);
    // TOP
    vertex(10, -10, -10);
    vertex(0, -35, -10);
    vertex(-10, -10, -10);
    // LEFT
    vertex(-10, -10, -10);
    vertex(-35, 0, -10);
    vertex(-10, 10, -10);
     // CENTER LEFT
    vertex(-10, -10, -10);
    vertex(-10, 10, -10);
    vertex(10, 10, -10);
    // CENTER RIGHT
    vertex(-10, -10, -10);
    vertex(10, -10, -10);
    vertex(10, 10, -10);
    
    endShape()
  }