float x1= 0;
float y1= 0;
float x2= 0;
float y2= 0;
void setup()
{
  fullScreen(P3D);
  frameRate(1);
  noStroke();
  smooth(5);

}

  void draw() {  
  background(226,226,235);
lights();  
 

x1= random(0, width);
y1= random(0, height);

x2= random(0, width);
y2= random(0, height);

  // RED
pushMatrix();
fill(233,60,60);
  // stroke(29,24,24);
  // strokeWeight(15);
translate(random (0, 800), y1);
box(random (0, 800), random(50, 600), random(150, 560));
popMatrix();

pushMatrix();
fill(233,60,60);
  // stroke(29,24,24);
  // strokeWeight(15);
translate(random (0, 800), y2);
box(random (0, 800), random(80, 1000), random(80, 600));
popMatrix();

  // YELLOW
pushMatrix();
fill(250,221,3);
  // stroke(29,24,24);
  // strokeWeight(15);
translate(x1, random (0, 800));
box(random (0, 800), random(50, 600), random(150, 560));
popMatrix();

pushMatrix();
fill(250,221,3);
  // stroke(29,24,24);
  // strokeWeight(15);
translate(x2, random (0, 800));
box(random (0, 800), random(80, 1000), random(80, 600));
popMatrix();

 //BLUE 
pushMatrix();
fill(96,67,174);
  // stroke(29,24,24);
  // strokeWeight(15);    
translate(x1, random (0, 800));
box(random (0, 800), random(110, 560), random(150, 560));
popMatrix(); 

pushMatrix();
fill(96,67,174);
  // stroke(29,24,24);
  // strokeWeight(15);    
translate(x2, random (0, 800));
box(random (0, 800), random(110, 560), random(150, 560));
popMatrix(); 


 // WHITE
   // pushMatrix();
   // fill(245,254,251);
   // stroke(29,24,24);
   // strokeWeight(20);
   // translate(random (0, 100),random (0, 50));
   // box(random(10, 600), random(00, 230),random(240,650));
   // popMatrix(); 
 
 //WHITE 
  //  pushMatrix();
  //  fill(226,226,235);
  //  stroke(29,24,24);
  //  strokeWeight(15);
  //  translate(random (0, 100),random (0, 50));
  //  box(random(200, 600), random(200, 600),random(200,600));
  //  popMatrix(); 

}
