//this variable will hold our shader object
let simpleShader;

function preload(){
  simpleShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  

  shader(simpleShader);

  fill(255,0,0);
  // rect gives us some geometry on the screen
  rect(0,0, 250, 250);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}