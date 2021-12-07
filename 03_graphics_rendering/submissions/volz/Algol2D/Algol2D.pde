// Processing 
PShape s;
final float scaleStep = 0.7;
final float goldenRatio = 1.618033988749;
final float pillarThickness = width / (20 * goldenRatio);
float halfWidth;
float halfHeight;


void setup()
{                                               // **change** void setup() to function setup()
    size(800,600);                            // **change** createCanvas() to createCanvas()
    
    halfWidth = width * 0.5;
    halfHeight = height * 0.5;
    smooth(8);

}

void draw() 
{    
  background(245);
  stroke(0);
  strokeWeight(16);
  fill(0);

  // **change** void draw() to function draw()
  translate(halfWidth, halfHeight);
  
   

  for (int i = 0; i <= 4; i++)
  {
    triangle(-halfWidth, -halfHeight, -halfWidth + halfWidth / pillarThickness, -halfHeight, - halfWidth + halfWidth / (pillarThickness * 2), halfHeight / goldenRatio);
    triangle(halfWidth, -halfHeight, halfWidth - halfWidth / pillarThickness, -halfHeight, halfWidth - halfWidth / (pillarThickness * 2), halfHeight / goldenRatio);
    quad(-100, halfHeight / goldenRatio, 0, halfHeight - 100, 100, halfHeight / goldenRatio, 0, halfHeight - 125);

    scale(scaleStep);

  }
  
  /* 
  pushMatrix();
  scale(scaleStep);
  triangle(120, 300, 232, 80, 344, 300);
  popMatrix(); 
  */
}
