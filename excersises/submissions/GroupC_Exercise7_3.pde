Mover mover;
Mover ball;

void setup() {
  size(640,360);
  mover = new Mover(); 
  ball = new Mover();
}

void draw() {
  background(0);
  // Update the location
  mover.update();
  mover.display(); 
  mover.checkIntersection();
  ball.update();
  ball.display();
  ball.mouseMove();
  ball.checkIntersection();

}
class Mover {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float maxspeed;
  float radius;
  color col;

  Mover() {
    // Start in the center
    location = new PVector(width/2,height/2);
    velocity = PVector.random2D();
   // gravity = new PVector(0,0.2);
    maxspeed = 5;
    radius = 30;
    col = color(204, 153, 0);
  }

  void update() {
    velocity.limit(maxspeed);
    // Location changes by velocity
    location.add(velocity);
     // Bounce off edges
  if ((location.x > width) || (location.x < 0)) {
    velocity.x = velocity.x * -1;
  }
   if ((location.y > height) || (location.y < 0)) {
    velocity.y = velocity.y * -1;
  }
  }
  void display() {
    stroke(255);
    strokeWeight(2);
    fill(col);
    ellipse(location.x,location.y,radius*2, radius*2);
  }
  void mouseMove() {
      // Compute a vector that points from location to mouse
    PVector mouse = new PVector(mouseX,mouseY);
    PVector acceleration = PVector.sub(mouse,location);
    // Set magnitude of acceleration
    acceleration.setMag(0.2);
    // Velocity changes according to acceleration
    velocity.add(acceleration);
  }
  void checkIntersection() {
    // Get distances between the balls components
    PVector distanceVect = PVector.sub(ball.location, mover.location);
    // Calculate magnitude of the vector separating the balls
    float distanceVectMag = distanceVect.mag();
    // Minimum distance before they are touching
    float minDistance = ball.radius + mover.radius;
      if (distanceVectMag < minDistance) {
     changeColor();
  }
  }
  void changeColor() {
   col = color(random(255), random(255), random(255));
  }
}
