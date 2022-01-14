

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
    // orange
    fill(200, 100, 0);
    // rect gives us some geometry on the screen
    rect(0, 0, width, height);

    // custom polygon with 6 vertices
    /*
    beginShape();
        fill(0, 100, 0);
        vertex(-50, -85);
        fill(200, 100, 0);
        vertex(50, -85);
        fill(200, 100, 200);
        vertex(100, 0);
        fill(200, 100, 0);
        vertex(50, 85);
        fill(50, 100, 50);
        vertex(-50, 85);
        fill(200, 100, 0);
        vertex(-100, 0);
    endShape(CLOSE); 
    */

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

