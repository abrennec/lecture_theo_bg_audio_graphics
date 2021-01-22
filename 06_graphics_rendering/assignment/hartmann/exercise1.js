function setup() {
  createCanvas(400, 400);
  drawCross();
}

function draw() {
}

function drawCross(){
  background(220);

  strokeWeight(3);
  stroke(237, 34, 93);

  //example like on the website, multiplied by 4.
  let xChange = createVector(320,0);
  let yChange = createVector(0,120);
  let start = createVector(40,140);
  let next = start.copy();
  
  for (let i = 0; i < 4; i++){

      line(next.x,next.y,next.copy().add(xChange).x,next.copy().add(xChange).y);
      next = next.copy().add(yChange);

      if (i==1){
        start = mirrorVector(start);
        xChange = mirrorVector(xChange);
        yChange = mirrorVector(yChange);
        next = start.copy();
      }
  }

}

function mirrorVector(pVec){
  return pVec.set(pVec.y,pVec.x);
}
