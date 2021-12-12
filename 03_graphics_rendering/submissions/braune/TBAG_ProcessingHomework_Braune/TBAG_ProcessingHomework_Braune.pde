// Particle Code by Daniel Shiffman
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_027_FireWorks/Processing
// modified colors
// Rest by me (Marco Braune)


/*

Comment Angela:
- What about moving this to 3D? Benefits and drawbacks? 
- pgFireworks is not being used, is it? What was the reasoning behind it?

*/

ArrayList<Firework> fireworks;
PVector gravity = new PVector(0, 0.1);
PGraphics pgSkyline, pgFireworks;
PImage img;

void setup(){
  //fullScreen();
  size(1080,720,P2D); //use this for best performance
  pgSkyline = createGraphics(width, height);
  pgFireworks = createGraphics(width, height);
  

  pgSkyline.beginDraw();
  pgSkyline.background(0,0);
  createSkyline();
  pgSkyline.endDraw();
  pgSkyline.save("pgSkyline.png");
  fireworks = new ArrayList<Firework>();
  img = loadImage("pgSkyline.png");

  
}

void draw() {
  
  drawBackground();
  if (random(1) < 0.07) {
    fireworks.add(new Firework());
  }

  for (int i = fireworks.size()-1; i >= 0; i--) {
    Firework f = fireworks.get(i);
    f.run();
    if (f.done()) {
      fireworks.remove(i);
    }
  }
  image(img,0,0);
}


void drawBackground(){
  for (int i=0; i<height; i++){
    stroke(0,0,i);
    line(0,i,width,i);
  }
}

void createSkyline(){
  int houseWidth, houseHeight;
  pgSkyline.noStroke();
  
  //back row
  pgSkyline.fill(100,100,200);
  for(int i=0; i<width; i+=1){
    houseWidth = int(random(100,175));
    houseHeight = int(random(70,height-350));
    pgSkyline.rect(i*(houseWidth/2), height-houseHeight, houseWidth, houseHeight);
  }
  
  //middle row
  pgSkyline.fill(30,30,60);
  for(int i=0; i<width; i+=1){
    houseWidth = int(random(50,180));
    houseHeight = int(random(50,height-400));
    pgSkyline.rect(i*(houseWidth/2), height-houseHeight, houseWidth, houseHeight);
  }
 
  //front row
  pgSkyline.fill(0,0,0);
  for(int i=0; i<width; i+=1){
    houseWidth = int(random(50,150));
    houseHeight = int(random(40,height-450));
    pgSkyline.rect(i*(houseWidth/2), height-houseHeight, houseWidth, houseHeight);
  }
  
}
