PShader simpleShader;



void setup() {
   size(500, 500, P3D);  
   noStroke();
   simpleShader = loadShader("basicfrag.frag", "basicvert.vert");
}

void draw() {
  shader(simpleShader);
  fill(200, 100, 0);
  rect(0, 0, 100, 100);
}
