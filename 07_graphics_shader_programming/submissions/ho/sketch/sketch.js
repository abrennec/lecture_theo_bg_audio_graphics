let customShader;

function preload() {

    customShader = loadShader("testShader.vert", "testShader.frag");
}

function setup() {

    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    colorMode(RGB, 255);
    bgColorA = color(46, 204, 113);
    bgColorB = color(52, 152, 219);
    
}

function draw() {

    //interpolate background between colorA and colorB
    background(lerpColor(bgColorA, bgColorB, sin(frameCount * 0.005)));

    shader(customShader);

    //customShader.setUniform("uFrameCount", frameCount);

    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.005);

    //orange, will be overwritten by shader
    fill(color(230, 126, 34))
    
    //generate 3d geo
    torus(150, 50)

}

function windowResized() {

    resizeCanvas(windowWidth, windowHeight);
}