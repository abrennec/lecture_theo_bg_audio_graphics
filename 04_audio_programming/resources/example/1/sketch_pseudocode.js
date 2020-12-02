// This example is based on the following scripts:
// https://p5js.org/examples/sound-load-and-play-sound.html
// https://p5js.org/examples/sound-play-mode.html
// https://p5js.org/examples/sound-pan-sound.html

let ui_elements_cow = {};
// TODO: add a global variable to hold a sound file

function setup() {
  // Loading the sound samples
  // TODO: call a method, that you will implement in line 18, to load sound samples 

  // Setting up the UI
  setupUI();
}

// TODO: implement method to load the cow sound sample here 

function setupUI() {

  // Buttons
  createSampleButton(ui_elements_cow, /*TODO: add variable that holds the sound file*/, 'Cow', 10, 40);

  // Radio buttons for playing mode
  createPlayModeRadioButton(ui_elements_cow, /*TODO: add variable that holds the sound file*/, 120, 40);

  // Slider element for panning
  createPanningSlider(ui_elements_cow, /*TODO: add variable that holds the sound file*/, 350, 40);
  
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