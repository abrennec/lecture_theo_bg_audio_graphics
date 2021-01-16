function setup() {
  createCanvas(600, 600, WEBGL);
  setAttributes('antialias', true);
  
  strokeWeight(1);
  //noStroke();
  
}

function draw() {
  background(200);
  
  let v1 = createVector(-100, 100, 100); // fill(0, 255, 255);
  let v2 = createVector(100, 100, 100);  // fill(255, 255, 255);
  let v3 = createVector(100, -100, 100);  // fill(255, 0, 255);
  let v4 = createVector(-100, -100, 100);  // fill(0, 0, 255);
  let v5 = createVector(-100, 100, -100);  // fill(0, 255, 0);
  let v6 = createVector(100, 100, -100);   // fill(255, 255, 0)
  let v7 = createVector(100, -100, -100);  // fill(255, 0, 0);
  let v8 = createVector(-100, -100, -100);  // fill(0, 0, 0);
  //rotateX(frameCount * 0.01);
  //rotateZ(frameCount * 0.01);
  
  let posX = width/2;
  let posY = height/2;
    
  let angleX = mouseX / posX * TWO_PI / 1;
  let angleY = mouseY / posY * TWO_PI / -1;

  rotateY(angleX );
  rotateX(angleY );
  

  beginShape();
  
  fill(0, 255, 255);    vertex(v1.x, v1.y, v1.z);
  fill(255, 255, 255);  vertex(v2.x, v2.y, v2.z);
  fill(255, 0, 255);    vertex(v3.x, v3.y, v3.z);
  fill(0, 0, 255);      vertex(v4.x, v4.y, v4.z);
  
  fill(0, 255, 255);    vertex(v1.x, v1.y, v1.z);
  fill(255, 0, 255);    vertex(v3.x, v3.y, v3.z);
  fill(255, 0, 0);      vertex(v7.x, v7.y, v7.z);
  fill(255, 255, 255);  vertex(v2.x, v2.y, v2.z);
  
  fill(255, 255, 0);    vertex(v6.x, v6.y, v6.z);
  fill(255, 0, 0);      vertex(v7.x, v7.y, v7.z);
  fill(0, 255, 0);      vertex(v5.x, v5.y, v5.z);
  fill(255, 255, 0);    vertex(v6.x, v6.y, v6.z);
  
  fill(0, 255, 255);    vertex(v1.x, v1.y, v1.z);
  fill(0, 255, 0);      vertex(v5.x, v5.y, v5.z);
  fill(0, 0, 0);        vertex(v8.x, v8.y, v8.z);
  fill(0, 0, 255);      vertex(v4.x, v4.y, v4.z);
  
  fill(255, 0, 0);      vertex(v7.x, v7.y, v7.z);
  fill(0, 0, 0);        vertex(v8.x, v8.y, v8.z);
  fill(0, 255, 255);    vertex(v1.x, v1.y, v1.z);
  
  
  //noFill();
  
  // Ah shit, it is not working as intended with the fillings, but it looks beautiful anyways ;)
  
  
  
  endShape();
  
}

