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
  music = loadSound("./Audio.mp3")

}

function setup() {
  canvas = createCanvas(400, 400, WEBGL);
  canvas.mouseClicked(musicController);
  amplitude = new p5.Amplitude();

}

function draw() {
  background(vol);
  normalMaterial();
  

    // In the push() and pop() settings below, several rotation 
    // transformations are excuted. 
    // 1) How would you have to combine the rotation matrices into one?
    // 2) How would the applyMatrix() function look like?

  //1
  push()
  translate(0, -80);
  rotateX(tan(angle));
  rotateY(tan(angle));
  rotateZ(tan(angle));
  torus(40 + vol * 200, 10, 6);
  rotateY(angle);
  rotateZ(angle);
  torus(20, 5, 6);
  pop()

  //2
  push()
  translate(-100, 30);
  rotateX(cos(angle));
  rotateY(cos(angle));
  rotateZ(cos(angle));
  torus(40 + vol * 200, 10, 6);
  rotateY(angle);
  rotateZ(angle);
  torus(20, 7, 6);
  pop()

  //3
  push()
  translate(100, 30);
  rotateX(sin(angle));
  rotateY(sin(angle));
  rotateZ(sin(angle));
  torus(40 + vol * 200, 10, 6);
  rotateY(-angle);
  rotateZ(-angle);
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