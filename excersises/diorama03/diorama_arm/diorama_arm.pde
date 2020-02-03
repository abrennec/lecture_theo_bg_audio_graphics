import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

ArmElement a, b, c;
float t;

void setup() { 
  size(640, 480, P3D);
  noStroke();  
  frameRate(30);

  oscP5 = new OscP5(this,12000);
  myRemoteLocation = new NetAddress("127.0.0.1",57120);
  
  a = new ArmElement(0, 100);
  a.setColor(color(200, 0, 0));

  b = new ArmElement(1, 50);
  b.setColor(color(0, 200, 00));

  c = new ArmElement(2, 200);
  c.setColor(color(0, 0, 200));

  PMatrix3D m = new PMatrix3D(); // origin, link to 'a'
  a.setReference(m);
  b.setReference(a.coordSystem);
  c.setReference(b.coordSystem);
} 

void draw() {
  
  t = (t + 0.01) % (4*PI);
  
  // update model
  updateModel();
    
  // send state
  a.sendState(oscP5, myRemoteLocation);
  b.sendState(oscP5, myRemoteLocation);
  c.sendState(oscP5, myRemoteLocation);
    
  // draw routine
  setGlobals();
  //drawCoords();
  
  a.draw();
  b.draw();
  c.draw();
}

void updateModel() {
  a.updateState(0, sin(t), cos(t*2)); 
  b.setReference(a.effectorCoord);
  b.updateState(sin(t), 0, cos(t/2));
  c.setReference(b.effectorCoord);
  c.updateState(0, sin(t), -cos(t));
}
