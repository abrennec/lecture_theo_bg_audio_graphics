PGraphics pg;
PGraphics mask;
PShader portalShader;

Boolean trigger = true;

final static int depthSteps = 12;
final static int distance = 200;
final static float goldenRatio = 1.618033988749;
int currentFill;
int jitterFactor = 0;
final static float fov = PI/3.0;

final static float xWavelength = 62.0;
final static float yWavelength = 37.0;
final static float zWavelength = 150.0;

final static float xAmplitude = 50.0;
final static float yAmplitude = 30.0;
final static float zAmplitude = 1.2;

float phase = 0.0;
float zoff = 0.0;
float r;
float velocity = 1.0;

void preload()
{
  
}

void setup() 
{
    //Anwendung passiert in drawSecondScene();
    portalShader = loadShader("mask.glsl");
      
    //fullScreen(P3D);
    size(1000, 700, P3D);
    smooth(2);
    frameRate(30);

    //perspective(fov, float(width)/float(height), 0.1, 1000);
    
    currentFill = 15;
}

void mouseReleased() 
{
    jitterFactor = 30;
}

void draw() 
{   
    //directionalLight(255, 255, 255, 0, -1, -1);
    //ambientLight(102, 102, 102);
    background(245);
    translate(width / 2, 0, -50);
    stroke(currentFill);
    fill(currentFill);
    float zfactor = map(sin(frameCount / zWavelength), -1.0, 1.0, 1.25, 1.25 + zAmplitude);

    
    for (int i = 0; i <= depthSteps; i++)
    {
        float xOffset = xAmplitude * sin((frameCount / xWavelength) + 0.8 * i);
        float yOffset = yAmplitude * map(sin((frameCount / yWavelength) + 0.8 * i), -1.0, 1.0, -1.0, 0.0);
        float edgeLength = (distance / 4);
        float pyramidX = (width / 2.0) + xOffset;
        float pyramidZ = i * - distance * zfactor;
        float quadY = height / 2 * goldenRatio + yOffset;
        
        pushMatrix();
        
        translate(0, 0, pyramidZ);

        drawPyramid(edgeLength, -pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor));
        drawPyramid(edgeLength, pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor)); 
        drawQuad(200, distance * (zfactor / 4), xOffset + getJitter(jitterFactor), quadY + getJitter(jitterFactor), getJitter(jitterFactor));   
        
        popMatrix();
    }   
    
        phase += 0.01;
    
    
    r = 300;
    
    
    drawMask();
    drawSecondScene();
    
    if(jitterFactor > 0) jitterFactor--;
    
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
    return (factor / 5) * random(-1.0, 1.0);
}

void drawMask()
{
    mask = createGraphics(width, height,P2D);
    mask.noSmooth();
    
    mask.beginDraw();
    mask.fill(0,0,0);
    mask.pushMatrix();
    mask.translate(width/2, height/2);
    mask.beginShape();
    for (float a = 0.0; a < TWO_PI; a += 0.02) {
      float xoff = map(cos(a), -1.0, 1.0, 0.0, 2.0);
      float yoff = map(sin(a), -1.0, 1.0, 0.0, 2.0);
      //r = map(noise(xoff, yoff,zoff), 0.0, 1.0, 100.0, 250.0) * ((float) frameCount)/velocity;
      r = map(noise(xoff, yoff,zoff), 0.0, 1.0, height/4, height/2) * map(sin(frameCount/ 20.0), -1.0, 1.0, 0.1, 2.0);
      float x = r * cos(a);
      float y = r * sin(a);
      mask.vertex(x, y);
    }
    
    zoff += 0.01;
    
    mask.endShape(CLOSE);
    mask.popMatrix();
    mask.endDraw();
}

void drawSecondScene()
{
  pg = createGraphics(width, height, P3D);
  
  pg.shader(portalShader);
  pg.smooth(2);

  //pg.perspective(fov, float(width)/float(height), 0.1, 1000);
  pg.beginDraw();
  {
    pg.directionalLight(255, 255, 255, 0, 1, -1);
  pg.ambientLight(102, 102, 102);
  //pg.colorMode(ARGB, 255);    
  pg.background(76, 0, 158);
  pg.translate(width / 2, 0, -50);
  pg.stroke(227, 117, 0);
  pg.fill(227, 117, 0);
  
  float zfactor = map(sin(frameCount / zWavelength), -1.0, 1.0, 1.25, 1.25 + zAmplitude);

    
  for (int i = 0; i <= depthSteps; i++)
  {
      float xOffset = xAmplitude * sin((frameCount / xWavelength) + 0.8 * i);
      float yOffset = yAmplitude * map(sin((frameCount / yWavelength) + 0.8 * i), -1.0, 1.0, -1.0, 0.0);
      float edgeLength = (distance / 4);
      float pyramidX = (width / 2.0) + xOffset;
      float pyramidZ = i * - distance * zfactor;
      float quadY = height / 2 * goldenRatio + yOffset;
        
      pg.pushMatrix();
        
      pg.translate(0, 0, pyramidZ);

      drawSecondPyramid(edgeLength, -pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor));
      drawSecondPyramid(edgeLength, pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor)); 
      drawSecondQuad(200, distance * (zfactor / 4), xOffset + getJitter(jitterFactor), quadY + getJitter(jitterFactor), getJitter(jitterFactor));   
        
     pg.popMatrix();
     
  }
  
  }
  pg.endDraw();
  
  portalShader.set("mask",mask);
  portalShader.set("maskThis",pg);
  
  filter(portalShader);
  pg = null;
}

void drawSecondPyramid(float t, float posX, float posY, float posZ) 
{ 
    
    //this pyramid has 4 sides, each drawn as a separate triangle
    //each side has 3 vertices, making up a triangle shape
    //the parameter " t " determines the squareWidth of the pyramid
    pg.beginShape(TRIANGLES);
    
    pg.vertex( -t + posX, -t + posY, -t + posZ);
    pg.vertex(t + posX, -t + posY, -t + posZ);
    pg.vertex(posX, height / 2 * goldenRatio + posY, posZ);
    
    pg.vertex(t + posX, -t + posY, -t + posZ);
    pg.vertex(t + posX, -t + posY, t + posZ);
    pg.vertex(posX, height / 2 * goldenRatio + posY, posZ);
    
    pg.vertex(t + posX, -t + posY, t + posZ);
    pg.vertex( -t + posX, -t + posY, t + posZ);
    pg.vertex(posX, height / 2 * goldenRatio + posY, posZ);
    
    pg.vertex( -t + posX, -t + posY, t + posZ);
    pg.vertex( -t + posX, -t + posY, -t + posZ);
    pg.vertex(posX, height / 2 * goldenRatio + posY, posZ);
    
    pg.endShape();
}

void drawSecondQuad(float squareWidth, float squareDepth, float posX, float posY, float posZ)
{
    pg.beginShape();
    
    pg.vertex(-squareWidth + posX, posY, posZ);
    pg.vertex(posX, posY,  -squareDepth + posZ);
    pg.vertex(squareWidth + posX, posY, posZ);
    pg.vertex(posX, posY, squareDepth + posZ);
    
    pg.endShape();
}
