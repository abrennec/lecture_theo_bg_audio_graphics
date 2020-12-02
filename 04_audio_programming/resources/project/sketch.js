
let soundFile;


function preload() {

    soundFile = loadSound('assets/desk.mp3');
}


function setup() {

    createCanvas(400, 200);
    background(120);

    //soundFile = loadSound('assets/cow.wav');
    soundFile.loop();
}


function draw() {
  
    let volume = map(mouseX, 0, 200, 0, 1);
    volume = constrain(volume, 0, 1);
    soundFile.amp(volume); 

    // checkout panning
    // checkout rate 
    // checkout reverb
    
}


function mousePressed() {

    if (soundFile.isPlaying()) {

        soundFile.stop();
    }
    else {

        soundFile.play();
    }
}

