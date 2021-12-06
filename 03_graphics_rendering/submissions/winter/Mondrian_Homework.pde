// int themeNumber = 0;

// int theme0Color0[] = {250, 201, 1};
// int theme0Color1[] = {34, 80, 149};
// int theme0Color2[] = {221, 1, 0}; 
// int theme0Color3[] = {255, 255, 255};
// int theme0ColorsArray[][]= {theme0Color0, theme0Color1, theme0Color2, theme0Color3};
// int theme0Size [] = {50, 300};

int drawingDistance = 250;

// theme0 = new theme();
// theme0.color = theme0ColorsArray;

// Object [] themes;

// themes0 obj = new theme (theme0ColorsArray, 10, 0, theme0Size);

 

// themes = 
//   [
//     theme0 =
//     {
//       colors : [[250, 201, 1], [34, 80, 149], [221, 1, 0], [255, 255, 255]],
//       strokeWeight : 10,
//       strokeColor: 0, 
//       size : [50, 300],
//     },
    
//     theme1 =
//     {
//       colors : [[94, 189, 62, 200], [255, 185, 0, 200], [247, 130, 0, 200], [226, 56, 56, 200], [151, 57, 153, 200], [0, 156, 223, 200]],
//       strokeWeight : 0,
//       strokeColor: 0, 
//       size : [50, 300],
//     },
    
//     theme2 =
//     {
//       colors : [0, 255],
//       strokeWeight : 10,
//       strokeColor : [0, 0, 0, 125],
//       size : [0.1, 100],
//     },
    
//     theme3 =
//     {
//       colors : [[250, 201, 1, 150], [34, 80, 149, 100], [221, 1, 0, 100], [255, 255, 255, 150]],
//       strokeWeight : 10,
//       strokeColor : 0,
//       size : [100, 500],
//     },
//      theme4 =
//     {
//       colors : [[250, 201, 1, 50], [34, 80, 149, 50], [221, 1, 0, 50], [255, 255, 255, 50]],
//       strokeWeight : 0,
//       strokeColor : [0, 0, 0],
//       size : [0.1, 10],
//     },
    
//     theme5 =
//     {
//       colors : [[242, 5, 68],  [48, 78, 242], [242, 116, 5], [242, 68, 5]],
//       strokeWeight : 50,
//       strokeColor : [0, 1, 13, 150],
//       size : [100, 500],
//     },  
//   ]

//int numberOfColors = 1; //this variable is only applies to theme4
float framingSize = 0;
float columnSize = 0;
float minColumnSize = 10;
float maxColumnSize = 250;
float rectWidth = 0;
float minRectWidth = 10;
float maxRectWidth = 250;

void drawOnCall()
{
  background(255, 245, 245);
  //maxRectWidth = map(mouseX, 0, width, 100, 250);
  //maxColumnSize = map(mouseY, 0, height, 100, 250);
  int xFactor = 0;
  int yFactor = 0;
  for(float z = 0;  z < 10000; z += drawingDistance)
  {
    float transP = map(z, 0, 10000, 0, 125);
    float stroketransP = map(z, 0, 10000, 0, 10);
    for (float y = framingSize + yFactor; y < height/2 - framingSize + yFactor; y += columnSize)
    {
      columnSize = random(minColumnSize, maxColumnSize);
      //if (columnSize + y > height/2 - framingSize)
      //{
        //columnSize = height/2 - framingSize - y;
      //}
      for (float x = framingSize + xFactor; x < width/4 - framingSize + xFactor; x += rectWidth)
      { 
        rectWidth = random(minRectWidth, maxRectWidth);
        //if (rectWidth + x > width/4 - framingSize)
        //{
          //rectWidth = width/4 - framingSize - x;
        //}
        //fill(random(themes[themeNumber].colors));
        int colorChooser = round(random(0, 5));
        if (colorChooser == 0)
        {
          fill (94, 189, 62, transP);
        }
        else if (colorChooser == 1)
        {
          fill (255, 185, 0, transP);
        }
        else if (colorChooser == 2)
        {
          fill (247, 130, 0, transP);
        }
        else if (colorChooser == 3)
        {
          fill (226, 56, 56, transP);
        }
        else if (colorChooser == 4)
        {
          fill (151, 57, 153, transP);
        }
        else if (colorChooser == 5)
        {
          fill (0, 156, 223, transP);
        }
          stroke(0, 0, 0, stroketransP);
        pushMatrix();
        //print(x);
        translate(x, y, z);
        box(rectWidth, columnSize, random(100, 500)); 
        popMatrix();
      }
    xFactor += map(mouseX, 0, width, -50, 50);
    yFactor += map(mouseY, 0, height, -30, 30);
    }
  }
  //translate(width/4, height/4);
}

void setup()
{
  fullScreen(P3D);
  camera(width/2.0, height/2.0, (height/2.0) / tan(PI*30.0 / 180.0) + 9500, width/2.0, height/2.0, 0, 0, 1, 0);
  stroke(0, 0, 0, 10);
  //noStroke();
  strokeWeight(10);
   
  drawOnCall();
  

}

void draw()
{
 translate(width/2 - width/8 , height/4 + height/16);
}

void mouseMoved()
{
 drawOnCall();
}
