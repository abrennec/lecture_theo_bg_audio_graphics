
//exercise05


let angle = 0;
let canvas;
let amplitude;
let vol;
let music;

function preload() {
    // TODO: 
    // Add a music file so that the sketch works
  music = loadSound("747sound.mp3")

}

function setup() {
  canvas = createCanvas(400, 400, WEBGL);
  canvas.mouseClicked(musicController);
  amplitude = new p5.Amplitude();

}

function draw() {
  let s = sin(tan(angle));
  let c = cos(tan(angle));

  background(175);
  normalMaterial();
  vol = amplitude.getLevel();

    // In the push() and pop() settings below, several rotation 
    // transformations are excuted. 
    // 1) How would you have to combine the rotation matrices into one?
    // 2) How would the applyMatrix() function look like?

  //1

  push()
  translate(0, -80);

  //X
  applyMatrix
  (  1, 0, 0, 0,
     0, c, -s, 0,
     0, s,  c,  0,
     0, 0, 0,  1);

   //Y
   applyMatrix
   (  c, 0, -s, 0,
     0, 1, 0, 0,
     s, 0, c, 0,
     0, 0, 0, 1);

   //Z
   applyMatrix
   (  c, -s, 0, 0,
     s, c, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1);
       
  //rotateX(tan(angle));
  //rotateY(tan(angle));
  //rotateZ(tan(angle));
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
