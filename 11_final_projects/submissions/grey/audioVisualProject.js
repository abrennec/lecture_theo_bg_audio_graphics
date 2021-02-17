// declaring vairables for audio
let song;
let fft;
let ampl;
let button;
let volhistory = [];
let deletetionAmount = 20;

// variables for positioning
let vert = [];
let iterate = 64;

let basicShader;

// toggle Song On or Off
function toggleSong(){
  if (song.isPlaying()){
      song.pause();
  }  else {
      song.play();
  }
}

function preload(){
  basicShader = loadShader('basic.vert', 'basic.frag');
  song = loadSound("audio/ThoughtsInProgress.mp3");
}


function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.7, iterate);
  ampl = new p5.Amplitude();

  for(let i = 0; i < iterate - deletetionAmount; i++){
    let randX = random(windowWidth / -4, windowHeight / 4);
    let randY = random(windowWidth / -4, windowHeight / 4);
    let randZ = random(windowWidth / -4, windowHeight / 4);
    let randR = random(255);
    let randG = random(255);
    let randB = random(255);
    
    vert[i] = new Vertex(createVector(randX, randY, randZ), createVector(randR, randG, randB));
  }
}

function draw(){
    background(0);

    basicShader.setUniform('u_time', frameCount * 0.01);

    let level = ampl.getLevel();
    let rotationGain = map(level, 0, 1, 0, 3);
    
    let angleX = frameCount * 0.01 + rotationGain;
    let angleY = frameCount * 0.01 + rotationGain;
    let angleZ = frameCount * 0.01 + rotationGain;

    rotateX(angleX);
    rotateY(angleY);
    rotateZ(angleZ);

    let spectrum = fft.analyze();
    //console.log(level);

    for(let i = 0; i < spectrum.length - deletetionAmount; i++){

      let amp = spectrum[i];
      let offset = map(amp, 0, 255, 1, 3);

      vert[i].move(offset);
    }

    //shader(basicShader); // it is not functioning the way I thought it would work so I left it at this stage

    beginShape(TRIANGLE_STRIP);
    for(let v of vert){
      v.show();
    }
    endShape();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
  }
  

