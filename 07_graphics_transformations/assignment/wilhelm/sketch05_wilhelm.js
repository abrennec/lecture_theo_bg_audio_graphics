
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
      // 2) How would the applyMatrix() function look like?

    //1
    p.push()
    p.translate(0, -80);
    p.rotateX(p.tan(angle));
    p.rotateY(p.tan(angle));
    p.rotateZ(p.tan(angle));
    p.torus(40 + vol * 200, 10, 6);
    p.rotateY(angle);
    p.rotateZ(angle);
    p.torus(20, 5, 6);
    p.pop()

    //2
    p.push()
    p.translate(-100, 30);
    p.rotateX(cos(angle));
    p.rotateY(cos(angle));
    p.rotateZ(cos(angle));
    p.torus(40 + vol * 200, 10, 6);
    p.rotateY(angle);
    p.rotateZ(angle);
    p.torus(20, 7, 6);
    p.pop()

    //3
    p.push()
    p.translate(100, 30);
    p.rotateX(p.sin(angle));
    p.rotateY(p.sin(angle));
    p.rotateZ(p.sin(angle));
    p.torus(40 + vol * 200, 10, 6);
    p.rotateY(-angle);
    p.rotateZ(-angle);
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