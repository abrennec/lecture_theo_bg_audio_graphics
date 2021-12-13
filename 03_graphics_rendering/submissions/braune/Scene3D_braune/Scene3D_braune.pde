// Particle Code by Daniel Shiffman
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_027_FireWorks/Processing
float sizeX,sizeY,sizeZ;
int houseAmount;
ArrayList<Firework> fireworks;
PVector gravity = new PVector(0, 0.2);
void setup() {
  size(1080,720,P3D);
  sizeX = width/2;
  sizeY = height/2;
  sizeZ = 0;
  noStroke();
  background(0,14,40); 
  houseAmount = 10;
  fireworks = new ArrayList<Firework>();
  

}

void draw() {
  
  background(0,14,40);
  camera(mouseX, mouseY, (height/2) / tan(PI/6), mouseX, height/2, 0, 0, 1, 0);
  
  directionalLight(253, 255, 179, 0.1, 1, 0.3);
  translate(sizeX,sizeY,sizeZ);
  pushMatrix();
  translate(275,50, 275);
  box(700, 10, 700);
  popMatrix();
  createSkyline();
  
  if (random(1) < 0.2) {
    fireworks.add(new Firework());
  }

  //background(0,14,40);
  //translate(width/2, height, -1000);
  //rotateY(frameCount*0.003);




  for (int i = fireworks.size()-1; i >= 0; i--) {
    Firework f = fireworks.get(i);
    f.run();
    if (f.done()) {
      fireworks.remove(i);
    }
  }
}


void createSkyline(){
  for(int x=0; x<=5; x++){
    for(int z=0; z<=5; z++){
      pushMatrix();
      translate(x*100, 0, z*100);
      box(50, 100, 50);
      popMatrix();
    }
  }
}
