
// Based on Sketch from Ira Greenberg’s book, p. 97:
// Ira Greenberg (2007): Processing: Creative Coding & Computational Art. 
// Friends of ED/Apress Press. Berkley, CA.
//


void setup( ) {
  
  size(600, 600);
  background(255);
  
  println(frameRate);
  frameRate(5);
}

void draw() {
  
  for (int i=0; i<100; i++) {
    drawRectangle( random(width), random(height), random(200), random(200) );
  }
  
  fill(51, 100);
  rect(0, 0, width, height);
  
  //background(51, 100);
}

void drawRectangle(float x, float y, float w, float h ) {
  
  rect(x, y, w, h);
}
