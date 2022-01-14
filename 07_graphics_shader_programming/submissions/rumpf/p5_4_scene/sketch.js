
/**
 * Original sketch taken from Processing Examples/Topics/Shaders
 *
 * Toon Shading.
 *
 * Example showing the use of a custom lighting shader in order
 * to apply a "toon" effect on the scene. Based on the glsl tutorial
 * from lighthouse 3D:
 * http://www.lighthouse3d.com/tutorials/glsl-tutorial/toon-shader-version-ii/
 */

// Interaction: 
// 1 - Toggle Shader
// 2 - Toggle Polygon
// 3 - Toggle Light

let toon;
let enableShader = false;
let drawPolygon = false;
let dLight = false;

function preload(){
    //toon = loadShader("basic.frag", "basic.vert");
    toon = loadShader("toon.vert", "toon.frag");
}

function setup() {
    
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    fill(204);
    
}

function draw() {

    if (enableShader == true) {
        //shader(toon);
        console.log("shader on");
    } else {
        ambientLight(34, 34, 44);
        console.log("ambient light on");
    }

    if (drawPolygon) {
        stroke(122);
    } else {
        noStroke();
    }


    background(0);

    var dirY = (mouseY / float(height) - 0.30) * 8;
    var dirX = (mouseX / float(width) - 0.5) * 8;
    
    if (dLight) {
        // grey directional light
        directionalLight(204, 204, 204, -dirX, -dirY, -1);
        console.log("directional light on");
    } else {
        // cyan point light
        pointLight(74, 204, 204, mouseX-width/2, mouseY-height/2, -mouseY / 2);
        console.log("point light on");
    }


    push();
    fill(255);
    stroke(255);
    ellipse(mouseX-width/2, mouseY-height/2, 20, 20);
    pop();


    push();
    if (enableShader) shader(toon);
    translate(0, -height/4, -200);
    sphere(80);
    pop();

    
    push();
    //fill(255, 0, 200);
    if (enableShader) shader(toon);
    rectMode(CENTER);
    translate(0, height / 4, -100);
    rotateX(PI/2);
    rect(0, 0, 400, 150);
    pop();
}

function keyPressed() {
    switch(key) {
        case ('1'):
            toggleShader();
            break;
        case ('2'):
            togglePolygon();
            break;
        case ('3'):
            toggleLight();
            break;
    }
}

function toggleShader() {
    if (enableShader) {
        enableShader = false;
        resetShader();
    } else {
        enableShader = true;
    }
}

function togglePolygon() {

    drawPolygon = !drawPolygon;
}

function toggleLight() {

    dLight = !dLight;
}


