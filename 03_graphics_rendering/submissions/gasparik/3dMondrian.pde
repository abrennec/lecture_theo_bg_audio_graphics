int size = 10;
int posX = 0;
int posY = 0; 
int boxWidth = 40;
int boxHeight = 40;
int boxDepth = 40;
float rectHUE = 0;
float rectSat = 0;
float rectBright = 0;


void setup() {
  size(640, 360, P3D);
  background(0);
  frameRate(3);
  // noLoop();

  colorMode (HSB, 360, 100, 100);
  rectMode(CENTER);

  lights();

  float fov = PI/3.0;
  float cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(fov, float(width)/float(height), 
            cameraZ/10.0, cameraZ*10.0);
}

void drawer() {
  rectHUE = random(0, 360);
  rectSat = random(0, 100);
  rectBright = random(90, 100);
  boxWidth = int(random(30, 50));
  boxHeight = int(random(30, 50));

  shininess(50.0);
  fill (rectHUE, rectSat, rectBright);

 
    if (posY == 0) {
      if (posX <= width - boxWidth) {
        pushMatrix();
        translate(posX + boxWidth/2, posY + boxHeight/2, 0);
        box(boxWidth, boxHeight, boxDepth);
        popMatrix();
        posX += boxWidth;
        drawer();
        }
      else {
        posY += boxHeight;
        drawer();
      }
    }
  else {
    if (posY < height - boxHeight) {
      pushMatrix();
      translate(0 + boxWidth/2, posY, 0);
      box(boxWidth, boxHeight, boxDepth);
      popMatrix();
      pushMatrix();
      translate(width - boxWidth/2, posY, 0);
      box(boxWidth, boxHeight, boxDepth);
      popMatrix();
      posY += boxHeight;
      posX = 0;
      drawer();

      }
    else {
      if (posX <= width - boxWidth){
        pushMatrix();
        translate(posX, posY - boxWidth/2, 0);
        box(boxWidth, boxHeight, boxDepth);
        popMatrix();
        posX += boxWidth;
        drawer();
      }
      else{
      box(boxWidth, boxHeight, boxDepth);
      posX = 0;
      posY = 0;
      }  
  }
}
}

void draw() {
    float movingHead = cos(30)*2;
    defineLights(movingHead);

    for (int z = 0; z >= -3000; z -= 50){
      pushMatrix();
      translate(0, 0, z);
      drawer();
      popMatrix();
    }
  }


  void defineLights(float lightZ) {
  pointLight(0, 30, 100,
             width/2, height/2, lightZ); // Position

 }