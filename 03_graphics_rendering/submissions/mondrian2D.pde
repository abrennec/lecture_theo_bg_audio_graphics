int size = 10;
int posX = 0;
int posY = 0; 
int rectWidth = 40;
int rectHeight = 40;
float rectHUE = 0;
float rectSat = 0;
float rectBright = 0;


void setup() {
  size(640, 360);
  background(0);
  noLoop();
  colorMode (HSB, 360, 100, 100);
  rectMode(CENTER);
}

void drawer() {
  rectHUE = random(0, 360);
  rectSat = random(0, 40);
  rectBright = random(90, 100);
  rectWidth = int(random(30, 50));
  rectHeight = int(random(30, 50));



  fill (rectHUE, rectSat, rectBright);
    if (posY == 0) {
      if (posX <= width - rectWidth) {
        rect(posX + rectWidth/2, posY + rectHeight/2, rectWidth , rectHeight);
        posX += rectWidth;
        drawer();
        }
      else {
        posY += rectHeight;
        drawer();
      }
    }
  else {
    if (posY < height - rectHeight) {
      rect(0 + rectWidth/2, posY, rectWidth, rectHeight);
      rect(width - rectWidth/2, posY, rectWidth, rectHeight);
      posY += rectHeight;
      posX = 0;
      drawer();

      }
    else {
      if (posX <= width - rectWidth){
        rect(posX, posY - rectWidth/2, rectWidth, rectHeight);
        posX += rectWidth;
        drawer();
      }
      else{
      rect (width/2, height/2, rectWidth, rectHeight);
      }  
  }
}
}

void draw() {
    drawer();
  }