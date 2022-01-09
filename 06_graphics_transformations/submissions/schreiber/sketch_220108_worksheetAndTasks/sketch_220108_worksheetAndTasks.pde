// Original source code by Ira Greenberg 
// Adapted for TBAG, Filmuni Babelsberg, abrennec

// with answers by Vivien Schreiber, Class 21/22


PVector ellipseDirection = new PVector(1, 1.5);
PVector ellipseLocation = new PVector();

// Task 4:
PShape vivisCubeShape;

//Task 8:
float camFloatX;
float camFloatY;

void setup() {

  size(1000 , 1000, P3D);
  
  //TaskAnswer 4: drawing it as a PShape:
  vivisCubeShape = createShape();
  
  vivisCubeShape.beginShape();
  vivisCubeShape.noFill();
  //TaskAnswer 6:
  vivisCubeShape.stroke(255,0,0);
  vivisCubeShape.strokeWeight(1);
  
  vivisCubeShape.vertex(-10,-10,5);
  vivisCubeShape.vertex(-10,10,5);
  vivisCubeShape.vertex(10, 10,5); 
  vivisCubeShape.vertex(10,-10,5);
  vivisCubeShape.vertex(-10,-10,-5);
  vivisCubeShape.vertex(-10,10,-5);
  vivisCubeShape.vertex(10, 10,-5); 
  vivisCubeShape.vertex(10,-10,-5);
  
  vivisCubeShape.endShape(CLOSE);
  
  ellipseLocation.set(width/2, height/2);
  
  noStroke();
  smooth();
}


void draw() {

  background(0);

  // Hint: Use printMatrix to  check what is actually happening.
  // Also checkout "printProjection" and "printCamera"
  //printMatrix();
  
  // Task 1: DONE! (Checkout the code and understand how the ellipse is moved around using the two vector variables. Comment!)
  
  // Task 2: DONE! (Re-write the code such that the transformation of the coordinate system is not implicit part of the primitves drawn in the drawCoordinates function but explicitly called using pushMatrix and popMatrix() as well as translate()
  
  // Task 3: DONE! (Exchange the rect with a 3D box object, what needs to be changed?)
  // TaskAnswer 3: We need to add the P3D renderer to the size call & change the the rect() to a box function and fill it accordingly.
  
  // Task 4: DONE! (Re-write the box/cube object explicitly with vertices using PShape!)
  
  // Task 5: DONE! (Now that you have drawn the cube at the center of the screen, turn the ellipse into a sphere and animate it using the vector concept - how would that work?)
  
  // Task 6: DONE! (Make use of the stroke()/noStroke() functionality to change the object representation)
  
  // Advanced 
  
  // Task 7: Add a light to the scene. Checkout the following functions lights, ambientLight, directionalLight, and pointLight
  
  // Task 8: DONE! (Add a camera(..) object to the scene and play with the function parameters; use mouseX and mouseY to change the view interactively.)
  
  // Task 9: Animate the camera object. How would you go about that?
  
  //TaskAnswer 2: Rewritten coordinate system drawer:
  drawCoordinates();
  
  //TaskAnswer 1: here we draw the square in the middle: 
  pushMatrix();
  //translate(width/2, height/2);
  noFill();
  
  //rect(-10, -10, 20, 20);
  
  //TaskAnswer 3: drawing it as a cube:
  //box(20);
  
  //TaskAnswer 4: redrawing the cube as a PShape:
  shape(vivisCubeShape, width/2, height/2);
  popMatrix();
  
  //TaskAnswer 1: here we draw the ellipse:
  pushMatrix();
  //TaskAnswer 1: here we use the function that places the ellipse on a new spot each frame:
  //drawEllipse();
  
  //TaskAnswer 5: draw a sphere instead of a ellipse:
  drawSphere();
  popMatrix();
  
  //TaskAnswer 8:
  //params: camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
  camera( camFloatX , camFloatY, (height/2.0) / tan(PI*30.0 / 180.0), width/2.0, height/2.0, 0, 0, 1, 0);
  camFloatX = lerp(camFloatX, mouseX, 0.1);
  camFloatY = lerp(camFloatY, mouseY, 0.1);
}


void drawCoordinates() {
  /*
  stroke(125);
  line(width/2, 0, width/2, height); // y-axis
  line(0, height/2, width, height/2); // x-axis
  */
  
  pushMatrix();
  translate(width/2, height/2);
  //TaskAnswer 6:
  stroke(255,0,0);
  //params: line(x1, y1, x2, x2)
  line(0, -height, 0, height); // y-axis
  line(-width, 0, width, 0); // x-axis
  popMatrix();
}


void drawEllipse() {

  int radius = 20; 
  
  // "move" the ellipse by adding the speed vector to the position vector
  ellipseLocation.add(ellipseDirection);

  // define the ellipses current position and size
  ellipse(ellipseLocation.x, ellipseLocation.y, radius*2, radius*2);
  
  // TaskAnswer 5:

  // checking wall collisions: (we basically write a collider, which specifically checks ellipse + border collisions)
  if (ellipseLocation.x > width-radius) {
    //TaskAnswer 1: here we reset the position of the ellipse to be exactly on the RIGHT border:
    ellipseLocation.x = width-radius;
    //TaskAnswer 1: then we invert the current x value of the ellipseDirection vector, changing it's direction:
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } 
  else if (ellipseLocation.x < radius) {
    //TaskAnswer 1: here we reset the position of the ellipse to be exactly on the LEFT border:
    ellipseLocation.x = radius;
    //TaskAnswer 1: then we invert the current x value of the ellipseDirection vector, changing it's direction:
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } 
  else if (ellipseLocation.y > height - radius) {
    //TaskAnswer 1: here we reset the position of the ellipse to be exactly on the LOWER border:
    ellipseLocation.y = height - radius;
    //TaskAnswer 1: then we invert the current y value of the ellipseDirection vector, changing it's direction:
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  } 
  else if (ellipseLocation.y < radius) {
    //TaskAnswer 1: here we reset the position of the ellipse to be exactly on the TOP border:
    ellipseLocation.y = radius;
    //TaskAnswer 1: then we invert the current y value of the ellipseDirection vector, changing it's direction:
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  }
}

// TaskAnswer 5:
void drawSphere() {

  int radius = 20; 
  
  noFill();
  
  //TaskAnswer 6:
  stroke(0,255,0);
  
  //TaskAnswer 6:
  sphereDetail(2);
  
  // adding the speed vector to the position vector
  ellipseLocation.add(ellipseDirection);
  
  // move the sphere by filling translate with the newly calculated position
  translate(ellipseLocation.x, ellipseLocation.y, 0);

  // define the ellipses current position and size
  sphere(radius);

  // checking wall collisions: (we basically write a collider, which specifically checks ellipse + border collisions)
  if (ellipseLocation.x > width-radius) {
    //TaskAnswer 1: here we reset the position of the ellipse to be exactly on the RIGHT border:
    ellipseLocation.x = width-radius;
    //TaskAnswer 1: then we invert the current x value of the ellipseDirection vector, changing it's direction:
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } 
  else if (ellipseLocation.x < radius) {
    //TaskAnswer 1: here we reset the position of the ellipse to be exactly on the LEFT border:
    ellipseLocation.x = radius;
    //TaskAnswer 1: then we invert the current x value of the ellipseDirection vector, changing it's direction:
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } 
  else if (ellipseLocation.y > height - radius) {
    //TaskAnswer 1: here we reset the position of the ellipse to be exactly on the LOWER border:
    ellipseLocation.y = height - radius;
    //TaskAnswer 1: then we invert the current y value of the ellipseDirection vector, changing it's direction:
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  } 
  else if (ellipseLocation.y < radius) {
    //TaskAnswer 1: here we reset the position of the ellipse to be exactly on the TOP border:
    ellipseLocation.y = radius;
    //TaskAnswer 1: then we invert the current y value of the ellipseDirection vector, changing it's direction:
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  }
  
}
