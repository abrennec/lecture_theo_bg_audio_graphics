
// Helpful information on WebGL and 3D graphics

// -- Coordinate system handed-ness --
// Reference: https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5
// "So how do we handle the z-coordinate? I'm glad you asked! 
// The z-dimension is the axis that points toward you from the 
// screen. A helpful mnemonic device for remembering which way 
// the axes point in p5.js (WEBGL), is the "left-handed" rule. 
// Point your left index finger to the right, and your middle 
// finger downward, and your thumb will automatically point 
// toward you. The direction your fingers are pointing are 
// exactly mapped to the axes."
// Left-handed rule means 
// - positive x-axis to the right (index finger)
// - positive y-axis to the bottom (middle finger)
// - positive z-axis to the viewer (thumb)



let posX = 0, posY = 0;
let angleX = 0, angleY = 0;
let v1, v2, v3, v4, v5, v6, v7, v8;

function setup() {

    createCanvas(600, 600, WEBGL);
    setAttributes('antialias', true);
    
    strokeWeight(1);    

    posX = width/2;
    posY = height/2;

    createShape();
}

function draw() {

    background(200);
    
    // noFill();

    // ambientLight(100); // white light
    // ambientMaterial(255, 102, 94); // magenta material
    
    if (mouseIsPressed) {
        // Reference: https://www.openprocessing.org/sketch/393754/
        angleY = map(mouseX, 0, width, -1*TWO_PI, TWO_PI);
        angleX = map(mouseY, 0, height, PI, -1*PI);
        rotateY(angleY);
        rotateX(angleX);    
    }
    else {
        rotateY(angleY);
        rotateX(angleX);
    }
    
    //createTriangleMesh(); 
    createColoredTriangleMesh(); 

}


function createShape() {

    // front bottom left
    v1 = createVector(-100, 100, 100); 
    // front bottom right
    v2 = createVector(100, 100, 100);  
    // front top right
    v3 = createVector(100, -100, 100); 
    // front top left
    v4 = createVector(-100, -100, 100);
    
    // back bottom left
    v5 = createVector(-100, 100, -100);  
    // back bottom right
    v6 = createVector(100, 100, -100);   
    // back top right
    v7 = createVector(100, -100, -100);  
    // back top left
    v8 = createVector(-100, -100, -100); 
}

function createTriangleMesh() {

    // Create a triangle mesh -- 
    //
    // For this, the winding order of the triangles, i.e., the
    // specific sequence of vertices, is important so that the 
    // calculation of the normal vectors 
    // required to identify front-facing and back-facing shapes
    // are calculated correctly using the cross product.

    // Here, counter-clockwise winding CCW is used resulting in
    // the calculation of the normal vectors as follows:
    // The first front face triangle is specified by
    // v1, v2, v3 
    // The corresponding normal vector is calculated 
    // as follows n = (v2-v1)x(v3-v1) 
    // The normal vectors per triangle face are then used 
    // for correct illumination and shading.
    //
    // The winding order must be equal for all vertex triangles.

    beginShape(TRIANGLES); 
    
    // front face
    // v1, v2, v3   v1, v3, v4
    vertex(v1.x, v1.y, v1.z);
    vertex(v2.x, v2.y, v2.z);
    vertex(v3.x, v3.y, v3.z);

    vertex(v1.x, v1.y, v1.z);
    vertex(v3.x, v3.y, v3.z);
    vertex(v4.x, v4.y, v4.z);

    // back face
    // v6, v5, v8   v6, v8, v7
    vertex(v6.x, v6.y, v6.z);
    vertex(v5.x, v5.y, v5.z);
    vertex(v8.x, v8.y, v8.z);

    vertex(v6.x, v6.y, v6.z);
    vertex(v8.x, v8.y, v8.z);
    vertex(v7.x, v7.y, v7.z);

    // right face
    // v2, v6, v7   v2, v7, v3
    vertex(v2.x, v2.y, v2.z);
    vertex(v6.x, v6.y, v6.z);
    vertex(v7.x, v7.y, v7.z);

    vertex(v2.x, v2.y, v2.z);
    vertex(v7.x, v7.y, v7.z);
    vertex(v3.x, v3.y, v3.z);

    // left face
    // v5, v1, v4   v5, v4, v8
    vertex(v5.x, v5.y, v5.z);
    vertex(v1.x, v1.y, v1.z);
    vertex(v4.x, v4.y, v4.z);

    vertex(v5.x, v5.y, v5.z);
    vertex(v4.x, v4.y, v4.z);
    vertex(v8.x, v8.y, v8.z);

    // top face
    // v4, v3, v7   v4, v7, v8
    vertex(v4.x, v4.y, v4.z);
    vertex(v3.x, v3.y, v3.z);
    vertex(v7.x, v7.y, v7.z);

    vertex(v4.x, v4.y, v4.z);
    vertex(v7.x, v7.y, v7.z);
    vertex(v8.x, v8.y, v8.z);

    // bottom face
    // v5, v6, v2   v5, v2, v1
    vertex(v5.x, v5.y, v5.z);
    vertex(v6.x, v6.y, v6.z);
    vertex(v2.x, v2.y, v2.z);

    vertex(v5.x, v5.y, v5.z);
    vertex(v2.x, v2.y, v2.z);
    vertex(v1.x, v1.y, v1.z);

    endShape();

}

function createColoredTriangleMesh() {

    // Create a triangle mesh -- 
    //
    // For this, the winding order of the triangles, i.e., the
    // specific sequence of vertices, is important so that the 
    // calculation of the normal vectors 
    // required to identify front-facing and back-facing shapes
    // are calculated correctly using the cross product.

    // Here, counter-clockwise winding CCW is used resulting in
    // the calculation of the normal vectors as follows:
    // The first front face triangle is specified by
    // v1, v2, v3 
    // The corresponding normal vector is calculated 
    // as follows n = (v2-v1)x(v3-v1) 
    // The normal vectors per triangle face are then used 
    // for correct illumination and shading.
    //
    // The winding order must be equal for all vertex triangles.

    beginShape(TRIANGLES); 
    
    // front face
    // v1, v2, v3   v1, v3, v4
    fill(0, 255, 255);    vertex(v1.x, v1.y, v1.z);
    fill(255, 255, 255);  vertex(v2.x, v2.y, v2.z);
    fill(255, 0, 255);    vertex(v3.x, v3.y, v3.z);

    fill(0, 255, 255);    vertex(v1.x, v1.y, v1.z);
    fill(255, 0, 255);    vertex(v3.x, v3.y, v3.z);
    fill(0, 0, 255);      vertex(v4.x, v4.y, v4.z);

    // back face
    // v6, v5, v8   v6, v8, v7
    fill(255, 255, 0);    vertex(v6.x, v6.y, v6.z);
    fill(0, 255, 0);      vertex(v5.x, v5.y, v5.z);
    fill(0, 0, 0);        vertex(v8.x, v8.y, v8.z);

    fill(255, 255, 0);    vertex(v6.x, v6.y, v6.z);
    fill(0, 0, 0);        vertex(v8.x, v8.y, v8.z);
    fill(255, 0, 0);      vertex(v7.x, v7.y, v7.z);

    // right face
    // v2, v6, v7   v2, v7, v3
    fill(255, 255, 255);  vertex(v2.x, v2.y, v2.z);
    fill(255, 255, 0);    vertex(v6.x, v6.y, v6.z);
    fill(255, 0, 0);      vertex(v7.x, v7.y, v7.z);

    fill(255, 255, 255);  vertex(v2.x, v2.y, v2.z);
    fill(255, 0, 0);      vertex(v7.x, v7.y, v7.z);
    fill(255, 0, 255);    vertex(v3.x, v3.y, v3.z);

    // left face
    // v5, v1, v4   v5, v4, v8
    fill(0, 255, 0);      vertex(v5.x, v5.y, v5.z);
    fill(0, 255, 255);    vertex(v1.x, v1.y, v1.z);
    fill(0, 0, 255);      vertex(v4.x, v4.y, v4.z);

    fill(0, 255, 0);      vertex(v5.x, v5.y, v5.z);
    fill(0, 0, 255);      vertex(v4.x, v4.y, v4.z);
    fill(0, 0, 0);        vertex(v8.x, v8.y, v8.z);

    // top face
    // v4, v3, v7   v4, v7, v8
    fill(0, 0, 255);      vertex(v4.x, v4.y, v4.z);
    fill(255, 0, 255);    vertex(v3.x, v3.y, v3.z);
    fill(255, 0, 0);      vertex(v7.x, v7.y, v7.z);

    fill(0, 0, 255);      vertex(v4.x, v4.y, v4.z);
    fill(255, 0, 0);      vertex(v7.x, v7.y, v7.z);
    fill(0, 0, 0);        vertex(v8.x, v8.y, v8.z);

    // bottom face
    // v5, v6, v2   v5, v2, v1
    fill(0, 255, 0);      vertex(v5.x, v5.y, v5.z);
    fill(255, 255, 0);    vertex(v6.x, v6.y, v6.z);
    fill(255, 255, 255);  vertex(v2.x, v2.y, v2.z);

    fill(0, 255, 0);      vertex(v5.x, v5.y, v5.z);
    fill(255, 255, 255);  vertex(v2.x, v2.y, v2.z);
    fill(0, 255, 255);    vertex(v1.x, v1.y, v1.z);

    endShape();

}