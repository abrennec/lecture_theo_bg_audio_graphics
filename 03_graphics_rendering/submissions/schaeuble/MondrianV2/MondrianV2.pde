float SPACING = width;
PShape square;

int randW = round(random(width));
int randH = round(random(height));



void setup() {
  size(500, 500);
  background(255);
  square = createShape(RECT, 0, 0, 0, 0);
  // noLoop();

}


void draw() {

  for (int x = 0; x < width; x += SPACING) {
    for (int y = 0; y < height; y += SPACING) {
      push();

        translate(width / 2, height / 2);
        rotate(radians(SPACING += 2));
        fill(random(255), random(255), random(255));
        rect(x, y, round(random(SPACING)), round(random(SPACING)));


      pop();
    }
  }
}