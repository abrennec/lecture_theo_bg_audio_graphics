let pg;
let mask;
let portalShader;

let trigger = true;

const depthSteps = 12;
const distance = 200;
const goldenRatio = 1.618033988749;
let currentFill;
let jitterFactor = 0;
const fov = Math.floorPI/3.0;

const xWavelength = 62.0;
const yWavelength = 37.0;
const zWavelength = 150.0;

const xAmplitude = 50.0;
const yAmplitude = 30.0;
const zAmplitude = 1.2;

let phase = 0.0;
let zoff = 0.0;
let r;
let velocity = 1.0;

function preload()
{
  
}

function setup() 
{
    portalShader = loadShader("basic.vert", "mask.frag");
      
    //fullScreen(P3D);
    createCanvas(1000, 700, WEBGL);
    //smooth(2);

    //perspective(fov, width / height, 0.1, 500);
    
    currentFill = 15;
}

function mouseReleased() 
{
    jitterFactor = 30;
}

function draw() 
{   
    directionalLight(255, 255, 255, 0, -1, -1);
    ambientLight(102, 102, 102);
    background(245);
    translate(0, -height/2, -50);


    stroke(currentFill);
    fill(currentFill);

    let zfactor = map(sin(frameCount / zWavelength), -1.0, 1.0, 1.25, 1.25 + zAmplitude);

    
    for (let i = 0; i <= depthSteps; i++)
    {
        let xOffset = xAmplitude * sin((frameCount / xWavelength) + 0.8 * i);
        let yOffset = yAmplitude * map(sin((frameCount / yWavelength) + 0.8 * i), -1.0, 1.0, -1.0, 0.0);
        let edgeLength = (distance / 4.0);
        let pyramidX = (width / 2.0) + xOffset;
        let pyramidZ = i * - distance * zfactor;
        let quadY = height / 2.0 * goldenRatio + yOffset;
        
        push();
        
        translate(0, 0, pyramidZ);

        drawPyramid(edgeLength, -pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor));
        drawPyramid(edgeLength, pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor)); 
        drawQuad(200, distance * (zfactor / 4), xOffset + getJitter(jitterFactor), quadY + getJitter(jitterFactor), getJitter(jitterFactor));   
        
        pop();
    }   
    

    
    

    
    
    drawMask();
    
    
    drawSecondScene();
    
    if(jitterFactor > 0) jitterFactor--;
    
}


function drawPyramid(t, posX, posY, posZ) 
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

function drawQuad(squareWidth, squareDepth, posX, posY, posZ)
{
    beginShape();
    
    fill(currentFill);
    
    vertex(-squareWidth + posX, posY, posZ);
    vertex(posX, posY,  -squareDepth + posZ);
    vertex(squareWidth + posX, posY, posZ);
    vertex(posX, posY, squareDepth + posZ);
    
    endShape();
}

function drawMask()
{
    mask = createGraphics(width, height,P2D);
    //mask.noSmooth();
    //mask.perspective(fov, float(width)/float(height), 0.1, 20000);
   // shader(portalShader);
    
    //mask.beginDraw();
    mask.fill(0,0,0);
    mask.push();
    mask.translate(width/2, height/2);
    mask.beginShape();
    for (let a = 0.0; a < (Math.PI * 2); a += 0.02) {
      let xoff = map(cos(a), -1.0, 1.0, 0.0, 2.0);
      let yoff = map(sin(a), -1.0, 1.0, 0.0, 2.0);
      //r = map(noise(xoff, yoff,zoff), 0.0, 1.0, 100.0, 250.0) * ((float) frameCount)/velocity;
      r = map(noise(xoff, yoff,zoff), 0.0, 1.0, height/5, height/2) * map(sin(frameCount/ 20.0), -1.0, 1.0, 0.1, 2.0);
      let x = r * cos(a);
      let y = r * sin(a);
      mask.vertex(x, y);
    }
    
    zoff += 0.01;
    
    mask.endShape(CLOSE);
    mask.pop();

    phase += 0.01;
    
}


function getJitter(factor)
{
    return (factor / 5) * random(-1.0, 1.0);
}

function drawSecondScene()
{
  pg = createGraphics(width, height, WEBGL);
  {
    pg.directionalLight(255, 255, 255, 0, 1, -1);
  pg.ambientLight(102, 102, 102);
  //pg.colorMode(ARGB, 255);    
  pg.background(76, 0, 158);
  pg.translate(0, -height/2, -50);
  pg.stroke(227, 117, 0);
  pg.fill(227, 117, 0);
  
  let zfactor = map(sin(frameCount / zWavelength), -1.0, 1.0, 1.25, 1.25 + zAmplitude);

    
  for (let i = 0; i <= depthSteps; i++)
  {
      let xOffset = xAmplitude * sin((frameCount / xWavelength) + 0.8 * i);
      let yOffset = yAmplitude * map(sin((frameCount / yWavelength) + 0.8 * i), -1.0, 1.0, -1.0, 0.0);
      let edgeLength = (distance / 4);
      let pyramidX = (width / 2.0) + xOffset;
      let pyramidZ = i * - distance * zfactor;
      let quadY = height / 2 * goldenRatio + yOffset;
        
      pg.push();
        
      pg.translate(0, 0, pyramidZ);

      drawSecondPyramid(edgeLength, -pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor));
      drawSecondPyramid(edgeLength, pyramidX + getJitter(jitterFactor), yOffset + getJitter(jitterFactor), getJitter(jitterFactor)); 
      drawSecondQuad(200, distance * (zfactor / 4), xOffset + getJitter(jitterFactor), quadY + getJitter(jitterFactor), getJitter(jitterFactor));   
        
     pg.pop();
     
  }
  
  }

  portalShader.setUniform("mask",mask);
  portalShader.setUniform("maskThis",pg);
  
  pg.shader(portalShader);

  //( masked = pg.get()).mask(mask);
  //image(masked, 0, 0);
  
  pushMatrix();
  translate(0,0,50);
  image(pg,-width/2,0, width, height);
  popMatrix();
  //pg.dispose();
  
  //shader(portalShader);
  //portalShader.set("tex", pg);
  mask.remove();
  pg.remove();
}

function drawSecondPyramid(t, posX, posY, posZ) 
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

function drawSecondQuad(squareWidth, squareDepth, posX, posY, posZ)
{
    pg.beginShape();
    
    pg.vertex(-squareWidth + posX, posY, posZ);
    pg.vertex(posX, posY,  -squareDepth + posZ);
    pg.vertex(squareWidth + posX, posY, posZ);
    pg.vertex(posX, posY, squareDepth + posZ);
    
    pg.endShape();
}