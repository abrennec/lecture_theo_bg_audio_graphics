

// shader object
let simpleShader;

function preload(){

  // set the shader object
  simpleShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {

  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  

    // load the shader
    shader(simpleShader);
    

    // rect gives us some geometry on the screen
    //rect(0, 0, width, height);

    // custom polygon with 6 vertices
    beginShape();
        fill(255, 0, 0);
        vertex(-50, -85);
        fill(0, 255, 0);
        vertex(50, -85);
        fill(0, 0, 255);
        vertex(100, 0);
        fill(255, 255, 255);
        vertex(50, 85);
        fill(0, 0, 0);
        vertex(-50, 85);
        fill(255, 255, 0);
        vertex(-100, 0);
    endShape(CLOSE); 
    

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

