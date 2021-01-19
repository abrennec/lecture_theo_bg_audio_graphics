
//BACK
let vectorsT1;
let vectorsT2;
//FRONT
let vectorsT3;
let vectorsT4;
//SIDE
let vectorsT5;
let vectorsT6;
let vectorsT7;
let vectorsT8;
//SIDE 2
let vectorsT9;
let vectorsT10;
let vectorsT11;
let vectorsT12;

function setup() {
  createCanvas(300, 300, WEBGL);


//BACK

//TOP
  vectorsT1  = [
    createVector(50, -50),
    createVector(100, 0),
    createVector(0, 0),
  ];
//BOTTOM
  vectorsT2  = [
    createVector(100, 0),
    createVector(50, 50),
    createVector(0, 0),
  ];

  //FRONT
//TOP
  vectorsT3  = [
    createVector(0, -50, 75),
    createVector(50, 0, 75),
    createVector(-50, 0, 75),
  ];
//BOTTOM
  vectorsT4  = [
    createVector(50, 0, 75),
    createVector(0, 50, 75),
    createVector(-50, 0, 75),
  ];
//SIDE 
//BOTTOM
  vectorsT5  = [
    createVector(50, 0, 75),
    createVector(50, 50, 0),
    createVector(0, 50, 75),
  ];

  vectorsT6  = [
    createVector(50, 0, 75),
    createVector(100, 0, 0),
    createVector(50, 50, 0),
  ];
  
  //TOP

 vectorsT7  = [
    createVector(50, 0, 75),
    createVector(50, -50),
    createVector(0, -50, 75),
  ];

  vectorsT8  = [
    createVector(50, 0, 75),
    createVector(100, 0),
    createVector(50, -50),
  ];
  
  //SIDE 2
  //TOP
  vectorsT9  = [
    createVector(-50, 0, 75),
    createVector(50, -50),
    createVector(0, 0),
  ];

  vectorsT10  = [
    createVector(-50, 0, 75),
    createVector(0, -50, 75),
    createVector(50, -50),
  ];

  //BOTTOM
  vectorsT11  = [
    createVector(-50, 0, 75),
    createVector(50, 50),
    createVector(0, 50, 75),
  ];

  vectorsT12  = [
    createVector(-50, 0, 75),
    createVector(0, 0),
    createVector(50, 50),
  ];
}


function draw() {
  background(220);

  fill(237, 34, 93, 50);

// TRIANGLE 1
  beginShape();
  vectorsT1.forEach(v => {
    vertex(v.x, v.y);
  }); 
  endShape(CLOSE);

// TRIANGLE 2
beginShape();
vectorsT2.forEach(v => {
  vertex(v.x, v.y);
}); 
endShape(CLOSE);

// TRIANGLE 9
beginShape();
vectorsT9.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 10
beginShape();
vectorsT10.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 11
beginShape();
vectorsT11.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 12
beginShape();
vectorsT12.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 5
beginShape();
vectorsT5.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 6
beginShape();
vectorsT6.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 7
beginShape();
vectorsT7.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 8
beginShape();
vectorsT8.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 3
beginShape();
vectorsT3.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);

// TRIANGLE 4
beginShape();
vectorsT4.forEach(v => {
  vertex(v.x, v.y, v.z);
}); 
endShape(CLOSE);




}




