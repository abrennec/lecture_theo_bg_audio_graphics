
let soundFile;
let reverbOn = true;
let reverb;

function preload() {
    soundFile = loadSound('assets/desk.mp3');
}


function setup() {

    createCanvas(windowWidth, windowHeight);
    background(120);
    reverb = new p5.Reverb();
    soundFile.loop();
   // reverb.process(soundFile, 2.0, 1.0);
}


function draw() {
  
    let volume = map(mouseY, height, 0, 0, 1);
    volume = constrain(volume, 0, 1);

    let panning = map(mouseX, 0, width, -1, 1);
    panning = constrain(panning, -1, 1);

    let rate = map(mouseX, 0, width, 0.1, 2);
    rate = constrain(rate, 0.1, 2);

    soundFile.amp(volume);
    //soundFile.pan(panning);
    //soundFile.rate(rate);
    
}


function mousePressed() {

    if (soundFile.isPlaying()) {
        soundFile.stop();
    }
    else {
        soundFile.play();
    }
}

/* 
function keyPressed(){
    if(keyCode == 32){
        if(reverbOn){
            reverb.disconnect();
            reverbOn = false;
        } else {
            reverb.connect();
            reverb.process(soundFile, 2, 1);
            reverbOn = true;
        }
    }
} */