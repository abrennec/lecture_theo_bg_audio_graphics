let ball = {};
let soundFile;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/desk.mp3');
}

function setup() {
  createCanvas(710, 100);
}

function draw() {
  background(0);
  ball.x = constrain(mouseX, 0, width);
  ellipse(ball.x, height / 2, 100, 100);

  let playbackRate = map(mouseY, 0.1, height, 2, 0);
  playbackRate = constrain(playbackRate, 0.01, 4);
  soundFile.rate(playbackRate);

  line(0, mouseY, width, mouseY);



}

function mousePressed() {
  // map the ball's x location to a panning degree
  // between -1.0 (left) and 1.0 (right)
  let panning = map(ball.x, 0, width, -1.0, 1.0);
  soundFile.pan(panning);
  soundFile.play();

  soundFile.loop();
}
    

    // checkout panning
    // checkout rate 
    // checkout reverb
    





