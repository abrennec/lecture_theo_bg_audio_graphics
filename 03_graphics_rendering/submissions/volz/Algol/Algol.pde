final int depthSteps = 7;
final int distance = 200;
final float goldenRatio = 1.618033988749;
int currentFill;

void setup() 
{
    size(800, 600, P3D);
    smooth(8);
    
    currentFill = 15;
}

void draw() 
{   
    directionalLight(255, 255, 255, 0, -1, -1);
    ambientLight(102, 102, 102);
    background(245);
    translate(width / 2, 0, -50);
    stroke(currentFill);
    fill(currentFill);
    // rotateX(PI / 2);
    float zfactor = map(sin(frameCount / 53.0), -1.0, 1.0, 1.0, 1.5);
    
    for (int i = 0; i <= depthSteps; i++)
    {
        float xfactor = 30 * sin((frameCount / 47.0) + 0.8 * i);
        float yfactor = 30 * map(sin((frameCount / 37.0) + 0.8 * i), -1.0, 1.0, -1.0, 0.0);
        drawPyramid(distance / 4, -(width / 2.0) + xfactor, yfactor, i * - distance * zfactor);
        drawPyramid(distance / 4, (width / 2.0) + xfactor, yfactor, i * - distance * zfactor); 
        drawQuad(200, distance * (zfactor / 2)/ 4, xfactor, height / 2 * goldenRatio + yfactor, i * - distance * zfactor);     
    }
    
    // for (int i = 0; i <= depthSteps; i++)
    // {
    //     drawPyramid(50.0, -squareWidth / 2.0, i * - distance * zfactor, height / 2.0);
    //     drawPyramid(50.0, squareWidth / 2.0, i * - distance * zfactor, height / 2.0);
// }
    
    
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
