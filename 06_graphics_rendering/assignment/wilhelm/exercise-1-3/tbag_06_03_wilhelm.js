
/* --------------------
P5js SKETCH 
----------------------*/

const sketch2 = (p) => {
	let angle = 0;
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
		p.createCanvas(500, 500, p.WEBGL);
		p.ortho(-p.width / 4, p.width / 4, p.height / 4, -p.height / 4, 0, 1500);
		
	};
	p.draw = function(){
		p.background(0, 0, 0);
		const lightPos =  p.createVector(100, 100, -10);
		p.directionalLight(200, 210, 220, lightPos);
		p.ambientLight(100,100,155);
		
		p.fill(120, 130, 160);
		p.strokeWeight(2);
		p.stroke(255, 255, 255);

		angle += 0.002;
		p.rotateX(angle);
		p.rotateY(-angle);
		p.translate(-50, 10, 0);
		p.beginShape(p.TRIANGLE_STRIP);
		for(const v of verts){
			p.vertex(v.x, 0, v.y);
		}
		for(let i = verts.length -1; i >= 0; i--){
			if(i % 2 == 0){
				p.vertex(verts[i].x, 0, verts[i].y);
				p.vertex(verts[i].x, 30, verts[i].y);
			}
		}
		for(let i = 0; i < verts.length; i++){
			if(i % 2 == 1){
				p.vertex(verts[i].x, 0, verts[i].y);
				p.vertex(verts[i].x, 30, verts[i].y);
			}
		}
		const last = verts.length -1;
		p.vertex(verts[last].x, 0, verts[last].y);
		for(let i = verts.length -1; i >= 0; i--){
			p.vertex(verts[i].x, 30, verts[i].y);
		}
		p.endShape();
	}
}

/* -----------------
--------------------
-------------------*/

// NORMAL Javascript 

const sketchE3 = new p5(sketch2, "exercise3");
