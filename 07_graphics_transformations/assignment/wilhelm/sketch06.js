
// Source and reference: https://editor.p5js.org/ri1/sketches/lYJKhcDDV

// This sketch nicely combines changes to the geometry with
// audio. Check it out and take it as an inspiration in the 
// first place. 

// Think about how you might make use of this in connection
// with the musical piece you have created.

const sketch6 = (p) => {
    
    const a = p.PI/5;

    p.r = function () {
        p.rect(0, 0, 30, 30);
    }

    p.setup = function() {
        canvas = p.createCanvas(400, 400);
        p.background(0,0,0);
        p.stroke(10, 200, 200);
        p.noFill();
        p.strokeWeight(4);
        p.r();
        p.applyMatrix(1, 0,
                      0, 1,
                      30, 40);
        p.r();
        p.applyMatrix(1, 0,
            0, 1,
            30, 40);
        p.r();
        p.resetMatrix();
        p.applyMatrix(2 * p.cos(a), -p.sin(a),
                      p.sin(a), 2 * p.cos(a),
                      280, 20)
        p.r();

    }
}
  
const s6 = new p5(sketch6, "s6");