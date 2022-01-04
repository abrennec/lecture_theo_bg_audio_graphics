// Original source code by Ira Greenberg
// Adapted for TBAG, Filmuni Babelsberg, abrennec


PVector ellipseDirection = new PVector(1, 1.5);
PVector ellipseLocation = new PVector();

// 4. Redraw box using PShape
PShape cube;

float cameraHeight = height/2.0;
float x = 1;

void setup() {

  // camera(mouseX + cameraX, 35, mouseY + cameraZ, 50, 50, 0, 0, 1, 0);


  // 3. Changed to P3D
  size(400, 400, P3D);
  // 4. Redraw box using PShape
  cube = createShape();
  cube.beginShape();
  cube.noFill();
  cube.stroke(180);

  // Outer Square
  cube.vertex(0, 0);
  cube.vertex(0, 60);
  cube.vertex(60, 60);
  cube.vertex(60, 0);
  cube.vertex(0, 0);

  // Inner Square
  cube.vertex(10, 10);
  cube.vertex(10, 50);
  cube.vertex(50, 50);
  cube.vertex(50, 10);
  cube.vertex(10, 10);

  // 3D Lines
  cube.vertex(50, 10);
  cube.vertex(60, 0);
  cube.vertex(60, 60);
  cube.vertex(50, 50);
  cube.vertex(10, 50);
  cube.vertex(0, 60);
  cube.endShape();

  ellipseLocation.set(width/2, height/2);

  noStroke();
  smooth();
}


void draw() {

  background(0);
  
  // 8+9. Animate camera
  camera(width/2 + (mouseX*4), sin(x) * 350, (height/2.0) / tan(PI*30.0 / 180.0) + (mouseY*4), width/2.0, height/2.0, 0, 0, 1, 0);
  x += 0.05;
  // print(x);

  // 7. Add lights
  ambientLight(255, 255, 255);

  directionalLight(0, 100, 100, 0, -1, 0);
  spotLight(204, 153, 0, 360, 160, 600, 0, 0, -1, PI/2, 600);
  spotLight(255, 0, 0, mouseX, mouseY, 600, 0, 0, -1, PI/2, 600);



  // 2. Redraw coordinate system with push and pop
  pushMatrix();
  noFill();
  stroke(100);
  translate(width/2, height/2);

  // 3. Redraw rect with 3D box
  // box(50);
  shapeMode(CENTER);
  shape(cube, 0, 0);
  popMatrix();

  pushMatrix();
  line(width/2, 0, width/2, height); // y-axis
  line(0, height/2, width, height/2); // x-axis
  popMatrix();

  pushMatrix();
  fill(120, 50, 180);
  drawEllipse();
  popMatrix();
}



void drawEllipse() {

  int radius = 20;
  // 6. Get rid of strokes of tessellating traingles.
  noStroke();

  // 1. The ellipse is moving because the .add method is adding x=1 and y=1.5 to the current
  // location values supplied by the speed vector code.
  ellipseLocation.add(ellipseDirection);

  // 5. Change from ellipse to sphere. Sphere arguments do not include position,
  // so translate() nees to be implemented to use the vector concept of movement
  pushMatrix();
  translate(ellipseLocation.x, ellipseLocation.y);
  sphere(radius*2);
  popMatrix();

  // check wall collisions
  if (ellipseLocation.x > width-radius) {

    ellipseLocation.x = width-radius;
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } else if (ellipseLocation.x < radius) {

    ellipseLocation.x = radius;
    ellipseDirection.x *= -1; // change the direction of the speed vector
  } else if (ellipseLocation.y > height - radius) {

    ellipseLocation.y = height - radius;
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  } else if (ellipseLocation.y < radius) {

    ellipseLocation.y = radius;
    ellipseDirection.y *= -1;  // change the direction of the speed vector
  }
}
