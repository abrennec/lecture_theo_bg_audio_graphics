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

void setup() { 
  size(640, 480, P3D);
  noStroke();  
  frameRate(30);

  oscP5 = new OscP5(this, 12000);
  myRemoteLocation = new NetAddress("127.0.0.1", 57120);

  a = new ArmElement(0, default_len);
  a.setColor(color(random(0,255)));

  PMatrix3D m = new PMatrix3D(); // origin, link to 'a'
  a.setReference(m); 

  arms = new ArmElement[30];
  arms[0] = a;
} 

void draw() {

  //float l = (mouseX / (float) width) * 90f;
  // Convert it to radians
 //theta = radians(l);

  //t = (t + 0.01) % (4*PI);

  updateModel();
  a.sendState(oscP5, myRemoteLocation);
  setGlobals();
  //drawCoords();

  for (int i = 0; i < arms.length; i++) {
    if (arms[i] != null)
      arms[i].draw();
  }
}

void mouseClicked () { 
  if (index < arms.length-1 && arms[index] != null) 
    drawBranch(arms[index].getLen());
}

void drawBranch(float len) {
  len *= 0.66f;
  for (int i = 0; i < 2; i++) {
    if (len > 10) {
      index++;
      println(index);
      b = new ArmElement(index, len);
      b.setColor(color(random(0, 255), random(0, 255), random(0, 255)));
      arms[index] = b;
      if (arms[index] != null){
      b.setReference(arms[index-1].effectorCoord);
      b.updateState(0, 0, 0);
      }
    }
  }
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
