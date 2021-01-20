
// Source and reference: https://editor.p5js.org/ri1/sketches/lYJKhcDDV

// This sketch nicely combines changes to the geometry with
// audio. Check it out and take it as an inspiration in the 
// first place. 

// Think about how you might make use of this in connection
// with the musical piece you have created.

const sketch5 = (p) => {

  let angle = 0;
  let canvas;
  let amplitude;
  let vol;
  let music;

  p.preload = function(){
    // TODO: 
    // Add a music file so that the sketch works
    music = p.loadSound("resources/marianas.mp3")
  }

  p.setup = function() {
    canvas = p.createCanvas(400, 400, p.WEBGL);
    canvas.mouseClicked(this.musicController);
    amplitude = new p5.Amplitude();
  }
  
  p.draw = function() {
    p.background(175);
    p.normalMaterial();
    vol = amplitude.getLevel();

      // In the push() and pop() settings below, several rotation 
      // transformations are excuted. 
      // 1) How would you have to combine the rotation matrices into one?
      //  By Matrix multiplication or in p5js with rotate(x-angle, y-angle, z-angle)
      // 2) How would the applyMatrix() function look like?
      // See implementation below

    //1
    const t = p.tan(angle);
    p.applyMatrix(p.cos(t) * p.cos(t), p.sin(t) * p.cos(t), -p.sin(t), 0.0,
                  p.cos(t) * p.sin(t) * p.sin(t) - p.sin(t) * p.cos(t), p.cos(t) * p.sin(t) * p.cos(t) + p.sin(t) * p.sin(t), p.cos(t) * p.sin(t), 0.0,
                  p.cos(t) * p.sin(t) * p.cos(t) + p.sin(t) * p.sin(t), p.sin(t) * p.sin(t) * p.cos(t) - p.cos(t) * p.sin(t), p.cos(t) * p.cos(t), 0.0,
                  0.0, -80.0, 0.0, 1.0)
    p.torus(40 + vol * 200, 10, 6);
    p.resetMatrix();
    const a = angle;
    p.applyMatrix(p.cos(a), 0, -p.sin(a), 0,
                  p.sin(a) * p.sin(a), p.cos(a), p.cos(a) * p.sin(a), 0,
                  -p.sin(a) * p.sin(a), -p.sin(a), p.cos(a) * p.cos(a), 0,
                  0, 0, 0, 0)
    p.torus(20, 5, 6);
    p.resetMatrix();

    //2
    const c = p.cos(angle);
    p.applyMatrix(p.cos(c) * p.cos(c), p.sin(c) * p.cos(c), -p.sin(c), 0.0,
                  p.cos(c) * p.sin(c) * p.sin(c) - p.sin(c) * p.cos(c), p.cos(c) * p.sin(c) * p.cos(c) + p.sin(c) * p.sin(c), p.cos(c) * p.sin(c), 0.0,
                  p.cos(c) * p.sin(c) * p.cos(c) + p.sin(c) * p.sin(c), p.sin(c) * p.sin(c) * p.cos(c) - p.cos(c) * p.sin(c), p.cos(c) * p.cos(c), 0.0,
                  -100.0, 30.0, 0.0, 1.0)
    p.torus(40 + vol * 200, 10, 6);
    p.applyMatrix(p.cos(a), 0, -p.sin(a), 0,
                  p.sin(a) * p.sin(a), p.cos(a), p.cos(a) * p.sin(a), 0,
                  -p.sin(a) * p.sin(a), -p.sin(a), p.cos(a) * p.cos(a), 0,
                  0, 0, 0, 0)
    p.torus(20, 7, 6);
    p.resetMatrix();

    //3
    p.push()
    p.translate(100, 30);
    const s = p.sin(angle);
    p.applyMatrix(p.cos(s) * p.cos(s), p.sin(s) * p.cos(s), -p.sin(s), 0.0,
                  p.cos(s) * p.sin(s) * p.sin(s) - p.sin(s) * p.cos(s), p.cos(s) * p.sin(s) * p.cos(s) + p.sin(s) * p.sin(s), p.cos(s) * p.sin(s), 0.0,
                  p.cos(s) * p.sin(s) * p.cos(s) + p.sin(s) * p.sin(s), p.sin(s) * p.sin(s) * p.cos(s) - p.cos(s) * p.sin(s), p.cos(s) * p.cos(s), 0.0,
                  100.0, 30.0, 0.0, 1.0)
    p.torus(40 + vol * 200, 10, 6);
    p.applyMatrix(p.cos(-a), 0, -p.sin(-a), 0,
                  p.sin(-a) * p.sin(-a), p.cos(-a), p.cos(-a) * p.sin(-a), 0,
                  -p.sin(-a) * p.sin(-a), -p.sin(-a), p.cos(-a) * p.cos(-a), 0,
                  0, 0, 0, 0)
    p.torus(20, 8, 6);
    p.pop()

    angle += 0.003
  }

  p.musicController = function(){
    if (music.isPlaying()) {
      music.stop();
    } else {
      music.play()
    }
  }
}

const s5 = new p5(sketch5, "s5");