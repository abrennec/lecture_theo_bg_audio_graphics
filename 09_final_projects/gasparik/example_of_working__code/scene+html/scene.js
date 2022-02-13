let camera, scene, renderer, controls, fov, clock;
let color = new THREE.Color(0x75d2d2);
function update() { }

function init() {
  //Scene Setup
  scene = new THREE.Scene();
  // scene.background = new THREE.Color("#a6a6a6");
  // scene.fog = new THREE.FogExp2(0x000000, 0.1);
  //
  //
  //
  //Camera Setup
  var fov = 20;
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  //
  //
  //
  //Light Setup
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  let pointLight = new THREE.PointLight(0xc9efff, 0.8);
  scene.add(pointLight, ambientLight);
  pointLight.position.set(10, 20, 20);

  //Shadow Setup
  // pointLight.castShadow = true;
  // pointLight.shadow.mapSize.width = 1024;
  // pointLight.shadow.mapSize.height = 1024;
  // pointLight.shadow.camera.near = 0.1;
  // pointLight.shadow.camera.far = 600;
  // pointLight.shadow.radius = 2;
  //
  //
  //
  //Renderer Setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

init();

// //Geometries
// let planeGeometry = new THREE.PlaneGeometry(3, 3);
// let planeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
// let floor = new THREE.Mesh(planeGeometry, planeMaterial);
// floor.receiveShadow = true;
// scene.add(floor);
// floor.position.set (0, 0, -10);
// floor.rotation.x = 0;

//Array of rings

clock = new THREE.Clock();
let elapsedTime = clock.getElapsedTime();
let instanceNumber = 20;

let ringGeo = new THREE.RingGeometry(0.1, 0.11, 3);
let ringMat = new THREE.MeshPhongMaterial({ color: color });
// let ringMesh = new THREE.Mesh(ringGeo, ringMat);
let ringMeshes = new Array(instanceNumber)
  .fill(null)
  .map(() => new THREE.Mesh(ringGeo, ringMat));
ringMeshes.forEach((x) => scene.add(x));
ringMat.color = color;

let orbit = new THREE.OrbitControls(camera, renderer.domElement);

update = (t) => {
  let z = t;
  ringMeshes.forEach((x, i) => {
    x.position.z = (instanceNumber - i) * Math.cos(t);
    // x.position.x = (instanceNumber - i) * Math.sin(t);
    // x.position.y = (instanceNumber - i) * Math.cos(t);
    x.rotation.z = (t * i) / 6;
    x.scale.set(i, 3, 1);
  });
};

// //
//
//
// GUI
let gui = new dat.GUI({ width: 300 });
gui.open();


let parameters = {
  color: color.getHex(),
  instanceNumber: instanceNumber
};
gui.addColor(parameters, 'color').onChange(function (val) {
  color.setHex(val);
});
gui.add(parameters, 'instanceNumber', 1, 100).onChange(function (val) {
  instanceNumber = val;
});

//Animation Setup
var animate = function () {

  requestAnimationFrame(animate);

  orbit.update();

  let t = clock.getElapsedTime() / instanceNumber;

  update(t);

  // console.log("t = " + t);

  renderer.render(scene, camera);
};

animate();
