
/**
* BASED ON Mesh Net
* https://openprocessing.org/sketch/309044
* @author aa_debdeb
* @date 2016/02/24
* Adapted for TBAG 2022
*/

let amplitude;
let soundFile;
let basicShader;
let originXOffset;
let originYOffset;
let positions = [];

function preload() {
  
  soundFormats('wav', 'mp3');
  soundFile = loadSound('groove.mp3');
  //soundFvloadSound('drums.wav');
  
  basicShader = loadShader('basic.vert', 'basic.frag');
}

function setup(){
  
  // mimics the autoplay policy
  getAudioContext().suspend();
  amplitude = new p5.Amplitude();
  
  let cnv = createCanvas(600, 600, WEBGL);
  cnv.mouseClicked(toggleSound);
  
  frameRate(30);
  background(0);
  stroke(255, 100);
  
  originXOffset = width/2;
  originYOffset = height/2;
   
}

function draw(){
  
  background(0);
  
  // WEBGL mode, move origin from center to topleft
  translate(-originXOffset,-originYOffset); 
  
  //
  // track the mouse positions
  //
  if (mouseIsPressed){
    
    let x = mouseX + map(random(1), 0, 1, -30, 30);
    let y = mouseY + map(random(1), 0, 1, -30, 30);
    let z = mouseY + map(random(1), 0, 1, -30, 30);
    let newPos = createVector(x, y, z); // create a new vector
    
    for(let i = 0; i < positions.length; i++){
      
      let pos = positions[i];
      
      if(newPos.dist(pos) < 50) {
       line(newPos.x, newPos.y, pos.x, pos.y);
      }
    }
    positions.push(newPos); 
  }
  
  //
  // draw a roating box as a reference geometry 
  //
  //noFill();
  push()
  shader(basicShader);
  basicShader.setUniform('time', millis()/1000.0);
  basicShader.setUniform('scale', 0.5);
  basicShader.setUniform('ytransform', 0.5);
  
  translate(originXOffset * 0.2, originYOffset * 0.2, -100);
  
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.02);
  box(56);
  pop();


  //
  // draw a mesh geometry based on mouse movement
  //
  
  // level ranges from 0.0 to 1.0
  let level = amplitude.getLevel();
  level = level * 10.0;
  
  // a triangle strip requires at least 3 vertices
  if ( positions.length > 3 ) {
    push();
    shader(basicShader);
    basicShader.setUniform('time', millis()/1000.0);
    basicShader.setUniform('scale', 1.0);
    basicShader.setUniform('ytransform', (15.0 * level));
    
    beginShape(TRIANGLE_STRIP);
      for(let i = 0; i < positions.length; i++){

        let pos = positions[i];

        //stroke(255, 0,0,100);
        vertex(pos.x, pos.y);
      }
    endShape();
    pop();
  }
}

function toggleSound() {
  
  if (soundFile.isPlaying() ){
    
    soundFile.pause();
  } else {
    
    soundFile.loop();
		amplitude = new p5.Amplitude();
		amplitude.setInput(soundFile);
  }
}

// used to playback soundfile
function mousePressed() {
  
  // https://p5js.org/reference/#/p5/userStartAudio
  userStartAudio();

  if (soundFile.isLoaded()) {
    
    soundFile.playMode('restart');
  }
  soundFile.play();

}

// used to pan sound left ot right
function mouseMoved() {

  // map the mouseX location to a panning degree
  // between -1.0 (left) and 1.0 (right)
  let panning = map(mouseX, 0, width,-1.0, 1.0);
  soundFile.pan(panning);
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}