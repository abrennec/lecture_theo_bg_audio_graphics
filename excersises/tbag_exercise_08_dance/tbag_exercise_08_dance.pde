
float t;                // time
color myColor1 = color(120, 12, 124);
color myColor2 = color(255, 20, 224);

void setup() { 
  size(640, 480, P3D);
  noStroke();  
} 
 

void draw() {
  
  lights();
  
  background(210);
  translate(width/2, height/2); 
  
  rotateX(0.75*PI);
  rotateY(0.75*PI);
  drawCoord(); // x-red, y-green, z-blue
  
  push();
  rotateY(t);
  rotateX(t/2);
  translate(sin(t) * 100, sin(t) * 50, cos(t) * 200);
  fill(myColor1);
  box(20);
  pop();
  
  push();
  rotateY(t);
  rotateX(t/2);
  translate(sin(t) * 50, -cos(t*2) * 150, cos(t) * 50);
  fill(myColor2);
  sphere(10);
  pop();
  
  t = (t + 0.01) % (4*PI);
} 

void drawCoord() {
  push();
  translate(100, 0, 0);
  fill(255, 0, 0);
  box(200, 1, 1);
  pop();
  
  push();
  translate(0, 100, 0);
  fill(0, 255, 0);
  box(1, 200, 1);
  pop();

  push();
  translate(0, 0, 100);
  fill(0, 0, 255);
  box(1, 1, 200);
  pop();
}
