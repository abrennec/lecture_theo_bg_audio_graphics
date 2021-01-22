let vectors;

function setup(){

}

function draw(){


  let v1 = createVector(0,0,0);
  let v2 = createVector(0,0,100);
  let v3 = createVector(100, 0, 0);
  let v4 = createVector (100, 0, 100);
  
  
  let v5 = createVector (0, 100, 0)
  let v6 = createVector(0, 100,100);
  let v7 = createVector(100, 100, 0);
  let v8 = createVector (100, 100, 100); 
 
  
createCanvas(300, 300, WEBGL);
background(240, 240, 240);

rotateX(frameCount * 0.02);
rotateZ(frameCount * 0.02);

//Bottom
beginShape(line);
vertex(v1.x, v1.y, v1.z);
vertex(v2.x, v2.y, v2.z);
vertex(v3.x, v3.y, v3.z);
endShape(CLOSE);

beginShape(line);
vertex(v2.x, v2.y, v2.z);
vertex(v3.x, v3.y, v3.z);
vertex(v4.x, v4.y, v4.z);
endShape(CLOSE);

//Top
beginShape(line);
vertex(v5.x, v5.y, v5.z);
vertex(v6.x, v6.y, v6.z);
vertex(v7.x, v7.y, v7.z);
endShape(CLOSE);

beginShape(line);
vertex(v6.x, v6.y, v6.z);
vertex(v7.x, v7.y, v7.z);
vertex(v8.x, v8.y, v8.z);
endShape(CLOSE);

//Left
beginShape(line);
vertex(v1.x, v1.y, v1.z);
vertex(v2.x, v2.y, v2.z);
vertex(v5.x, v5.y, v5.z);
endShape(CLOSE);

beginShape(line);
vertex(v2.x, v2.y, v2.z);
vertex(v5.x, v5.y, v5.z);
vertex(v6.x, v6.y, v6.z);
endShape(CLOSE);

//Right
beginShape(line);
vertex(v3.x, v3.y, v3.z);
vertex(v4.x, v4.y, v4.z);
vertex(v7.x, v7.y, v7.z);
endShape(CLOSE);

beginShape(line);
vertex(v4.x, v4.y, v4.z);
vertex(v7.x, v7.y, v7.z);
vertex(v8.x, v8.y, v8.z);
endShape(CLOSE);


//Front
beginShape(line);
vertex(v1.x, v1.y, v1.z);
vertex(v3.x, v3.y, v3.z);
vertex(v5.x, v5.y, v5.z);
endShape(CLOSE);

beginShape(line);
vertex(v3.x, v3.y, v3.z);
vertex(v5.x, v5.y, v5.z);
vertex(v7.x, v7.y, v7.z);
endShape(CLOSE);



//Back
beginShape(line);
vertex(v2.x, v2.y, v2.z);
vertex(v4.x, v4.y, v4.z);
vertex(v6.x, v6.y, v6.z);
endShape(CLOSE);

beginShape(line);
vertex(v4.x, v4.y, v4.z);
vertex(v6.x, v6.y, v6.z);
vertex(v8.x, v8.y, v8.z);
endShape(CLOSE);










}


