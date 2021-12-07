void setup() {
  size(600,600,P3D);
  
}

float theta = 0.0;

void draw() {
  background(255);
  
  //for (int i = 0; i < 4; i++) {
  //  push();
  //  translate(random(width), random(height), 0);
  //  rect(0,0,10,10);
  //  pop();
  //}
  
  push();
  translate(width/2, height/2);
  rotateY(sin(theta)); // * 2*PI);//random(-1, 1));
  rotateX(sin(theta)); // * 2*PI);//random(-1, 1));
  rotateZ(sin(theta)); // * 2*PI);//random(-1, 1));
  noFill();
  box(sin(theta)*160);
  theta += 0.05;
  pop();
  
  //push();
  //translate(100, 200, 0); 
  //rotateY(sin(theta)); // * 2*PI);//random(-1, 1));
  //rotateX(sin(theta)); // * 2*PI);//random(-1, 1));
  //rotateZ(sin(theta)); // * 2*PI);//random(-1, 1));
  //noFill();
  //box(sin(theta)*160);
  ////theta += 0.01;
  //pop();
  
  //push();
  //translate(50, 50, 0); 
  //rotateY(sin(theta)); // * 2*PI);//random(-1, 1));
  //rotateX(sin(theta)); // * 2*PI);//random(-1, 1));
  //rotateZ(sin(theta)); // * 2*PI);//random(-1, 1));
  //noFill();
  //box(sin(theta)*160);
  ////theta += 0.05;
  //pop();
  
}
