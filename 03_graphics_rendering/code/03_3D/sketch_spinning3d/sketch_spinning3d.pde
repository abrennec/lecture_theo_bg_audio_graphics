/* Spinning 3D Stuff
 Ira Greenberg, October 9, 2006 */
 
float px, py, angle;
void setup() {
  size(400, 400, P3D);
  noFill();
  stroke(255);
}
void draw() {
  background(0);
  translate(width/2, height/2);
  pushMatrix();
  rotateY(frameCount*PI/150);
  rotateX(frameCount*PI/150);
  box(100, 100, 100);
  pushMatrix();
  rotateY(-frameCount*PI/10);
  rotateX(PI/4);
  box(45, 15, 65);
  popMatrix();
  popMatrix();
  pushMatrix();
  rotateY(-frameCount*PI/60);
  rotateX(-frameCount*PI/70);
  for (int i=0; i<12; i++) {
    px = cos(radians(angle))*150;
    py = sin(radians(angle))*150;
    pushMatrix();
    translate(px, py);
    sphereDetail(i);
    sphere(20);
    popMatrix();
    angle+=360/12;
  }
  popMatrix();
}
