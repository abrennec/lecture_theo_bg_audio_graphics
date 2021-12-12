// I followed along this tutorial (see: https://www.youtube.com/watch?v=aMWUHISmMJE) and developed it a bit further to let particles flow based on image data

float speed = 30;
float noiseScale = 0.0005;
int angleRange = 8;
// color range bigger than 1 -> more colorful, smaller than 1 -> less colorfull
float colorRange = 10;
int colorRangeShift = 150;


int particleCount = 2000;
ArrayList<Particle> particles = new ArrayList(0);

PImage img;
int imgIndex = 0;
String[] filenames = { "maria.jpg", "nike.jpg", "texture.jpg", "cat.jpg" };;
PImage[] images = new PImage[filenames.length];



void setup()
{


  for (int i=0; i < filenames.length; i++){
    String imageName = filenames[i];
    images[i] = loadImage(imageName);
  }
  img = images[imgIndex];
  colorMode(HSB);
  //set seed for exact same result every run -> random spwan positions still influence result
  noiseSeed(2);

  size(1000, 1000, P3D);
  background(0);


  for (int i = 0; i < particleCount; i++) {
    particles.add(new Particle(random(width), random(height)));
  }
}


void mouseClicked()
{
  //for (int i = 0; i < 100; i++) {
  //  particles.add(new Particle(random(width), random(height)));
  //}
  
  particles.clear();
  
   for (int i = 0; i < particleCount; i++) {
    particles.add(new Particle(random(width), random(height)));
  }
  
 background(0);
  if (imgIndex < filenames.length -1) {
    imgIndex++;
  } else imgIndex = 0;
  img = images[imgIndex];
}

void draw() {
  translate(width/7, 0, -200);
  rotateY(PI/5);

  //background(0);

  // Comment Angela: Why do you use push. and popMatrix?
  pushMatrix();
  for (Particle p : particles)
  {
    p.update();
  }
  popMatrix();
}
