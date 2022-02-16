//set up noise params
let perl_x = 0;
let perl_y = 0;
let maxNoise = 1;
let minNoise = maxNoise - 0.5;
let r;

//color params
let colorOne;
let colorTwo;

//set up music params
let track;
let bass;
let mid;
let treble;

let duration;

//super formula inputs

// - a = odd side radius
// - b = even side radius
// - m = rotational symmetry (number of spikes)
// - n1 = circularness
//     - smaller values ⇒ more spiky
//     - larger values ⇒ more circular
// - n2 & n3 = shape of the spikes

let latDetail;
let longDetail;
let numCopies = 2;
let latA;
let latB;
let latM;
let latN1;
let latN2;
let latN3;
let longA;
let longB;
let longM;
let longN1;
let longN2;
let longN3;
let zFactor;
let sfactor;


//setup cue points
let breakpoint1;
let breakpoint2;
let breakpoint3;
let breakpoint4;

let zTranslateCounter = 0;



// this variable will hold our shader object
//let myShader;

function preload() {
	track = loadSound("./sketches/SuperFormula.wav"); //, [successCallback], [errorCallback], [whileLoading])
	//myShader = loadShader('basic.vert', 'basic.frag');
	
}

function setup() 
{
	let canvas = createCanvas(windowWidth, windowHeight, WEBGL);

	//shader() sets the active shader with our shader
  	//here I've deactivated the shader, as I ended up implementing everything in P5
	
	//shader(myShader); 
  	
	//set canvas properties
	strokeWeight(2);
	noFill();
	pixelDensity(1);
	smooth();
	background(0);
	rectMode(CENTER);
	rectMode(RADIUS)
	colorMode(HSB)
	

	//interpolate between these two colors
	colorOne = color(100, 255, 255);
	colorTwo = color(255, 255, 255);

	//set up fft object
	fft = new p5.FFT();

	// create a new Amplitude analyzer
	analyzer = new p5.Amplitude();

	// Patch the input to an volume analyzer
	analyzer.setInput(drumTrack);
	
	//analyze track waveform
	//let wf = track.getPeaks(Math.pow(2, 6));

	//play on click
	canvas.mouseClicked(togglePlay);

	//set up cue markers
	duration = track.duration();
	console.log(duration);
	breakpoint1 = 9.5;
	breakpoint2 = 48.387;
	breakpoint3 = 60.0 + 27.1;
	breakpoint4 = 60.0 + 58.0;

	
}

function draw()
{
	background(0);

	//only necessary when using the shader
	// myShader.setUniform("fogNear", 0.0);
	// myShader.setUniform("fogFar", 2000.0);

	//console.log(frameRate());

	//get audio reactive values
	fft.analyze();
	bass = fft.getEnergy("bass");
	mid = fft.getEnergy("mid");
	treble = fft.getEnergy("treble");
	smooth(1);

	bassNormalized = normalizeEnergy(bass);
	midNormalized = normalizeEnergy(mid);
	trebleNormalized = normalizeEnergy(treble);
	
	let mouseX_percent = map(mouseX, 1, windowWidth,  0.01, 1.0);
	let mouseY_percent = map(mouseY, 1, windowHeight, 0.01, 1.0);
	
//BREAKPOINT 1
	if (track.currentTime() <= breakpoint1 ) {
		j = 2;
		zFactor = 1;
		
		rotateX(frameCount/ 1000);
		rotateZ(frameCount * 0.005);
		rotateY(frameCount / 1000);

		latDetail  = 30;
		longDetail = 30;

		latA  = 1;
		latB  = 1;
		latM  = mouseY_percent * 20; 
		latN1 = 1;
		latN2 = 1;
		latN3 = 1;

		longA  = 1;
		longB  = 1;
		longM  = mouseX_percent * 20;
		longN1 = abs(sin(frameCount / 100));
		longN2 = 15;
		longN3 = 15;

		numCopies = 2;

		sfactor = 300;

		stroke(lerpColor(colorOne, colorTwo, abs(sin(frameCount / 100))));

		
//BREAKPOINT 2
	} else if (track.currentTime() > breakpoint1 && track.currentTime() <= breakpoint2) {
		latDetail  = 100;
		longDetail = 6;

		latA  = bassNormalized / 3;
		latB  = bassNormalized / 1.5;
		latM  = mouseX_percent * 20; 
		latN1 = mouseY_percent * 10;
		latN2 = 1;
		latN3 = 1;

		longA = 1;
		longB = 1;
		longM = mouseY_percent * 10;
		longN1 = 1;
		longN2 = 1;
		longN3 = 1;

		colorOne = color(150, 255, 255);
		colorTwo = color(255, 255, 255);
		strokeWeight(2);
		zFactor = 0;

		numCopies = map(sin(bassNormalized), -1, 1, 0.01, 1.0) * 10;

		sfactor = 100;

		stroke(lerpColor(colorOne, colorTwo, abs(sin(frameCount / 100))));


//BREAKPOINT 3
	} else if (track.currentTime() > breakpoint2 && track.currentTime() <= breakpoint3) {
		rotateX(frameCount / 1000);
		rotateZ(frameCount * 0.005);
		rotateY(frameCount / 1000);

		zFactor = 1;

		latDetail  = trebleNormalized * 100;
		longDetail = bassNormalized * 100;

		latA  = 1;
		latB  = 1;
		latM  = mouseY_percent * 20; 
		latN1 = 10;
		latN2 = 15;
		latN3 = 15;

		longA  = 1;
		longB  = 1;
		longM  = mouseX_percent * 20;
		longN1 = abs(sin(bassNormalized)) * 15;
		longN2 = 15;
		longN3 = 15;

		numCopies = 3;

		sfactor = 100;

		stroke(lerpColor(colorOne, colorTwo, abs(sin(bassNormalized))));

//BREAKPOINT 4		
	} else if (track.currentTime() > breakpoint3 && track.currentTime() <= duration) {
		rotateX(frameCount/ 1000);
		rotateZ(frameCount * 0.005);
		rotateY(frameCount / 1000);

		zFactor = 1;

		latDetail  = 30;
		longDetail = 50;

		latA  = 1;
		latB  = 1;
		latM  = map(sin(frameCount / 100), -1, 1, 1, 4);
		latN1 = 20;
		latN2 = 11;
		latN3 = 11;

		longA  = 1;
		longB  = 1;
		longM  = map((frameCount / 100), -1, 1, 1, 4);
		longN1 = map(abs(sin(bassNormalized / 100)), 0, 1, 10, 15);
		longN2 = 15;
		longN3 = 15;

		numCopies = 3;

		sfactor = 200;

		stroke(lerpColor(colorOne, colorTwo, abs(sin(bassNormalized))));
		
	}
	
	//Draw 3D geometry
	for (let j = 0; j < numCopies; j++) {
		
		beginShape();

		for (let theta = 0 + j; theta < TWO_PI + j; theta += TWO_PI/latDetail) { 		//lat
			
			for (let gamma = 0 + j; gamma < TWO_PI + j; gamma += TWO_PI/longDetail){ 	//long

				lat  = superFormula( theta, latA, latB , latM , latN1 , latN2 , latN3 );
				long = superFormula( gamma, longA, longB, longM, longN1, longN2, longN3);

				if(zFactor === 0) { 
					perl_x = map(cos(theta * bass), -1, 1, minNoise, maxNoise);
					perl_y = map(sin(theta * bass), -1, 1, minNoise, maxNoise);
			
					r = map(noise(perl_x, perl_y), -1, 1, 0.01, 1);
					x = r * j * cos(theta) * lat * sfactor;
					y = r * j * sin(theta) * lat * sfactor;
					z = 0;
				} else {
					x = cos(theta) * lat * cos(gamma) * long * sfactor;
					y = sin(theta) * lat * cos(gamma) * long * sfactor;
					z = sin(gamma) * long * sfactor;
				}
		
				vertex(x, y, z);

			}
			
		}
		endShape(CLOSE);
	}

}

function superFormula(theta, a, b, m, n1, n2, n3){
	return pow(((pow(abs((cos((m * theta) / 4.0)) / a), n2)) + (pow(abs(sin((m * theta) / 4.0) / b), n3))), (-1.0 / n1))
}

function normalizeEnergy(freqRange, minOutput, maxOutput){
	return map(freqRange, 0, 255, 0.01, 1.0);
}
// t: current time, b: begInnIng value, c: change In value, d: duration
function interpolateValues(t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}

function togglePlay() {
	if (track.isPlaying()) {
	  track.pause();
	} else {
	  track.loop();
	}
  }

  function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}