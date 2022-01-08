// Original source code by Ira Greenberg 
// Adapted for TBAG, Filmuni Babelsberg, abrennec

PShape plane;

PVector ellipseDirection = new PVector(1, 1.5);
PVector ellipseLocation = new PVector(0,0,0);

void setup() {
  size(800, 800, P3D);
  
  colorMode(HSB, 255);
  lights();
 
  ellipseLocation.set(width/2, height/2);
    
  noStroke();
  smooth();
}

void draw() {
  plane = createShape(QUAD, 0, 0,20, 0, 20, 20, 0, 20);
  float centerDist = dist(width/2, height/2, mouseX, mouseY);
  
  //TASK 7 (camZ and pointLight angle are mapped to the mouse's distance to the center. Also, both are following the Sphere)
  //CAM & LIGHTS
  camera(width/2, height/2, centerDist, ellipseLocation.x, ellipseLocation.y, 0.0, 
         0.0, 1.0, 0.0);
  //pointLight(0, 102, 126, 140, 160, 144);
  spotLight(50, 255, 255, width/2, height/2, 0, map(ellipseLocation.x, 0, width, -1, 1), map(ellipseLocation.y, 0, height, -1, 1), 0, map(PI/(norm(centerDist, 0, width/2)), 0,1, 0.1,1), 1);
  
  //println(norm(ellipseLocation.x,0,width));
  //println(map(ellipseLocation.x, 0, width, -1, 1));
  
  //printMatrix();
  printCamera();
  
  
  //DRAW BOX & COORDINATES & COORDINATEBOX
  //TASK3 (P2D -> P3D, introduce Z coordinates)
  //box(20);
  pushMatrix();
  translate(width/2, height/2);
  box(width, height,map(dist(width/2, height/2, mouseX, mouseY), 0, width/2, 20, 1000));
  popMatrix();
  drawCoordinates();
  
  pushMatrix();
  translate(width/2-10, height/2-10, 0);
  noFill();
  fill (200,255,255);
  drawKocka();
  popMatrix();
  
  //Since there's no position parameter in the Sphere() function, I have to translate the space with translate() function. The parameters remain the same.

  //I mapped the stroke width to the mouse location
  
  // noFill();
  fill(centerDist);
  int radius = 20; 
  
  //TASK6 (I just replaced the ellipse with a sphere)
  ellipseLocation.add(ellipseDirection);
  translate (ellipseLocation.x, ellipseLocation.y,0);
  sphereDetail(int(centerDist/20));
  //stroke(mouseY,255,255);
  //strokeWeight (mouseY/90);
  noStroke();
  shininess(500.0);
  sphere(radius);
  
  
  //TASK2
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

//TASK4 (I copy transformed versions of PShape Plane to create the box, seems that just adding all the vertex point of it doesn't work :( )
void drawKocka(){
  
  shape (plane, 0,0);
  pushMatrix();
  translate(0,0,-20);
  shape(plane, 0,0);
  popMatrix();
  
  pushMatrix();
  rotateY(PI/2);
  shape(plane,0,0);
  translate(0,0,20);
  shape(plane,0,0);
  popMatrix();
  
  pushMatrix();  
  rotateX(PI/-2);
  shape(plane,0,0);
  translate(0,0,20);
  shape(plane,0,0);
  popMatrix();
}

void drawCoordinates() {

  stroke(125);
  line(width/2, 0, width/2, height); // y-axis
  line(0, height/2, width, height/2); // x-axis
}
