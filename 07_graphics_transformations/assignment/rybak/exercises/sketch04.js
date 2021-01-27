
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
      noFill()
      stroke(mouseX - i, i, mouseY - j)
      strokeWeight(3)
      
      let d =dist(mouseX,mouseY,i+width/2,j+height/2)
      let r=d/5

      //Every time the position of cursor the crosses the the step of
      //50 on the x and/or y axis a new shape is created.
      //The color is also influenced by the position
      //of the cursor. 
      //The distance function calculates the distance between two points.

      // QUESTION:
      // Inside of push() and pop(), a rotation is executed.
      // 1) How would the corresponding rotation matrix look like?
      // Rotation Matrix in 2D
      // [ cos(angle) -sin(angle) ]
      // [ sin(angle)  cos(angle) ] 
    


      // 2) How would applyMatrix(...) have to look like so that 
      //    you can replace rotate(..) with it? (Requires homogeneous coordinates)
      let cos_a = cos(angle);
      let sin_a = sin(angle);

      push()
      translate(i, j)
      //rotate(-angle)

      applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);

      rect(0, 0, r, r)
      pop()
      
      push()
      translate(i, j)
      rotate(angle)
      rect(0, 0, r, r)
      pop()
      
      //angle is increased each frame
      angle+=0.0003

      
      
    }
  }

}