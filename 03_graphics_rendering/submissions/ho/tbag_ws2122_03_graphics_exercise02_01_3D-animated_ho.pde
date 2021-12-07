//credit start point: https://processing.org/reference/PShape_getVertex_.html
//https://stackoverflow.com/questions/23960125/oscillating-values

float theta = 0.0;
int shapeSize = 200;
int randFactor = 2;

PShape s;

void setup() {
 size(600, 600, P3D);
 background(243,229,206);


 s = createShape();
 s.beginShape();
 s.vertex(0, 0);
 s.vertex(random(shapeSize), random(shapeSize), random(shapeSize));
 s.vertex(random(shapeSize), random(shapeSize), random(shapeSize));
 s.vertex(random(shapeSize), random(shapeSize), random(shapeSize));
 s.endShape(CLOSE);
}

void draw() {
 translate(width/2, height/2);
 rotate(random(2*PI));
 float x = (sin(theta) + 1);
 theta += sin(frameCount);
  
 for (int i = 0; i < s.getVertexCount(); i++) {
   PVector v = s.getVertex(i);
   v.x += sin(frameCount) + random(-randFactor, randFactor);
   v.y += sin(frameCount) + random(-randFactor, randFactor);
   v.z += sin(frameCount) + random(-randFactor*1.1, randFactor);
   s.setVertex(i, v);
 }
 shape(s);
}
