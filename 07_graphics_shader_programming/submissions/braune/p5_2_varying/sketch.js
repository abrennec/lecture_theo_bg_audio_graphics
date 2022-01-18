


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
    background(0);

    //rect(0,0, width, height);
    
    // orange
    fill(200, 100, 0);
    beginShape();
        vertex(-50, -85, -100);
        vertex(50, -85, -100 );
        vertex(100, 0, -100);
        vertex(50, 85, -100);
        vertex(-50, 85,-100);
        vertex(-100, 0, -100);
    endShape(CLOSE);
    
    
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

