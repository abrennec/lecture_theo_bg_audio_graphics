
let soundFile;
let reverbTime = 3;
let decayRate = 10;


function preload() {

    soundFile = loadSound('assets/cow.wav');
}


function setup() {

    createCanvas(400, 200);
    background(120);

    reverb = new p5.Reverb();
    reverb.process(soundFile, reverbTime, decayRate);
    soundFile.loop();
}


function draw() {
  
    //let volume = map(mouseX, 0, 200, 0, 1);
    //volume = constrain(volume, 0, 1);
    //soundFile.amp(volume); 

    // checkout panning
    let pannning = map(mouseX, 0, canvas.width, -1, 1);
    soundFile.pan(pannning);
    // checkout rate 
    let rate = map(mouseY, 0, canvas.height, 0, 2);
    soundFile.rate(rate);
    // checkout reverb
   
}

function keyPressed() {
/*
LEFT:   37,
UP:     38,
RIGHT:  39,
DOWN:   40 */
    /* if(keyCode == 38) { //UP
        reverbTime++;
    }
    if(keyCode == 40) { //DOWN
        reverbTime--;
    }
    if(keyCode == 39) { //RIGHT
        decayRate++;
    }
    if(keyCode == 37) { //LEFT
        decayRate--;
    } */ // Cant change dynamically ?
}


function mousePressed() {

    if (soundFile.isPlaying()) {

        soundFile.stop();
    }
    else {

        soundFile.play();
    }
}

