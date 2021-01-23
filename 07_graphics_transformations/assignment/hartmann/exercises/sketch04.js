
// Source and reference: https://editor.p5js.org/ri1/sketches/ROUKawjoW


let angle=0
function setup() {
  createCanvas(700, 700);
  rectMode(CENTER)
  
}

function draw() {
  background(0);

  //the point, where the mouse is in the canvas is the right lower ////edge of the drawing. Every 50 pixels until that edge on the x and
  // the x ais, an rectangle with that center point is drawn
  for (let i = 50; i < mouseX; i += 50) {
    for (let j = 50; j < mouseY; j += 50) {
      noFill()
      //the color of the stroke (r,g,b) depends on the mouse position and
      //on the index of the object. that is how the rainbow pattern 
      //occurs
      stroke(mouseX - i, i, mouseY - j)
      strokeWeight(3)
      
      //the distance between the lower right corner and the object pixel plus half of the canvas height is measures
      let d =dist(mouseX,mouseY,i+width/2,j+height/2)
      let r=d/5

      // QUESTION:
      // Inside of push() and pop(), a rotation is executed.
      // 1) How would the corresponding rotation matrix look like?
      //( ct, -st,
      //  st, ct, 
      // 0.0,  0.0);
      // 2) How would applyMatrix(...) have to look like so that 
      //    you can replace rotate(..) with it? (Requires homogeneous coordinates)

      //the size of the rect depends on the calculated distance
      //to the center of the drawing area
      push()
      translate(i, j); 
      let ct = cos(-angle);
      let st = sin(-angle);
      applyMatrix( ct, -st,
                   st, ct,
                  0.0,  0.0);             
      //rotate(-angle);
      rect(0, 0, r, r)
      pop()
      
      //each object is drawn twice with opposite rotation angles
      push()
      translate(i, j)
      ct = cos(angle);
      st = sin(angle);
      applyMatrix( ct, -st,
        st, ct, 
       0.0,  0.0);    
      //rotate(angle)
      rect(0, 0, r, r)
      pop()
      
      //each frame, the angle increases slightly
      angle+=0.0003
      
    }
  }

}