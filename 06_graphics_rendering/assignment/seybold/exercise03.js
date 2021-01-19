// exercise03

let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(175);

  //feature 
  //fill(100, 0, 255); 
  strokeWeight(4);

  //rotation
  rotateX(-mouseY * 0.01);
  rotateY(-mouseX * 0.01);

  //cube 
  let v1 = createVector(200, -200,-200);  //run
  let v2 = createVector(200, 200, -200);  //ron
  let v3 = createVector(-200, -200,-200); //lun
  let v4 = createVector(-200, 200, -200); //lon
  let v5 = createVector(-200, -200, 200); //luw
  let v6 = createVector(200, -200, 200);  //ruw
  let v7 = createVector(200, 200, 200);   //row
  let v8 = createVector(-200, 200, 200);  //low


  beginShape(line);
  vertex(v4.x, v4.y, v4.z);
  vertex(v2.x, v2.y, v2.z);
  vertex(v8.x, v8.y, v8.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v8.x, v8.y, v8.z);
  vertex(v7.x, v7.y, v7.z);
  vertex(v2.x, v2.y, v2.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v3.x, v3.y, v3.z);
  vertex(v1.x, v1.y, v1.z);
  vertex(v6.x, v6.y, v6.z);
  endShape(CLOSE);

 beginShape(line);
  vertex(v7.x, v7.y, v7.z);
  vertex(v6.x, v6.y, v6.z);
  vertex(v2.x, v2.y, v2.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v4.x, v4.y, v4.z);
  vertex(v3.x, v3.y, v3.z);
  vertex(v8.x, v8.y, v8.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v5.x, v5.y, v5.z);
  vertex(v6.x, v6.y, v6.z);
  vertex(v3.x, v3.y, v3.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v2.x, v2.y, v2.z);
  vertex(v1.x, v1.y, v1.z);
  vertex(v6.x, v6.y, v6.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v8.x, v8.y, v8.z);
  vertex(v5.x, v5.y, v5.z);
  vertex(v3.x, v3.y, v3.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v8.x, v8.y, v8.z);
  vertex(v5.x, v5.y, v5.z);
  vertex(v6.x, v6.y, v6.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v4.x, v4.y, v4.z);
  vertex(v3.x, v3.y, v3.z);
  vertex(v8.x, v8.y, v8.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v1.x, v1.y, v1.z);
  vertex(v2.x, v2.y, v2.z);
  vertex(v3.x, v3.y, v3.z);
  endShape(CLOSE);

  beginShape(line);
  vertex(v4.x, v4.y, v4.z);
  vertex(v2.x, v2.y, v2.z);
  vertex(v3.x, v3.y, v3.z);
  endShape(CLOSE);
}


