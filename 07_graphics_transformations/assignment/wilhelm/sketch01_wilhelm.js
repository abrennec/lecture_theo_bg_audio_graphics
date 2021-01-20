
// This is a simple shape definition. Add another shape to 
// this 2d scene (specify the geometry or load a predefined shape)
// and check out the following functions in order to position
// the second shape inside of your scene:
// - push()
// - pop()
// - translate()

const sketch1 = (p) => {

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
    p.push();
    p.translate(300, 120);
    p.fill(205, 130, 150);
    p.ellipse(0,0,50,50);
    p.pop();
  }
}

const s1 = new p5(sketch1, "s1");

