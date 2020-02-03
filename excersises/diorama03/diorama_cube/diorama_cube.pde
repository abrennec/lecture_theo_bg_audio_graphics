import oscP5.*;
import netP5.*;
  
OscP5 oscP5;
NetAddress myRemoteLocation;

Cube c;


float t;

void setup() { 
  size(640, 480, P3D);
  noStroke();  
  frameRate(30);

  oscP5 = new OscP5(this,12000);
  myRemoteLocation = new NetAddress("127.0.0.1",57120);
  
  c = new Cube(0);
  c.setColor(color(50, 55, 100));
  PMatrix3D m = new PMatrix3D();
  m.translate(10, 100, 200);
  c.setReference(m);
} 

void draw() {
  
    t = (t + 0.01) % (4*PI);
    c.updateStateFor(t); // update model
    
    // send state
    c.sendState(oscP5, myRemoteLocation);
    
    // draw routine
    setGlobals();
    drawCoords();

    c.draw(); // draw cube
}

class Cube { 
  int index;
  color myColor;
  PMatrix3D referenceSystem;
  PMatrix3D coordSystem;
  PVector origin;
  PVector size;

  Cube (int index) {
    this.index = index;
    myColor = color(128); 
    coordSystem = new PMatrix3D();
    referenceSystem = new PMatrix3D();
    size = new PVector(10, 10, 10);
  } 
  void draw() {
    push();
    fill(myColor);
    applyMatrix(coordSystem);
    box(size.x, size.y, size.z); 
    pop();
  }
  void sendState(OscP5 me, NetAddress target) {
    OscMessage myMessage = new OscMessage("/cube");
  
    myMessage.add(this.index);

    // send translation elements of matrix 
    // (i.e. local coordinate system origin)
    myMessage.add(coordSystem.m03);
    myMessage.add(coordSystem.m13);
    myMessage.add(coordSystem.m23);

    // send message
    me.send(myMessage, target);

  }
  void setColor(color c) {
    myColor = c;
  }
  void setSize(PVector newSize) {
    size = newSize; // !!! reference assignment
  }
  void setReference(PMatrix3D coords) {
    referenceSystem = coords;  // !!! reference assignment
  }
  void updateStateFor(float t) {
    coordSystem = referenceSystem.get(); // get is like copy but called 'get'
    coordSystem.rotateX(t/2);
    coordSystem.rotateY(t*2);
    coordSystem.translate(
      sin(t) * 20,
      sin(2*t) * 20,
      cos(t) * 20
    );
    
  }
} 

void drawCoords() {
  push();
  translate(100, 0, 0);
  fill(255, 0, 0);
  box(200, 1, 1);
  pop();
  
  push();
  translate(0, 100, 0);
  fill(0, 255, 0);
  box(1, 200, 1);
  pop();

  push();
  translate(0, 0, 100);
  fill(0, 0, 255);
  box(1, 1, 200);
  pop();
}

void setGlobals(){
  lights();
  background(210);
  translate(width/2, height/2); 
  
  rotateX(0.75*PI);
  rotateY(0.75*PI);
  drawCoords(); // x-red, y-green, z-blue
}
