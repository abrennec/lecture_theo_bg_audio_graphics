
// Source and reference: https://editor.p5js.org/ri1/sketches/ROUKawjoW

const sketch4 = (p) => {

  let angle=0

  p.setup = function() {
    p.createCanvas(700, 700);
    p.rectMode(p.CENTER);
  }
  
  p.draw = function() {
    p.background(0);

  // QUESTION:
  // What is going on here on a general level? Add some comments.


  /*

  1. First we get the distance to the mouse on the canvas
  2. We iterate from 0 to the mouse point by some interval
  3. This way we calculate the distance between the mouse and the center, by adding the variable offset (i, j) to the center
  4. The stroke color is also relative to the mouse position and by the iteration in the loop
  5. Then we translate by that amount while also setting the scale of the rect by a ratio determined by the distance.
  6. For every value of "i" and "j" we draw two boxes and rotating them in opposite directions
  7. Finally we increase the angle to animate the rotation transformation each frame

  */
  for (let i = 50; i < p.mouseX; i += 50) {
    for (let j = 50; j < p.mouseY; j += 50) {
      p.noFill()
      p.stroke(p.mouseX - i, i, p.mouseY - j)
      p.strokeWeight(3)
      
      let d = p.dist(p.mouseX, p.mouseY, i + p.width/2, j + p.height/2)
      let r=d/5

      // QUESTION:
      // Inside of push() and pop(), a rotation is executed.
      // 1) How would the corresponding rotation matrix look like?
      // 2) How would applyMatrix(...) have to look like so that 
      //    you can replace rotate(..) with it? (Requires homogeneous coordinates)

      p.push()
      p.translate(i, j)
      p.rotate(-angle)
      p.rect(0, 0, r, r)
      p.pop()
      
      p.push()
      p.translate(i, j)
      p.rotate(angle)
      p.rect(0, 0, r, r)
      p.pop()
      
      angle+=0.0003
      
    }
  }
  }
}

const s4 = new p5(sketch4, "s4");