import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

int igelNum = 15;

ArmElement a, b, a2, b2, a3, b3;
ArmElement c[] = new ArmElement[igelNum];
ArmElement c2[] = new ArmElement[igelNum];
ArmElement c3[] = new ArmElement[igelNum];

float t, igel, fan, bewegungVal;

boolean bewegung = false;
public void settings() {
  size(640, 480,P3D);
}
void setup() { 
  //size(640, 480, P3D);
  noStroke();  
  frameRate(30);

  oscP5 = new OscP5(this, 12000);
  myRemoteLocation = new NetAddress("127.0.0.1", 57120);

  // Stem #1
  a = new ArmElement(0, 100);
  a.setColor(color(0, 250, 0));
  b = new ArmElement(1, 50);
  b.setColor(color(150, 250, 50));

 // Stem #2
  a2 = new ArmElement(2, 100);
  a2.setColor(color(0, 250, 0));
  b2 = new ArmElement(3, 50);
  b2.setColor(color(150, 250, 50));

 // Stem #3
  a3 = new ArmElement(2, 100);
  a3.setColor(color(0, 250, 0));
  b3 = new ArmElement(3, 50);
  b3.setColor(color(150, 250, 50));

  // Igels
  for ( int i = 0; i < c.length; i++) {
    c[i] = new ArmElement(2, 50);
    c[i].setColor(color(150+((1+i)%(igelNum/4)*30), 150, 250));

    c2[i] = new ArmElement(2, 50);
    c2[i].setColor(color(150+((1+i)%(igelNum/4)*30), 150, 250));

    c3[i] = new ArmElement(2, 50);
    c3[i].setColor(color(150+((1+i)%(igelNum/4)*30), 150, 250));
  }

  PMatrix3D m = new PMatrix3D(); // origin, link to 'a'
  a.setReference(m);
  b.setReference(a.coordSystem);
  a2.setReference(m);
  b2.setReference(a2.coordSystem);
  a3.setReference(m);
  b3.setReference(a3.coordSystem);

  for ( int i = 0; i < c.length; i++) {
    c[i].setReference(b.coordSystem);
    c2[i].setReference(b.coordSystem);
    c3[i].setReference(b.coordSystem);
  }
} 

void draw() {

  t = map(mouseX, 0, width, -PI, PI);

  // update model
  updateModel();

  bewegungVal = float(int(bewegung));
  if(bewegungVal > 0) sendVal(oscP5, myRemoteLocation, "/bewegung", bewegungVal); // 0 or 1
  //sendVal(oscP5, myRemoteLocation, "igel", igel); // 1 to max igelNum 

  // draw routine
  setGlobals();
  //drawCoords();

  a.draw();
  b.draw();

  a2.draw();
  b2.draw();

  a3.draw();
  b3.draw();

  igel = map(mouseY, 0, height, 1, igelNum);
  for ( int i = 0; i <= igel; i++) {
    c[i].draw();
    c2[i].draw();
    c3[i].draw();
  }
}

void updateModel() {
  a.updateState(0, t, PI/4); 
  b.setReference(a.effectorCoord);
  b.updateState(sin(t), 0, cos(t));

  a2.updateState(1, t, PI/4); 
  b2.setReference(a2.effectorCoord);
  b2.updateState(sin(t), 0, cos(t));

  a3.updateState(4, t, PI/4); 
  b3.setReference(a3.effectorCoord);
  b3.updateState(sin(t), 0, cos(t));


  // last arm fans out
  fan = map(mouseY, 0, height, -0.2, -0.8);
  for ( int i = 0; i < c.length; i++) {
    c[i].setReference(b.effectorCoord);
    c[i].updateState(TWO_PI/igelNum*(i+1), fan, 0);

    c2[i].setReference(b2.effectorCoord);
    c2[i].updateState(TWO_PI/igelNum*(i+1), fan, 0);

    c3[i].setReference(b3.effectorCoord);
    c3[i].updateState(TWO_PI/igelNum*(i+1), fan, 0);
  }

  // is the mouse moving?
  if (mouseX==pmouseX || mouseY==pmouseY) {
    bewegung = false;
  } else {
    bewegung = true;
  }
}
