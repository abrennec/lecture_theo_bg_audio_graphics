


//this variable will hold our shader object
let simpleShader;

function preload(){
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
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
    background(0);

    let mx = map(mouseX, 0, width, 0, 3);

    // tell the shader object to set / introduce a custom uniform
    // that is called "scale" and that takes as input value "mx"
    simpleShader.setUniform('scale', mx);
    simpleShader.setUniform('time', frameCount);

    // orange
    //fill(200, 100, 0);
    
    // rect gives us some geometry on the screen
    //rect(0, 0, width, height);

    beginShape();
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
    endShape(CLOSE); 
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

