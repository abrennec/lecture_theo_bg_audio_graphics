import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

ArmElement rootArm, arm_1, arm_2,arm_3, arm_4, arm_1_1, arm_1_2, arm_2_1, arm_2_2, arm_3_1, arm_3_2, arm_4_1, arm_4_2;
float t;

void setup() { 
  size(640, 480, P3D);
  noStroke();  
  frameRate(30);

  oscP5 = new OscP5(this,12000);
  myRemoteLocation = new NetAddress("127.0.0.1",57120);
  
  rootArm = new ArmElement(0, 100);
  rootArm.setColor(color(150, 150, 150));

  arm_1 = new ArmElement(1, 50);
  arm_1.setColor(color(200, 200, 200));
  arm_2 = new ArmElement(2, 50);
  arm_2.setColor(color(200, 200, 200));
  arm_3 = new ArmElement(11, 50);
  arm_3.setColor(color(200, 200, 200));
  arm_4 = new ArmElement(11, 50);
  arm_4.setColor(color(200, 200, 200));
  
  arm_1_1 = new ArmElement(3, 50);
  arm_1_1.setColor(color(250, 250, 250));
  arm_1_2 = new ArmElement(4, 50);
  arm_1_2.setColor(color(250, 250, 250));
  
  arm_2_1 = new ArmElement(5, 50);
  arm_2_1.setColor(color(250, 250, 250));
  arm_2_2 = new ArmElement(6, 50);
  arm_2_2.setColor(color(250, 250, 250));
  
  arm_3_1 = new ArmElement(7, 50);
  arm_3_1.setColor(color(250, 250, 250));
  arm_3_2 = new ArmElement(8, 50);
  arm_3_2.setColor(color(250, 250, 250));
  
  arm_4_1 = new ArmElement(7, 50);
  arm_4_1.setColor(color(250, 250, 250));
  arm_4_2 = new ArmElement(8, 50);
  arm_4_2.setColor(color(250, 250, 250));
  


  PMatrix3D m = new PMatrix3D(); // origin, link to 'a'
  rootArm.setReference(m);
  
  arm_1.setReference(rootArm.coordSystem);
  arm_2.setReference(rootArm.coordSystem);
  arm_3.setReference(rootArm.coordSystem);
  arm_4.setReference(rootArm.coordSystem);
  
  
  arm_1_1.setReference(arm_1.coordSystem);
  arm_1_2.setReference(arm_1.coordSystem);
  
  arm_2_1.setReference(arm_2.coordSystem);
  arm_2_2.setReference(arm_2.coordSystem);
  
  arm_3_1.setReference(arm_3.coordSystem);
  arm_3_2.setReference(arm_3.coordSystem);
  
  arm_4_1.setReference(arm_4.coordSystem);
  arm_4_2.setReference(arm_4.coordSystem);

} 

void draw() {
  
  t = (t + 0.01) % (4*PI);
  
  // update model
  updateModel();
    
  // send state
  rootArm.sendState(oscP5, myRemoteLocation);
  arm_1.sendState(oscP5, myRemoteLocation);
  arm_2.sendState(oscP5, myRemoteLocation);
    
  // draw routine
  setGlobals();
  //drawCoords();
  
  rootArm.draw();
  
  arm_1.draw();
  arm_2.draw();
  arm_3.draw();
  arm_4.draw();
  
  arm_1_1.draw();
  arm_1_2.draw();
  arm_2_1.draw();
  arm_2_2.draw();
  
  arm_3_1.draw();
  arm_3_2.draw();
  
  arm_4_1.draw();
  arm_4_2.draw();
}

void updateModel() {
  rootArm.updateState(0.7, 1.5, 1);          //a.updateState(0, sin(t), cos(t)); 
  arm_1.setReference(rootArm.effectorCoord);
  arm_1.updateState(sin(t), 0, cos(t/2));
  arm_2.setReference(rootArm.effectorCoord);
  arm_2.updateState(0, sin(t), -cos(t));
  arm_3.setReference(rootArm.effectorCoord);
  arm_3.updateState(0, -sin(t), -cos(t));
  arm_4.setReference(rootArm.effectorCoord);
  arm_4.updateState(0, -sin(t), cos(t));
  
  arm_1_1.setReference(arm_1.effectorCoord);
  arm_1_1.updateState(sin(t), 0, cos(t/2));
  arm_1_2.setReference(arm_1.effectorCoord);
  arm_1_2.updateState(0, sin(t), -cos(t));
  
  arm_2_1.setReference(arm_2.effectorCoord);
  arm_2_1.updateState(0, sin(t), -cos(t));
  arm_2_2.setReference(arm_2.effectorCoord);
  arm_2_2.updateState(sin(t), 0, cos(t/2));
  
  arm_3_1.setReference(arm_3.effectorCoord);
  arm_3_1.updateState(0, sin(t), -cos(t));
  arm_3_2.setReference(arm_3.effectorCoord);
  arm_3_2.updateState(sin(t), 0, cos(t/2));
  
  arm_4_1.setReference(arm_4.effectorCoord);
  arm_4_1.updateState(0, sin(t), -cos(t));
  arm_4_2.setReference(arm_4.effectorCoord);
  arm_4_2.updateState(sin(t), 0, cos(t/2));
}
