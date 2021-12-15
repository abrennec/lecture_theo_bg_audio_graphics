// Original source code by Ira Greenberg 
// Adapted for TBAG, Filmuni Babelsberg, abrennec


PVector ellipseDirection = new PVector(1, 1.5);
PVector ellipseLocation = new PVector();


void setup() {

  size(400, 400, P2D);

  ellipseLocation.set(width/2, height/2);
    
  noStroke();
  smooth();
}


void draw() {

  background(0);

  drawCoordinates();

  pushMatrix();
  translate(width/2, height/2);
  noFill();
  rect(-10, -10, 20, 20);
  popMatrix();
   
  pushMatrix();
  fill(0,255,0);
  drawEllipse();
  popMatrix();
  
}


void drawCoordinates() {

  stroke(125);
  line(width/2, 0, width/2, height); // y-axis
  line(0, height/2, width, height/2); // x-axis
}


void drawEllipse() {

  int radius = 20; 
  
  // "move" the ellipse by adding the speed vector to the position vector
  ellipseLocation.add(ellipseDirection);

  // define the ellipses current position and size
  ellipse(ellipseLocation.x, ellipseLocation.y, radius*2, radius*2);

  // check wall collisions
  if (ellipseLocation.x > width-radius) {

    ellipseLocation.x = width-radius;
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } 
  else if (ellipseLocation.x < radius) {

    ellipseLocation.x = radius;
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } 
  else if (ellipseLocation.y > height - radius) {

    ellipseLocation.y = height - radius;
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  } 
  else if (ellipseLocation.y < radius) {

    ellipseLocation.y = radius;
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  }
}
