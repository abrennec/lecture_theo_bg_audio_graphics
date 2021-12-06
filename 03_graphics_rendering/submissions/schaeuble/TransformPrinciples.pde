void setup()
{
  size(350, 350);


  // Translate
  rect(10, 10, 40, 40);
  
  push();
  fill(255, 0 ,0);
  translate(10, 10); // draw the same rect, but at new coordinates.
  rect(10, 10, 40, 40);
  pop();
  
  // Rotate
  rect(200, 10, 40, 40);
  
  push();
  fill(0, 255, 0);
  translate(200, 10); // place the grid origin, at relative origin of white rect.
  rotate(radians(45)); // Rotate by 45 degrees
  rect(0, 0, 40, 40);
  pop();
  
  
  // Scale
  rect(95, 100, 40, 40);
  
  push();
  fill(0, 0, 255);
  translate(55, 160); // move coordinates origin to the left of white square to center
  scale(3, 3);
  rect(0, 0, 40, 40);
  pop();
  
}
