function setup() {
  createCanvas(800, 800, WEBGL);
  background(220);
 


  //EXERCISE 1:


  //Vorgabe:
  beginShape(TRIANGLE_FAN);
    vertex(57.5, 50);
    vertex(57.5, 15);
    vertex(92, 50);
    vertex(57.5, 85);
    vertex(22, 50);
    vertex(57.5, 15);
  endShape();



  //Nachbau mit create Vector:

  //mitte
  let v1 = createVector(57.5, 50);

  //oben
  let v2 = createVector(57.5, 15);
  
  //rechts
  let v3 = createVector(92, 50);
  
  //unten
  let v4 = createVector(57.5, 85);
  
  //links
  let v5 = createVector(22, 50);

  
  fill(200,0,50);
  triangle(v1.x, v1.y, v4.x, v4.y, v3.x, v3.y);
  fill(255);
  triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
  fill(0);
  triangle(v1.x, v1.y, v4.x, v4.y, v5.x, v5.y);
  fill(100,0,200);
  triangle(v1.x, v1.y, v5.x, v5.y, v2.x, v2.y);


  //EXERCISE THREE
  //links oben vorn
  let a1 = createVector(100,100,100);

  //links oben hinten
  let a2 = createVector(100,100,0);

  //links unten vorn
  let a3 = createVector(100,200,100);

  //links unten hinten
  let a4 = createVector(100,200,0);

  //rechts oben vorn
  let a5 = createVector(200,100,100);

  //rechts oben hinten
  let a6 = createVector(200,100,0);

  //rechts unten vorn
  let a7 = createVector(200,200,100);

  //rechts unten hinten
  let a8 = createVector(200,200,0);


  fill(200,0,50,200);
  //oberseite vorn, a1, a5, a2
  beginShape();
  vertex(100,100,100);
  vertex(200,100,100);
  vertex(100,100,0);
  endShape(CLOSE);

  fill(255,255,255,200);
  //oberseite hinten, a2,a6,a5
  beginShape();
  vertex(100,100,0);
  vertex(200,100,0);
  vertex(200,100,100);
  endShape(CLOSE);

  fill(0,0,0,200);
   //unterseite vorn, a3, a7, a8
   beginShape();
   vertex(100,200,100);
   vertex(200,200,100);
   vertex(200,200,0);
   endShape(CLOSE);
 
   fill(100,0,200,200);
   //Unterseite hinten, a4, a8, a3
   beginShape();
   vertex(100,200,0);
   vertex(200,200,0);
   vertex(100,200,100);
   endShape(CLOSE);

   fill(200,0,50,200);
  //rechte Seite vorn, a5, a7, a8
  beginShape();
  vertex(200,100,100);
  vertex(200,200,100);
  vertex(200,200,0);
  endShape(CLOSE);

  fill(255,255,255,200);
  //rechte Seite hinten, a6, a8, a5
  beginShape();
  vertex(200,100,0);
  vertex(200,200,0);
  vertex(200,100,100);
  endShape(CLOSE);

  fill(0,0,0,200);
  //linke Seite vorn, a1, a3, a2
   beginShape();
   vertex(100,100,100);
   vertex(100,200,100);
   vertex(100,100,0);
   endShape(CLOSE);
 
   fill(100,0,200,200);
  //linke Seite hinten, a2, a4, a3
   beginShape();
   vertex(100,100,0);
   vertex(100,200,0);
   vertex(100,200,100);
   endShape(CLOSE);

   fill(200,0,50,200);
  //hinterseite links, a2, a4, a8
  beginShape();
  vertex(100,100,0);
  vertex(100,200,0);
  vertex(200,200,0);
  endShape(CLOSE);

  fill(255,255,255,200);
  //hinterseite rechts, a1, a3, a2
  beginShape();
  vertex(200,100,0);
  vertex(200,200,0);
  vertex(100,100,0);
  endShape(CLOSE);
  
  fill(0,0,0,200);
  //vorderseite links, a1, a5, a3
  beginShape();
  vertex(100,100,100);
  vertex(100,200,100);
  vertex(200,100,100);
  endShape(CLOSE);

  fill(100,0,200,200);
  //vorderseite rechts, a7, a5, a3
  beginShape();
  vertex(200,200,100);
  vertex(100,200,100);
  vertex(200,100,100);
  endShape(CLOSE);






}

function draw() {

}
