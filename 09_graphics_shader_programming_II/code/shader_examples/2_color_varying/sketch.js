


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


    // TODO 1:  Use your own geometry, try to shade it
    // TODO 2:  Instead of using one color for all vertices, 
    //          use a color for every individual vertex and 
    //          make use of a varying to specify gl_FragColor
    //          using the color value specified in the sketch.
    // TODO 3:  Now introduce a uniform that allows you to
    //          interactively change the color of the object
    //          or the geometry, i.e., by scaling vertex points.

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

