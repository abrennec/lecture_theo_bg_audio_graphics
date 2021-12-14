// JavaScript Test for my visualization

// made with this tutorial / walkthrough:
// https://www.mamboleoo.be/articles/tunnel-animation-1
// by Louis Hoebregts !

import * as THREE from './lib/three.module.js';

// VARIABLES ------------------------------------------

let points;
let pointIndex;
let mouse;
let raycaster;

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

//Array of points
points = [
    [68.5,185.5],
    [1,262.5],
    [270.9,281.9],
    [300,212.8],
    [178,155.7],
    [240.3,72.3],
    [153.4,0.6],
    [52.6,53.3],
    [68.5,185.5]
  ];
  
  //Convert the array of points into vertices
  for (pointIndex = 0; pointIndex < points.length; pointIndex++) {
    var x = points[pointIndex][0];
    var y = (Math.random()-0.5)*250;
    var z = points[pointIndex][1];
    points[pointIndex] = new THREE.Vector3(x, y, z);
  }

  // TEST move with mouse -----------------------------
  mouse = {
    position: new THREE.Vector2(0, 0),
    target: new THREE.Vector2(0, 0) };




  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2()
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousedown', onMouseDown, false);

  function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function manageRaycasterIntersections(scene, camera) {
    camera.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

    } 
    else {

    }
}

function onMouseDown(event){
   customLog("mouse position: (" + mouse.x + ", "+ mouse.y + ")");
}


  points[pointIndex-1].x = -mouse.x * 0.1;
  points[pointIndex-1].y = mouse.y * 0.1;
  points[pointIndex].x = -mouse.x * 0.1;
  // --------------------------------------------------

  //Create a path from the points
  var path = new THREE.CatmullRomCurve3(points);
  
  //Set colors
  //var colors = [0x000000, 0xFFFFFF, 0xFF0000,0x0000ff,0x00ff00];

  var colors = [0xFF0000, 0x00ff00 ,0x0000ff, 0xFFFFFF, 0xFF0000, 0x00ff00 ,0x0000ff, 0xFF0000, 0x00ff00 ,0x0000ff];
  //Loop through all those colors
  for(var i=0;i<colors.length;i++){
    //Create a new geometry with a different radius
    var geometry = new THREE.TubeBufferGeometry( path, 150, (i/2)+6, (i + 4), true );

    //Set a new material with a new color and a different opacity
    /*
    var material = new THREE.MeshBasicMaterial({
      color:colors[i],
      transparent:true,
      wireframe:true,
      opacity : ((1- i/5)*0.5 + 0.1)
    });
    */
    var material = new THREE.MeshLambertMaterial({
        color: colors[i],
        side : THREE.BackSide,
        wireframe : true
      });

    //Create a mesh
    var tube = new THREE.Mesh( geometry, material );
    //Push the mesh into the scene
    scene.add( tube );
  }

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
  var p3 = path.getPointAt((percentage + 0.05)%1);

  //Place the camera at the point
  camera.position.set(p1.x,p1.y,p1.z);

  //Rotate the camera into the orientation of the second point
  camera.lookAt(p2);
  camera.rotateZ(percentage * 20);

  //update light pos
  light.position.set(p3.x, p3.y, p3.z);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

//This draws it all: 
requestAnimationFrame(render);