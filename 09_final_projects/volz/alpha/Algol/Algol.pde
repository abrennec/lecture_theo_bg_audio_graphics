import java.util.Collections;

PGraphics pg;
PGraphics mask;
PShader portalShader;

Boolean trigger = true;

ColorContainer cyan = new ColorContainer(color(13.0, 112.0, 143.0));
ColorContainer yaleblue = new ColorContainer(color(20.0, 57.0, 102.0));
ColorContainer solidpink = new ColorContainer(color(345.0, 63.0, 47.0));
ColorContainer orange = new ColorContainer(color(222.0, 82.0, 67.0));

ArrayList <ColorContainer> colorList = new ArrayList<ColorContainer>();

final static int depthSteps = 12;
IntList[] colorOrder;
int distance;
final static float goldenRatio = 1.618033988749;
int currentFill;
int jitterFactor = 0;


final static float fov = PI/3.0;
final static float xWavelength = 62.0;
final static float yWavelength = 37.0;
final static float zWavelength = 150.0;

int groundObjectWidth;

float xAmplitude;
float yAmplitude = 30.0;
final static float zAmplitude = 0.5;
float phase = 0.0;
float zoff = 0.0;
float r;
float velocity = 1.0;

void settings()
{
    size(1000, 700, P3D);
    smooth(2);
}
void preload()
{
  
}

void setup() 
{
    //Anwendung passiert in drawSugaryScene();
    portalShader = loadShader("mask.glsl");
      
      xAmplitude = width * 0.05;
      yAmplitude = height * 0.043;
      
      distance = width / 5;
      groundObjectWidth = width / 5;
      
      pg = createGraphics(width, height, P3D);
    //fullScreen(P3D);
    
      
    colorList.add(cyan);
    colorList.add(yaleblue);
    colorList.add(solidpink);
    colorList.add(orange);
    
    colorOrder = new IntList[depthSteps];
    setUpIndexShuffle();
    currentFill = 15;
    
    //noLoop();
}

void mouseReleased() 
{
    jitterFactor = 30;
}

void draw() 
{   
    drawGrittyScene();
    drawMask();
    fill(0,0,0);

    drawSugaryScene();
    
    portalShader.set("mask",mask);
    portalShader.set("maskThis",pg);
  
    filter(portalShader);
   
    /*
    pushMatrix();
    translate(width/2,0,0);
    image(pg, -width/2, 0, width, height);
    popMatrix();
    */
    
    
    if(jitterFactor > 0) jitterFactor--;
    
}


void drawGrittyScene()
{
     //directionalLight(255, 255, 255, 0, -1, -1);
    //ambientLight(102, 102, 102);
    background(245);
    translate(width / 2, 0, -50);
    stroke(currentFill);
    fill(currentFill);
    float zfactor = map(sin(frameCount / zWavelength), -1.0, 1.0, 1.25, 1.25 + zAmplitude);
    float xConstant = frameCount / xWavelength;
    float yConstant = frameCount/ yWavelength;

    
    
    for (int i = 0; i <= depthSteps; i++)
    {
        float xOffset = xAmplitude * sin(xConstant + 0.8 * i);
        float yOffset = yAmplitude * map(sin(yConstant + 0.8 * i), -1.0, 1.0, -1.0, 0.0);
        float edgeLength = (distance / 4);
        float pyramidX = (width / 2.0) + xOffset;
        float pyramidZ = i * - distance * zfactor;
        float quadY = height / 2 * goldenRatio + yOffset;
        
        pushMatrix();
        
        translate(0, 0, pyramidZ);

        drawPyramid(edgeLength, -pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor));
        drawPyramid(edgeLength, pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor)); 
        drawQuad(groundObjectWidth, distance * (zfactor / 4), xOffset + getJitter(jitterFactor), quadY + getJitter(jitterFactor), getJitter(jitterFactor));   
        
        popMatrix();
    }   
    
    phase += 0.01;
    
    
    r = 300;
  
}

void drawPyramid(float t, float posX, float posY, float posZ) 
{ 
    
    stroke(0);
    
    //this pyramid has 4 sides, each drawn as a separate triangle
    //each side has 3 vertices, making up a triangle shape
    //the parameter " t " determines the squareWidth of the pyramid
    beginShape(TRIANGLES);
    
    vertex( -t + posX, -t + posY, -t + posZ);
    vertex(t + posX, -t + posY, -t + posZ);
    vertex(posX, height / 2 * goldenRatio + posY, posZ);
    
    vertex(t + posX, -t + posY, -t + posZ);
    vertex(t + posX, -t + posY, t + posZ);
    vertex(posX, height / 2 * goldenRatio + posY, posZ);
    
    vertex(t + posX, -t + posY, t + posZ);
    vertex( -t + posX, -t + posY, t + posZ);
    vertex(posX, height / 2 * goldenRatio + posY, posZ);
    
    vertex( -t + posX, -t + posY, t + posZ);
    vertex( -t + posX, -t + posY, -t + posZ);
    vertex(posX, height / 2 * goldenRatio + posY, posZ);
    
    endShape();
}

void drawQuad(float squareWidth, float squareDepth, float posX, float posY, float posZ)
{
    beginShape(QUAD);
    
    fill(currentFill);
    
    vertex(-squareWidth + posX, posY, posZ);
    vertex(posX, posY,  -squareDepth + posZ);
    vertex(squareWidth + posX, posY, posZ);
    vertex(posX, posY, squareDepth + posZ);
    
    endShape();
}


float getJitter(int factor)
{
    if(factor == 0)
    {
      return 0;
    }
    return (factor / 5) * random(-1.0, 1.0);
}

void drawMask()
{
    mask = createGraphics(width, height,P2D);
    mask.noSmooth();
    
    float phase = sin(frameCount/ 50.0);
    float offFactor = map(phase, -1.0, 1.0, 5.0, 1.0);
    float rFactor = map(phase, -1.0, 1.0, 0.1, 2.0);
    
    mask.beginDraw();
    mask.fill(0,0,0);
    mask.pushMatrix();
    mask.translate(width/2, height/2);
    mask.beginShape();
    for (float a = 0.0; a < TWO_PI; a += 0.01) {
      float xoff = map(cos(a), -1.0, 1.0, 0.0, offFactor);
      float yoff = map(sin(a), -1.0, 1.0, 0.0, offFactor);
      //r = map(noise(xoff, yoff,zoff), 0.0, 1.0, 100.0, 250.0) * ((float) frameCount)/velocity;
      r = map(noise(xoff, yoff,zoff), 0.0, 1.0, height/4, height/2) * rFactor;
      float x = r * cos(a);
      float y = r * sin(a);
      mask.vertex(x, y);
    }
    
    zoff += 0.01;
    
    mask.endShape(CLOSE);
    mask.popMatrix();
    mask.endDraw();
}

void drawSugaryScene()
{
  
  pg.shader(portalShader);
  //pg.smooth(2);
  //pg.perspective(fov, float(width)/float(height), 0.1, 1000);
  pg.beginDraw();
  {
    //pg.directionalLight(255, 255, 255, 0, 1, -1);
  pg.ambientLight(255, 255, 255);
  //pg.colorMode(ARGB, 255);    
  pg.background(63, 53, 100);
  pg.translate(width / 2, 0, -50);
  pg.stroke(orange.col1);
  pg.fill(orange.col1);
  
  float zfactor = map(sin(frameCount / zWavelength), -1.0, 1.0, 1.25, 1.25 + zAmplitude);
  float xConstant = frameCount / xWavelength;
  float yConstant = frameCount/ yWavelength;

    
  for (int i = 0; i < depthSteps; i++)
  {
      float xOffset = xAmplitude * sin(xConstant + 0.8 * i);
      float yOffset = yAmplitude * map(sin(yConstant + 0.8 * i), -1.0, 1.0, -1.0, 0.0);
      float edgeLength = ((float) distance) / 8.0;
      float pyramidX = (width / 2.0) + xOffset;
      float pyramidZ = i * - distance * zfactor;
      float quadY = height / 2 * goldenRatio + yOffset;
        
      pg.pushMatrix();
        
      pg.translate(0, 0, pyramidZ);

      drawGrape(edgeLength, -pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor));
      drawGrape(edgeLength, pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor)); 
      drawCircle(groundObjectWidth, distance * (zfactor / 4), xOffset + getJitter(jitterFactor), quadY + getJitter(jitterFactor), getJitter(jitterFactor), i);   
        
     pg.popMatrix();
     
  }
  
  }
  pg.endDraw();
}

void drawGrape(float r, float posX, float posY, float posZ) 
{  
    //this pyramid has 4 sides, each drawn as a separate triangle
    //each side has 3 vertices, making up a triangle shape
    //the parameter " t " determines the squareWidth of the pyramid
    
    pg.noStroke();
    pg.fill(orange.col1);

   
  
  
  float x;
  float z;
  float gridRadius = ((float) width) / 10.0;
  float rotationSteps;
  float heightFactor = 0.87;
  
  float h = posY;
  int layers = 8;
  
  pg.noStroke();
  pg.fill(orange.col1);
  
  for(int i = 0; i <= layers; i++)
  {
    int indexSkip = (i + 2) % colorList.size();
    pg.fill(colorList.get(indexSkip).col1);
    rotationSteps = gridRadius/r * PI;
    for(float a = 0.0; a < TWO_PI; a += TWO_PI / rotationSteps)
    {
      x = gridRadius * cos(a);
      z = gridRadius * sin(a);
      pg.pushMatrix();
      pg.translate(posX + x, h, posZ + z);
      pg.sphereDetail(10);
      pg.sphere(r);
      pg.popMatrix();
    }
     if(i == layers && gridRadius >= 4*r) //<>//
     {
       for(float thisGridRadius = gridRadius - 2*r; thisGridRadius >= r; thisGridRadius -= 2*r) //<>//
       {
        rotationSteps = thisGridRadius/r * PI;
        for(float a = 0.0; a < TWO_PI; a += TWO_PI / rotationSteps)
        {
          x = thisGridRadius * cos(a);
          z = thisGridRadius * sin(a);
          pg.pushMatrix();
          pg.translate(posX + x, h, posZ + z);
          pg.sphereDetail(10);
          pg.sphere(r);
          pg.popMatrix();
        }
       }
       return;
     }
     
     gridRadius *= heightFactor;
     h += 1.5 * r;
  }
}

void drawCircle(float squareWidth, float squareDepth, float posX, float posY, float posZ, int depthStep)
{  
    IntList indezes = colorOrder[depthStep];
    pg.pushMatrix();
    pg.translate(0,posY,0);
    pg.rotateX(PI/2);
    
    for(int i = 4; i >= 1; i--)
    {
      int index = indezes.get(i-1);
      println(index);
      pg.fill(colorList.get(index).col1);
      pg.stroke(colorList.get(index).col1);
      pg.pushMatrix();
      pg.translate(0, 0, 0.1 / (float) i);
      pg.ellipse(posX, 0, 2 * squareWidth * ((float) i/4.0), 2 * squareDepth * ((float) i/4.0));
      pg.popMatrix();
    }

    
    pg.popMatrix();
}

class ColorContainer {

color col1=color(0);

ColorContainer(color c_) {
   col1=c_;
} 

}// the constructor

void setUpIndexShuffle()
{
  for(int i = 0; i<colorOrder.length; i++)
  {
    IntList tempList = new IntList(0, 1, 2, 3);
    tempList.shuffle();
    colorOrder[i] = tempList;
  }
}
