// Original source code by Ira Greenberg 
// Adapted for TBAG, Filmuni Babelsberg, abrennec

// This vector gets added to the following ellipseLocation vector and therefore determines the speed and direction of
// the ellipse animation.
PVector ellipseDirection = new PVector(4, 4.5, 5);

PVector ellipseLocation = new PVector();

PShape notBox;

float t = 0;

void setup() 
{

  fullScreen(P3D);

  ellipseLocation.set(width/2, height/2, 0); //The ellipse vector is changed to the middle of the viewframe.
    
//   stroke(255);
//   strokeWeight(1);
//   smooth();

  // This is a needlessly complicated way to do this, but I wanted to try this "pure" approach.
  notBox = createShape();
    notBox.beginShape();
    notBox.noFill();
    notBox.stroke(255);
    notBox.vertex(0, 0, 0);
    notBox.vertex(0, 40, 0);
    notBox.vertex(40, 40, 0);
    notBox.vertex(40, 0, 0);
    notBox.vertex(0, 0, 0);

    notBox.vertex(0, 0, 40);
    notBox.vertex(0, 40, 40);
    notBox.vertex(0, 40, 0);
    notBox.vertex(0, 40, 40);
    notBox.vertex(40, 40, 40);
    notBox.vertex(40, 40, 0);
    notBox.vertex(40, 40, 40);
    notBox.vertex(40, 0, 40);
    notBox.vertex(40, 0, 0);
    notBox.vertex(40, 0, 40);
    notBox.vertex(0, 0, 40);
    notBox.endShape(CLOSE);
}


void draw() 
{

  background(0);

  //lights();
  directionalLight(126, 126, 126, 0, 0, -1);

  t += 0.01;
  float pointX =  map((float) Math.sin(t), 0, 1, 0, width/2);
  float pointY =  map((float) Math.cos(t), -1, 1, 0, height/2);
  float pointZ =  map((float) Math.sin(t), 0, 1, -1000, 0);

  pointLight(0, 255, 0, pointX, pointY, pointZ);
  ambientLight(102, 102, 102);

  drawCoordinates();

  // Why is this not part of the drawCoordinates function?
  pushMatrix();
  translate(width/2-20, height/2-20, -20);
  noFill();
  //rect(-10, -10, 20, 20);
  //box(20);
  shape(notBox);

  pushMatrix();
  translate(pointX, pointY  - height/4, pointZ);
  fill(0, 255, 0);
  noStroke();
  sphere(5);
  popMatrix();

  popMatrix();

  pushMatrix();
  fill(197,60,47);

  drawEllipse();
  popMatrix();
  
  camera(map((float) Math.sin(t/2), 0, 1, 0, width/2), map((float) Math.cos(t/5), -1, 1, 0, height/2), (height/2.0) / tan(PI*30.0 / 180.0) - map(mouseY, 0, width, 0, 10000), width/2.0, height/2.0, 0, 0, 1, 0);
}


void drawCoordinates() 
{

  stroke(125);
  line(width/2, 0, width/2, height); // y-axis
  line(0, height/2, width, height/2); // x-axis
}


void drawEllipse() 
{
    noStroke();

  int radius = 200; 
  
  // "move" the ellipse by adding the speed vector to the position vector
  ellipseLocation.add(ellipseDirection);

  // define the ellipses current position and size
  //ellipse(ellipseLocation.x, ellipseLocation.y, radius*2, radius*2);

  //pushMatrix();
  translate(ellipseLocation.x, ellipseLocation.y, ellipseLocation.z);
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
  else if(ellipseLocation.z > 1000)
  {

      ellipseDirection.z *=-1;
  }
   else if (ellipseLocation.z < -1000) 
   {
       ellipseDirection.z *=-1;
  }
}