
// Extend sketch01 and use the rotate function. 
// Rotate both shapes in the opposite direction.

const sketch2 = (p) => {

    let vectors;
  
    p.setup = function() {
      p.createCanvas(400, 400);
    
      vectors  = [
        p.createVector(30, 20),
        p.createVector(85, 20),
        p.createVector(85, 75),
        p.createVector(30, 75)
      ];
    }
    
    p.draw = function() {
      p.background(220);
    
      p.beginShape();
      vectors.forEach(v => {
        p.vertex(v.x, v.y);
      }); 
      p.endShape(p.CLOSE);
    }
  }
  
  const s2 = new p5(sketch2, "s2");