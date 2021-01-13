
/* --------------------
P5js SKETCH 
----------------------*/
const sketch = (p) => {
	const verts = [
		p.createVector(5, 70),
		p.createVector(35, 15),
		p.createVector(50, 75),
		p.createVector(80, 50),
		p.createVector(85, 65),
		p.createVector(90, 10),
		p.createVector(95, 75)
	];
	p.setup = function(){
		p.createCanvas(500, 500);
		p.background(0, 0, 0);
		p.fill(120, 130, 160);
		p.stroke(255, 255, 255);
		p.strokeWeight(2);
		p.beginShape(p.TRIANGLE_STRIP);
		for(let v of verts){
			p.vertex(p.width/100 * v.x, p.height/100 * v.y);
		}
		p.endShape();
	};
}



/* -----------------
--------------------
-------------------*/

// NORMAL Javascript 

const sketchE1 = new p5(sketch, "exercise1");
