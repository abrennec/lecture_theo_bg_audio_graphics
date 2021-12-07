void setup()
{
  size(1800, 1600);
  background(0);
}

  void draw() {  
    
  push();
  fill(255, 0 ,0);
  stroke(0, 0, 0);
  strokeWeight(random (10, 120));    
  translate(random (10, 100),random (10, 50));
  rect(random(110, 160), random(110, 460), random(110, 560), random(150, 560));
  pop();

  push();
  fill(0, 255 ,0);
  stroke(0, 0, 0);
  strokeWeight(random (10, 120));
  translate(random (10, 100),random (10, 50));
  rect(random(0, 760), random(0, 1160), random(0, 1600), random(0, 1600));
  pop();
 
  push();
  fill(0, 0, 255);
  stroke(0, 0, 0);
  strokeWeight(random (10, 120));
  translate(random (10, 100),random (10, 50));
  rect(random(210, 1460), random(0, 1460), random(1, 1560), random(1150, 1560));
  pop();
 
  push();
  fill(250, 205, 205);
  stroke(0, 0, 0);
  strokeWeight(random (10, 120));
  translate(random (10, 100),random (10, 50));
  rect(random(0,600),random(0, 600),random(0, 600),random(0,600));
  pop();

  push();
  fill(250, 205, 205);
  stroke(0, 0, 0);
  strokeWeight(random (10, 50));
  translate(random (10, 100),random (10, 50));
  rect(random(0,600),random(0, 600),random(0, 600),random(0,600));
  pop();
 
  push();
  fill(250, 205, 205);
  stroke(0, 0, 0);
  strokeWeight(random (10, 50));
  translate(random (10, 100),random (10, 50));
  rect(random(330,600),random(200, 600),random(200, 600),random(200,600));
  pop();
 
}
