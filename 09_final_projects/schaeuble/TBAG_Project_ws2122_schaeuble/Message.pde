class Message {

  String startMess = "Press and hold any key to swim.";
  PFont f = createFont("Arial", 70);
  float a = 150;


  void display() {
    //line(0, height / 2, width, height / 2);
    //line(width / 2, 0, width / 2, height);

    if (keyPressed == false) {
      fill(255, 100, 100, a);
      textFont(f);
      text(startMess, 500, 1100, -900);
    }


    if (keyPressed == true) {
      countdown();
    } else if (keyPressed == false && a <= 0.0) {
      wipe();
    }
  }

  void countdown() {
    a -= 0.7;
    fill(255, 100, 100, a);
    textFont(f);
    text(startMess, 500, 1100, -900);

    if (a <= 0.0) {
      wipe();
    }
  }

  void wipe() {
    background(267, 50, 50);
  }
}
