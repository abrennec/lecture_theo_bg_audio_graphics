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

void setGlobals() {
  lights();
  background(10);
  translate(width/2, height/2); 

  rotateX(0.75*PI);
  rotateY(0.75*PI);
}

void sendVal(OscP5 me, NetAddress target, String name, float value) {
  OscMessage myMessage = new OscMessage(name);
  myMessage.add(value);
  // send message
  me.send(myMessage, target);
}
