
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
  music = loadSound("./song.mp3")

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
    // Through multiplication
    // 2) How would the applyMatrix() function look like?

  //1



  push()
  translate(0, -80);
  let st = sin(tan(angle));
  let ct = cos(tan(angle));

//   //rotateX(tan(angle));
//  applyMatrix(  1.0, 0.0,  0.0,  0.0,
//     0.0, ct, -st,  0.0,
//     0.0, st,  ct,  0.0,
//     0.0, 0.0, 0.0,  1.0);

//   //rotateY(tan(angle));
//   applyMatrix(  ct, 0.0,  -st,  0.0,
//     0.0, 1.0, 0.0,  0.0,
//     st, 0.0,  ct,  0.0,
//     0.0, 0.0, 0.0,  1.0);

//   //rotateZ(tan(angle));
//   applyMatrix(  ct, -st,  0.0,  0.0,
//     st, ct, 0.0,  0.0,
//     0.0, 0.0,  1.0,  0.0,
//     0.0, 0.0, 0.0,  1.0);

 //combined XYZ

applyMatrix(  ct**2, ct*st,  -st,  0.0,
    st**2*ct-ct*st, st**3+ct**2, st*ct,  0.0,
    ct*st*ct+st**2, ct*st**2-st*ct, ct**2,  0.0,
    0.0, 0.0, 0.0,  1.0);

  torus(40 + vol * 200, 10, 6);

  // rotateY(angle);
  // rotateZ(angle);

//  //rotateY(angle);
//   applyMatrix(  cyz, 0.0,  -syz,  0.0,
//     0.0, 1.0, 0.0,  0.0,
//     syz, 0.0,  cyz,  0.0,
//     0.0, 0.0, 0.0,  1.0);

//   //rotateZ(angle);
//   applyMatrix(  cyz, -syz,  0.0,  0.0,
//     syz, cyz, 0.0,  0.0,
//     0.0, 0.0,  1.0,  0.0,
//     0.0, 0.0, 0.0,  1.0);

//   //rotateYZ(angle) COMBINED;

let syz = sin(angle);
let cyz = cos(angle);

  applyMatrix(  cyz**2, -syz*cyz,  syz,  0.0,
    syz, cyz, 0.0,  0.0,
    syz*cyz, (-syz)**2,  cyz,  0.0,
    0.0, 0.0, 0.0,  1.0);


  torus(20, 5, 6);
  pop()

  //2
  push()
  translate(-100, 30);
  // rotateX(cos(angle));
  // rotateY(cos(angle));
  // rotateZ(cos(angle));
  //Matrix for transforms:

  let cy = cos(cos(angle));
  let sy = sin(cos(angle));


  applyMatrix(  cy**2, cy*sy,  -sy,  0.0,
  sy**2*cy-cy*sy, sy**3+cy**2, sy*cy,  0.0,
  cy*sy*cy+sy**2, cy*sy**2-sy*cy, cy**2,  0.0,
  0.0, 0.0, 0.0,  1.0);

  torus(40 + vol * 200, 10, 6);


  rotateY(angle);
  rotateZ(angle);

  torus(20, 7, 6);
  pop()

  //3
  push()
  translate(100, 30);
  // rotateX(sin(angle));
  // rotateY(sin(angle));
  // rotateZ(sin(angle));

  let cz = cos(sin(angle));
  let sz = sin(sin(angle));

  applyMatrix(  cz**2, cz*sz,  -sz,  0.0,
  sz**2*cz-cz*sz, sz**3+cz**2, sz*cz,  0.0,
  cz*sz*cz+sz**2, cz*sz**2-sz*cz, cz**2,  0.0,
  0.0, 0.0, 0.0,  1.0);
  torus(40 + vol * 200, 10, 6);

  // rotateY(-angle);
  // rotateZ(-angle);

  let syx = sin(-angle);
  let cyx = cos(-angle);

  applyMatrix(  cyx**2, -syx*cyx,  syx,  0.0,
    syx, cyx, 0.0,  0.0,
    syx*cyx, (-syx)**2,  cyx,  0.0,
    0.0, 0.0, 0.0,  1.0);

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