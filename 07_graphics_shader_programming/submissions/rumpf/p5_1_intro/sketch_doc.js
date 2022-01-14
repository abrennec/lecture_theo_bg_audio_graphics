

//this variable will hold our shader object
let simpleShader;

function preload(){
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // T loadShader(VERT x, FRAG y) is asynchronous so it needs to be in preload
  // T loadShader(VERT x, FRAG y) first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  simpleShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() { 

    // shader( T x ) sets the active shader with our shader
    shader(simpleShader);

    //push();
    //shader(simpleShader);
    // orange
    fill(200, 100, 0);
    // rect gives us some geometry on the screen
    rect(0, 0, width, height);
    //pop();

    /*
    //push();
    //shader(simpleShader);
    //translate(-500, 0,0);
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
    //pop();
    */

     /*   beginShape();
    fill(0, 100, 0);
    vertex(-0.5, -0.5);
    fill(200, 100, 0);
    vertex(0.5, -0.5);
    //fill(200, 100, 200);
    vertex(0.5, 0.5);
    //fill(200, 100, 0);
    vertex(-0.5, 0.5);
    endShape(CLOSE);
    */
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

