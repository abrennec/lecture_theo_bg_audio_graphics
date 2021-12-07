// Mondrian Exercise 1
// Growdrian

int randomColorAssigner;

void setup() {
  size(1000, 1000);
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
    
    //just random mondrians:
    //rect( random(-50, width), random(-50, height), random(50, 300), random(50, 300) );
    
    //multiplying shit with the frameCount:
    rect( random(-50, frameCount * 4), random(-50, frameCount * 4), random(50, frameCount * 4), random(50, frameCount * 4) );
    
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

void mousePressed() {
  redraw();
}
