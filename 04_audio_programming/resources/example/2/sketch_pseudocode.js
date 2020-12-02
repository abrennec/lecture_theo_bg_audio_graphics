// This example is based on the following scripts:
// https://p5js.org/examples/sound-load-and-play-sound.html
// https://p5js.org/examples/sound-play-mode.html
// https://p5js.org/examples/sound-pan-sound.html
// https://p5js.org/examples/sound-reverb.html

let 
  sample_cow, sample_glass,
  ui_elements_cow = {},
  // TODO: add an empty array, that will hold information about a reverb effect 
  ;

function setup() {
  // Loading the sound samples
  loadSamples();

  // Setting up the UI
  setupUI();
}

function loadSamples() {
  sample_cow = loadSound('assets/58277__benboncan__cow.wav');
}

function setupUI() {
  // Buttons
  createSampleButton(ui_elements_cow, sample_cow, 'Cow', 10, 40);

  // Radio buttons for playing mode
  createPlayModeRadioButton(ui_elements_cow, sample_cow, 120, 40);

  // Slider element for panning
  createPanningSlider(ui_elements_cow, sample_cow, 350, 40);

  // Reverb configuration elements
  // TODO: Call a function to add a reverb effect to the sound sample. You will implement the function in line 76.
}

function createSampleButton(ui_elements, sample, label, posX, posY) {
  ui_elements.sampleBtn = createButton(label);
  ui_elements.sampleBtn.position(posX , posY);

  // When mouse is being pressed (on button), play sample
  ui_elements.sampleBtn.mousePressed(function() {
    sample.play();
  });
}

function createPlayModeRadioButton(ui_elements, sample, posX, posY) {
  createSpan('Play Mode: ').position(posX, posY);
  ui_elements.playModeRadioButton = createRadio('radio_' + posY);
  ui_elements.playModeRadioButton.position(posX + 80, posY);
  ui_elements.playModeRadioButton.option('restart');
  ui_elements.playModeRadioButton.option('sustain');
  
  ui_elements.playModeRadioButton.selected('restart');
  sample.playMode(ui_elements.playModeRadioButton.value());

  // When mouse has been clicked (after releasing mouse button), set the play mode
  ui_elements.playModeRadioButton.mouseClicked(function() {
    sample.playMode(ui_elements.playModeRadioButton.value());
  });
}

function createPanningSlider(ui_elements, sample, posX, posY) {
  createSpan('Panning: ').position(posX, posY);
  ui_elements.panningSlider = createSlider(-1, 1, 0, 0);
  ui_elements.panningSlider.position(posX + 60, posY);

  // When mouse has been clicked (after releasing mouse button), set the panning
  ui_elements.panningSlider.mouseClicked(function() {
    sample.pan(ui_elements.panningSlider.value());
  });
}

//TODO: Implement a function to add the reverb effect as UI element with the appropriate functionality. Most of the logic (alias the function body) is given. Read and understand the code, and add the function definition. Think especially about about the parameters to pass.
/* function ...(...){
  createSpan('Reverb:').position(posX, posY);

  ui_elements.reverbCheckbox = createCheckbox(false);
  ui_elements.reverbCheckbox.position(posX + 50, posY);

  // when checkbox state changes, add or remove reverb
  ui_elements.reverbCheckbox.changed(function () { 
    if (ui_elements.reverbCheckbox.checked()) {
      addReverb(sample, audio_fx, ui_elements.reverbTimeInput.value(), ui_elements.reverbDecayInput.value());
    } else {
      audio_fx.reverb.disconnect();
      sample.connect();
    }



  createSpan('Reverb Time (s):').position(posX + 75, posY);
  ui_elements.reverbTimeInput = createInput('0.0', 'number');
  ui_elements.reverbTimeInput.position(posX + 190, posY);
  ui_elements.reverbTimeInput.style('width', '40px');
  ui_elements.reverbTimeInput.attribute('step', '0.01');

  createSpan('Decay rate:').position(posX + 245, posY);
  ui_elements.reverbDecayInput = createInput('0.0', 'number');
  ui_elements.reverbDecayInput .position(posX + 325, posY);
  ui_elements.reverbDecayInput .style('width', '40px');
  ui_elements.reverbDecayInput.attribute('step', '0.01');

  // Use change listener on input to directly change settings on reverb
  ui_elements.reverbTimeInput.changed(function () {
    setReverbSettings(audio_fx, ui_elements.reverbTimeInput.value(), ui_elements.reverbDecayInput.value());
  });
  ui_elements.reverbDecayInput.changed(function () {
    setReverbSettings(audio_fx, ui_elements.reverbTimeInput.value(), ui_elements.reverbDecayInput.value());
  });
}
  
*/

function addReverb(sample, audio_fx, reverbTime, decayRate) {
  //TODO: instantiate a p5 reverb object and initialize it to audio_fx.reverb
  //TODO: link the parameters reverbTime and decayRate to audio_fx.reverb (= the reverb object)
  //TODO: to only hear the reverb, call the disconnect function on the sound sample
  //TODO: connect the reverb object and the sound sample, by calling the process function of the reverb object
}

function setReverbSettings(audio_fx, reverbTime, decayRate) {
  if ('reverb' in audio_fx) {
    audio_fx.reverb.set(reverbTime, decayRate);
  }
}