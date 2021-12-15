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

  // Hint: Use printMatrix to  check what is actually happening.
  // Also checkout "printProjection" and "printCamera"
  //printMatrix();
  
  // Task 1: Checkout the code and understand how the 
  // ellipse is moved around using the two vector variables.
  // Comment!
  
  // Task 2: Re-write the code such that the transformation
  // of the coordinate system is not implicit part of the
  // primitves drawn in the drawCoordinates function but 
  // explicitly called using pushMatrix and popMatrix() 
  // as well as translate()
  drawCoordinates();

  // Task 3: Exchange the rect with a 3D box object, what needs
  // to be changed?
  
  // Task 4: Re-write the box/cube object explicitly with
  // vertices using PShape! 
  
  pushMatrix();
  translate(width/2, height/2);
  noFill();
  rect(-10, -10, 20, 20);
  popMatrix();
   
  
  // Task 5: Now that you have drawn the cube at the center
  // of the screen, turn the ellipse into a sphere and animate
  // it using the vector concept - how would that work?
  
  // Task 6: Make use of the stroke()/noStroke() functionality to
  // change the object representation
  pushMatrix();
  fill(0,255,0);
  drawEllipse();
  popMatrix();
  
  
  // Advanced 
  
  // Task 7: Add a light to the scene. Checkout the following functions
  // lights, ambientLight, directionalLight, and pointLight
  
  // Task 8: Add a camera(..) object to the scene and play with the 
  // function parameters; use mouseX and mouseY to change 
  // the view interactively.
  
  // Task 9: Animate the camera object. How would you go about that?
  
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
