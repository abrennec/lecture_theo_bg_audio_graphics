import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

float theta;
ArmElement a, b;
float t;
int index = 0;
ArmElement[] arms;

void setup() { 
  size(640, 480, P3D);
  noStroke();  
  frameRate(30);

  oscP5 = new OscP5(this, 12000);
  myRemoteLocation = new NetAddress("127.0.0.1", 57120);

  a = new ArmElement(0, 200);
  a.setColor(color(random(100, 200)));

  //PMatrix3D m = new PMatrix3D(); // origin, link to 'a'
  //a.setReference(m); 

  arms = new ArmElement[15];
  arms[0] = a;
} 

void draw() {
  
  float l = (mouseX / (float) width) * 90f;
  // Convert it to radians
  theta = radians(l);
  
  t = (t + 0.01) % (4*PI);

  // update model
  updateModel();

  // send state
  a.sendState(oscP5, myRemoteLocation);
  //b.sendState(oscP5, myRemoteLocation);

  // draw routine
  setGlobals();
  //drawCoords();

  //a.draw();
  //b.draw();

  for (int i = 0; i < arms.length; i++) {
    if (arms[i] != null)
      arms[i].draw();
  }
}

void mouseClicked () { 
  index++;
  drawBranch(arms[index-1].getLen(), index);
}

void drawBranch(float len, int _index) {
  len *= 0.66f;

  b = new ArmElement(_index, len);
  
  b.setColor(color(random(0, 255),random(0, 255),random(0, 255)));
  arms[_index] = b;
  b.setReference(arms[_index-1].coordSystem);
}

void updateModel() {
  a.updateState(0, 0.75 * PI, 0);
  if (index != 0)
    arms[index].setReference(arms[index-1].effectorCoord);
    //b.updateState(sin(t), 0, cos(t/2));
    arms[index].updateState(0, 45, 0);
}
