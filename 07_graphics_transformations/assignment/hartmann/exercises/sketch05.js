
// Source and reference: https://editor.p5js.org/ri1/sketches/lYJKhcDDV

// This sketch nicely combines changes to the geometry with
// audio. Check it out and take it as an inspiration in the 
// first place. 

// Think about how you might make use of this in connection
// with the musical piece you have created.


let angle = 0;
let canvas;
let amplitude;
let vol;
let music;

function preload() {
    // TODO: 
    // Add a music file so that the sketch works
  music = loadSound("a_weird_morning.mp3");

}

function setup() {
  canvas = createCanvas(400, 400, WEBGL);
  canvas.mouseClicked(musicController);
  amplitude = new p5.Amplitude();

}

function draw() {
  background(175);
  normalMaterial();
  vol = amplitude.getLevel();

    // In the push() and pop() settings below, several rotation 
    // transformations are excuted. 
    // 1) How would you have to combine the rotation matrices into one?
    // 2) How would the applyMatrix() function look like?

    //in 1 I wrote down the seperate ones for the first torus, and the combined Y and Z for the second torus
    //in 2 I combined all three rotation matrices
    // I calculated that with matrix multiplication
    // in 3 I used both

  //1
  push()
  translate(0, -80);
  let s = sin(tan(angle));
  let c = cos(tan(angle));
  //rotateX(tan(angle));
  applyMatrix(1.0, 0.0, 0.0, 0.0,
               0.0,  c, -s, 0.0,
               0.0,  s,  c, 0.0,
               0.0, 0.0, 0.0, 1.0);
  //rotateY(tan(angle));
  applyMatrix(c, 0.0, s, 0.0,
              0.0,  1.0, 0.0, 0.0,
              -s,  0.0,  c, 0.0,
              0.0, 0.0, 0.0, 1.0);  
  // rotateZ(tan(angle));            
   applyMatrix(c, -s, 0.0, 0.0,
               s,  c, 0, 0.0,
               0.0,  0,  1.0, 0.0,
               0.0, 0.0, 0.0, 1.0);                       
  torus(40 + vol * 200, 10, 6);
  s = sin(angle);
  c = cos(angle);
  //rotateY(angle);
  //rotateZ(angle);
  //into one:
  applyMatrix(c**2, -s*c, s, 0,
              s,c, 0, 0,
              -s*c, s**2, c, 0,
              0,0, 0, 1);
  torus(20, 5, 6);
  pop()

  //2
  push()
  translate(-100, 30);
  s = sin(cos(angle));
  c = cos(cos(angle));
  //rotateX(cos(angle));
  //rotateY(cos(angle));
  //rotateZ(cos(angle));
  //into one:
  applyMatrix(c**2, -s*c, s, 0,
          c*s**2+c*s, c**2-s**3, c*s*(s-1), 0,
          s**2-c**2*s, s*(c+s**2), c**2, 0,
          0,0,0,1 ); 
  torus(40 + vol * 200, 10, 6);
  rotateY(angle);
  rotateZ(angle);
  torus(20, 7, 6);
  pop()

  //3
  push()
  translate(100, 30);
  s = sin(sin(angle));
  c = cos(sin(angle));
  //rotateX(sin(angle));
  //rotateY(sin(angle));
  //rotateZ(sin(angle));
  applyMatrix(c**2, -s*c, s, 0,
          c*s**2+c*s, c**2-s**3, c*s*(s-1), 0,
          s**2-c**2*s, s*(c+s**2), c**2, 0,
          0,0,0,1 ); 
  torus(40 + vol * 200, 10, 6);
  // rotateY(-angle);
  // rotateZ(-angle);
  s = sin(-angle);
  c = cos(-angle);
  applyMatrix(c**2, -s*c, s, 0,
            s,c, 0, 0,
            -s*c, s**2, c, 0,
            0,0, 0, 1);
  torus(20, 8, 6);
  pop()
  

  angle += 0.003

}

function musicController() {
  if (music.isPlaying()) {
    music.stop();
  } else {
    music.play()
  }
}