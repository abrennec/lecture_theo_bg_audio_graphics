PShader simpleShader;

void setup() {
   size(500, 500, P3D);  
   simpleShader = loadShader("basic.frag", "basic.vert");
}

void draw() {
  background(0);
  
  fill(200, 100, 0);
  shader(simpleShader);
  
  
  translate(width/2, height/2, 0);
  beginShape();
    vertex(-50, -85, -100);
    vertex(50, -85, -100 );
    vertex(100, 0, -100);
    vertex(50, 85, -100);
    vertex(-50, 85,-100);
    vertex(-100, 0, -100);
  endShape(CLOSE);

}
