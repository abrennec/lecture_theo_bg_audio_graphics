// Original source code by Ira Greenberg
// Adapted for TBAG, Filmuni Babelsberg, abrennec


PVector ellipseDirection = new PVector(1, 1.5);
PVector ellipseLocation = new PVector();

PShape cube;
float camMoveZ ;
float speed = 1;
float lightColor = 255;
float colorInc = -20;
void setup() {

  size(400, 400, P3D);
  colorMode(HSB);
  ellipseLocation.set(width/2, height/2);
  cube = createShape();
  noStroke();
  smooth();
  camMoveZ = width/2;
}


void draw() {

  background(0);
  smooth();
  // Hint: Use printMatrix to  check what is actually happening.
  // Also checkout "printProjection" and "printCamera"
  //printMatrix();
  println("Camera Matrix:");
  printCamera();
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
  translate(width/2, height/2, 0);
  noFill();
  //rect(-10, -10, 20, 20);
  rotateY(0.5);
  rotateX(0.5);
  //box(20);
  popMatrix();

  pushMatrix();
  translate(width/2, height/2, 0);

  cube.beginShape();
  cube.noFill();
  cube.stroke(255);
  //TOP
  cube.vertex(-10, -10, 10);
  cube.vertex(-10, 10, 10);
  cube.vertex(10, 10, 10);
  cube.vertex(10, -10, 10);
  cube.vertex(-10, -10, 10);
  //BOTTOM

  cube.vertex(-10, -10, -10);
  cube.vertex(-10, 10, -10);
  cube.vertex(10, 10, -10);
  cube.vertex(10, -10, -10);
  cube.vertex(-10, -10, -10);

  //sides
  cube.vertex(10, -10, -10);
  cube.vertex(10, -10, 10);
  cube.vertex(-10, -10, 10);
  cube.vertex(-10, 10, 10);
  cube.vertex(-10, 10, -10);
  cube.vertex(10, 10, -10);
  cube.vertex(10, 10, 10);
  cube.vertex(10, -10, 10);

  cube.endShape();
  rotateY(0.5);
  rotateX(0.5);
  shape(cube);
  popMatrix();
  // Task 5: Now that you have drawn the cube at the center
  // of the screen, turn the ellipse into a sphere and animate
  // it using the vector concept - how would that work?

  // Task 6: Make use of the stroke()/noStroke() functionality to
  // change the object representation
  pushMatrix();
  //noFill();

  fill(100, 100, 250);
  noStroke();
  sphereDetail(20);
  drawEllipse();
  popMatrix();



  // Advanced


  // Task 8: Add a camera(..) object to the scene and play with the
  // function parameters; use mouseX and mouseY to change
  // the view interactively.

  //float camZ = map(mouseY+mouseY, 0, width+height, width/2, width*2);
  //camera(200, 200, camZ, width/2, height/2, 0.0, 0.0, 1.0, 0.0);

  // Task 9: Animate the camera object. How would you go about that?
  camera(200, 200, camMoveZ, width/2, height/2, 0.0, 0.0, 1.0, 0.0);
  camMoveZ +=speed;

  if (camMoveZ <= width/2 || camMoveZ >= width*2) {
    speed*=-1;
  }
}


void drawCoordinates() {

  stroke(125);
  pushMatrix();
  translate(width/2, 0);
  line(0, 0, 0, height); // y-axis
  popMatrix();
  pushMatrix();
  translate(0, height/2);
  line(0, 0, width, 0); // y-axis
  popMatrix();
}


void drawEllipse() {
  // Task 7: Add a light to the scene. Checkout the following functions
  // lights, ambientLight, directionalLight, and pointLight
  directionalLight(lightColor, 126, 126, 0, 0, -1);
  ambientLight(lightColor, 102, 102);

  int radius = 50;

  // "move" the ellipse by adding the speed vector to the position vector
  ellipseLocation.add(ellipseDirection);

  // define the ellipses current position and size
  translate(ellipseLocation.x, ellipseLocation.y, 0);
  sphere(radius);

  // check wall collisions
  if (ellipseLocation.x > width-radius) {
    lightColor+=colorInc;
    ellipseLocation.x = width-radius;
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } else if (ellipseLocation.x < radius) {
    lightColor+=colorInc;
    ellipseLocation.x = radius;
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } else if (ellipseLocation.y > height - radius) {
    lightColor+=colorInc;
    ellipseLocation.y = height - radius;
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  } else if (ellipseLocation.y < radius) {
    lightColor+=colorInc;
    ellipseLocation.y = radius;
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  } 
  if (lightColor>=255 || lightColor <=20){
    colorInc*=-1;
  }
}
