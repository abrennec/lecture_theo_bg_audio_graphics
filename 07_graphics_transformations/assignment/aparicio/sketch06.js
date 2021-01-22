let x21 = 0.0;
let plus = 0.15;
let amplitude;
let canvas;
let music;
let vol;

function preload() {
  music = loadSound("./resources/audio-project-aparicio-sleep-paralysis.wav")

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    noFill();
    canvas.mouseClicked(musicController);
    amplitude = new p5.Amplitude();
  }
  
  function draw() {
    background(0);
    vol = amplitude.getLevel();
    


    //weiße Box -> rotiert durch Matrix
    push();
    
    let rad = millis() / 1000;
    // Set rotation angles
    let ct = cos(rad);
    let st = sin(rad);
    plus = vol * 20;

    if (x21 >= 1.0){
        plus = -plus;
    }else if(x21 <= -1.0){
        plus = 0.1;
    }
    x21 += plus;
    console.log(vol);
    
    // Matrix for rotation around the Y axis
    applyMatrix(  ct, 0.0,  st,  0.0,
                 0.0, 1.0, x21,  0.0,
                 -st, 0,  ct,  0.0,
                 0.0, 0.0, 0.0,  1.0);
    stroke(255);
    box(250);
    pop();
    
    
    
    
    push();
    stroke(200,0,50);
    for(let i = 0; i < 2; i ++){
        if (vol > 0.04){
            applyMatrix(  -ct, 0.0,  st,  0.0,
                0.0, 1.0, 0.0,  0.0,
                st, 0.0,  ct,  0.0,
                0.0, 0.0, 0.0,  1.0);
            box(random(10,50));
        }
        

    }
    
    pop();
  }

  function musicController() {
    if (music.isPlaying()) {
      music.stop();
    } else {
      music.play()
    }
  }