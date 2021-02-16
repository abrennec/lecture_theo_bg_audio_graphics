let triangles = [];

let mode = "add";

let distances = [];

function setup() {
    let sketchCanvas = createCanvas(width, height);
    sketchCanvas.parent("p5canvas");
    createRandomTriangle();
    // frameRate(10);
}

function draw() {
    background(getBackgroundColor());

    if(hasStroke()){
        strokeWeight(getStrokeWidth());
        stroke(getStrokeColor());
    }
    else {
        noStroke();
    }
    
    for(i = 0; i < triangles.length; i++){
        beginShape();
        triangles[i].fill();
        for(o = 0; o < triangles[i].vector.length; o++){
            //vertex(triangles[i][o].x,triangles[i][o].y);
            vertex(triangles[i].vector[o].x, triangles[i].vector[o].y);
            //line(triangles[i][o].x, triangles[i][o].y, triangles[i][(o + 1) % triangles[i].length].x, triangles[i][(o + 1) % triangles[i].length].y);
        }
        endShape(CLOSE); 
    }
    if(inAutoMode() == false){
        frameRate(30);
        let mouseVector = createVector(mouseX, mouseY);
        distances = [];
        for(i = 0; i < triangles.length; i++){
            for(o = 0; o < triangles[i].vector.length; o++){
                distances.push([mouseVector.dist(triangles[i].vector[o]), i, o]);
            }
        }

        distances.sort(function(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        });

        // Clean up distances and delete if last dist was the same
        
        for(i = 1; i < distances.length; i++){
            if(distances[i][0] == distances[i-1][0]){
                distances.splice(i-1, 1);
                i--; // this fixes bugs when there are more than 2 vertices connected at the same place. there probably is a reason but idk
            }
        }

        
        fill('rgba(255,0,0,0.7)');
        if(inAddMode()){  
            triangle(mouseVector.x, mouseVector.y, triangles[distances[0][1]].vector[distances[0][2]].x, triangles[distances[0][1]].vector[distances[0][2]].y, triangles[distances[1][1]].vector[distances[1][2]].x, triangles[distances[1][1]].vector[distances[1][2]].y); 
        }
        if(inSubdivideMode() || inFillMode()){ 
            let contained = false;
            for(i = 0; i < triangles.length; i++){
                let state = is_in_triangle(mouseX, mouseY, triangles[i].vector[0].x, triangles[i].vector[0].y, triangles[i].vector[1].x, triangles[i].vector[1].y, triangles[i].vector[2].x, triangles[i].vector[2].y)
                if(state != false) {
                    contained = state;
                }
            }
            if(contained != false){
                triangle(contained[0].x, contained[0].y, contained[1].x, contained[1].y, contained[2].x, contained[2].y);
            }
        }
    }
    if(inAutoMode()){
        frameRate(getAutoSpeed());

        if(inAutoAdd()){
            if(getAutoFillProbability() >= random()){
                let randomX = random(0, width);
                let randomY = random(0, height);
                let randomVector = createVector(randomX, randomY); 
                        
                distances = [];
                for(i = 0; i < triangles.length; i++){
                    for(o = 0; o < triangles[i].vector.length; o++){
                        distances.push([randomVector.dist(triangles[i].vector[o]), i, o]);
                    }
                }

                distances.sort(function(a, b) {
                    if (a[0] === b[0]) {
                        return 0;
                    }
                    else {
                        return (a[0] < b[0]) ? -1 : 1;
                    }
                });

                // Clean up distances and delete if last dist was the same
                
                for(i = 1; i < distances.length; i++){
                    if(distances[i][0] == distances[i-1][0]){
                        distances.splice(i-1, 1);
                        i--; // this fixes bugs when there are more than 2 vertices connected at the same place. there probably is a reason but idk
                    }
                }
                addTriangle(randomX, randomY);
            }
        }
        if(inAutoSubdivide()){
            if(getAutoSubdivideProbability() >= random()){
                subidivideTriangle(random(0, width), random(0, height));
            }
        }
        if(inAutoFill()){
            if(getAutoFillProbability() >= random()){
                fillTriangle(random(0, width), random(0, height));
            }
        }
    }
}

function createRandomTriangle(){
    // Reset all triangles
    triangles = [];
    let newTriangle = [];
    for(i = 0; i < 3; i++){
        /* let vert = createVector(random(0, width),random(0, height));
        newTriangle.push(vert); */
        let x = random(0, width);
        newTriangle.push(x);
        let y = random(0, height);
        newTriangle.push(y);
    }
    // triangles.push(newTriangle);
    triangles.push(new Triangle(newTriangle[0], newTriangle[1], newTriangle[2], newTriangle[3], newTriangle[4], newTriangle[5]));
}

function createRandomSquare(){
    // Reset all triangles
    triangles = [];
    let newTriangle = [];
    let startX = random(0, width);
    let startY = random(0,height)
    let sqWidth = random(0, width - startX);
    let sqHeight = random(0, height - startY);

    newTriangle.push(startX);
    newTriangle.push(startY);
    newTriangle.push(sqWidth);
    newTriangle.push(startY);
    newTriangle.push(startX);
    newTriangle.push(sqHeight);
    triangles.push(new Triangle(newTriangle[0], newTriangle[1], newTriangle[2], newTriangle[3], newTriangle[4], newTriangle[5]));

    newTriangle = [];
    newTriangle.push(sqWidth);
    newTriangle.push(startY);
    newTriangle.push(sqWidth);
    newTriangle.push(sqHeight);
    newTriangle.push(startX);
    newTriangle.push(sqHeight);
    triangles.push(new Triangle(newTriangle[0], newTriangle[1], newTriangle[2], newTriangle[3], newTriangle[4], newTriangle[5]));
}

function mouseClicked() { 
    if(inSketch()){
        if(inAddMode()){      
            addTriangle(mouseX, mouseY);
        }
        if(inSubdivideMode()){ 
            subidivideTriangle(mouseX, mouseY);
        }

        if(inFillMode()){ 
            fillTriangle(mouseX, mouseY);
        }
    }
} 

function addTriangle(x, y){  
    let newTriangle = [];
    newTriangle.push(x);
    newTriangle.push(y);
    newTriangle.push(triangles[distances[0][1]].vector[distances[0][2]].x);
    newTriangle.push(triangles[distances[0][1]].vector[distances[0][2]].y);
    newTriangle.push(triangles[distances[1][1]].vector[distances[1][2]].x);
    newTriangle.push(triangles[distances[1][1]].vector[distances[1][2]].y);
    // triangles.push(newTriangle);
    triangles.push(new Triangle(newTriangle[0], newTriangle[1], newTriangle[2], newTriangle[3], newTriangle[4], newTriangle[5]));
    console.log(triangles);
}

function subidivideTriangle(x, y){
    let contained = false;
    for(i = 0; i < triangles.length; i++){
        let state = is_in_triangle(x, y, triangles[i].vector[0].x, triangles[i].vector[0].y, triangles[i].vector[1].x, triangles[i].vector[1].y, triangles[i].vector[2].x, triangles[i].vector[2].y)
        if(state != false) {
            contained = state;
            if(contained != false){
                // Subdivide into 2 new triangles
                subdivide([contained[0], contained[1], contained[2]], triangles[i].fill); 
                // Delete parent triangle
                triangles.splice(i, 1);
                break;
            }
        }
        
    }
}

function subdivide(triangle, fill){
    // argument triangle is array of vectors !
    let sidelengths = [];
    sidelengths.push(triangle[0].dist(triangle[1]));
    sidelengths.push(triangle[1].dist(triangle[2]));
    sidelengths.push(triangle[2].dist(triangle[0]));
    let biggestSide = sidelengths.indexOf(Math.max( ...sidelengths ));
    console.log(biggestSide);
    console.log((biggestSide + 1) % triangle.length)
    let newTriangle = [];
    let newVector = p5.Vector.lerp(triangle[biggestSide], triangle[(biggestSide + 1) % triangle.length], 0.5);
    newTriangle.push(newVector.x);
    newTriangle.push(newVector.y);
    newTriangle.push(triangle[(biggestSide + 1) % triangle.length].x);
    newTriangle.push(triangle[(biggestSide + 1) % triangle.length].y);
    newTriangle.push(triangle[(biggestSide + 2) % triangle.length].x);
    newTriangle.push(triangle[(biggestSide + 2) % triangle.length].y);
    triangles.push(new Triangle(newTriangle[0], newTriangle[1], newTriangle[2], newTriangle[3], newTriangle[4], newTriangle[5], fill));
    newTriangle = [];
    newTriangle.push(newVector.x);
    newTriangle.push(newVector.y);
    newTriangle.push(triangle[(biggestSide + 2) % triangle.length].x);
    newTriangle.push(triangle[(biggestSide + 2) % triangle.length].y);
    newTriangle.push(triangle[(biggestSide + 0) % triangle.length].x);
    newTriangle.push(triangle[(biggestSide + 0) % triangle.length].y);
    triangles.push(new Triangle(newTriangle[0], newTriangle[1], newTriangle[2], newTriangle[3], newTriangle[4], newTriangle[5], fill));
}

function is_in_triangle (px,py,ax,ay,bx,by,cx,cy){

    //credit: http://www.blackpawn.com/texts/pointinpoly/default.html

    var v0 = [cx-ax,cy-ay];
    var v1 = [bx-ax,by-ay];
    var v2 = [px-ax,py-ay];

    var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
    var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
    var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
    var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
    var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);

    var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);

    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    if ((u >= 0) && (v >= 0) && (u + v < 1)){
        return [createVector(ax, ay), createVector(bx, by), createVector(cx, cy)]; // return triangle it is in if true
    }
    else { return false; }
}


function fillTriangle(x, y){
    for(i = 0; i < triangles.length; i++){
        let state = is_in_triangle(x, y, triangles[i].vector[0].x, triangles[i].vector[0].y, triangles[i].vector[1].x, triangles[i].vector[1].y, triangles[i].vector[2].x, triangles[i].vector[2].y)
        if(state != false) {
            triangles[i].setFill(getFill());
        }
    }
}