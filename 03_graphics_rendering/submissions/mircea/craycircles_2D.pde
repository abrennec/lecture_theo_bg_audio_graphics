//i need to learn how to control the speed, it could look nice on beats

int rotationDegree = 10;

void setup()
{
    size(500, 500);
    background(0, 100, 106);
    stroke(29, 12, 26);


}

void draw()
{
    fill(random(0, 250),random (0, 250),random(0, 250), 100);
    float squareRepeat = random(0, 3000);  
    int squareSize = width;
    translate(squareSize/2.0, squareSize/2.0);
  
    for (int i=0; i < squareRepeat; i++) 
    {
        ellipse(mouseY*2, mouseX*2, squareSize, squareSize);
        scale(1 - 12/squareRepeat);
        rotate(radians(random(random(0, 250), random(0, 250))));
    }
}
