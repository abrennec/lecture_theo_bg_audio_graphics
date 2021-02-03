
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
  music = loadSound("94840__timbre__water-in-metal-pan-music.wav")

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
  
  //translate(0, -80);
  //rotateX(tan(angle));
  //rotateY(tan(angle));
  //rotateZ(tan(angle));

    // Rotation matrix around x 
    //   1    0        0          0 
    //   0    cos(a)   -sin(a)    0  
    //   0    sin(a)   cos(a)     0
    //   0    0        0          1

    // Rotation matrix around y 
    //   cos(a)   0     sin(a)    0
    //   0        1     0         0
    //   -sin(a)  0     cos(a)    0
    //   0        0     0         1

    // Rotation matrix around z 
    //   cos(a)   -sin(a)   0     0 
    //   sin(a)    cos(a)   0     0
    //   0         0        1     0
    //   0         0        0     1
  
    // First, multiply rotateX with rotateY => rotateY * rotateX, resulting in
    // cos(a)    sin(a) * sin(a)    sin(a) * cos(a)     0
    // 0         cos(a)             -sin(a)             0
    // -sin(a)   sin(a) * cos(a)    cos(a) * cos(a)     0
    // 0         0                  0                   1

    // Second, multiply rotateYX with rotateZ => rotateZ * rotateYX, resulting in
    // cos(a) * cos(a)     cos(a) * sin(a) * sin(a) + (-sin(a)) * cos(a)    cos(a) * sin(a) * cos(a) + (-sin(a) * -sin(a))    0
    // cos(a) * sin(a)     sin(a) * sin(a) * sin(a) + cos(a) * cos(a)       sin(a) * sin(a) * cos(a) + cos(a) * (-sin(a)      0
    // -sin(a)             sin(a) * cos(a)                                  cos(a) * cos(a)                                   0
    // 0                   0                                                0                                                 1

    let c = cos(tan(angle));
    let s = sin(tan(angle));
    
    /*
    // This is the short form of the matrix multiplication above, including the translation!
    applyMatrix( c*c,  c*s*s-s*c,   c*s*c+(-s)*(-s),  0,
                 c*s,  s*s*s+c*c,   s*s*c+c*(-s),     -80,
                 -s,   s*c,         c*c,              0,
                 0,    0,           0,                1);
    */
   // If you uncomment this matrix, it is not working as expected.. why not?

    // First of all, applyMatrix uses the transposed form in all cases, 2D and 3D.
    // My apologies, if I have explained it wrong last time!
    /*
    applyMatrix( c*c,             c*s,               -s,        0,
                 c*s*s-s*c,       s*s*s+c*c,         s*c,       0,
                 c*s*c+(-s)*(-s), s*s*c+c*(-s),      c*c,       0,
                 0,               -80,               0,         1);
    */
    // BUT if you compare this result with the result of the function calls rotateX, rotateY, etc.
    // the resulting transformation is different here. Why?
    
    // The sequence of operations must be 
    // rotateX * rotateY * rotateZ

    /*
    // This finally the correct matrix but not yet in transposed form ... 
    applyMatrix( c*c,               -s*c,           s,        0,
                c*s+(-s)*c*(-s),    c*c-s*s*s,      -s*c,     -80,
                s*s+c*c*(-s),       s*c+c*s*s,      c*c,      0,
                0,                  0,              0,        1);
                */
    
    //... this one is the correct transformation matrix that leads to the same
    // result as the individual function calls below and in transposed form:
    /*
    applyMatrix( c*c,    c*s+(-s)*c*(-s),   s*s+c*c*(-s),   0,
                -s*c,    c*c-s*s*s,         s*c+c*s*s,      0,
                s,       -s*c,              c*c,            0,
                0,       -80,               0,              1);
    */

    
    translate(0, -80);
    rotateX(tan(angle));
    rotateY(tan(angle));
    rotateZ(tan(angle));
  
  torus(40 + vol * 200, 10, 6);

  /*
  rotateY(angle);
  rotateZ(angle);
  torus(20, 5, 6);
  */
  pop()
/*
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

*/
  angle += 0.003

}

function musicController() {
  if (music.isPlaying()) {
    music.stop();
  } else {
    music.play()
  }
}