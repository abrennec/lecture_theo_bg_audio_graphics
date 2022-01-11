// Original source code by Ira Greenberg 
// Adapted for TBAG, Filmuni Babelsberg, abrennec


PVector ellipseDirection = new PVector(1, 1.5, 0);
PVector ellipseLocation = new PVector();


void setup() {

  size(600, 600, P3D);

  ellipseLocation.set(width/2, height/2, 0);
    
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
  // -- The elipse is moved around the space by adding the elipse's current 
  //    position each frame and the direction specified by the vector 
  //    'ellipseDirection' - if the starting position was (0,1) and given
  //    the ellipseDirection of (1, 1.5), the new position would be (1, 2.5).
  
  // Task 2: Re-write the code such that the transformation
  // of the coordinate system is not implicit part of the
  // primitves drawn in the drawCoordinates function but 
  // explicitly called using pushMatrix and popMatrix() 
  // as well as translate()
  drawCoordinates();

  // Task 3: Exchange the rect with a 3D box object, what needs
  // to be changed?
  // -- We need to change "P2D" to "P3D" in the size() in the setup() function 
  //    and change rect() to box() and just give a size parameter
  
  pushMatrix();
  translate(width/2, height/2);
  noFill();
  rotateY(0.5); //rotated for visibility
  rotateX(0.5);
  box(20);
  popMatrix();
  
  // Task 4: Re-write the box/cube object explicitly with
  // vertices using PShape! 
  pushMatrix();
  translate(width/2, height/2, 0);
  stroke(255);
  noFill();
  //rotateX(PI/2);
  //rotateZ(-PI/3);
  
  //Credit to : https://forum.processing.org/one/topic/i-really-need-some-help-please-cube-with-pictures.html
  
  beginShape(QUADS);
  // +Z "front" face
  vertex(-100, -100,  100, 0, 0);
  vertex( 100, -100,  100, 100, 0);
  vertex( 100,  100,  100, 100, 100);
  vertex(-100,  100,  100, 0, 100);
  
  // -Z "back" face
  vertex( 100, -100, -100, 0, 0);
  vertex(-100, -100, -100, 100, 0);
  vertex(-100,  100, -100, 100, 100);
  vertex( 100,  100, -100, 0, 100);
 
  // +Y "bottom" face
  vertex(-100,  100,  100, 0, 0);
  vertex( 100,  100,  100, 100, 0);
  vertex( 100,  100, -100, 100, 100);
  vertex(-100,  100, -100, 0, 100);
  
  // -Y "top" face
  vertex(-100, -100, -100, 0, 0);
  vertex( 100, -100, -100, 100, 0);
  vertex( 100, -100,  100, 100, 100);
  vertex(-100, -100,  100, 0, 100);
  
  // +X "right" face
  vertex( 100, -100,  100, 0, 0);
  vertex( 100, -100, -100, 100, 0);
  vertex( 100,  100, -100, 100, 100);
  vertex( 100,  100,  100, 0, 100);
  
  // -X "left" face
  vertex(-100, -100, -100, 0, 0);
  vertex(-100, -100,  100, 100, 0);
  vertex(-100,  100,  100, 100, 100);
  vertex(-100,  100, -100, 0, 100);
  endShape();
  popMatrix();
  
  // Task 5: Now that you have drawn the cube at the center
  // of the screen, turn the ellipse into a sphere and animate
  // it using the vector concept - how would that work?
  
  // --I was able to get it to be rendered in the center of the screen, but wasn't
  //   able to get the animation function to work.
  
  // Task 6: Make use of the stroke()/noStroke() functionality to
  // change the object representation
  pushMatrix();
  //fill(0,255,0);
  noFill();
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
  
  //create Y-axis line:
  pushMatrix();
  translate(width/2, 0);
  line(0, 0, 0, height);
  popMatrix();
  
  //create X-axis line:
  pushMatrix();
  translate(0, height/2);
  line(0, 0, width, 0);
  popMatrix();
  
  
}


void drawEllipse() {

  int radius = 80; 
  
  pushMatrix();
  
  // "move" the ellipse by adding the speed vector to the position vector
  ellipseLocation.add(ellipseDirection);
  
  // define the ellipses current position and size
  translate(width/2, height/2, 0);
  sphere(radius);

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
  
  popMatrix();
}
