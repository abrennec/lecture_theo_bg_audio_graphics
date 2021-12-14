float SPACING = width;
float PROBABILITY = 0.8;

int randW = round(random(width));
int randH = round(random(height));



void setup() {
  size(500, 500);
  background(255);
  
  noLoop();

}


void draw() {

  // Make rects and lines
  for (int x = 0; x < width; x += SPACING) {
    for (int y = 0; y < height; y += SPACING) {
        fill(random(255), random(255), random(255));
        rect(x, y, round(random(SPACING)), round(random(SPACING)));
        
        if (random(1) < PROBABILITY){
        strokeWeight(3);
        line(x, y, x + randW + SPACING, y);
        } else {
        line(x, y, x, y + randH + SPACING);
        
        }
       
    }
  }
  
  print(frameCount);
  
  
}