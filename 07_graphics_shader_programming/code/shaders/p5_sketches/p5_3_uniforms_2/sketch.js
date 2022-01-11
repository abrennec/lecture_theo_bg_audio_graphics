//this variable will hold our shader object
let simpleShader;

function preload(){
  
  simpleShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  
    // shader() sets the active shader with our shader
    shader(simpleShader);
    background(60);

    let mx = map(mouseX, 0, width, 0.0, 1.0);

    // tell the shader object to set / introduce a custom uniform
    // that is called "scale" and that takes as input value "mx"
    simpleShader.setUniform("posX", mx);
    simpleShader.setUniform("posY", mouseY);
    simpleShader.setUniform("time", frameCount);

    //let sinval = sin(frameCount * 0.1);
    //print(frameCount, sinval);

    // orange
    //fill(200, 100, 0);
    
    // rect gives us some geometry on the screen
    //rect(0, 0, width, height);

    stroke(255);
    beginShape(LINES);
        fill(200, 100, 0);
        vertex(-50, -85, -100);

        fill(100, 200, 0);
        vertex(50, -85, -100 );

        fill(0, 200, 100);
        vertex(100, 0, -100);

        fill(0, 100, 200);
        vertex(50, 85, -100);

        fill(200, 0, 0);
        vertex(-50, 85,-100);

        fill(0, 100, 0);
        vertex(-100, 0, -100);
    endShape(); 
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
