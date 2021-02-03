// Code ported from processing to p5

/**
* Genuary 2021
* Prompt 06
* Triangle subdivision.
*
* Grit Kit
*
* Reference:
* https://tylerxhobbs.com/essays/2017/aesthetically-pleasing-triangle-subdivision
*/

// This is just my routine for exporting frames
//boolean recording = false;

let vecs = [];  // list of vectors; 3 vectors in a row describe one triangle
let stoppers = [];  // list of integers for stopping the iterated subdivision at some point; 1 means go on; 0 means stop the subdivision

// divLerp and divLerpRange affect how the tringles will be subdivided: They specify at which position one side of the triangle will be split.
// Changing these values will change the result rapidly. Play with them! Go crazy and make them leave the range [0, 1].
let divLerp = 0.5;  // 0.5 is the center of a side to be split; 0 and 1 are the two end points of this side.
let divLerpRange = 0.2; // The range defines how far the split point can shift randomly to one end point or the other.

//let stoppingChance = 0.0001;  // The chance for the new triangles to never be subdivided further.
let stoppingChance = 0.0005; 

// Placement and area of the vertices in space
let zTranslate = -1500;
// let yShift = -100;
let startSpace = 650;

let noiseSpeed = 0.01; // for a version with filled triangles that looks also interesting

let myShader;

function preload() {
  myShader = loadShader("shader.vert", "shader.frag");
}


function setup() {
  createCanvas(800, 800, WEBGL);
  smooth();
  colorMode(HSB, 360, 100, 100, 100);
  stroke(0, 0, 100);
  // noStroke();
  // noFill();
  // strokeWeight(0.5);
  // background(0);
  
  // Start set of triangles. This can be anything! Here I create a double pyramid consisting of 8 triangles
  createDoublePyramid(startSpace);
}

function draw() {
  background(0);

  // shader() sets the active shader with our shader
  shader(myShader);
  // Send the frameCount to the shader
  myShader.setUniform("uFrameCount", frameCount);

  // translate(width/2, height/2 + yShift, zTranslate);
  translate(0, 0, zTranslate); 
  
  //rotateY(frameCount * 0.01); // Nice continuous rotation
  //rotateY(mouseX * 0.01); // Interactive rotation. Fun!

  //
  // rotate with matrix
  //
  let rad = frameCount * -0.01;
  // as an alternative rotate based on milliseconds
  // let rad = millis() / -5000;
  
  if (frameCount % 10 == 0) { // I slow down the subdivision process to see it better; subdivide at each 10th frame
    subdivide(); // Note: As long as the subdivision is going on, the framerate might slow down and thus the sketch may stutter at the beginning.
  }

  
  // Actually draw all the triangles vertex by vertex
  beginShape(TRIANGLES);
    vecs.forEach(v => {  // We go through all vectors in our list one after another
      
      // This is a version with filled triangles. Decide yourself what you like better.
      // fill(0, 0, map(noise(v.x + (frameCount*noiseSpeed), v.y + (frameCount*noiseSpeed), v.z + (frameCount*noiseSpeed)), 0, 1, 0, 100), 100);
      
      // This is a fancy way to simulate depth:
      // The further away the vertices, the darker and the thinner the strokes become
      // The values of screenZ are not intuitve and range unexpectedly somewhere between about 0.95 and 1.0. I don't know why.
      //println(screenZ(v.x, v.y, v.z)); // Show me those weird screenZ values.
      
      // TODO: how could we achieve something similar in p5?
      //let brightness = (map(screenZ(v.x, v.y, v.z), 0.99, 0.96, 0, 100));
      //stroke(0, 0, brightness);
      //strokeWeight(map(screenZ(v.x, v.y, v.z), 0.99, 0.96, 0, 1.0));

      // stroke(0, 0, 100);0
      // strokeWeight(1);
      vertex(v.x, v.y, v.z);
    });
  endShape();
  
  // beginShape(TRIANGLES);
  // vertex(300, 750);
  // vertex(400, 200);
  // vertex(500, 750);
  // endShape();
  // triangle(300, 750, 580, 200, 860, 750);
  // sphere(width / 5, 20, 20);
   
   // This is just my routine for exporting frames
   // if (recording) { saveFrame("Frames/frame####.jpg"); }
}

// The actual magic of the subdivision happens here.
// One subdivision means: Split a triangle to make two out of it. Replace the old triangle by the two new ones.
function subdivide() {
  
  if(vecs.length > 2000) { // originally with 50000, but slows down significantly
    return; // We stop the subdivision at a certain amount of vertices – depending on the look you like and on what your machine can handle.
  }
  
  let v0, v1, v2;  // We always look at 3 sequent vertices at a time = one existing triangle
  
  for (let i = vecs.length - 1; i >= 2; i-=3) {  // We go through the vertex list backwards.
                                                  // This trick helps us not getting confused with the index i during the iteration,
                                                  // because we are removing and inserting elements inside this loop.
                                                  // This makes sure we hit the correct elements,
                                                  // because the inserting and removing always happens "on the right side" of i.
                                                  // Also we iterate in steps of 3: We always jump 3 steps further to the left in the list.

    let stoppersIndex = int((i+1)/3) - 1;        // This is the corresponding index of the current triangle in the stoppers list. It's just maths.
    if (stoppers[stoppersIndex] == 0) {
      return;  // If the subdivision value of the current triangle is 0, we don't subdivide it further and go on to the next.
    }
    
    // We store our three current vertices. This is the current triangle we are working with.
    v0 = vecs[i];
    v1 = vecs[i-1];
    v2 = vecs[i-2];
    
    // After the split we will end up with a new vertex called vNew. This one is splitting one side of the triangle.
    // Depending on which side we split the triangle, we will define the old 3 vertices as following:
    // rRoot is the vertex opposite to the split side.
    // vStart and vEnd will be the 2 vertices at the split side.
    let vNew, vStart = v0, vEnd = v1, vRoot = v2; // We just assign this now assuming the split side is opposite of v2.
                                                      // This would mean splitting between v0 and v1;
                                                      // We will reassign those in the next steps if necessary.
    
    // For our subdivision we find out which side is the longest and want to split on that side. However, we can define any rules for which side to split!
    let dist0 = p5.Vector.dist(v1, v2);
    let dist1 = p5.Vector.dist(v0, v2);
    let dist2 = p5.Vector.dist(v0, v1);
    const compArr = [dist0, dist1, dist2];
    let maxDist = max(compArr);
    if (maxDist === dist0) {
      vStart = v1; vEnd = v2; vRoot = v0;
    } else if (maxDist === dist1) {
      vStart = v0; vEnd = v2; vRoot = v1;
    }
    
    // Here is an alternative to choose the split side randomly -> interesting result with many long and thin triangles.
    //int divIndex = int(random(0, 3));
    //if (divIndex == 0) {
    //  vStart = v1; vEnd = v2; vRoot = v0;
    //} else if (divIndex == 1) {
    //  vStart = v0; vEnd = v2; vRoot = v1;
    //}
    
    // Now we calculate the position of the new vertex depending on our lerp values = where to split the side
    vNew = p5.Vector.lerp(vStart, vEnd, random(divLerp - divLerpRange, divLerp + divLerpRange));
    
    // Here we calculate the stoppers values for the new 2 triangles.
    // The new value will be 1 with a high probability.
    // If it happens to be 0, then the new triangle will not be subdivided anymore from the next subdivision step on.
    // Note: We can define any rule to calculate those! Be creative!
    // -> We could implement a memory of how often a subdivision had happened for this particular triangle before.
    // -> And we could inherit a subdivision depth --> see the reference link from the top.
    let a = random(1) < stoppingChance;
    let b = random(1) < stoppingChance;
    let stopA = 1, stopB = 1;
    if (a) stopA = 0;
    if (b) stopB = 0;
    
    // new triangle 1 is added in vecs at index i+1 after the current triangle; new subdivide value is added in stoppers accordingly
    vecs.splice(i+1, 0, vStart); vecs.splice(i+1, 0, vRoot); vecs.splice(i+1, 0, vNew);
    stoppers.splice(stoppersIndex, 0, stopA);
    
    // new triangle 2 is added in vecs at index i+1 after the current triangle; new subdivide value is added in stoppers accordingly
    vecs.splice(i+1, 0, vEnd); vecs.splice(i+1, 0, vRoot); vecs.splice(i+1, 0, vNew);
    stoppers.splice(stoppersIndex, 0, stopB);
    
    // the old triangle is removed; the old stoppers value as well
    vecs.splice(i, 1); vecs.splice(i-1, 1); vecs.splice(i-2, 1);
    stoppers.splice(stoppersIndex, 1);
  }
}

function createDoublePyramid (size) {
  
  // These are 6 points describing the double pyramid
  let v0 = createVector(0, -size * 1.5, 0);
  let v1 = createVector(-size, 0, size);
  let v2 = createVector(size, 0, size);
  let v3 = createVector(size, 0, -size); 
  let v4 = createVector(-size, 0, -size);
  let v5 = createVector(0, size  * 1.5, 0);
  
  // Now we put the triangles inside vecs by putting 3 vertices per triangle into it one after another.
  // Each triangle has a corresponding subdivide value in the stoppers list:
  // 1 means this triangle will be subdivided, 0 means no subdivision for this triangle any more.
  // We start with a subdivide value of 1 for all triangles, starting with 0 for one would create a big "hole" in the double pyramid.
  
  // Add triangle 1; add the corresponding stopper value
  appendTriangle(v0, v1, v2, 1);
  
  // Add triangle 2; add the corresponding stopper value
  appendTriangle(v0, v2, v3, 1);
  
  // Add triangle 3; add the corresponding stopper value
  appendTriangle(v0, v3, v4, 1);
  
  // Add triangle 4; add the corresponding stopper value
  appendTriangle(v0, v4, v1, 1);
  
  // Add triangle 5; add the corresponding stopper value
  appendTriangle(v1, v2, v5, 1);
  
  // Add triangle 6; add the corresponding stopper value
  appendTriangle(v2, v3, v5, 1);
  
  // Add triangle 7; add the corresponding stopper value
  appendTriangle(v3, v4, v5, 1);

  // Add triangle 8; add the corresponding stopper value
  appendTriangle(v4, v1, v5, 1);
}

function appendTriangle(v0, v1, v2, subdivideValue) {
  vecs.push(v0);
  vecs.push(v1);
  vecs.push(v2);
  stoppers.push(subdivideValue);
}
