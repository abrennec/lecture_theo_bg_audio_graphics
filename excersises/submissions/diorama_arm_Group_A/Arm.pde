class ArmElement { 
  int index;
  color myColor;
  float length;

  PMatrix3D referenceSystem;
  PMatrix3D coordSystem;
  PMatrix3D effectorCoord;

  ArmElement (int index, float length) {
    this.index = index;
    this.length = length;
    myColor = color(128); 
    coordSystem = new PMatrix3D();
    referenceSystem = new PMatrix3D();
  }
  
  public float getLen(){
   return this.length; 
  }

  void draw() {
    push();
    fill(myColor);
    applyMatrix(coordSystem);
    translate(length*0.5, 0, 0);
    box(length, 5, 5); 
    pop();
  }
  void sendState(OscP5 me, NetAddress target) {
    OscMessage myMessage = new OscMessage("/arm");
  
    myMessage.add(this.index);
    myMessage.add(mouseX);
    myMessage.add(mouseX/2);

    // send translation elements of matrix 
    // (i.e. local coordinate system origin)
    //myMessage.add(effectorCoord.m03 / 300); // approx. scale to -1..1
    //myMessage.add(effectorCoord.m13 / 300);
    //myMessage.add(effectorCoord.m23 / 300);

    // send message
    me.send(myMessage, target);

  }
  void setColor(color c) {
    myColor = c;
  }
  void setReference(PMatrix3D coords) {
    referenceSystem = coords;  // !!! reference assignment
  }
  void updateState(float roll, float pitch, float yaw) {
    coordSystem = referenceSystem.get(); // get is like copy but called 'get'
    coordSystem.rotateX(roll);   
    coordSystem.rotateY(pitch);   
    coordSystem.rotateZ(yaw);

    effectorCoord = coordSystem.get();
    effectorCoord.translate(length, 0, 0);
    
  }
} 
