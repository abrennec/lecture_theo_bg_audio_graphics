/**
* Mesh Net
* https://openprocessing.org/sketch/309044
* @author aa_debdeb
* @date 2016/02/24
*/


ArrayList<PVector> positions;

void setup(){
  size(500, 500, P2D);
  frameRate(30);
  background(0);
  stroke(255, 100);
  
  positions = new ArrayList<PVector>();
  
}

void draw(){
  if(mousePressed){
    float x = mouseX + map(random(1), 0, 1, -30, 30);
    float y = mouseY + map(random(1), 0, 1, -30, 30);
    PVector newPos = new PVector(x, y);
    for(PVector pos : positions){
      if(PVector.dist(newPos, pos) < 50){
        line(newPos.x, newPos.y, pos.x, pos.y);
      }
    }
    positions.add(newPos);
  }
}
