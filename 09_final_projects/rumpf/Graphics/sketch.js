// -----------------------------------
//    KEYFRAME DEFINITION
// -----------------------------------

//   sphereRadius, sphereYoffset, sphereSpikeCount, spikeyness, metaballRadius, MetaYOffset, wanderRange, floorOffset, zoom, camOffsetX, camOffsetY
const keyframes = {
  a: [1.95, -1.03, 13.0, 1.8, 0.0, 0.0, 0.0, 0.0, 39.0, -0.91, -8.23],
  b: [1.95, -0.66, 9.0, 2.0, 0.0, 0.0, 0.0, 2.0, 18.0, -1.39, -0.91],
  c: [1.62, -0.66, 9.0, 0.67, 0.0, 0.0, 0.0, 2.0, 5.0, 0.0, -0.19],
  d: [1.62, -0.66, 9.0, 0.67, 0.0, 0.0, 0.0, 2.0, 40.0, 0.0, -5.4],
  e: [1.62, -1.36, 8.0, 1.14, 0.003, -0.66, -0.18, 2, 2, 0, -7.05],
  f: [1.0, -1.36, 4.0, -2, 0.003, -0.66, -0.18, 0.76, 2, 0, -7.05],
  g: [0.0, -2, 0, 0, 0.04, 0.19, -0.18, 0.76, 8, 0, -7.05],
  h: [0.0, -2, 0, 0, 0.07, 0.19, 1.71, 0.76, 8, 0, -7.05],
  i: [1.62, -2, 8, 1.14, 0.07, 0.19, 0.96, 0.76, 1, 0, -7.05],
  j: [1.31, -0.7, 10, 0.71, 0.03, 0.12, 0.29, 0.76, 3, 0, 0.5],
  k: [1.31, -0.53, 40, 2, 0.03, 1, 0.0, 0.76, 40, 0, -10],
  l: [1.31, -0.12, 40, 2, 0.03, 1, 0.0, 0.76, 36, 0, 3.81],
  m: [1.31, -0.12, 40, 2, 0.03, 1, 0.0, 0.76, 36, 0, 3.98],
  n: [1.31, 1.04, 1, -2, 0, 1, 0, -0.23, 36, 0.03, -3.98],
  o: [1.31, 1.04, 1, -2, 0, 1, 0, -0.23, 40, -1.15, 4.04],
  p: [1.31, 1.04, 40, -0.32, 0, 1, 0, -0.23, 40, -1.15, 4.04],
  q: [1.31, 1.04, 40, -0.89, 0, 1, 0, -0.23, 1, -1.15, 3.81],
  r: [1.31, 1.04, 40, -1.5, 0, 1, 0, -0.23, 28, -1.15, 5.93],
  s: [2, -2, 0, 2, 0.07, -0.35, -1.78, 0.57, 1, -3.04, -1.39],
  t: [2, -2, 7, 1.75, 0.07, -0.35, -1.78, 0.57, 1, -3.04, -1.39],
  u: [2, -1.98, 7, 1.85, 0.0, -1, 0, 0.57, 1, -3.04, -1.39],
  v: [2, -0.7, 7, 0.38, 0.034, 0.38, -4, 2, 2, 0, -1.39],
  w: [1.31, 1.04, 1, 1.14, 0, 1, 0, -0.23, 25, 0.03, -0.5],
};


let changeSceneTimes = [];
let myTimes = [
  //n
  5269.3125,
  //d
  8261.3125,
  //g
  14309.3125,
  //f
  26046.645833333332,
  //h
  38898.64583333333,
  //j
  49297.3125,
  //k
  59226.645833333336,
  //a
  72058.64583333333,
  //l
  84117.3125,
  //p
  92789.3125,
  //q
  97541.3125,
  //r
  100826.64583333333,
  //o
  104207.97916666666,
  //v
  115107.09750566893,
  //i
  120101.3125
];
//n,d,b,g,f,h,j,k,a,l,p,q,r,o,v,i
let myKeyframeOrder = [
  "n", "d", "b", "g", "f", "h", "j", "k", "w", "a", "p", "q", "r", "o", "v", "i"
];
let keyframe = "n";


// -----------------------------------
//    GLOBALS
// -----------------------------------

let BufferA;
let a;

let soundFile,duration,fft, amplitude, audioDataTexture;
let fftScale = 15;
let bands = 512;

let Slider0, Slider1, Slider2, Slider3, Slider4, Slider5, Slider6, Slider7, Slider8, Slider9, Slider10, Slider11;
let ValueDisplayer0, ValueDisplayer1, ValueDisplayer2, ValueDisplayer3, ValueDisplayer4, ValueDisplayer5, ValueDisplayer6, ValueDisplayer7, ValueDisplayer8, ValueDisplayer9, ValueDisplayer10, ValueDisplayer11;
let button0, button1, button2;

let sphereRadius, sphereYoffset, sphereSpikeCount, spikeyness, metaballRadius, MetaYOffset, wanderRange, floorOffset, zoom, camOffsetX, camOffsetY;

let invert = false;
let invertVal = 0.0;

let sliderKeyframe = true;
let animTriggered = false;
let output = null;


// -----------------------------------
//    Setup
// -----------------------------------

function preload() {
  // Load Shader Files
  a = loadShader('a.vert', 'a.frag');

  // Load Music
  soundFormats('wav', 'mp3');
  soundFile = loadSound('Flux.mp3');
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Setup User Interface
  createGUI();

  //Setup Shader
  BufferA = createGraphics(windowWidth, windowHeight, WEBGL);
  BufferA.shader(a);

  //Setup Audio
  duration = soundFile.duration() * 1000;
    //mimics the autoplay policy
  getAudioContext().suspend();
    //audioDataTexture = createImage(bands, 2, ARGB);
  audioDataTexture = createImage(bands, 1);
    // Create and patch the FFT analyzer
  fft = new p5.FFT(0.8, bands);
  fft.setInput(soundFile);
  amplitude = new p5.Amplitude();
  amplitude.setInput(soundFile);

 if (soundFile.isLoaded()) {
    soundFile.playMode('restart');
  }
}


// -----------------------------------
//    Draw
// -----------------------------------

function draw() {
  let currentTime = millis() / 1000.0;


  // Perform the analysis
  fft.smooth();
  let spectrum = fft.analyze();

  // Render FFT to Texture -> Texture will be send to shader
  audioDataTexture.loadPixels();
  for (let i = 0; i < audioDataTexture.width; i++) {
    audioDataTexture.pixels[i] =
      int(constrain(spectrum[i], 0, 255));
  }
  audioDataTexture.updatePixels();

  //Update Shader with Uniforms
  BufferA.shader(a);
  a.setUniform("iResolution", [float(width), float(height), 0.0]);
  a.setUniform("iTime", currentTime);
  a.setUniform("iFrame", frameCount);            
  a.setUniform("iChannel0", audioDataTexture);
  a.setUniform("invert", invertVal);

  // Send Keyframes To Shader or Render Sliders and send Slider Values to Shader
  if (!sliderKeyframe) {
    updateGUI();
  } else {
    for (let i = 0; i < myTimes.length; i++) {
      if (soundFile.currentTime() * 1000 > myTimes[i]) {
        keyframe = myKeyframeOrder[i];
      }
    }
    let currentKeyframe = keyframes[keyframe];
    a.setUniform("sphereRadius", currentKeyframe[0]);
    a.setUniform("sphereYoffset", currentKeyframe[1]);
    a.setUniform("sphereSpikeCount", currentKeyframe[2]);
    a.setUniform("spikeyness", currentKeyframe[3]);
    a.setUniform("metaballRadius", currentKeyframe[4]);
    a.setUniform("MetaYOffset", currentKeyframe[5]);
    a.setUniform("wanderRange", currentKeyframe[6]);
    a.setUniform("floorOffset", currentKeyframe[7]);
    a.setUniform("zoom", currentKeyframe[8]);
    a.setUniform("camOffsetX", currentKeyframe[9]);
    a.setUniform("camOffsetY", currentKeyframe[10]);

  }


  // Display Shader
  BufferA.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  image(BufferA, width * -0.5, height * -0.5);

  // Reset Page when Track is finished
  if (soundFile.currentTime() >= soundFile.duration() - 0.1 && animTriggered) {
    resetPlayback();
  }

  // Update Time Cursor
  TWEEN.update(soundFile.currentTime() * 1000.0);
}


// -----------------------------------
//    More functions
// -----------------------------------

// Setup GUI
function createGUI(){
 ////////// GUI Group /////////////////////////////////
  // Slider0 = createSlider(0, 21, 0, 1);
  // Slider0.position(20, 800);
  // Slider0.addClass("mySliders");
  // ValueDisplayer0 = createP();
  // ValueDisplayer0.position(150, 800);
  let group = createDiv('');
  group.position(60, height/ 4);
  group.addClass("GUI");
  // // create debug UI
  // sphereRadius
  Slider1 = createSlider(0.0, 2.0, 1.0, 0.01);
  Slider1.position(20, 20);
  Slider1.addClass("mySliders");
  Slider1.parent(group);
  ValueDisplayer1 = createP();
  ValueDisplayer1.html('sphereRadius');
  ValueDisplayer1.position(150, 00);
  ValueDisplayer1.parent(group);

  // sphereYoffset
  Slider2 = createSlider(-2.0, 1.5, 0.0, 0.01);
  Slider2.position(20, 50);
  Slider2.addClass("mySliders");
  Slider2.parent(group);
  ValueDisplayer2 = createP();
  ValueDisplayer2.html('sphereYoffset');
  ValueDisplayer2.position(150, 30);
  ValueDisplayer2.parent(group);

  // sphereSpikeCount
  Slider3 = createSlider(0.0, 40.0, 10.0, 1.0);
  Slider3.position(20, 80);
  Slider3.addClass("mySliders");
  Slider3.parent(group);
  ValueDisplayer3 = createP();
  ValueDisplayer3.html('sphereSpikeCount');
  ValueDisplayer3.position(150, 60);
  ValueDisplayer3.parent(group);

  // spikeyness
  Slider4 = createSlider(-2.0, 2.0, 0.0, 0.01);
  Slider4.position(20, 110);
  Slider4.addClass("mySliders");
  Slider4.parent(group);
  ValueDisplayer4 = createP();
  ValueDisplayer4.html('spikeyness');
  ValueDisplayer4.position(150, 90);
  ValueDisplayer4.parent(group);

  // metaballRadius
  Slider5 = createSlider(0.0, 0.07, 0.02, 0.001);
  Slider5.position(20, 140);
  Slider5.addClass("mySliders");
  Slider5.parent(group);
  ValueDisplayer5 = createP();
  ValueDisplayer5.html('metaballRadius');
  ValueDisplayer5.position(150, 120);
  ValueDisplayer5.parent(group);

  // MetaYOffset
  Slider6 = createSlider(-1.0, 1.0, 0.0, 0.01);
  Slider6.position(20, 170);
  Slider6.addClass("mySliders");
  Slider6.parent(group);
  ValueDisplayer6 = createP();
  ValueDisplayer6.html('MetaYOffset');
  ValueDisplayer6.position(150, 150);
  ValueDisplayer6.parent(group);

  // wanderRange
  Slider7 = createSlider(-4.0, 4.0, 0.0, 0.01);
  Slider7.position(20, 200);
  Slider7.addClass("mySliders");
  Slider7.parent(group);
  ValueDisplayer7 = createP();
  ValueDisplayer7.html('wanderRange');
  ValueDisplayer7.position(150, 180);
  ValueDisplayer7.parent(group);

  // floorOffset
  Slider8 = createSlider(-2.0, 2.0, 0.0, 0.01);
  Slider8.position(20, 230);
  Slider8.addClass("mySliders");
  Slider8.parent(group);
  ValueDisplayer8 = createP();
  ValueDisplayer8.html('floorOffset');
  ValueDisplayer8.position(150, 210);
  ValueDisplayer8.parent(group);

  // zoom
  Slider9 = createSlider(1.0, 40.0, 4.0, 1.0);
  Slider9.position(20, 260);
  Slider9.addClass("mySliders");
  Slider9.parent(group);
  ValueDisplayer9 = createP();
  ValueDisplayer9.html('zoom');
  ValueDisplayer9.position(150, 240);
  ValueDisplayer9.parent(group);

  // camOffsetX
  Slider10 = createSlider(-10.0, 10.0, 0.0, 0.01);
  Slider10.position(20, 290);
  Slider10.addClass("mySliders");
  Slider10.parent(group);
  ValueDisplayer10 = createP();
  ValueDisplayer10.html('camOffsetX');
  ValueDisplayer10.position(150, 270);
  ValueDisplayer10.parent(group);

  // camOffsetY
  Slider11 = createSlider(-10.0, 10.0, 0.0, 0.01);
  Slider11.position(20, 320);
  Slider11.addClass("mySliders");
  Slider11.parent(group);
  ValueDisplayer11 = createP();
  ValueDisplayer11.html('camOffsetY');
  ValueDisplayer11.position(150, 300);
  ValueDisplayer11.parent(group);

  button1 = createButton('invert');
  button1.position(70, 380);
  button1.mousePressed(changeToggle)
  button1.parent(group);
  button1.addClass("myButtons");


  ////// GUI /////////////////////////////////////////////////////

  button0 = createButton('play');
  button0.position(0, 0);
  button0.size(70, 40);
  button0.mousePressed(playStop)
  button0.addClass("myButtons");

  button2 = createButton('slider | keyframes');
  button2.position(80, 0);
  button2.size(160, 40);
  button2.mousePressed(keyframeToggle)
  button2.addClass("myButtons");
}

//Render GUI
function updateGUI(){
  sphereRadius = Slider1.value();
  a.setUniform("sphereRadius", sphereRadius);
  //ValueDisplayer1.html('sphereRadius ' + Slider1.value());

  sphereYoffset = Slider2.value();
  a.setUniform("sphereYoffset", sphereYoffset);
  //ValueDisplayer2.html('sphereYoffset ' + Slider2.value());

  sphereSpikeCount = Slider3.value();
  a.setUniform("sphereSpikeCount", sphereSpikeCount);
  //ValueDisplayer3.html('sphereSpikeCount ' + Slider3.value());

  spikeyness = Slider4.value();
  a.setUniform("spikeyness", spikeyness);
  // ValueDisplayer4.html('spikeyness ' + Slider4.value());

  metaballRadius = Slider5.value();
  a.setUniform("metaballRadius", metaballRadius);
  // ValueDisplayer5.html('metaballRadius ' + Slider5.value());

  MetaYOffset = Slider6.value();
  a.setUniform("MetaYOffset", MetaYOffset);
  // ValueDisplayer6.html('MetaYOffset ' + Slider6.value());

  wanderRange = Slider7.value();
  a.setUniform("wanderRange", wanderRange);
  // ValueDisplayer7.html('wanderRange ' + Slider7.value());

  floorOffset = Slider8.value();
  a.setUniform("floorOffset", floorOffset);
  // ValueDisplayer8.html('floorOffset ' + Slider8.value());

  zoom = Slider9.value();
  a.setUniform("zoom", zoom);
  // ValueDisplayer9.html('zoom ' + Slider9.value());

  camOffsetX = Slider10.value();
  a.setUniform("camOffsetX", camOffsetX);
  // ValueDisplayer10.html('camOffsetX ' + Slider10.value());

  camOffsetY = Slider11.value();
  a.setUniform("camOffsetY", camOffsetY);
  // ValueDisplayer11.html('camOffsetY ' + Slider11.value());
}

// used to playback soundfile
function playStop() {

  if (!animTriggered && !soundFile.isPlaying()) {
    initTween();
    animTriggered = true;
    userStartAudio();
    soundFile.play();

    button0.html("pause");
    var buttons = document.getElementsByClassName('myButtons');
    for(i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = '#000000';
      buttons[i].style.color = '#545454';
    }
  } else if (soundFile.isPlaying() && animTriggered) {
    soundFile.pause();
    button0.html("play");
    var buttons = document.getElementsByClassName('myButtons');
    for(i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = '#a92e2e';
      buttons[i].style.color = 'white';
    }
  } else {
    soundFile.play();
    button0.html("pause");
    var buttons = document.getElementsByClassName('myButtons');
    for(i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = '#000000';
      buttons[i].style.color = '#545454';
    }
  }

 

}
// Needed to track time for keyframes and Slider Values
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    append(changeSceneTimes, soundFile.currentTime() * 1000.0);
    console.log(changeSceneTimes);
  }
  if (keyCode === UP_ARROW) {
    if (!sliderKeyframe){
      console.log('sphereRadius'+ sphereRadius+  ' sphereYoffset: '+ sphereYoffset+ ' sphereSpikeCount: '+sphereSpikeCount+ ' spikeyness: '+ spikeyness+ ' metaballRadius: '+
      metaballRadius+ ' MetaYOffset: '+ MetaYOffset+ ' wanderRange: '+ wanderRange+ ' floorOffset: '+floorOffset+ ' zoom: '+zoom+ ' camOffsetX: '+ camOffsetX+ ' camOffsetY: '+ camOffsetY);
    } else{
      console.log('Keyframe: '+ keyframe);
      console.log('KeyframeValues: '+keyframes[keyframe]);
    }
  }
}

function changeToggle() {
  invert = !invert;
  if (invert) invertVal = 1.0;
  else invertVal = 0.0;
}

function keyframeToggle() {
  sliderKeyframe = !sliderKeyframe;
  if (!sliderKeyframe) {
    var all = document.getElementsByClassName('GUI');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = 'block';
    }
  } else {
    var all = document.getElementsByClassName('GUI');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = 'none';
    }
    if (invert) {
      invert = !invert;
      invertVal = 0.0;
    };
  }

}

function resetPlayback() {
    // soundFile.stop();
    // button0.html("play");
    // animTriggered = false;
    // console.log("reseted");

    // couldn't get the audio reset to work properly -> page refresh, when finished
    location.reload();
}


// Tweensetup -> In the End only used to print some feedback of the currenttime to the screen ( red little marker at the bottom)
// Wanted to also animate some values, but didn't implement that so far

function initTween() {
  if (output == null){
    var output = document.createElement('div')
    output.style.cssText = 'position: absolute; left: 50px; bottom: 00px; font-size: 20px; color:RGB(255, 0, 0) '
    document.body.appendChild(output)
  }
  output.style.cssText = 'position: absolute; left: 50px; bottom: 00px; font-size: 20px; color:RGB(255, 0, 0) '


  var tween = new TWEEN.Tween({
      x: 0,
      y: 0
    })
    .to({
      x: duration
    }, duration)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function (object) {
     // output.innerHTML = '' + (Math.round(object.x) * 1 / duration).toFixed(3) //////// show current time
     output.innerHTML = '|'
      var transform = 'translateX(' + (object.x * window.innerWidth / duration) + 'px)'
      output.style.webkitTransform = transform
      output.style.transform = transform
    })
    .start(soundFile.currentTime() * 1000.0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}