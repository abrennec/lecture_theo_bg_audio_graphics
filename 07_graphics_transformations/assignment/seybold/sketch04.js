// sketch04
// Source and reference: https://editor.p5js.org/ri1/sketches/ROUKawjoW


let angle=0
function setup() {
  createCanvas(700, 700);
  rectMode(CENTER)
  
}

function draw() {
  background(0);

  // QUESTION: What is going on here on a general level? Add some comments.
  // ANSWER: The sketch draws two rectangles. Both move in opposite direction, 
  // while the size, color, number and speed of rotation are dependent on (the value of) MouseX and MouseY.

  // every 50px on the Y- and X- axis the rect transforms (at: stroke, d: dist, r: rect weight and height). 
  for (let i = 50; i < mouseX; i += 50) {
    for (let j = 50; j < mouseY; j += 50) {
      noFill()
      stroke(mouseX - i, i, mouseY - j)
      strokeWeight(3)
      
      let d =dist(mouseX,mouseY,i+width/2,j+height/2)
      let r=d/5

      // QUESTION:
      // Inside of push() and pop(), a rotation is executed.
      // 1) How would the corresponding rotation matrix look like?
      //   let sr = sin(angle)
      //   let cr = cos(angle)
      //   applyMatrix(-cr,sr,-sr,-cr,0,0)

      // 2) How would applyMatrix(...) have to look like so that 
      //    you can replace rotate(..) with it? (Requires homogeneous coordinates)

      push()
      translate(i, j)
      //rotate(-angle)
      // matrix
      let sr = sin(angle)
      let cr = cos(angle)
      applyMatrix(-cr,sr,-sr,-cr,0,0)

      rect(0, 0, r, r)
      pop()
      
      push()
      translate(i, j)
      //rotate(angle)
      // matrix 2 
      let srm = sin(-angle)
      let crm = cos(-angle)
      applyMatrix(-crm,srm,-srm,-crm,0,0)
      rect(0, 0, r, r)
      pop()
      
      angle+=0.0003

    }
  }

}