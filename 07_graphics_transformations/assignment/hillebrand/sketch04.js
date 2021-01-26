
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

  for (let i = 50; i < mouseX; i += 50) {
    for (let j = 50; j < mouseY; j += 50) {
      // A grid the size of the distance of the mouse from the corner
      // in distances of 50 pixels is drawn -> for every 50 pixels on the x and for every
      // 50 pixels on the y axis that the mouse is away from (0,0) the loop gets exectued
      noFill()
      stroke(mouseX - i, i, mouseY - j)
      // The stroke color depens on the mousePosition + the index that is drawn, 
      // that's how there's a rainbow pattern
      strokeWeight(3)
      
      let d =dist(mouseX,mouseY,i+width/2,j+height/2)
      // measures the distance of the mouse to the object + half of the canvas in both dimensions
      // this is later used for the size of the box
      let r=d/5

      // QUESTION:
      // Inside of push() and pop(), a rotation is executed.
      // 1) How would the corresponding rotation matrix look like?
      // | cos(angle) -sin(angle) |
      // | sin(angle)  cos(angle) |
      // 2) How would applyMatrix(...) have to look like so that 
      //    you can replace rotate(..) with it? (Requires homogeneous coordinates)
      
      push()
      let cosAngle = cos(angle);
      let sinAngle = sin(angle);
      translate(i, j)
      //rotate(-angle)

      applyMatrix(cosAngle, sinAngle, -sinAngle, cosAngle, 0, 0);

      rect(0, 0, r, r)
      pop()
      

      push()
      cosAngle = cos(-angle);
      sinAngle = sin(-angle);
      translate(i, j)
      //rotate(angle)

      applyMatrix(cosAngle, sinAngle, -sinAngle, cosAngle, 0, 0);

      rect(0, 0, r, r)
      pop()
      
      //angle is increased each frame
      angle+=0.0003
      
    }
  }

}