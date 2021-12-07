/// This is mostly coded after Daniel Shoffmans Coding Challenge on Youtube, just transferred from p5js to processing (see: https://youtu.be/OJxEcs0w_kE)
/// I then added colors to it to make it look like a mondrian 

// Mondrian color Palette
color palette[] = {color(250,201,1), color(255,255,255), color(34,80,149), color(221,1,0), color(200,200,200)};
Quadtree qt;

void setup (){
size(1000 ,1000);
background(0);

//inital Quadtree filling the whole canvas because of rectMode Center
Rectangle boundary = new Rectangle (width/2 , height/2 , width , height);
qt = new Quadtree(boundary, 1);
}

void draw (){
  if(frameCount % 5 == 0){
       qt.insert(new Point ( int(random(width)) , int(random(height))));
  }
  qt.show();

  
} 
