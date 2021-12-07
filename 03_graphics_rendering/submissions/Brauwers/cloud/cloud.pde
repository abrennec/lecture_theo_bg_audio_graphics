ArrayList<Circle> circles;
ArrayList<PVector> spots;
int stars = 97000;
PGraphics bg;
PImage shape;
void setup() {
  size(600, 900, P3D);
  background(0);
  spots = new ArrayList<PVector>();
  bg = createGraphics(width, height);
  circles = new ArrayList<Circle>();
  shape= loadImage("Shapes_1.png");
  shape.loadPixels();
  for(int x = 0; x < shape.width; x++){
    for(int y = 0; y < shape.height; y++){
      int index = x+y*shape.width;
      color c = shape.pixels[index];
      float b = brightness(c);
      if (b<1){
        spots.add(new PVector(x,y));
      }
  }
  }

  backgroundImg();
}

void draw() {
  background(bg);
  //image(shape,0,0);
  image(bg, 0, 0);



  int total = 1;
  int count = 0;
  int attempts = 0;

while(count < total){
  Circle newC = newCircle();
  if (newC != null) {
    circles.add(newC);
    count++;
  }
  attempts++;
  if(attempts > 1000){
    noLoop();
    println("Finished");
    break;
  }
}

  for (Circle c : circles) {
    if (c.growing) {
      if (c.edges()) {
        c.growing = false;
      } else {

        for (Circle other : circles) {
          if (c != other) {
            float d = dist(c.x, c.y, other.x, other.y);
            if (d-3 < c.r + other.r) {
              c.growing = false;
              break;
            }
          }
        }
      }
    }
    c.show();
    c.grow();
  }
}

void backgroundImg() {
  bg.beginDraw();
  bg.stroke(255, 100);
  bg.strokeWeight(0.5);
  for (int i = 0; i < stars; i++) {
    bg.point(random(0, width), random(0, height));
  }
  bg.endDraw();
}

Circle newCircle() {
  int r = int(random(0,spots.size()));
  PVector spot = spots.get(r);
  float x = spot.x;
  float y = spot.y;
  boolean valid = true;
  for (Circle c : circles) {
    float d = dist(x, y, c.x, c.y);
    if (d < c.r+3) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
