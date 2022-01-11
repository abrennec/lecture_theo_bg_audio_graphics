// Original source code by Ira Greenberg 
// Adapted for TBAG, Filmuni Babelsberg, abrennec


PVector sphereDirection = new PVector(1, 1.5, 1);
PVector sphereLocation = new PVector();

int zBoundaries = 300;


void setup() {

  size(400, 400, P3D);

  sphereLocation.set(width/2, height/2, 0);
  
    
  noStroke();
  smooth();
}


void draw() {

  background(0);

  // Hint: Use printMatrix to  check what is actually happening.
  // Also checkout "printProjection" and "printCamera"
  printMatrix();
  
  setThreePointLighting();
  
  float mappedX = map(mouseX, 0, width, 200, -200);
  float mappedY = map(mouseY, 0, height, 200, -200);
  
  camera(width/2 + mappedX, height/2 + mappedY, zBoundaries * 1.1, width/2, height/2, 0.0, 
       0.0, 1.0, 0.0);
              
  
  // Task 1: Checkout the code and understand how; the 
  // ellipse is moved around using the two vector variables.
  // Comment!
  // The direction vector is added to the location vector of the ellipse every frame. Therefore the ellipse is displaced and moved around the screen.
  // whenever a wall collision occurs in the x-direction, the x value of the direction vector is inverted. Whenever a wall collision occurs in the y-direction, the y-value is inverted.
  // This lets the ellipse "bounce" of the wall (angle of incidence equals angle of reflection).
  
  // Task 2: Re-write the code such that the transformation
  // of the coordinate system is not implicit part of the
  // primitves drawn in the drawCoordinates function but 
  // explicitly called using pushMatrix and popMatrix() 
  // as well as translate()
  drawCoordinates();
  drawBoundaries();

  // Task 3: Exchange the rect with a 3D box object, what needs
  // to be changed?
  // the box object does not have parameters for location, only for dimension. So in order for it to be displayed in the center, we need to work with translate()
  
  // Task 4: Re-write the box/cube object explicitly with
  // vertices using PShape! 
  pushMatrix();
  //translate(width/2, height/2);
  applyMatrix(1, 0, width/2,
              0, 1, height/2);
  noFill();
  drawBox();
  popMatrix();
   
  
  // Task 5: Now that you have drawn the cube at the center
  // of the screen, turn the ellipse into a sphere and animate
  // it using the vector concept - how would that work?
  
  // Task 6: Make use of the stroke()/noStroke() functionality to
  // change the object representation
  pushMatrix();
  
  //fill(map(sphereLocation.x, (float) -width/2.0,(float) width/2.0, 0.0, 255.0), map(sphereLocation.y, (float) -height/2.0,(float) height/2.0, 0.0, 255.0), 0);
  fill(0,0,255);
  
  noStroke();
  drawSphere();
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
  
  pushMatrix();
  translate(width/2, 0);
  line(0, 0, 0, height); // y-axis
  popMatrix();
  
  pushMatrix();
  translate(0, height/2); 
  line(0, 0, width, 0); // x-axis
  popMatrix();
}

void drawBoundaries()
{
  pushMatrix();
  translate(width/2, height/2, -zBoundaries/2);
  stroke(125);
  noFill();
  box(width, height, zBoundaries);
  popMatrix();
}

void drawBox()
{
   PShape square = createShape(RECT, 0, 0, 20, 20);
   
   
    //sides
   for (int i = 0; i <= 3; i++)
   {
     pushMatrix();
     rotateY(i * HALF_PI);
 
     //translate(-10, -10, 0);
     
     applyMatrix(1, 0, -10,
                 0, 1, -10);
     rotateY(HALF_PI);
     
     //translate(-10, 0, 0);
     
     applyMatrix(1, 0, -10,
                 0, 1, 0);
     shape(square);
     
     popMatrix();
   }
   
   
   //top & bottom
   pushMatrix();
   //rotateX(-HALF_PI);
   translate(-10, -10, 10);
   rotateX(-HALF_PI);
   shape(square);
   popMatrix();
   
   pushMatrix();
   rotateX(HALF_PI);
   translate(-10, -10, -10);
   shape(square);
   popMatrix();
}

void setThreePointLighting()
{
  //Key Light
  directionalLight(200, 200, 200, 1, 1, -1);
  
  //Fill Light
  directionalLight(100, 100, 100, -0.1, -1, -1);
  
  //Rim Light
  directionalLight(255, 255, 255, 0.1, 0.1, 1);
  
}



void drawSphere() {

  int radius = 20; 
  
  // "move" the ellipse by adding the speed vector to the position vector
  // every frame the ellipse is displaced 
  sphereLocation.add(sphereDirection);
  
  pushMatrix();
  translate(sphereLocation.x, sphereLocation.y, sphereLocation.z);
  
  specular(0, 255, 0);

  // define the ellipses current position and size
  sphere(radius);
  popMatrix();

  // check wall collisions
  if (sphereLocation.x > width-radius) {

    sphereLocation.x = width-radius;
    sphereDirection.x *= -1; // change the direction of the speed vector
  } 
  else if (sphereLocation.x < radius) {

    sphereLocation.x = radius;
    sphereDirection.x *= -1; // change the direction of the speed vector
  } 
  else if (sphereLocation.y > height - radius) {

    sphereLocation.y = height - radius;
    sphereDirection.y *= -1;  // change the direction of the speed vector
  } 
  else if (sphereLocation.y < radius) {

    sphereLocation.y = radius;
    sphereDirection.y *= -1;  // change the direction of the speed vector
  }
  else if (sphereLocation.z > - radius)
  {
    sphereLocation.z =  - radius;
    sphereDirection.z *= -1;
  }
  else if (sphereLocation.z < - zBoundaries + radius)
  {
    sphereLocation.z = - zBoundaries + radius;
    sphereDirection.z *= -1;
  }
}
