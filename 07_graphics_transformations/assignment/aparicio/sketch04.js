
// Source and reference: https://editor.p5js.org/ri1/sketches/ROUKawjoW


let angle=0
function setup() {
  createCanvas(700, 700);
  rectMode(CENTER)
  
}

function draw() {
  background(0);

  // QUESTION:
  // What is going on here on a general level? Add some comments.

  //starting with 50 is used for all values under mouseX/mouseY in steps of 50...

  for (let i = 50; i < mouseX; i += 50) {
    for (let j = 50; j < mouseY; j += 50) {
      noFill()
      stroke(mouseX - i, i, mouseY - j)
      strokeWeight(3)
      
      //depending on the distance between mouse and place the size of d changes
      let d =dist(mouseX,mouseY,i+width/2,j+height/2)
      let r=d/5


      // QUESTION:
      // Inside of push() and pop(), a rotation is executed.
      // 1) How would the corresponding rotation matrix look like?
      //  | cos   -sin   0  |
      //  | sin   cos    0  |
      //  | 0     0      1  |
      // 2) How would applyMatrix(...) have to look like so that 
      //    you can replace rotate(..) with it? (Requires homogeneous coordinates)
      //-> applied inside first push/pop

      //for each repetition in the loop the coordinate system is shifted with 
      //translate to the right and down. Push and pop then reset the
      //coordinate system back to the original position. 
      //With rotate() the object will be rotated and with rect() it will be moved to the
      //current coordinate system at position 0,0 with the size r. 
      
      let cos_a = cos(angle);
      let sin_a = sin(angle);

      push()
      translate(i, j)
      applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0)
      rect(0, 0, r, r)
      pop()
      
      //the same as the upper is repeated, only rotated in the other direction
      push()
      translate(i, j)
      rotate(-angle)
      rect(0, 0, r, r)
      pop()
      
      angle+=0.0003
      
    }
  }

}