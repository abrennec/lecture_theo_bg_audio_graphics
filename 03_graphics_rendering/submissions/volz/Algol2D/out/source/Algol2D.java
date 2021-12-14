/* autogenerated by Processing revision 1277 on 2021-12-08 */
import processing.core.*;
import processing.data.*;
import processing.event.*;
import processing.opengl.*;

import java.util.HashMap;
import java.util.ArrayList;
import java.io.File;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;

public class Algol2D extends PApplet {

// Processing 
PShape s;
final float scaleStep = 0.7f;
final float goldenRatio = 1.618033988749f;
final float pillarThickness = width / (20 * goldenRatio);
float halfWidth;
float halfHeight;


 public void setup()
{                                               // **change** void setup() to function setup()
    /* size commented out by preprocessor */;                            // **change** createCanvas() to createCanvas()
    
    halfWidth = width * 0.5f;
    halfHeight = height * 0.5f;
    /* smooth commented out by preprocessor */;

}

 public void draw() 
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
<<<<<<< HEAD
  
  /* 
  pushMatrix();
  scale(scaleStep);
  triangle(120, 300, 232, 80, 344, 300);
  popMatrix(); 
  */
=======
>>>>>>> 8bac93bb68f823559f3224ecebe198d08528b57f
}


  public void settings() { size(800, 600);
smooth(8); }

  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Algol2D" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
