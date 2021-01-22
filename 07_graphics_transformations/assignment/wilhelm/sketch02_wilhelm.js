
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
      
      p.push();
      p.translate(20, 50);
      p.rotate(p.PI / 6);
      p.beginShape();
      vectors.forEach(v => {
        p.vertex(v.x, v.y);
      }); 
      p.endShape(p.CLOSE);
      p.pop();

      p.push();
      p.translate(300, 120);
      p.rotate(-p.PI / 6);
      p.fill(205, 130, 150);
      p.rect(0,0,50,50);
      p.pop();
    }
  }
  
  const s2 = new p5(sketch2, "s2");