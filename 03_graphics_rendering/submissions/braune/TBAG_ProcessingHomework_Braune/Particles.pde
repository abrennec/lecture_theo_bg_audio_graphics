// Particle Code by Daniel Shiffman
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_027_FireWorks/Processing
// moidified colors
class Particle {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float lifespan;

  boolean seed = false;

  PVector hu;

  Particle(float x, float y, PVector h) {
    hu = h;

    acceleration = new PVector(0, 0);
    velocity = new PVector(0, random(-12, -5));
    location =  new PVector(x, y);
    seed = true;
    lifespan = 255.0;
  }

  Particle(PVector l, PVector h) {
    hu = h;
    acceleration = new PVector(0, 0);
    velocity = PVector.random2D();
    velocity.mult(random(4, 8));
    location = l.copy();
    lifespan = 255.0;
  }

  void applyForce(PVector force) {
    acceleration.add(force);
  }

  void run() {
    update();
    display();
  }

  boolean explode() {
    if (seed && velocity.y > 0) {
      lifespan = 0;
      return true;
    }
    return false;
  }

  // Method to update location
  void update() {

    velocity.add(acceleration);
    location.add(velocity);
    if (!seed) {
      lifespan -= 5.0;
      velocity.mult(0.95);
    }
    acceleration.mult(0);
  }

  // Method to display
  void display() {
    stroke(hu.x, hu.y, hu.z, lifespan);
    if (seed) {
      strokeWeight(4);
    } else {
      strokeWeight(2);
    }
    point(location.x, location.y);
    //ellipse(location.x, location.y, 12, 12);
  }

  // Is the particle still useful?
  boolean isDead() {
    if (lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
