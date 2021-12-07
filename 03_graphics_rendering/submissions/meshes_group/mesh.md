# Meshes

 1. What is the difference between vectors, points, and vertices?

Vectors represent directions

Points represent locations 

Vertices are points where directions or vectors come together.


2. What kind of 3D data formats can be loaded with Processing?



3. What is meant by triangular subdivision for?

In triangular subdivision one triangle is subdivided into more. With triangular subdivision a shape can get more complex.

4. Provide one or more examplary sketches.


### Triangular Subdivision
> Source: https://openprocessing.org/sketch/970715

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
