// Mondrian Exercise 2
// Grow3Drian

int randomColorAssigner;

void setup() {
  size(1000, 1000, P3D);
  background(0);
  frameRate(10);
  //noLoop();
}

void draw(){
  //redraw bg every tick
  background(0);
  
  //thick black outline
  stroke(0);
  strokeWeight(13);
  
  //create the squares
  for (int i=0; i<50; i++) {
    
    //Grow3drian
    
    //for some reason, there's more boxes in the corner, when I don't matrixpush/pop it. Where did they come from?
    pushMatrix();
    //this vvv makes a funky result!!
    //translate( width/2 , height/2 , 0);
    
    box(random(10, frameCount * 4), random(10, frameCount * 4), random(-frameCount * 4, frameCount * 4));
    popMatrix();
    
    randomColorAssigner = int(random(1, 7));
    
    //decide the color for the rect:
    //BLACK:
    if (randomColorAssigner == 1){
      fill(0);
    }
    //WHITE:
    if (randomColorAssigner == 2){
      fill(255);
    }
    //GRAY:
    if (randomColorAssigner == 3){
      fill(150);
    }
    //RED:
    if (randomColorAssigner == 4){
      fill(225,20,0);
    }
    //BLUE:
    if (randomColorAssigner == 5){
      fill(0,20,225);
    }
    //YELLOW:
    if (randomColorAssigner == 6){
      fill(255,220,25);
    }   
  }
}

/*
void mousePressed() {
  redraw();
}
*/
