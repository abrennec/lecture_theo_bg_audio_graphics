function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
    
  let v1 = createVector(30, 75);
  let v2 = createVector(40, 20);
  let v3 = createVector(50, 75);
  let v4 = createVector(60, 20);
  let v5 = createVector(70, 75);
  let v6 = createVector(80, 20);
  let v7 = createVector(90, 75);

  noFill();
  beginShape(TRIANGLE_STRIP);
    
    vertex(v1.x, v1.y);
    vertex(v2.x, v2.y);
    vertex(v3.x, v3.y);
    vertex(v4.x, v4.y);
    vertex(v5.x, v5.y);
    vertex(v6.x, v6.y);
    vertex(v7.x, v7.y);
    endShape();
    
  }