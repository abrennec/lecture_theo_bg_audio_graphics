// Original source code by Ira Greenberg 
// Adapted for TBAG, Filmuni Babelsberg, abrennec


PVector ellipseDirection = new PVector(1, 1.5);
PVector ellipseLocation = new PVector();
PShape bFront, bBack, bRight, bLeft; //customBox Shape
float z;


void setup() {

  size(400, 400, P3D);

  ellipseLocation.set(width/2, height/2);
  bFront =  createShape();
  bBack =  createShape();
  bRight = createShape();
  bLeft = createShape();
  
  //3D Box - a bit overkill, but could be implemented in a function or class or just combined into one shape
  bFront.beginShape();
  bFront.noFill();
  bFront.stroke(255);
  bFront.strokeWeight(1);
  bFront.vertex(-10,-10,10);
  bFront.vertex(-10,10,10);
  bFront.vertex(10, 10,10); 
  bFront.vertex(10,-10,10);
  bFront.endShape(CLOSE);
  
  bBack.beginShape();
  bBack.noFill();
  bBack.stroke(255);
  bBack.strokeWeight(1);
  bBack.vertex(-10,-10,-10);
  bBack.vertex(-10,10,-10);
  bBack.vertex(10, 10,-10); 
  bBack.vertex(10,-10,-10);  
  bBack.endShape(CLOSE);
  
  bRight.beginShape();
  bRight.noFill();
  bRight.stroke(255);
  bRight.strokeWeight(1);
  bRight.vertex(10,-10,-10);
  bRight.vertex(10,10,-10);
  bRight.vertex(10, 10,10); 
  bRight.vertex(10,-10,10);  
  bRight.endShape(CLOSE);
  
  bLeft.beginShape();
  bLeft.noFill();
  bLeft.stroke(255);
  bLeft.strokeWeight(1);
  bLeft.vertex(-10,-10,-10);
  bLeft.vertex(-10,10,-10);
  bLeft.vertex(-10,10,10); 
  bLeft.vertex(-10,-10,10);  
  bLeft.endShape(CLOSE);
  
  noStroke();
  smooth();
}


void draw() {

  background(0);
  
  // Advanced 
  
  // Task 7: Add a light to the scene. Checkout the following functions
  // lights, ambientLight, directionalLight, and pointLight
  directionalLight(200, 200, 200, 0, 0, -1);
  
  // Task 8: Add a camera(..) object to the scene and play with the 
  // function parameters; use mouseX and mouseY to change 
  // the view interactively.
  //camera(mouseX, mouseY, 250, mouseX, height/2, 0, 0, 1, 0);
  
  // Task 9: Animate the camera object. How would you go about that?
  camera(sin(z)*width,sin(z)*height/2,250, width/2, sin(z)*height/2, 0,0,1,0);
  z+=0.012;
  
  
  

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
  
  //2D Rect
  /*pushMatrix();
  translate(width/2, height/2);
  noFill();
  rect(-10, -10, 20, 20);
  popMatrix();*/
  
  //3D Box
  /*pushMatrix();
  translate(width/2,height/2);
  noFill();
  box(20);
  popMatrix();*/
  
  //TASK 4: custom vertices shape
  pushMatrix();
  translate(width/2, height/2);
  shape(bFront);
  shape(bBack);
  shape(bRight);
  shape(bLeft);
  popMatrix();
  
   
  
  // Task 5: Now that you have drawn the cube at the center
  // of the screen, turn the ellipse into a sphere and animate
  // it using the vector concept - how would that work?
  
  // Task 6: Make use of the stroke()/noStroke() functionality to
  // change the object representation
  pushMatrix();
  fill(0,255,0);
  noStroke();
  drawEllipse();
  popMatrix();
  
  
  
  
}


void drawCoordinates() {

  stroke(125);
  pushMatrix();
  translate(width/2, 0);
  line(0, 0, 0, height); // y-axis
  popMatrix();
  pushMatrix();
  translate(0, height/2);
  line(0, 0, width, 0); // x-axis
  popMatrix();
}


void drawEllipse() {

  int radius = 20; 
  
  // "move" the ellipse by adding the speed vector to the position vector
  ellipseLocation.add(ellipseDirection);

  // define the ellipses current position and size
  //ellipse(ellipseLocation.x, ellipseLocation.y, radius*2, radius*2);
  
  pushMatrix();
  translate(ellipseLocation.x,ellipseLocation.y);
  sphere(radius*2);
  popMatrix();

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
