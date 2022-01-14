


//this variable will hold our shader object
let simpleShader;
let simpleShader2;

function preload(){

  simpleShader = loadShader('basic.vert', 'basic.frag');
  simpleShader2 = loadShader('basic2.vert', 'basic2.frag');
}

function setup() {
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  
    
    shader(simpleShader);
    background(0);
    push();
    translate(-width/2, -height/2,0);
    rect(0,0, width, height);
    pop();

    // orange
    shader(simpleShader2);
    fill(200, 100, 0);
    push();
    translate(-800, -500,100);
    beginShape();
        vertex(-150, -85, -100);
        vertex(50, -85, -100 );
        vertex(100, 0, -100);
        vertex(50, 85, -100);
        vertex(-50, 85,-100);
        vertex(-100, 0, -100);
    endShape(CLOSE); 
    pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

