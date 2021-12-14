//based on Coding Train Tutorial: Coding Challenge # 11: 3D Terrain Generation mit Perlin Noise in Processing
//Source: https://www.youtube.com/watch?v=IKB1hWWedMk&t=1s

int cols, rows;
int size = 10;
int w = 1500;
int h = 4000;
float speed = 0;
float[][] terrain;

void setup() {
  size(600, 900, P3D);
  cols = w / size;
  rows = h/ size;
  terrain = new float[cols][rows];
}


void draw() {
  speed -= 0.05;
  float yoff = speed;
  for (int y = 0; y < rows; y++) {
    float xoff = 0;
    for (int x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  background(0);
  stroke(255);
  noFill();
  translate(width/2, height/2);
  rotateX(PI/5);
  translate(-w/2, -h/2);
  for (int y = 0; y < rows-1; y++) {
    beginShape();
    for (int x = 0; x < cols; x++) {
      vertex(x*size, y*size, terrain[x][y]);
    }
    endShape();
  }
}
