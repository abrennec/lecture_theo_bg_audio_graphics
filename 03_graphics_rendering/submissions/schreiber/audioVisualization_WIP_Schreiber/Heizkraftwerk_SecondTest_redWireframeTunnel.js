// JavaScript Test for my visualization

// made with this tutorial / walkthrough:
// https://www.mamboleoo.be/articles/tunnel-animation-1

import * as THREE from './lib/three.module.js';

// CREATE SCENE ---------------------------------------

//Get window size
var ww = window.innerWidth,
  wh = window.innerHeight;

//Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(ww, wh);
if (renderer) {
  console.log("renderer whatever: ", renderer.getRenderTarget());
}

document.body.appendChild( renderer.domElement );

//Create an empty scene
var scene = new THREE.Scene();
if (scene) {
  console.log("scene active");
}

// CREATE THE CAMERA ----------------------------------

// perpsective camera
var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
camera.position.z = 100;
if (camera) {
  console.log("camera active");
}

// CREATE LIGHTING ------------------------------------

// point light in our scene
var light = new THREE.PointLight(0xffffff,1, 50);
scene.add(light);

// CREATE GEOMETRY ------------------------------------

//Hard coded array of points
var points = [
  [68.5,185.5],
  [1,262.5],
  [270.9,281.9],
  [345.5,212.8],
  [178,155.7],
  [240.3,72.3],
  [153.4,0.6],
  [52.6,53.3],
  [68.5,185.5]
];

//Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = 0;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
}
//Create a path from the points
var path = new THREE.CatmullRomCurve3(points);

//Do not forget to set the last parameter to True, since we want our tube to be closed
var geometry = new THREE.TubeGeometry( path, 400, 2, 20, true );

var material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  side : THREE.BackSide,
  wireframe : true
});

//Create a mesh
var tube = new THREE.Mesh( geometry, material );
//Add tube into the scene
scene.add( tube );

// THE RENDER FUNCTION --------------------------------

//Start the percentage at 0
var percentage = 0;

function render(){

  //Increase the percentage
  percentage += 0.0005;

  //Get the point at the specific percentage
  let p1 = path.getPointAt(percentage%1);

  //Get another point along the path but further
  var p2 = path.getPointAt((percentage + 0.01)%1);

  //Get another point along the path but EVEN further
  var p3 = path.getPointAt((percentage + 0.02)%1);

  //Place the camera at the point
  camera.position.set(p1.x,p1.y,p1.z);

  //Rotate the camera into the orientation of the second point
  camera.lookAt(p2);
  camera.rotateZ(percentage * 3,6);

  //update light pos
  light.position.set(p3.x, p3.y, p3.z);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

//This draws it all: 
requestAnimationFrame(render);