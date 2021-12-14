//Click to change color theme.
//Was the previous version supposed to be deleted?

int themeNumber = 0;
int hue = 0;

int drawingDistance = 250;

float columnSize = 0;
float minColumnSize = 10;
float maxColumnSize = 250;
float rectWidth = 0;
float minRectWidth = 10;
float maxRectWidth = 250;

void setup()
{
  fullScreen(P3D);
  colorMode(HSB, 360, 100, 100);
  camera(width/2.0, height/2.0, (height/2.0) / tan(PI*30.0 / 180.0) + 9500, width/2.0, height/2.0, 0, 0, 1, 0);
  stroke(0, 0, 0, 10);
  //noStroke();
  strokeWeight(10);
   
  drawOnCall();
}

void drawOnCall()
{
  background(0, 0, 100);

  int xFactor = 0;
  int yFactor = 0;
  for(float z = 0;  z < 10000; z += drawingDistance)
  {
    float transP = map(z, 0, 10000, 0, 125);
    float strokeTransP = map(z, 0, 10000, 0, 10);

    int theme0[] = {color(48, 100, 98), color(216, 77, 58), color(0, 100, 83), color(0, 0, 100)};
    int theme1[] = {color(104, 66, 71, transP), color(44, 100, 100, transP), color(32, 100, 97, transP), color(0, 75, 89, transP), color(299, 63, 60, transP), color(198, 100, 87, transP)};
    int theme2[] = {color(0, 0, 100, transP), color(0, 0, 0, transP)};
    int theme3[] = {color(48, 100, 98, transP), color(216, 77, 58, transP), color(0, 100, 83, transP), color(0, 0, 100, transP)};
    int theme4[] = {color(hue, 50, 100, transP)};

    int themesArray[][]= {theme0, theme1, theme2, theme3, theme4};
    
    for (float y = yFactor; y < height/2 + yFactor; y += columnSize)
    {
      columnSize = random(minColumnSize, maxColumnSize);

      for (float x = xFactor; x < width/4 + xFactor; x += rectWidth)
      { 
        rectWidth = random(minRectWidth, maxRectWidth);

        int choosenTheme [] = themesArray[themeNumber];
        color choosenColor = choosenTheme[int(random(0, choosenTheme.length))];
        fill (choosenColor);

        hue++;
        hue %= 361;

        stroke(0, 0, 0, strokeTransP);
        pushMatrix();
        translate(x, y, z);
        box(rectWidth, columnSize, random(100, 500)); 
        popMatrix();

      }
    xFactor += map(mouseX, 0, width, -50, 50);
    yFactor += map(mouseY, 0, height, -30, 30);  
    }
  }
}

void draw()
{
 translate(width/2 - width/8 , height/4 + height/16);
}

void mouseMoved()
{
 drawOnCall();
}

void mouseClicked()
{
  themeNumber++;
  themeNumber %= 5;
}