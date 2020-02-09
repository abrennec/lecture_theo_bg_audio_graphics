import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

float theta;
ArmElement a, b;
float t;
int index = 0;
ArmElement[] arms;
float default_len = 200;
color col;
color col2;
color col3;

void setup() { 
  size(640, 480, P3D);
  //noStroke();  
  frameRate(30);

  oscP5 = new OscP5(this, 12000);
  myRemoteLocation = new NetAddress("127.0.0.1", 57120);

  a = new ArmElement(0, default_len);
  a.setColor(color(random(0, 255)));

  PMatrix3D m = new PMatrix3D(); // origin, link to 'a'
  a.setReference(m); 

  arms = new ArmElement[30];
  arms[0] = a;
  col = color(random(0,255),random(0,255),random(0,255));
  col2 = color(random(0,255),random(0,255),random(0,255));
  col3 = color(random(0,255),random(0,255),random(0,255));
} 

void draw() {
  background(0);
  frameRate(15);
  strokeWeight(2);

  float l = (mouseX / (float) width) * 90f;
  theta = radians(l);

  //t = (t + 0.01) % (4*PI);

  //updateModel();
  a.sendState(oscP5, myRemoteLocation);
  //setGlobals();
  //drawCoords();

  //for (int i = 0; i < arms.length; i++) {
  //if (arms[i] != null)
  //   arms[i].draw();
  // }

  translate(width/2, height);
  // Draw a line 120 pixels
  line(0, 0, 0, -120);
  // Move to the end of that line
  translate(0, -120);
  // Start the recursive branching!
  drawBranch(120);
}

void mouseClicked () { 
  if (index < arms.length-1 && arms[index] != null) 
    drawBranch(arms[index].getLen());
}

void drawBranch(float len) {
  stroke(col2);
  len *= 0.66f;
  if (len > 2) {
    push();    
    stroke(col);
    if (len > 2 && len <= 10) {
      rotate(theta);
    } else {
      rotate(radians((width * 0.75f) /(float) width * 90f));
    }
    line(0, 0, 0, -len); 
    translate(0, -len); 
    drawBranch(len);       
    pop();     
    
    push();
    stroke(col2);
    if (len > 2 && len <= 10) {
      rotate(-theta);
    } else {
      rotate(-radians((width * 0.75f) /(float) width * 90f));
    }
    line(0, 0, 0, -len);
    translate(0, -len);
    drawBranch(len);
    pop();
  }

    //index++;
    //println(index);
    //b = new ArmElement(index, len);
    //b.setColor(color(random(0, 255), random(0, 255), random(0, 255)));
    //arms[index] = b;
    //if (arms[index] != null) {
    //  b.setReference(arms[index-1].effectorCoord);
    // b.updateState(0, 0, 0);
    //}
  //}
}

void updateModel() {
  a.updateState(0, PI * 0.75, 0);
  if (index != 0 && index < arms.length) {
    if (arms[index] != null) {
      arms[index].setReference(arms[index-1].coordSystem);
      arms[index].updateState(0, 45, 0);
    }
  }
  //b.updateState(sin(t), 0, cos(t/2));
}
