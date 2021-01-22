let vertices = [];

function setup() {
  createCanvas(400, 400,WEBGL);
  drawCross();
}

function draw() {
  background(220);
  rotateY(millis() / 2000);
  translate(-100,-100,0);
  drawCross();
  translate(70,70,0);
  drawBox();
}

function drawCross(){

  strokeWeight(3);
  stroke(237, 34, 93);

  //example like on the website, multiplied by 2.
  let xChange = createVector(160,0,0);
  let yChange = createVector(0,60,0);
  let start = createVector(20,70,0);
  let next = start.copy();
  let z = 0;
  
  for (let i = 0; i < 8; i++){
      vertices.push(createVector(next.x,next.y,z));
      connect = next.copy().add(xChange);
      //vertices.push(createVector(connect.x,connect.y,z));
      //line(next.x,next.y,z,next.copy().add(xChange).x,next.copy().add(xChange).y,z);
      line(next.x,next.y,z,connect.x,connect.y,z);
      next = next.copy().add(yChange);

      if (i%2==1){
        start = mirrorVector(start);
        xChange = mirrorVector(xChange);
        yChange = mirrorVector(yChange);
        next = start.copy();
      }

      if (i==3){
        z = -55;
      }

  }
  console.log(vertices);
  //noLoop();

}

function mirrorVector(pVec){
  return pVec.set(pVec.y,pVec.x);
}

function drawBox(){
  let a = 60;
  let z = -55;
  stroke(100, 34, 93);
  fill(255,255,255,50);
  //noFill();

  beginShape();

  //front
  vertex(0,0,0);
  vertex(a,a,0);
  vertex(a,0,0);

  vertex(0,0,0);
  vertex(a,a,0);
  vertex(0,a,0);

  //left
  vertex(0,a,0);
  vertex(0,0,0);
  vertex(0,0,z);

  vertex(0,0,z);
  vertex(0,a,0);
  vertex(0,a,z);

  //top
  vertex(0,a,z);
  vertex(0,0,z);
  vertex(0,0,0);

  vertex(0,0,0);
  vertex(0,a,0);
  vertex(0,0,z);

  //back
  vertex(0,0,z);
  vertex(a,a,z);
  vertex(a,0,z);

  vertex(0,0,z);
  vertex(a,a,z);
  vertex(0,a,z);

  //bottom
  vertex(a,a,0);
  vertex(a,a,z);
  vertex(a,0,z);

  vertex(a,0,0);
  vertex(a,a,0);
  vertex(a,a,z);

  //right
  vertex(a,0,z);
  vertex(a,a,0);
  vertex(a,0,0);

  vertex(a,0,z);
  vertex(a,a,0);
  vertex(a,a,z);

  endShape();
}
