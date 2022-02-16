float x1= 0;
float y1= 0;
float x2= 0;
float y2= 0;
void setup()
{
  fullScreen();
  frameRate(1);
  noStroke();
}

  void draw() {  
  background(226,226,235);

x1= random(0, width);
y1= random(0, height);

x2= random(0, width);
y2= random(0, height);

  //LINE  
stroke(29,24,24);
strokeWeight(15);  
line(0, y1, width, y1);
 
 //LINE  
stroke(29,24,24);
strokeWeight(15);  
line(0, y2, width, y2);


 //LINE  
stroke(29,24,24);
strokeWeight(15);  
line(x1, 0, x1, height);

 //LINE 
stroke(29,24,24);
strokeWeight(15);  
line(x2, 0, x2, height);


stroke(29,24,24);
strokeWeight(15);  
line(random(x1, x2), random(y1, y2), random(x1, x2), random(y1, y2));

  // RED
push();
fill(233,60,60);
stroke(29,24,24);
strokeWeight(15);
translate(random (0, 800), y1);
rect(0, 0, random(50, 600), random(150, 560));
pop();



  // YELLOW
push();
fill(250,221,3);
stroke(29,24,24);
strokeWeight(15);
translate(x1, random (0, 800));
rect(0, 0, random(80, 1000), random(80, 600));
pop();


 //BLUE 
 push();
 fill(96,67,174);
 stroke(29,24,24);
 strokeWeight(15);    
 translate(x1, random (0, 800));
 rect(0, 0, random(110, 560), random(150, 560));
 pop(); 



  //BLUE 
  //  push();
  //  fill(96,67,174);
  //  stroke(29,24,24);
   // strokeWeight(15);    
  //  translate(random (50, 100),random (100, 500));
  //  rect(0, 0, random(110, 560), random(150, 560));
  //  pop();
 
 // YELLOW
  // push();
  // fill(253,233,1);
  // stroke(29,24,24);
  // strokeWeight(15);
  // translate(random (300, 1000),random (300, 500));
  // rect(0, 0, random(1600, 0), random(0, 600));
  // pop();
 
  // RED
  // push();
  // fill(233,60,60);
  // stroke(29,24,24);
  // strokeWeight(15);
  // translate(random (200, 400),random (200, 400));
  // rect(0, 0, random(1, 1560), random(1150, 1560));
  // pop();

 //LINE 
  // stroke(29,24,24);
  // strokeWeight(15);  
  // x= random(0, width);
  // line(x, 0, x, height);
 
 
 // WHITE
 // push();
 // fill(245,254,251);
 // stroke(29,24,24);
 // strokeWeight(20);
 // translate(random (0, 100),random (0, 50));
 // rect(0, 0,random(0, 600),random(0,600));
 // pop();
 
 //WHITE 
 // push();
 // fill(226,226,235);
 // stroke(29,24,24);
 // strokeWeight(20);
 // translate(random (0, 100),random (0, 50));
 // rect(0, 0, random(200, 600),random(200,600));
 // pop();

}
