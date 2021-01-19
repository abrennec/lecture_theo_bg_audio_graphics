function setup() {
    createCanvas(400, 400);
    background(240, 240, 240);
    fill(237, 34, 93);
    translate(200,200);
    
    // Vectors
    let v1 = createVector(-10, 10);
    let v2 = createVector(0, 35);
    let v3 = createVector(10, -8);
    
    
    noStroke();
    beginShape();
    vertex(v1.x, v1.y);
    vertex(v2.x, v2.y);
    vertex(v3.x, v1.y);
    vertex(v2.y, v2.x);
    vertex(v3.x, v3.y);
    vertex(v2.x, -v2.y);
    vertex(-v3.x, v3.y);
    vertex(-v2.y, v2.x);
    endShape();
}