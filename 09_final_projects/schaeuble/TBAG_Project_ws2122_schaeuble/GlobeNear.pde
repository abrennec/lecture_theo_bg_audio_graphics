// This class is drawn between snake and camera

class GlobeNear {
  float size = 80;
  float xpos;
  float ypos;
  float zpos;
  float a;

  float xspeed;
  float yspeed;
  float zspeed;

  boolean kill;

  float sum, sum2;
  float modTest;
  float value;


  GlobeNear() {
    xpos = random(-5000, -2000);
    ypos = random(-200, 1300);
    zpos = random(-800 + size, -20);
    xspeed = 8;
    yspeed = 3;
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
    //println(sum);
  }
}
