// inspiration: https://www.wikiart.org/de/piet-mondrian/composition-in-color-a-1917

void setup() {
size(600, 600);
background(243,229,206);

//RED SQUARES
drawRectangles(true, color(209,62,73), 10, 100);
  
//BLUE SQUARES
drawRectangles(true, color(43,96,156), 10, 150);
  
//ORANGE SQUARES
drawRectangles(true, color(199,74,41), 7, 150);
  
//BROWN RECTANGLES
drawRectangles(false, color(38,8,13), 30, 40);
}

void drawRectangles(boolean isSquare, color rectColor, int numOfSquares, float maxSquareSize) {
  
fill(rectColor);  
float Xlength;
float Ylength;
float Xpos;
float Ypos;
float lastXpos = width/2;
float lastYpos = height/2;
float lastXlength = 0;
float lastYlength = 0;
  
for (int i = 0; i < numOfSquares; i++) {
      
  Xlength = random(1, maxSquareSize);
  if (isSquare == true) {
    Ylength = Xlength;
  } else {
    Ylength = random(1, maxSquareSize);
  }
  Xpos = random(width - Xlength);
  Ypos = random(height - Ylength);
  if ((abs(lastXpos - Xpos) > Xlength ) && (abs(lastYpos - Ypos) > Ylength)) { //max(Xlength,lastXlength)
    rect(Xpos, Ypos, Xlength, Ylength);
  } else {
    i = (i-1);
  }
  lastXpos = Xpos;
  lastYpos = Ypos;
  lastXlength = Xlength;
  lastYlength = Ylength;
}
}