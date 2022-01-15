
let easing = 0.05;
let x = 0;
// shader object
let experimentShader;

// 3d object
let bust;
function preload(){

  // set the shader object
  experimentShader = loadShader('experiment_shader.vert', 'experiment_shader.frag');
  bust = loadModel('assets/bust.obj');
}

function setup() {

  // shaders require WEBGL mode to work
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.GL.getExtension('OES_standard_derivatives');
      // load the shader

  noStroke();
  noCursor();
}

function draw() {  
    background(0);
    fill(200, 100, 0);

    let mx = map(mouseX, 0, width, 1, 20);
    let my = map(mouseY, 0, height, 1, 50);


    shader(experimentShader);
    // Send the frameCount to the shader
    experimentShader.setUniform("uFrameCount", frameCount);
    experimentShader.setUniform('mouse', [mx, my]);

    // orange

    // rect gives us some geometry on the screen
  let targetX = mouseX ;
  let dx = targetX - x;
  x += dx * easing;

    rotateY(x*0.005);
    translate(0, height/2 -400, 0);

    model(bust);
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

