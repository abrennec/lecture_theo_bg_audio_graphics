
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

  // iterating over a grid, with a cell width/height of 50px
  // the overall grid width/height is defined by the mouse position in the browser
  for (let i = 50; i < mouseX; i += 50) {
    for (let j = 50; j < mouseY; j += 50) {
      noFill()
      // stroke color is defined by cell i,j position and mouse position
      // generates a spektrum of colors relative to 0,0 and mouse position
      stroke(mouseX - i, i, mouseY - j)
      strokeWeight(3)
      
      // calculate width/height of the two rects for the individual cell
      // width/height is based on distance to mouse position with offset of half the canvas width/height
      // divided by 5 for appearance reasons
      let d =dist(mouseX,mouseY,i+width/2,j+height/2)
      let r=d/5

      // QUESTION:
      // Inside of push() and pop(), a rotation is executed.
      // 1) How would the corresponding rotation matrix look like?
      // 2) How would applyMatrix(...) have to look like so that 
      //    you can replace rotate(..) with it? (Requires homogeneous coordinates)

      // 1) 
      //   cos(a)   -sin(a)   0      -   a  c  e 
      //   sin(a)    cos(a)   0      -   b  d  f
      //   0         0        1

      // drawing a rect in the individual cell
      // rotating by data field angle
      // width height based on variable r
      push()
      translate(i, j)

      //rotate(-angle)
      // 2) // is this a transposed matrix?
      applyMatrix( cos(-angle), sin(-angle),    // a b  
                    -sin(-angle), cos(-angle),  // c d 
                    0, 0 )                      // e f

      rect(0, 0, r, r)
      pop()
      
      // drawing another rect in the individual cell
      // is being rotated in reverse direction by data field angle
      // width height based on variable r
      push()
      translate(i, j)
      //rotate(angle)

      // 2)
      applyMatrix( cos(angle), sin(angle), 
                  -sin(angle), cos(angle), 
                   0, 0)

      rect(0, 0, r, r)
      pop()
      
      // Increase data field angle for rect rotation "movement".
      // Having it inside the two loops makes the shown rotation dependent on 
      // the mouse position. The bigger the grid, the faster the movement.
      angle+=0.0003
      
    }
  }

}