void setup() 
{
  size(640, 360);
  noStroke();
  frameRate(30);
  
}

void draw() 
{
  background(102);
  translate(width/2, height/2);
  scale(1, -1);
  
  // coordinate system
  fill(0, 127, 0);
  rect(0, 0, 100, 10); // x-axis, green
  fill(127, 0, 0);
  rect(0, 0, 10, 100); // y-axis, red

  
  // original box
  fill(127, 127, 127, 127);
  rect(0, 0, 200, 100);
   
  // rotated box
  push();
  rotateAt(10, 10, map(mouseX, 0, width,  0, 2*PI));  
  fill(255, 255, 255, 100);
  rect(0, 0, 200, 100);
  pop();
}


void rotateAt(int x, int y, float angle) {
  // PMatrix2D(
  //   float m00, float m01, float m02, 
  //   float m10, float m11, float m12
  //) 

  PMatrix2D coordinateSystem = new PMatrix2D();

  PMatrix2D t1 = new PMatrix2D(
    1, 0, x,
    0, 1, y
  );
  PMatrix2D r = new PMatrix2D(
    cos(angle), -sin(angle), 0,
    sin(angle),  cos(angle), 0
  );
  PMatrix2D t2 = new PMatrix2D(
    1, 0, -x,
    0, 1, -y
  );
  
  
  // rotates around a given point

  //translate(x, y);
  //applyMatrix(t1);
    
  //rotate(angle);
  //applyMatrix(r);
  
  // translate(-x, -y);
  //applyMatrix(t2);

  //b.preApply(a)
 
 
   //mult(mult(t2, r), t1);
   
   coordinateSystem.preApply(t2);
   coordinateSystem.preApply(r);
   coordinateSystem.preApply(t1);
   applyMatrix(coordinateSystem);
   //(r.preApply(t1)).preApply(t2);
 }
