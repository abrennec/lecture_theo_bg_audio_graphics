let vectors;



function setup(){

vectors = [ 


  createVector(0,35, 0),
  createVector(35, 0, 0),
  createVector(0, -35, 0),
  createVector(-35, 0, 0),
  ];
}

function draw(){
  
createCanvas(500, 500, WEBGL);
background(240);

fill(237, 34, 93);
noStroke();
//rotateX(frameCount * 0.2);
//rotateZ(frameCount * 0.2);

beginShape();
vectors.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape();
}




