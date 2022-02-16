let sound;
let fft;
let x1=100;
let y1=100;

let amplitude;
let basicShader;
let originXOffset;
let originYOffset;
let positions = [];

function preload() {
  sound = loadSound("A_trip_down_the_supermarket.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth(20);
  sound.play();
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();

}
function draw() {
            background(0);
            let level = amplitude.getLevel();
            level = level * 10.0;
            let waveform = fft.waveform();
        noFill();
          
    if (sound.currentTime() > 0 && sound.currentTime() < 23) {
        frameRate(10);
        stroke(random(0,255),random(0,255),random(0,255))
            for (let x = 150; x <= width; x += 580) {
                for (let y = 180; y <= height; y += 560) {
                    translate(x, y, 0);
                    rotate((PI / 180) * level * frameCount);
                    box(x1);
                }
            }
        translate(x1, y1, 10);
        rotate((PI / 100) * frameCount);
        box(15);
        translate(x1, y1, x1);
        rotate((PI / y1) * frameCount);
        box(y1);
        x1 = x1 * y1 / x1;
        y1 = y1+level;
    }//lonely box, intro
         
    if (sound.currentTime() > 23 && sound.currentTime() < 36) {
          frameRate(10);
          stroke(random(0,255),random(0,255),random(0,255))
          for (let x = 10; x <= width; x += 580) {
              for (let y = 110; y <= height; y += 560) {
                  translate(x, y, 0);
                  rotate((PI / 180) * level * frameCount);
                  box(x1);
              }
          }
          translate(x1, y1, 10);
          rotate((PI / 100) * frameCount);
          box(level);
          translate(x1, y1, x1);
          rotate((PI / y1) * frameCount);
          box(y1);
          x1 = x1 * y1 / x1;
          y1 = y1+level;
    }// box zoom, intro

    if (sound.currentTime() > 36 && sound.currentTime() < 37) {
            frameRate(10);
            translate(-width/2, -height/2 , 0);
            stroke(random(0, 255), random(0, 255), random(0, 255));
            rotateY(map(level*100, 0, width, 0, level));
            for (var x = 0; x <= width; x += 30) {
                for (var y = 0; y <= height; y += 30) {
                    push();
                    translate(x+x, y+y, x);
                    rotateY(map(level*100, 0, width, 0, 20));
                    rotateX(map(level*10, 0, height, 0, 20));
                    box(35);
                    pop();
                x=x+level;
                y=y+level;
                }
              }
    }//grid growing on right

    if (sound.currentTime() > 37 && sound.currentTime() < 42) {
        frameRate(10);
        translate(-width/2, -height/2 , 0);
        stroke(random(0, 255), random(100, 255), 120);
        rotateY(map(level*100, 0, width, 0, level));
        ambientLight(0, 255, random(0, 255));
        for (var x = 0; x <= width; x += 30) {
            for (var y = 0; y <= height; y += 30) {
                push();
                translate(x, y+y, 20);
                rotateY(map(level*1000, 0, width, 0, 20));
                rotateX(map(level*1000, 0, height, 0, 20));
                box(random(5,35));
                pop();
            x=x+level;
            y=y+level;
            }
    }}//grid lateral colt dreapta

    if (sound.currentTime() > 42 && sound.currentTime() < 43) {
        frameRate(10);
        stroke(random(0, 255), random(100, 255), random(100, 255));
        translate(-width/2, -height/2, 0);
        for (var x = 0; x <= width; x += 110) {
            for (var y = 0; y <= height; y += 55) {
                push();
                translate(x, y, 20);
                rotateY(map(level*1000, 10, width, 0, 20));
                rotateX(map(level*1000, 10, height, 0, 20));
                box(random(40.50),random(40.50),random(40.50));
                pop();
            }
        }
    
    }//grid bigger
           
    if (sound.currentTime() > 43 && sound.currentTime() < 48) {
        frameRate(10);
        translate(-width/2, -height/2 , 0);
        stroke(random(0, 255), random(100, 255), random(100, 255));
        rotateY(map(level, 0, width, 0, level));
        ambientLight(0, 255, random(0, 255));
        for (var x = 0; x <= width; x += 30) {
            for (var y = 0; y <= height; y += 30) {
                push();
                translate(x+x, y+y, x);
                rotateY(map(level, 10, width, 0, 20));
                rotateX(map(level*1000, 0, height, 10, 20));
                box(40, 50, 40);
                pop();
            x=x++;
            y=y++;
            }
        }
    }//BIG

    if (sound.currentTime() > 48 && sound.currentTime() < 49)  {
            frameRate(10);
            translate(-width/2, -height/2 , 0);
            stroke(random(0, 255), random(100, 255), 120);
            rotateY(map(level*1000, 0, width, 0, level));
            for (var x = 0; x <= width; x += 130) {
                for (var y = 0; y <= height; y += 130) {
                    push();
                    translate(y+y, x, x);
                    rotateY(map(level*1000, 0, width, 0, 20));
                    rotateX(map(level*1000, 0, height, 0, 20));
                    box(random(0,50));
                    pop();
                x=x+level;
                y=y+level;
                }
              }
    }//grid growing on right
    
    if (sound.currentTime() > 49 && sound.currentTime() < 54)  {
        frameRate(10);
        stroke(random(0, 255), random(100, 255), 120);
        translate(-width/2, -height/2, 0);
        for (var x = 0; x <= width; x += 120) {
            for (var y = 0; y <= height; y += 85) {
                push();
                translate(x, y, 20);
                rotateY(map(level*1000, 10, width, 0, 20));
                rotateX(map(level*1000, 10, height, 0, 20));
                box(random(40.80),random(40.60),random(40.60));
                pop();
            }
        }
    
    }//grid bigger

    if (sound.currentTime() > 54 && sound.currentTime() < 55)  {
    frameRate(10);
    translate(-width/2, -height/2 , 0);
    stroke(random(0, 255), random(100, 255), 120);
    for (var x = 0; x <= width; x += 30) {
        for (var y = 0; y <= height; y += 30) {
            push();
            translate(x+y, y+y, 20);
            rotateY(map(level*1000, 0, width, 0, 20));
            rotateX(map(level*1000, 0, height, 0, 20));
            box(random(15,25));
            pop();
        x=x+level;
        y=y+level;
        }
    }
    }//grid lateral colt dreapta
   
    if (sound.currentTime() > 55 && sound.currentTime() < 60)  {
        frameRate(10);
        translate(-width/2, -height/2 , 0);
        stroke(random(0, 255), random(100, 255), 120);
        push();
            for (var x = 0; x <= width; x += 50) {
            for (var y = 0; y <= height; y += 130) {
                push();
                translate(y+y, x, y);
                rotateY(map(level*100, 100, width, 0, 20));
                rotateX(map(level*100, 0, height, 0, 20));
                box(random(10,50));
                pop();
            x=x+level;
            y=y+level;
            pop();
            }
          }
    }//grid growing on right LINII

    if (sound.currentTime() > 60 && sound.currentTime() < 61)  {
        frameRate(10);
        translate(-width/2, -height/2 , 0);
        stroke(random(0, 255), random(100, 255), 120);
        rotateY(map(level*100, 0, width, 0, level));
        for (var x = 0; x <= width; x += 30) {
            for (var y = 0; y <= height; y += 30) {
                push();
                translate(x+y, y+y, 5);
                rotateY(map(level*10, 0, width, 0, 20));
                rotateX(map(level*10, 0, height, 0, 20));
                box(15);
                pop();
            x=x+level;
            y=y+level;
            }
          }
    }//grid small, empty corner left
    
    if (sound.currentTime() > 61 && sound.currentTime() < 66)  {
        frameRate(12);
        stroke(random(150,255),random(0,255),random(0,255))
        for (let x = 10; x <= width; x += 590) {
            for (let y = 110; y <= height; y += 590) {
                translate(x, y, 0);
                rotate((PI / 180) * level * frameCount);
                box(x1);
            }
        }
        translate(x1, y1, 10);
        rotate((PI / 100) * frameCount);
        box(level);
        translate(x1, y1, x1);
        rotate((PI / y1) * frameCount);
        box(y1);
        x1 = y1 ;
        y1 = y1+level;
    }//rotatie zoom, intro

    if (sound.currentTime() > 66 && sound.currentTime() < 67)  {
        frameRate(10);
        translate(-width/2, -height/2 , 0);
        stroke(random(0, 255), random(100, 255), 120);
        rotateY(map(level*100, 0, width, 0, level));
        for (var x = 0; x <= width; x += 130) {
            for (var y = 0; y <= height; y += 130) {
                push();
                translate(y+y, x, y);
                rotateY(map(level*100, 0, width, 0, 20));
                rotateX(map(level*100, 0, height, 0, 20));
                box(random(10,50));
                pop();
            x=x+level;
            y=y+level;
            }
          }
    }//grid growing on right

    if (sound.currentTime() > 67 && sound.currentTime() < 72)  {
        frameRate(10);
        stroke(random(150,255),random(0,255),random(0,255))
        strokeWeight(1);
        for (let x = 10; x <= width; x += 580) {
            for (let y = 110; y <= height; y += 560) {
                translate(x, y, 0);
                rotate((PI / 150) * level * frameCount);
                box(x1);
            }
        }
        translate(x1, y1, 10);
        rotate((PI / 100) * frameCount);
        box(level);
        translate(x1, y1, x1);
        rotate((PI / y1) * frameCount);
        box(y1);
        x1 = y1 ;
        y1 = y1+level;
    }//rotatie zoom, intro

    if (sound.currentTime() > 72 && sound.currentTime() < 75)  {     
        frameRate(10);
        stroke(random(0, 255), random(100, 255), 120);
        translate(-width/2, -height/2, 0);
        for (var x = 0; x <= width; x += 100) {
            for (var y = 0; y <= height; y += 155) {
                push();
                translate(x, y, 20);
                rotateY(map(level*900, 10, width, 0, 20));
                rotateX(map(level*900, 10, height, 0, 20));
                box(50, 10, 50);
                pop();
            }
        }
    
    }//grid bigger
        
    if (sound.currentTime() > 75 && sound.currentTime() < 76)  {
            frameRate(10);
            translate(-width/2, -height/2 , 0);
            stroke(random(0, 255), random(100, 255), 120);
            var cameraY = height / 1.0;
            rotateY(map(level*100, 0, width, 0, level));
            var fov = mouseX / float(width / 2) * PI / 10;
            ambientLight(0, 255, random(0, 255));
            for (var x = 0; x <= width; x += 30) {
                for (var y = 0; y <= height; y += 30) {
                    push();
                    translate(x+x, y+y, x);
                    rotateY(map(level*100, 0, width, 0, 20));
                    rotateX(map(level*10, 0, height, 0, 20));
                    box(15);
                    pop();
                x=x+level;
                y=y+level;
                }
              }
    }//grid growing on right
       
    if (sound.currentTime() > 76 && sound.currentTime() < 79)  {
        frameRate(10);
        stroke(random(150,255),random(0,255),random(0,255))
            for (let x = 150; x <= width; x += 580) {
                for (let y = 180; y <= height; y += 560) {
                    translate(x, y, 0);
                    rotate((PI / 180) * level * frameCount);
                    box(x1);
                }
            }
        translate(x1, y1, 10);
        rotate((PI / 100) * frameCount);
        box(15);
        translate(x1, y1, x1);
        rotate((PI / y1) * frameCount);
        box(y1);
        x1 = x1 * y1 / x1;
        y1 = y1+level;
    }//lonely box, intro
    
    if (sound.currentTime() > 79 && sound.currentTime() < 81)  {
        frameRate(12);
        stroke(random(0,255), random(0,255), random(0,255));
        for (let x = 10; x <= width; x += 580) {
            for (let y = 110; y <= height; y += 560) {
                translate(x, y, 0);
                rotate((PI / 180) * level * frameCount);
                box(x1);
            }
        }
        translate(x1, y1, 10);
        rotate((PI / 100) * frameCount);
        box(level);
        translate(x1, y1, x1);
        rotate((PI / y1) * frameCount);
        box(y1);
        x1 = y1 ;
        y1 = y1+level;
    }//rotatie zoom, intro

    if (sound.currentTime() > 81 && sound.currentTime() < 82)  {
            frameRate(10);
            translate(-width/2, -height/2 , 0);
            stroke(random(0,255), random(0,255), random(0,255));
            var cameraY = height / 1.0;
            rotateY(map(level*1000, 0, width, 0, level));
            for (var x = 0; x <= width; x += 80) {
                for (var y = 0; y <= height; y += 30) {
                    push();
                    translate(y+y, x, y);
                    rotateY(map(level*1000, 0, width, 0, 20));
                    rotateX(map(level*1000, 0, height, 0, 20));
                    box(random(50,50));
                    pop();
                x=x+level;
                y=y+level;
                }
              }
    }//grid growing on right

    if (sound.currentTime() > 82 && sound.currentTime() < 84)  {
    frameRate(10);
    translate(-width/2, -height/2 , 0);
    stroke(random(0,255), random(0,255), random(0,255));
    var cameraY = height / 1.0;
    rotateY(map(level, 0, width, 0, level));
    var fov = mouseX / float(width / 2) * PI / 10;
    ambientLight(0, 255, random(0, 255));
    for (var x = 0; x <= width; x += 30) {
        for (var y = 0; y <= height; y += 30) {
            push();
            translate(x+x, y+y, x);
            rotateY(map(level*100, 10, width, 0, 20));
            rotateX(map(level*1000, 0, height, 10, 20));
            box(40, 50, 40);
            pop();
        x=x++;
        y=y++;
        }
    }
    }//BIG
        
    if (sound.currentTime() > 84 && sound.currentTime() < 86)  {
        frameRate(10);
        stroke(random(0,255), random(0,255), random(0,255));
        translate(-width/2, -height/2, 0);
        for (var x = 0; x <= width; x += 110) {
            for (var y = 0; y <= height; y += 155) {
                push();
                translate(x, y, 20);
                rotateY(map(level*2000, 10, width, 0, 20));
                rotateX(map(level*2000, 10, height, 0, 20));
                box(random(100,150), 50, 50);
                pop();
            }
        }
    
    }//grid bigger
    
    if (sound.currentTime() > 86 && sound.currentTime() < 90)  {
    frameRate(10);
    translate(-width/2, -height/2 , 0);
    stroke(random(0,255), random(0,255), random(0,255));
    for (var x = 0; x <= width; x += 30) {
        for (var y = 0; y <= height; y += 30) {
            push();
            translate(x+x, y+y, x);
            rotateY(map(level*100, 10, width, 0, 20));
            rotateX(map(level*1000, 0, height, 10, 20));
            box(40, 50, 40);
            pop();
        x=x++;
        y=y++;
        }
    }
    }//BIG
    
    if (sound.currentTime() > 90 && sound.currentTime() < 132)  {
        background(0);
        frameRate(10);
        noFill();
        stroke(random(0,255), random(0,255), random(0,255));
        rotate((PI / 10) * frameCount);
        box(random(50, 200), random(50, 20), random(50, 200));
        for (let i = 0; i < 10; i++) {
            translate(100, 10);
            rotate((PI / 200) * frameCount);
            box(random(50, 200), random(50, 120), random(50, 200));
        }
        for (let i = 0; i < 20; i++) {
            translate(50, 0);
            rotate((PI / 20) * frameCount);
            box(random(50, 200), random(5, 120), random(50, 200));
        }
        for (var i = 0; i < 15; i++) {
            translate(10, 0);
            rotate((PI / 52) * frameCount);
            box(random(5, 100), random(100, 200), random(50, 200));
        }
        translate(100, 0);
        rotate((PI / 200) * frameCount);
        box(random(50, 200), random(50, 20), random(50, 200));
        for (let x = 10; x <= width; x += 160) {
            for (let y = 10; y <= height; y += 160) {
                translate(x, y, 10);
                rotate((PI / 20) * frameCount);
                box(random(50, 120), random(50, 120), random(50, 20));
            }
            x1 = x1 * y1 / 10;
            y1 = y1 + x1;
        }
    }   
    //rotatie zoom, intro

    else if (sound.currentTime() > 132 && sound.currentTime() < 168)  {
    let level = amplitude.getLevel();
    level = level * 10.0;
    let waveform = fft.waveform();
    background(0);
    translate(-width / 2, -height / 2, 0);
    rectMode(CENTER);
    fill(random(0, 255), random(0, 255), random(0, 255));
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 5, waveform.length, 0, width); //map using index nr
      let y = map(waveform[i], -1, 1, height, 0); //map using amplitude

      rect(x, y, 1*waveform.length/100, 3*waveform.length/1000, 3);
    }
}}
