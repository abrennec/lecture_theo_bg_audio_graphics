float gridDist;
PGraphics pg;
color[] c  = {#173F5F, #20639B, #3CAEA3, #F6D55C, #ED553B };
ArrayList<PVector> arr =new ArrayList<PVector>();

int time = 0;
int timer = 0;
int countdown =5;
void setup() {
  size(600, 600);
  pg = createGraphics(600, 600);
  gridDist = width/15;
  background(255);
  mondrian();
  textAlign(CENTER);
  rectMode(CENTER);
  textSize(20);
}

void draw() {
  if (millis()-time > 5000) {
    background(255);
    mondrian();
    time = millis();
  }
  if (millis()-timer > 1000) {
    countdown--;
    if (countdown <= 0){
      countdown = 5;
    }
    timer = millis();
  }
  fill(0);
  noStroke();
  rect(width/2,height-20,210,40);
  
  stroke(255);
  noFill();
strokeWeight(1.5);
  rect(width/2,height-20,200,30);
  fill(255);
  text("new Mondrian in..."+countdown, width/2,height-13 );
}
void mousePressed() {

  mondrian();
}

void mondrian() {
  pg.beginDraw();
  pg.clear();
  for (int i = 0; i < width; i +=gridDist) {
    for (int j = 0; j < height; j +=gridDist) {

      strokeWeight(3);
      //rect(i, j, gridDist, gridDist);
      pg.strokeWeight(3);
      if (random(0, 1) < 0.1) {
        pg.fill(c[int(random(0, c.length))]);
        int x = int(random(1, 8));
        int y = int(random(1, 8));
        pg.rect(i, j, gridDist*x, gridDist*y);
        arr.add(new PVector(i, j));
        arr.add(new PVector(i+gridDist*x, j+gridDist*y));
      }
    }
  }
  pg.endDraw();
  background(255);
  float[] sortedX = new float [arr.size()];
  float[] sortedY = new float [arr.size()];
  for (int i = 0; i < arr.size(); i++) {
    sortedX[i] = arr.get(i).x;
    sortedY[i] = arr.get(i).y;

    if (arr.get(i).x < sortedX[1]) {
      line(0, arr.get(i).y, width, arr.get(i).y);
      println(sortedX[0], arr.get(i).x);
      //line(arr.get(i).x,0,arr.get(i).x,height);
    }
    if (arr.get(i).y < sortedY[1]) {
      line(arr.get(i).x, 0, arr.get(i).x, height);
    }
  }
  image(pg, 0, 0);
  for (int i = 0; i < sortedX.length; i++) {
    //println(arr.get(i), arr.size());
  }

  arr.clear();
}
