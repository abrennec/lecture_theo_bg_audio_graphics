//Triangle Spin
PVector[]p = new PVector[3];
float shift = 2;
float fade = 0;
float fillCol = 0;
float spin = 0;
void setup() {
  size(400, 400);
  background(0);
  smooth();
  fade = 255.0/(width/2.0/shift);
  spin = 360.0/(width/2.0/shift);
  p[0] = new PVector(1, height-1);
  p[1] = new PVector(width-1, height-1);
  p[2] = new PVector(width/2, 1);
  noStroke();
  triBlur();
}
void triBlur() {
  fill(fillCol);
  fillCol+=fade;
  rotate(spin);
  triangle(p[0].x+=shift, p[0].y-=shift/2, p[1].x-=shift, 
    p[1].y-=shift/2, p[2].x, p[2].y+=shift);
  if (p[0].x<width/2) {
    // recursive call
    triBlur();
  }
}
