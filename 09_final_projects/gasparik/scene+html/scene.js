import { OBJLoader } from '../lib/OBJLoader.js';

let clock;
function update() { };

const loader = new OBJLoader();

var myRadius = 16;

// Create scene
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(scene.background, 0.025);

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);


// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

clock = new THREE.Clock();
let elapsedTime = clock.getElapsedTime();

// Configure renderer clear color
renderer.setClearColor("#000000");


//Point Light #1
const midLight = new THREE.PointLight(0xff0000, 1, 600);

midLight.castShadow = true;
midLight.position.set(0, 0, 0);
scene.add(midLight);

midLight.shadow.mapSize.width = 512;
midLight.shadow.mapSize.height = 512;
midLight.shadow.camera.near = 0.5;
midLight.shadow.camera.far = 600;

// AUDIO
let audio;
let fftSize = 2048;
let analyser;

const frequencyRange = {
  bass: [20, 100],
  lowMid: [100, 400],
  mid: [400, 2600],
  highMid: [2600, 5200],
  treble: [5200, 14000],
};

// Audio listener
const audioListener = new THREE.AudioListener();
audio = new THREE.Audio(audioListener);

const audioLoader = new THREE.AudioLoader();
// Load audio file inside asset folder
audioLoader.load('../assets/trek_v1.wav', (buffer) => {
  audio.setBuffer(buffer);
  audio.setLoop(true);
  audio.play();  // Start playback
});

// About fftSize https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
analyser = new THREE.AudioAnalyser(audio, fftSize);


const getFrequencyRangeValue = (data, _frequencyRange) => {
  const nyquist = 48000 / 2;
  const lowIndex = Math.round(_frequencyRange[0] / nyquist * data.length);
  const highIndex = Math.round(_frequencyRange[1] / nyquist * data.length);
  let total = 0;
  let numFrequencies = 0;

  for (let i = lowIndex; i <= highIndex; i++) {
    total += data[i];
    numFrequencies += 1;
  }
  return total / numFrequencies / 255;
};


// analyser.getFrequencyData() returns array of half size of fftSize.
// ex. if fftSize = 2048, array size will be 1024.
// data includes magnitude of low ~ high frequency.
const data = analyser.getFrequencyData();


for (let i = 0, len = data.length; i < len; i++) {
  // access to magnitude of each frequency with data[i].
}

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append Renderer to DOM
document.body.appendChild(renderer.domElement);




// ASSETS
let airPlane;

loader.load('../assets/airplaneResized.obj', function (obj) {
  airPlane = obj;
  airPlane.rotateY(Math.PI / 2);


  airPlane.position.y = myRadius;

  airPlane.traverse(function (child) { child.castShadow = true; });

  airPlane.castShadow = true; //default is false
  airPlane.receiveShadow = true; //default

  scene.add(airPlane);
});



// Tester Box
const boxHangerGeo = new THREE.BoxGeometry(myRadius, myRadius, myRadius);
const boxHangerMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const boxHanger = new THREE.Mesh(boxHangerGeo, boxHangerMat);



scene.add(boxHanger);

const ringBahn = new THREE.CylinderGeometry(myRadius, myRadius, myRadius, 12);
const ringMaterial = new THREE.MeshPhongMaterial({
  color: "#6EB0CA", shininess: 1000
});
ringMaterial.side = THREE.BackSide
const cylinder = new THREE.Mesh(ringBahn, ringMaterial);

cylinder.rotation.z = Math.PI / 2;

cylinder.receiveShadow = true;

// Add cube to Scene
scene.add(cylinder);




const helper = new THREE.CameraHelper(midLight.shadow.camera);
scene.add(helper);


// Animation Setup
var animate = function () {
  requestAnimationFrame(animate);

  // Audio input definition

  let r, g, b;
  if (analyser) {
    // analyser.getFrequencyData() would be an array with a size of half of fftSize.
    const data = analyser.getFrequencyData();

    const bass = getFrequencyRangeValue(data, frequencyRange.bass);
    const mid = getFrequencyRangeValue(data, frequencyRange.mid);
    const treble = getFrequencyRangeValue(data, frequencyRange.treble);

    r = bass;
    g = mid;
    b = treble;
  }




  // CAMERA Animation

  let camRotPosY = Math.cos(clock.getElapsedTime());
  let camRotPosZ = Math.sin(clock.getElapsedTime());

  let camLookAtY = Math.cos(clock.getElapsedTime() + 1);
  let camLookAtZ = Math.sin(clock.getElapsedTime() + 1);


  camera.position.y = camRotPosY * myRadius * 0.9;
  camera.position.z = camRotPosZ * myRadius * -0.9;
  // camera.position.z = 5;
  camera.up = (new THREE.Vector3(0, -camRotPosY, camRotPosZ));
  camera.lookAt(new THREE.Vector3(0, camLookAtY * myRadius, -camLookAtZ * myRadius));



  // ASSETS Animation

  airPlane.rotation.order = 'ZXY';
  airPlane.rotation.x = -clock.getElapsedTime() + (Math.PI / 2) + 0.8;
  airPlane.rotation.z = (Math.cos(clock.getElapsedTime()) * 0.001 - 0.1);

  let airPlanePositionY = Math.cos(clock.getElapsedTime() + 1);
  let airPlanePositionZ = Math.sin(clock.getElapsedTime() + 1);

  airPlane.position.y = airPlanePositionY * myRadius * 0.8;
  airPlane.position.z = airPlanePositionZ * myRadius * -0.8;
  // airPlane.rotation.x = clock.getElapsedTime;


  boxHanger.scale.set(r * 1.2, r * 1.2, r * 1.2);







  console.log(r);




  renderer.render(scene, camera);

};

animate();

