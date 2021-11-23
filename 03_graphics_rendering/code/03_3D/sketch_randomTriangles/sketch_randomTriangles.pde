//Random Triangles
size (500, 500);
background(255);
smooth();
beginShape(TRIANGLES);
for (int i=0; i<90; i++) {
  stroke(random(0, 200));
  fill(random(225, 255), 150);
  strokeWeight(random(.5, 5));
  vertex(random(width), random(height));
}
endShape();
