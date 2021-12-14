let themeNumber = 0;
let themes = 
  [
    theme0 =
    {
      colors : [[250, 201, 1], [34, 80, 149], [221, 1, 0], [255, 255, 255]],
      strokeWeight : 10,
      strokeColor: 0, 
      size : [50, 300],
    },
    
    theme1 =
    {
      colors : [[94, 189, 62, 200], [255, 185, 0, 200], [247, 130, 0, 200], [226, 56, 56, 200], [151, 57, 153, 200], [0, 156, 223, 200]],
      strokeWeight : 0,
      strokeColor: 0, 
      size : [50, 300],
    },
    
    theme2 =
    {
      colors : [0, 255],
      strokeWeight : 10,
      strokeColor : [0, 0, 0, 125],
      size : [0.1, 100],
    },
    
    theme3 =
    {
      colors : [[250, 201, 1, 150], [34, 80, 149, 100], [221, 1, 0, 100], [255, 255, 255, 150]],
      strokeWeight : 10,
      strokeColor : 0,
      size : [100, 500],
    },
     theme4 =
    {
      colors : [[250, 201, 1, 50], [34, 80, 149, 50], [221, 1, 0, 50], [255, 255, 255, 50]],
      strokeWeight : 0,
      strokeColor : [0, 0, 0],
      size : [0.1, 10],
    },
    
    theme5 =
    {
      colors : [[242, 5, 68],  [48, 78, 242], [242, 116, 5], [242, 68, 5]],
      strokeWeight : 50,
      strokeColor : [0, 1, 13, 150],
      size : [100, 500],
    },  
  ]

let numberOfColors = 1; //this variable is only applies to theme4
let framingSize = 50;
let columnSize = 0;
let minColumnSize = 50;
let maxColumnSize = 300;
let rectWidth = 0;
let minRectWidth = 50;
let maxRectWidth = 300;

function mouseClicked()
{ 
    themeNumber++;
    themeNumber = themeNumber % 6;
    strokeWeight(themes[themeNumber].strokeWeight);
    stroke(themes[themeNumber].strokeColor);
    if (themeNumber != 5)
    {
      clear();
    }
    else
    {
      background(0, 1, 13);
    }
}

function drawOnCall()
{
  maxRectWidth = map(mouseX, 0, width, themes[themeNumber].size[0], themes[themeNumber].size[1]);
  maxColumnSize = map(mouseY, 0, height, themes[themeNumber].size[0], themes[themeNumber].size[1]);
  for (let y = framingSize; y < height - framingSize; y += columnSize)
  {
    columnSize = random(minColumnSize, maxColumnSize);
    if (columnSize + y > height - framingSize)
    {
      columnSize = height - framingSize - y;
    }
    for (let x = framingSize; x < width - framingSize; x += rectWidth)
    { 
      rectWidth = random(minRectWidth, maxRectWidth);
      if (rectWidth + x > width - framingSize)
      {
        rectWidth = width - framingSize - x;
      }
      fill(random(themes[themeNumber].colors));
      rect(x, y, rectWidth, columnSize)   
    }
  }
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  stroke(themes[themeNumber].strokeColor);
  strokeWeight(themes[themeNumber].strokeWeight);
  themes[2].background = random([255, 0]);
   
  drawOnCall();
  
  alert("Move mouse to draw, click to change the theme.")
}

function mouseMoved()
{
  drawOnCall();
}