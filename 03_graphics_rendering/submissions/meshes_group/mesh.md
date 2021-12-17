# Meshes

 1. What is the difference between vectors, points, and vertices?

**Points** represent locations in space. A point is a 0-dimensional entity existing in n-dimensional space.
A point is a primitive notion, which means it is not defined in relation to any object, that has previously been defined. It can not be subdivided into anything else, nor does it consist of various parts.

**Vectors** represent directions or displacement. It is a 1-dimensional entity existing in n-dimensional space. A vector can describe the geometracial relation between two points.


**Vertices** in geometry are points where edges or vectors intersect or origin from. In computer graphics, vertices can have mutlitple attributes like color or texture coordinates. So in both cases, there is a difference to a point. A vertex in geometry is therefore either defined only in relation to previously defined objects (e.g. two edges that intersect), which would not make it a primitive notion and therefore not a point. A vertex in computer graphics consists of various attributes, which would also not make it a primitive notion and therefore not a point.


2. What kind of 3D data formats can be loaded with Processing?

SVG and OBJ files can be loaded via the loadShape() function.


3. What is meant by triangular subdivision for?

Triangular subdivision is used for representing curved surfaces in Computer Graphics. A complex and computationally expensive to use *inner mesh* can be approximated in a *coarse* or *outer mesh* using much fewer triangles. This happens in an iterative process of a chosen *depth*. With a higher depth – meaning more iterations – the *outer mesh* will be increasingly accurate, but also increasingly computationally expensive to use in a scene.

4. Provide one or more examplary sketches.


<p float="left">
<img  src="https://user-images.githubusercontent.com/66121204/146160626-1b755ea7-e6e2-4590-9cc6-8335b80a8d1f.png" width="250"> 
 <img  src="https://user-images.githubusercontent.com/66121204/146160616-85226015-8395-4b78-9a47-f955d0b97f70.png" width="250" >
 <img src="https://user-images.githubusercontent.com/66121204/146160628-a34fe216-e9b6-4feb-a7b9-0f38fb5ef819.png" width="250" >
 <img  src="https://user-images.githubusercontent.com/66121204/146160631-0f883628-abb4-4534-a111-90a4936e0083.png" width="250" >
 </p>

```java
    void setup() {
       size(600, 600, P3D);
       noFill();
       stroke(255);
     }

     void draw() {
       background(0);
       translate(width/2, height/2);
       rotateX(PI/2);
       rotateZ(-PI/6);
       sphere(100);
       rotateY(0.3);
       sphereDetail(mouseX / 4);
     }
     
 ```


### Triangular Subdivision
<img width="998" alt="Bildschirmfoto 2021-12-07 um 18 08 24" src="https://user-images.githubusercontent.com/66121204/145077688-08d19280-a1e0-446c-8909-3f79f5b32ca3.png">
> Source: https://openprocessing.org/sketch/970715


```java


    // Parameters
    var maxDivs = 15;
    var divProb = 0.85;
    // var balance = 0.5;
    var variance = 0.1;
    var numColors = 5;
    var hueJitter = 4;
    var satJitter = 4;
    var valJitter = 4;

    // Global Variables
    let colorPalette = [];

    function setup() {
        createCanvas(1000, 1000);
        colorMode(HSB, 255);
        randomPalette();
        noStroke();
        // background(100);
        noLoop();

        let gui = new dat.GUI();
        gui.add(this, "maxDivs", 5, 17, 1);
        gui.add(this, "divProb", 0, 1, .05);
        gui.add(this, "variance", 0, 1, .05);
        // gui.add(this, "balance", 0, 1, .05);
        gui.add(this, "generate");

        generate();
    }

    function randomPalette() {
        colorPalette.length = 0;
        if (numColors !== 0) {
            for (let i = 0; i < numColors; i++) {
                // colorPalette.push([floor(random(255)), floor(random(128, 255)), floor(random(128, 255))]);
                colorPalette.push([floor(random()*255), 222, 222]);
            }
        }
    }

    class Triangle {
        constructor(x1, y1, x2, y2, x3, y3, depth) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.x3 = x3;
            this.y3 = y3;
            this.depth = depth;
            this.d12 = dist(x1, y1, x2, y2);
            this.d23 = dist(x2, y2, x3, y3);
            this.d13 = dist(x1, y1, x3, y3);
            this.maxLength = max([this.d12, this.d23, this.d13]);
            this.dx = 0; // x of point opposite longest side
            this.dy = 0; // y of point opposite longest side
            this.lx = 0; // x of point halfway along longest side
            this.ly = 0; // y of point halfway along longest side
            this.nx1 = 0; // x of first point of longest side
            this.ny1 = 0; // y of first point of longest side
            this.nx2 = 0; // x of second point of longest side
            this.ny2 = 0; // y of second point of longest side
            this.col = colorPalette[floor(random(numColors))];
        }

        display() {
            this.col[0] = constrain(this.col[0] + random(hueJitter) - hueJitter/2, 0, 255);
            this.col[1] = constrain(this.col[1] + random(satJitter) - satJitter/2, 0, 255);
            this.col[2] = constrain(this.col[2] + random(valJitter) - valJitter/2, 0, 255);
            fill(this.col[0], this.col[1], this.col[2]);
            triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
        }

        getOppositePt() {
            let randVal = constrain(randomGaussian(0.5, variance), 0, 1);
            // let randVal = 0.5; //constrain(randomGaussian(0.5, 0.25), 0, 1);
            // console.log(randVal);
            if (this.maxLength == this.d12) {
                this.dx = this.x3;
                this.dy = this.y3;
                this.nx1 = this.x1; // x of first point of longest side
                this.ny1 = this.y1; // y of first point of longest side
                this.nx2 = this.x2; // x of second point of longest side
                this.ny2 = this.y2; // y of second point of longest side
                this.lx = lerp(this.x1, this.x2, randVal);
                this.ly = lerp(this.y1, this.y2, randVal);
                // line(this.dx, this.dy, this.lx, this.ly);
            } else if (this.maxLength == this.d23) {
                this.dx = this.x1;
                this.dy = this.y1;
                this.nx1 = this.x2; // x of first point of longest side
                this.ny1 = this.y2; // y of first point of longest side
                this.nx2 = this.x3; // x of second point of longest side
                this.ny2 = this.y3; // y of second point of longest side
                this.lx = lerp(this.x2, this.x3, randVal);
                this.ly = lerp(this.y2, this.y3, randVal);
                // line(this.dx, this.dy, this.lx, this.ly);
            } else {
                this.dx = this.x2;
                this.dy = this.y2;
                this.nx1 = this.x1; // x of first point of longest side
                this.ny1 = this.y1; // y of first point of longest side
                this.nx2 = this.x3; // x of second point of longest side
                this.ny2 = this.y3; // y of second point of longest side
                this.lx = lerp(this.x1, this.x3, randVal);
                this.ly = lerp(this.y1, this.y3, randVal);
                // line(this.dx, this.dy, this.lx, this.ly);
            }
        }

        getRandomPt() {
            // 
        }
    }

    function generate() {
        clear();
        // divideTriangle(random(800), random(800), random(800), random(800), random(800), random(800), 10, 1)
        divideTriangle(0, 0, width, 0, width, height, maxDivs, 1)
        divideTriangle(0, 0, 0, height, width, height, maxDivs, 1)
    }

    function divideTriangle(x1, y1, x2, y2, x3, y3, depth, base) {
        if (depth == base) {
            let tri1 = new Triangle(x1, y1, x2, y2, x3, y3, depth);
            tri1.display();
            // tri1.getOppositePt();
        } else {
            let toDivide = randomGaussian(0.5, 0.25);
            let tri2 = new Triangle(x1, y1, x2, y2, x3, y3, depth);
            tri2.getOppositePt();
            if (toDivide < divProb) {
                divideTriangle(tri2.dx, tri2.dy, tri2.lx, tri2.ly, tri2.nx1, tri2.ny1, depth - 1, base);
                divideTriangle(tri2.dx, tri2.dy, tri2.lx, tri2.ly, tri2.nx2, tri2.ny2, depth - 1, base);
            }
            else { // display if not dividing so no overlapping
                tri2.display();
            }
        }
    }
```
