

class Particle
{
  PVector position;
  PVector velocity;
  float noiseValue;
  float noiseValueZ;
  float brightness;



  Particle(float X, float Y)
  {
    position = new PVector(X, Y);
    velocity = new PVector(0, 0);
  }

  void update()
  {


    //if (insideScreen) {
    if (position.x > 0 && position.x < width && position.y > 0 && position.y < height) {


      /////// image Input or noise(position.x * noiseScale, position.y * noiseScale)
      // map position to pixel in image
      int x = int(position.x / width * img.width);
      int y = int(position.y / height * img.height);
      int loc = x + y*img.width;

      // Look up the RGB color in the source image
      img.loadPixels();
      float r = red(img.pixels[loc]);
      float g = green(img.pixels[loc]);
      float b = blue(img.pixels[loc]);

      brightness = (r + g + b)/(3 * 255);
      
      //get influence on direction change based on brightness
      noiseValue = brightness  * noiseScale * 100;

      // set Direction
      // angle = 0 (horizontal right), angle = PI (horizontal left) -> noise * full Rotation -> noise()* 2PI -> angleRange will also allow rotation in opposite direction
      velocity = PVector.fromAngle(noiseValue * 2 * PI * angleRange);

      //set Speed
      velocity.setMag(speed);


      //distance = v * deltaTime
      //distance = v * (1/frameRate) ->  d = velocity/framerate
      position.add(PVector.div(velocity, frameRate));
      // z position set fixed instead of adding to velocity
      position.z = map(brightness, 0, 1, -100, 100 );

      //positions.add(position);

      //display particle! /////////
      display();
    }


    //////////// wrap position
    //else {
    //  println(position.x);
    //  if (position.x < 0) {
    //    position.x = width - 1;
    //  }
    //  if (position.x > width) {
    //    position.x = 1;
    //  }
    //  if (position.y < 0) {
    //    position.y = height -1;
    //  }
    //  if (position.y > height) {
    //    position.y = 1;
    //  }
    //}
  }

  void display()
  {
    
    // Circles when 2D
    // get the hue value and modulo(%) it so it does cycle not clip
    //fill((colorRange * noiseValue * 255 + colorRangeShift) % 255, 255, 255);
    //noStroke();
    //circle(position.x, position.y, 0.4);
    
    // Vertecies
    strokeWeight(0.8);
    stroke((colorRange * noiseValue * 255 + colorRangeShift) % 255, 255, 255);
    beginShape(POINTS);
    vertex( position.x, position.y, position.z);
    endShape();
    
    // Spheres
    //fill((colorRange * noiseValue * 255 + colorRangeShift) % 255, 255, 255);
    //noStroke();
    //pushMatrix();
    //translate(position.x, position.y, position.z);

    //// more variety in thickness
    //if (position.z < 50){
    //      sphere(random(1,4));
    //}
    //else{
    //      sphere(map(brightness, 0, 1,3, 1 ));
    //}
    //popMatrix();
  }
}
