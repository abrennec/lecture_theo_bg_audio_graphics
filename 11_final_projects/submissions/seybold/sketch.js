//terrain values
let scale = 16; // number of grids (w or h  /  scale) 1024 / 16 = 64 
let cols;
let rows;
let w = 1024;   // terrain width
let h = 1024;   // terrain height 
let terrain = [];

let movespeed = 0.06; 
let movepos = 0;
 
//sound values
let song;
let fft;
let button;
let spectrum = [];
let allSpectren = []; 


//background 
let angle = 0;
let orbitpic;
let sun;






//let spectrum = [];

function toggleSong() {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }
  
  function preload() {
    song = loadSound('a_moment_of_creativity_seybold.mp3');
    orbitpic = loadImage('orbit2.jpg');
    sun = loadImage('sun.jpg');
  }

function setup() {
    // createCanvas(1200, 700, WEBGL);
    createCanvas(windowWidth, windowHeight, WEBGL);
    //frameRate(16);
    colorMode(HSB);

    //sound
    button = createButton('play / stop');
    button.mousePressed(toggleSong);
    fft = new p5.FFT(0.8,64);

    //terraingrid
    cols = w / scale;
    rows = h / scale;
       
    for (let x = 0; x < cols; x++) {
		terrain[x]= [];
  }
  
}


function draw() {

    //terrain movement
    movepos -= movespeed;
    //movement();

    //sound 
    fftanalyze();

    //general
    orbitControl(2,2);
    background(0);

    //Orbitsphere
    push();
    rotateX(angle * 0.02);
    rotateY(angle * 0.03); 
    rotateZ(angle * 0.02);
    noStroke();
    texture(orbitpic);
    sphere(4000);
    pop();
    angle += 0.04

    //sun
    push();
    texture(sun);
    noStroke();
    rotateX(angle * 0.5);
    rotateY(angle * 0.5);
    rotateZ(angle * 0.2);
    translate(-1000, 0, 0);
    rotateZ(angle * -0.08);
    sphere(70);
    pop();

    //effect lines
    push();
    noFill();
    rotateX(angle * -0.3);
    rotateY(angle * 0.1);
    rotateZ(angle * -0.2);
    strokeWeight(1);
    stroke(100,20,20);
    ellipsoid(1500, 1200, 1300,4,4);
    pop();


    //terrain
    stroke(255);
    noFill();
    rotateX(PI /6); //rotation of the terrain.
    translate((-w / 2) + 1, (-h / 2) ); //sets terrain to center  

    for (let y = 1; y < rows; ++y) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; ++x) {
            // colorchange
            if (terrain[x][y]>-100){
				fill(terrain[x][y]*2,100,80);
			}
            //grid
            vertex(x * scale, y * scale,terrain[x][y]); 
            vertex(x * scale, (y + 1) * scale,terrain[x][y + 1]); 
        }
        endShape();
    }

    let yOff = movepos;
    for (let i = 0; i < spectrum.length; i++ ){
      for (let y = 0; y < rows; ++y) {
        for (let x = 0; x < cols; ++x) {

            //VAR 1:
            // terrain[i] [y]= map(allSpectren[i + 64 * (y-1)], 0, 256, 0, 200);

            //VAR 2;
            terrain[i] [y]= map(allSpectren[allSpectren.length - i*y*x], 0, 256, 0, 120);


          }   
        }
    }


  //VAR 1:
   // allSpectren = concat(spectrum, allSpectren)

  //VAR 2:
 allSpectren = concat(allSpectren, spectrum)
         // subset(allSpectren, 0, 64 * 64)

 // console.log(allSpectren);
}

// functions

function fftanalyze(){
    spectrum= fft.analyze();  

  }