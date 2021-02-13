// At the time of creation my mood was not the best, so apologies for the silly naming of some functions. It was a byproduct of my related cynism.

const NUMBER_OF_VERTS = 10;
let myShader;
let mySound;
let vertices = [];
let oldWidth;
let oldHeight;
let matrix = false;
let matrixModifier = 1; 
let relaxed = true;
let amplitude, fft, peakDetect;
let duration;
let outline;

function preload(){
    myShader = loadShader('shaders/shader.vert', 'shaders/shader.frag');
    depthShader = loadShader('shaders/shader.vert', 'shaders/depth.frag');
    mySound = loadSound('resources/hero-of-kyoto.mp3');
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    main = createGraphics(windowWidth, windowHeight, WEBGL);
    outline = createGraphics(windowWidth, windowHeight, WEBGL);
    console.log(outline);
    giveBirthToPoints();
    setUpSound();
}


function draw(){
    orbitControl();
    
    background(0);
    fft.analyze();
    peakDetect.update(fft);
    if(peakDetect.isDetected){
        addVert();
    } 
    let size = map(fft.getEnergy("highMid"), 0, 255, 1, 10);
    let rotate = map(fft.getEnergy("lowMid"), 0, 255, 0, HALF_PI * 2);

    outline.shader(depthShader);
    outline.orbitControl();
    outline.clear();
    outline.noStroke();
    outline.background(0);
    welcomeToTheMatrix(size, rotate, outline);
    generateGeometry(outline);
    outline.pop();

    aesthetics();
    shader(myShader);
    welcomeToTheMatrix(size, rotate);
    generateGeometry();
    pop();

    depthShader.setUniform("u_resolution", [depthShader.width, depthShader.height]);
    depthShader.setUniform("u_time", millis() / 1000.0);
    myShader.setUniform("u_resolution", [width, height]);
    myShader.setUniform("u_time", millis() / 1000.0);
    myShader.setUniform("u_depth", outline);
    myShader.setUniform("u_fft", size / 10.0);

    if(mySound.currentTime > duration){
        mySound.play();
    }
}

function setUpSound(){
    mySound.play();
    amplitude = new p5.Amplitude();
    fft = new p5.FFT();
    peakDetect = new p5.PeakDetect(200, 2000, 0.002);
    duration = mySound.duration();
    mySound.playMode('restart');
    fft.smooth(0.5);
}

function addVert(){
    const vertex = createVector(
        random(-width/2, width/2), 
        random(-height/2, height/2),
        random(-height/2, height/2));
    vertices.push(vertex);
    vertices.sort(fromMinToMax);
}

//TODO: Press Spacebar 3D Text

function windowResized(){
    recordOldCanvas();
    resizeCanvas(windowWidth, windowHeight);
    vertices = resizeVertices();
}

function giveBirthToPoints(){

    for(let i = 0; i < NUMBER_OF_VERTS; i++){
        addVert();
    }

}

function generateGeometry(context){
    if(context){
        context.beginShape(TRIANGLE_STRIP);
        for(let v of vertices){
            context.vertex(v.x, v.y, v.z);
        }
        context.endShape();
    } else {
        beginShape(TRIANGLE_STRIP);
        for(let v of vertices){
            vertex(v.x, v.y, v.z);
        }
        endShape();
    }
}

function welcomeToTheMatrix(s, r, context){

    if (matrix) {
        matrixModifier += 0.08;
    } else if (!relaxed && matrixModifier > 1 - (matrixModifier / 10)) {
        matrixModifier -= (matrixModifier / 4) * 0.2 + 0.05;
    } else {
        relaxed = true;
        if (matrixModifier < 1){
            matrixModifier += 0.01;
        }
    }
    if(context){
        context.push();
        context.rotateX(r);
        context.scale(matrixModifier * s, 1, 1);
    } else {
        push();
        rotateX(r);
        scale(matrixModifier * s, 1, 1);
    }
}

function activateMatrix(){
    matrix = true;
}

function releaseMatrix(){
    matrix = false;
    relaxed = false;
}

function keyPressed() {
    if (keyCode === 32) {
      matrix = true;
    } 
    return false;
}

function keyReleased() {
    if (keyCode === 32) {
      matrix = false;
      relaxed = false;
    }
    return false; // prevent any default behavior
}

function aesthetics(){
    strokeWeight(6);
    stroke(20, 10, 20);
}

function recordOldCanvas(){
    oldWidth = width;
    oldHeight = height;
}

function fromMinToMax(a, b){
    return  a.x > b.x ? 1 : -1;
}

function resizeVertices(){
    return vertices.map(v => { 
        let vert = v
            vert.x = map(vert.x, -oldWidth / 2, oldWidth / 2, -width / 2, width / 2);
            vert.y = map(vert.y, -oldHeight / 2, oldHeight / 2, -height / 2, height / 2);
            return vert;
    })
}

function maxPosition(verts, component){
    return verts.map(vert => vert[component])
                .reduce( (max, vert) => Math.max(max, vert), - (component == "y" ? height : width) / 2);
}