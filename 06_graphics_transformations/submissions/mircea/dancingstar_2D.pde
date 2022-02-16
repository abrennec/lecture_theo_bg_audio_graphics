// adapted from Coding Train
// http://thecodingtrain.com
// http://patreon.com/codingtrain

// Code for: https://youtu.be/ksRoh-10lak
// Processing port by Max (https://github.com/TheLastDestroyer)

// all floats to negate integer devision errors
float n1 = 0.5;
float n2 = 0.5;
float n3 = 0.3;

float m = 0;
float a = 1;
float b = 2;

float osc = 0;

void setup(){
  size(600,600, P3D);
  smooth(8);
  frameRate(30);

}

void draw(){
  m = map((float) Math.sin(osc), -2.0, 1.0, 3.0, 10.0);
  osc += 0.02;
  lights();
  background(0);
  translate(width/2, height/2);
  stroke(random(0, 255), random(0, 255), 120);
  noFill();
  float cameraY = height/5.0;
  float fov = mouseX/float(width/5) * PI/10;
  float cameraZ = cameraY / tan(fov / 2.0);
  float aspect = float(width/1)/float(height/2);
  perspective(fov, aspect, cameraZ/5.0, cameraZ*5.0);

  int radius = 600;
  int total = 800;
  float increment = TWO_PI / (float) total;
  
  beginShape();
  
   for (float angle = 0; angle < TWO_PI; angle += increment) {
    float r = super_shape(angle);
    float x = radius * r * cos(angle);
    float y = radius * r * sin(angle);

    vertex(x, y);
  }
  endShape(CLOSE);
}

float super_shape(float theta){
  float part1 = (1 / a) * cos(theta * m / 4);
  part1 = abs(part1);
  part1 = pow(part1, n2);
  part1 = pow(part1, n2);

  float part2 = (1 / b) * sin(theta * m / 4);
  part2 = abs(part2);
  part2 = pow(part2, n3);

  float part3 = pow(part1 + part2, 1 / n1);

  if (part3 == 0) {
    return 0;
  }

  return (1 / part3);
}
