
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
  music = loadSound("LornForecast.mp3")

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

    let cos_x = cos(angle);
    let sin_x = sin(angle);
    let cos_y = cos(angle);
    let sin_y = sin(angle);
    let cos_z = cos(angle);
    let sin_z = sin(angle);

    // Matrix for rotation around the Y axis
    applyMatrix(            cos_y * cos_z,                                cos_y * sin_z,                      -sin_y,     0.0,
                 sin_x * sin_y * cos_z - cos_x * sin_z,     sin_x * sin_y * sin_z + cos_x * cos_z,        sin_x * cos_y,  0.0,
                 cos_x * sin_y * cos_z + sin_x * sin_z,     cos_x * sin_y * sin_z - sin_x * cos_z,        cos_x * cos_y,  0.0,
                                0.0,                                        0.0,                               0.0,       1.0);

      // aAAAAAAAAHHHHHHHHHH hat geklappt!!!! nach der ganzen abschreiberei 
      // von hier : https://math.stackexchange.com/questions/1882276/combining-all-three-rotation-matrices
  // rotateX(sin(angle));
  // rotateY(sin(angle));
  // rotateZ(sin(angle));
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