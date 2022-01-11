/**
 * Original sketch taken from Processing Examples/Topics/Shaders
 *
 * Toon Shading.
 * 
 * Example showing the use of a custom lighting shader in order  
 * to apply a "toon" effect on the scene. Based on the glsl tutorial 
 * from lighthouse 3D:
 * http://www.lighthouse3d.com/tutorials/glsl-tutorial/toon-shader-version-ii/
 */

PShader toon;
boolean enableShader = false;  
boolean drawPolygon = false;
boolean directionalLight = false;

void setup() {

  //fullScreen(P3D);
  size(640, 560, P3D);

  noStroke();
  fill(204);

  toon = loadShader("ToonFrag.glsl", "ToonVert.glsl");
}


void draw() {

  if (enableShader == true) {
    shader(toon);
  }
  else {
    ambientLight(34, 34, 44);
  }

  if (drawPolygon) {
    stroke(122);
  } else {
    noStroke();
  }

  background(0); 

  float dirY = (mouseY / float(height) - 0.30) * 8;
  float dirX = (mouseX / float(width) - 0.5) * 8;

  printMatrix();
  
  // check out: lightFalloff, 
  
  if (directionalLight) {
    directionalLight(204, 204, 204, -dirX, -dirY, -1);
  }
  else {
    pointLight(74, 204, 204, mouseX, mouseY, -mouseY/2);
  }
  
  pushStyle();
  fill(255);
  ellipse(mouseX, mouseY, 20, 20);
  popStyle();

  
  pushMatrix();
  translate(width/2, height/4, -200);
  sphere(80);
  popMatrix();


  pushMatrix();
  rectMode(CENTER);
  translate(width/2, height/5 * 4, -100);
  //rotateX(map(mouseY, 0, height, 0, TWO_PI));
  rotateX(PI/2);
  rect(0, 0, 400, 150);
  popMatrix();
  
  
  printProjection();
}  


void keyPressed() {

  switch (key) {

    case ('1'):
    toggleShader();
    break;
    case ('2'):
    togglePolygon();
    break;
    case ('3'):
    toggleLight();
    break;
  }
}



void toggleShader() {

  if (enableShader) 
  {
    enableShader = false;
    resetShader();
  } else 
  {
    enableShader = true;
  }
}


void togglePolygon() {

  if (drawPolygon) 
  {
    drawPolygon = false;
  } else 
  {
    drawPolygon = true;
  }
}

void toggleLight() {

  if (directionalLight) 
  {
    directionalLight = false;
  } else 
  {
    directionalLight = true;
  }
}
