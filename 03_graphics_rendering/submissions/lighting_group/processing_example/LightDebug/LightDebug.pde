import controlP5.*;

ControlP5 cp5;
DropdownList d1;
ColorPicker cp1, cp2 ;
Textlabel TextlabelCp1;
Textlabel TextlabelCp2;

String lightTypes[] = {"ambientLight", "directionalLight", "spotLight", "pointLight"};
int strength;
int distance;
boolean lights;
String currentLightType = "";
color sphereColor = color(200, 50, 50);
color lightColor = color(255, 200, 200);

PImage img;

void setup() {
  size(1280, 720, P3D);

  img = loadImage("checker.jpg");
  cp5 = new ControlP5(this);
  cp5.setAutoDraw(false);
  Label.setUpperCaseDefault(false);
  cp5.setColorForeground(color(55, 55, 55));
  cp5.setColorBackground(color(55, 25, 25));
  cp5.setColorActive(color(95, 95, 95));

  cp5.begin(100, 50);

  //cp5.addSlider("strength", 0, 1000).linebreak();
  //cp5.addSlider("distance", 0, 500).linebreak();
  //cp5.addToggle("toggle")
  //  .setSize(10, 10)
  //  .setValue(true)
  //  .setCaptionLabel("nolights()/lights()");

  //color picker + label for sphere color
  TextlabelCp1 = cp5.addTextlabel("sphereColorLabel")
    .setText("material color")
    .setPosition(50, 30)
    .setColor(color(255, 255, 255))
    ;
  cp1 = cp5.addColorPicker("sphereColor")
    .setPosition(50, 50)
    .setColorValue(color(200, 50, 50))
    .setCaptionLabel("Sphere Color");

  //color picker + label for light color
  TextlabelCp2 = cp5.addTextlabel("lightColorLabel")
    .setText("light color")
    .setPosition(50, 130)
    .setColorValue(color(255, 255, 255));
  cp2 = cp5.addColorPicker("lightColor")
    .setPosition(50, 150)
    .setColorValue(color(255, 200, 200))
    .setCaptionLabel("Light Color");



  // create a DropdownList
  d1 = cp5.addDropdownList("light type list")
    .setPosition(50, 250);
  customize(d1); // customize the first list
}


void draw() {

  background(0);
  cp5.draw();

  if (currentLightType == "ambientLight") {
    ambientLight(red(lightColor), green(lightColor), blue(lightColor));
  } else if (currentLightType == "directionalLight") {
    directionalLight(red(lightColor), green(lightColor), blue(lightColor), 0, 1, 0);
  } else if (currentLightType == "spotLight") {
    spotLight(red(lightColor), green(lightColor), blue(lightColor), width/2 -100, height/2 - 50, 100, 0, 0.2, -1, PI/4, 1);
  } else if (currentLightType == "pointLight") {
    pointLight(red(lightColor), green(lightColor), blue(lightColor), width/2, height/2, 400);
  }


  pushMatrix();
  translate(width/2, height/2, -200);
  noStroke();
  fill(sphereColor);
  sphere(112);
  popMatrix();

  pushMatrix();
  translate(width/2-200, height/2, -400);
  rotateY(1.25);
  rotateX(-0.4);
  box(100);
  popMatrix();

  pushMatrix();
  translate(width/2, height/2 + 100, 0);
  //fill(color(100, 100, 100));
  beginShape();
    texture(img);
  vertex(-500, 20, 500,0,1280);
  vertex(500, 20, 500,1280,1280);
  vertex(500, 0, -500, 1280,0);
  vertex(-500, 0, -500,0, 0);
  endShape(CLOSE);
  popMatrix();
}


void toggle(boolean b) {
  lights = !b;
  println(b);
}




void controlEvent(ControlEvent theEvent) {
  // DropdownList is of type ControlGroup.
  // A controlEvent will be triggered from inside the ControlGroup class.
  // therefore you need to check the originator of the Event with
  // if (theEvent.isGroup())
  // to avoid an error message thrown by controlP5.

  if (theEvent.isGroup()) {
    // check if the Event was triggered from a ControlGroup
    //println("event from group : "+theEvent.getGroup().getValue()+" from "+theEvent.getGroup());
  } else if (theEvent.isController()) {
    //println("event from controller : "+theEvent.getController().getValue()+" from "+theEvent.getController().getName());
    if (theEvent.getController().getName() == "light type list") {
      currentLightType = lightTypes[int(theEvent.getController().getValue())];
    }
  }

  if (theEvent.isFrom(cp1)) {
    int r = int(theEvent.getArrayValue(0));
    int g = int(theEvent.getArrayValue(1));
    int b = int(theEvent.getArrayValue(2));
    int a = int(theEvent.getArrayValue(3));
    sphereColor = color(r, g, b);
    //println("event\talpha:"+a+"\tred:"+r+"\tgreen:"+g+"\tblue:"+b+"\tcol"+col);
  }
  if (theEvent.isFrom(cp2)) {
    int r = int(theEvent.getArrayValue(0));
    int g = int(theEvent.getArrayValue(1));
    int b = int(theEvent.getArrayValue(2));
    int a = int(theEvent.getArrayValue(3));
    lightColor = color(r, g, b);
    //println("event\talpha:"+a+"\tred:"+r+"\tgreen:"+g+"\tblue:"+b+"\tcol"+col);
  }
}



void customize(DropdownList ddl) {
  // a convenience function to customize a DropdownList
  ddl.setItemHeight(20);
  ddl.setBarHeight(15);

  for (int i=0; i<lightTypes.length; i++) {
    ddl.addItem(lightTypes[i], i);
  }
  ddl.setCaptionLabel(lightTypes[2]);
  ddl.setValue(2);
  ddl.close();
}
