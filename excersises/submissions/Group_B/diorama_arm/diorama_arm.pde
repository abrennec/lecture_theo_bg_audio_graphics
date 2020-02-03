import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

int igelNum = 15;

ArmElement a, b;
ArmElement c[] = new ArmElement[igelNum];
float t, igel, fan, bewegungVal;

boolean bewegung = false;

void setup() { 
  size(640, 480, P3D);
  noStroke();  
  frameRate(30);

  oscP5 = new OscP5(this, 12000);
  myRemoteLocation = new NetAddress("127.0.0.1", 57120);

  a = new ArmElement(0, 100);
  a.setColor(color(0, 250, 0));

  b = new ArmElement(1, 50);
  b.setColor(color(150, 250, 50));

  for ( int i = 0; i < c.length; i++) {
    c[i] = new ArmElement(2, 50);
    c[i].setColor(color(150+((1+i)%(igelNum/4)*30), 150, 250));
  }

  PMatrix3D m = new PMatrix3D(); // origin, link to 'a'
  a.setReference(m);
  b.setReference(a.coordSystem);
  for ( int i = 0; i < c.length; i++) {
    c[i].setReference(b.coordSystem);
  }
} 

void draw() {

  t = map(mouseX, 0, width, -PI, PI);

  // update model
  updateModel();

  bewegungVal = float(int(bewegung));
  sendVal(oscP5, myRemoteLocation, "bewegung", bewegungVal); // 0 or 1
  sendVal(oscP5, myRemoteLocation, "igel", igel); // 1 to max igelNum 

  // draw routine
  setGlobals();
  //drawCoords();

  a.draw();
  b.draw();

  igel = map(mouseY, 0, height, 1, igelNum);
  for ( int i = 0; i <= igel; i++) {
    c[i].draw();
  }
}

void updateModel() {
  a.updateState(0, t, PI/4); 
  b.setReference(a.effectorCoord);
  b.updateState(sin(t), 0, cos(t));

  // last arm fans out
  fan = map(mouseY, 0, height, -0.2, -0.8);
  for ( int i = 0; i < c.length; i++) {
    c[i].setReference(b.effectorCoord);
    c[i].updateState(TWO_PI/igelNum*(i+1), fan, 0);
  }

  // is the mouse moving?
  if (mouseX==pmouseX || mouseY==pmouseY) {
    bewegung = false;
  } else {
    bewegung = true;
  }
}
