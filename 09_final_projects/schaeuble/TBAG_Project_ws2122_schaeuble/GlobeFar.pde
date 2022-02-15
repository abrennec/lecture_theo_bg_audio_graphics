// This class is drawn on the other side of the snake and further

class GlobeFar {
  float size = 80;
  float xpos;
  float ypos;
  float zpos;
  float a;

  float xspeed;
  float zspeed;

  boolean kill;

  float sum, sum2;
  float value;


  GlobeFar() {
    xpos = random(-5000, -2000);
    ypos = random(-500, 1800);
    zpos = random(-4000, -800 - size);
    xspeed = 8;
    size = 80;
  }



  void display(float amp) {


    // Analyzing spectrum array from main sketch
    fft.analyze(fftSum);

    // Sum average of amplitude change over bands, smoothed so that globe color shifts are not so glitchy
    for (int i = 0; i < fftSum.length; i++) {
      sum += (fft.spectrum[i] + fftSum[i]) * smoothingFactor;
    }



    a += amp;
    fill(map(sum, 0.000, 250.000, 0.000, 360.00), 100, 100, a);
    noStroke();
    push();
    translate(xpos, ypos, zpos);
    sphere(size);
    pop();



    if (xpos + zpos - 2000 > width) {
      kill = true;
    }
  }

  void move(float amp) {
    xpos += (amp * 10) + 0.5;
    //println(amp);
  }
}
