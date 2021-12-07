//credit start point: https://processing.org/reference/PShape_getVertex_.html
//https://stackoverflow.com/questions/23960125/oscillating-values

float theta = 0.0;
int shapeSize = 200;

PShape s;

void setup() {
  size(600, 600);
  background(243,229,206);


  s = createShape();
  s.beginShape();
  s.vertex(0, 0);
  s.vertex(random(shapeSize), random(shapeSize));
  s.vertex(random(shapeSize), random(shapeSize));
  s.vertex(random(shapeSize), random(shapeSize));
  s.endShape(CLOSE);
}

void draw() {
  translate(width/2, height/2);
  rotate(sin(frameCount));
  float x = (sin(theta) + 1);
  theta += sin(frameCount);
  
 
  for (int i = 0; i < s.getVertexCount(); i++) {
    PVector v = s.getVertex(i);
    v.x += sin(frameCount) + random(-2,2);
    v.y += sin(frameCount) + random(-2,2);
    s.setVertex(i, v);
  }
  shape(s);
}