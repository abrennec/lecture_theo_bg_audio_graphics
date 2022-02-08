// Tillman Schäuble
// Creative Technologies - TBAG February 2022

// Draw Snake
int leftXstart = 300;
int leftYstart = 540;
int leftXend = 1660;
int leftYend = 540;
int rightXstart = 1960;
int rightYstart = 300;

// Snake Animation
float ang1;
float mod1 = 530;
float mod2 = 530;
float angle1;

// Technical Functionality
boolean alreadyAdded;
boolean kRel;
int nun;


// Fundamental variable for this sketch - movement, audio, and graphics generation rely on it.
float amp = 0.0;


//Globe[] globes = new Globe[10];
ArrayList<GlobeFar> globesFar = new ArrayList<GlobeFar>();
ArrayList<GlobeNear> globesNear = new ArrayList<GlobeNear>();

Message message;


// Sound Stuff
import processing.sound.*;
SoundFile globesTrack;
AudioIn in;
FFT fft;

int bands = 512;
float smoothingFactor = 0.7;
float[] fftSum = new float[bands];


void setup() {
  size(1960, 1080, P3D);
  colorMode(HSB, 360, 100, 100);
  smooth(8);

  message = new Message();

  globesTrack = new SoundFile(this, "TBAG_track_1.wav");
  globesTrack.amp(0.0);
  globesTrack.play();
  globesTrack.loop();

  fft = new FFT(this, bands);
  fft.input(globesTrack);
  
}


void draw() {

  background(267, 50, 50);
  lights();
  
  // Display starting message (see class 'Message')
  message.display();
  
  // Draw Snake - Initial State
  push();
  translate(0, 0, -800);
  for (int i = 0; i < 100; i = i+5) {
    for (int j = 0; j < 100; j = j+7)
      drawSnake(600, 500+j, 800+i, mod1, 1280, mod2, leftXend, leftYend);
  }
  pop();

  // Animate Snake + Volume Fade + generate globes
  if (keyPressed) {
    modulateSnake();
    ampInc();

  } else {
    modulateSnake();
    ampDec();
  }



  // Generate n number of globes randomly, if snake is moving.
  if (amp > 0.0) {
    int r = int(random(20));

    if (r == 4) {
      globesFar.add(new GlobeFar());
    } else if (r == 8) {
      globesNear.add(new GlobeNear());
    }
  }


  // Display Globes
  for (int i = 0; i < globesFar.size(); i++) {
    GlobeFar glF = globesFar.get(i);
    glF.move(amp);
    glF.display(amp);
    if (glF.kill == true) {
      globesFar.remove(i);
    }
  }

  for (int i = 0; i < globesNear.size(); i++) {
    GlobeNear glN = globesNear.get(i);
    glN.move(amp);
    glN.display(amp);
    if (glN.kill == true) {
      globesNear.remove(i);
    }
  }
  
  saveFrame("output/image#####.png");
  
}



// "amp" is used for volume increase / decrease as well as snake modulation
void ampInc() {
  if (amp <= 1.0) {
    amp += 0.001;
    globesTrack.amp(amp);
  }
}

void ampDec() {
  if (amp >= 0.0) {
    amp -= 0.001;
    globesTrack.amp(amp);
  }
}


void drawSnake(float ctrlx1, float ctrly1, float ctrlx2, float ctrly2, float ctrlx3, float ctrly3, float ctrlx4, float ctrly4) {
  noFill();
  stroke(0);

  beginShape();
  curveVertex(leftXstart, leftYstart); // the first control point
  curveVertex(leftXstart, leftYstart); // is also the start point of curve
  curveVertex(ctrlx1, ctrly1);
  curveVertex(ctrlx2, ctrly2);
  curveVertex(ctrlx3, ctrly3);
  curveVertex(ctrlx4, ctrly4); // the last point of curve
  curveVertex(leftXend, leftYend); // is also the last control point
  endShape();
}

void modulateSnake() {
  angle1 += amp;
  float ang1 = radians(angle1);
  mod1 = leftYstart + (200 * sin(ang1));
  mod2 = leftYstart + (300 * -sin(ang1));
}
