import { OBJLoader } from '../lib/OBJLoader.js';

let scene, renderer, camera, clock, parties, width, height, video;
let particles, videoWidth, videoHeight, imageCache;

// AUDIO
let audio;
let fftSize = 2048;
let analyser;

const frequencyRange = {
    kick: [0, 32],
    bass: [42, 100],
    lowMid: [100, 400],
    mid: [400, 2600],
    highMid: [2600, 5200],
    treble: [5200, 14000],
};

clock = new THREE.Clock();
let elapsedTime = clock.getElapsedTime();


// function update() { };
function updateAirPlane() { };
function updateBoxHanger() { };
function partySize() { };
function updateCamera() { };

function sphereUpdate() { };

function kicker() { };

var myRadius = 16;


// Keyframes implementation from Tim Rumpf
const keyFrames = [
    // 1
    5000.123,
    // 2
    8500.123,
    // 3
    2600.2364,
    // 4
    // 5
    // 6
    // 7
    // 8
    // 9
];

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', init);

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(scene.background, 0.125);
    //
    //
    //
    //Camera Setup
    var fov = 115;
    camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // CAMERA Animation
    updateCamera = (t) => {
        let camRotPosY = Math.cos(t);
        let camRotPosZ = Math.sin(t);

        let camLookAtY = Math.cos(t + 1);
        let camLookAtZ = Math.sin(t + 1);


        camera.position.y = camRotPosY * myRadius * 0.9;
        camera.position.z = camRotPosZ * myRadius * -0.9;
        camera.up = (new THREE.Vector3(0, -camRotPosY, camRotPosZ));
        camera.lookAt(new THREE.Vector3(0, camLookAtY * myRadius, -camLookAtZ * myRadius));
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //
    //
    //
    //Light Setup
    const midLight = new THREE.PointLight(0xff0000, 1, 600);

    midLight.castShadow = true;
    midLight.position.set(0, 0, 0);
    scene.add(midLight);


    // const helper = new THREE.CameraHelper(midLight.shadow.camera);
    // scene.add(helper);

    midLight.shadow.mapSize.width = 512;
    midLight.shadow.mapSize.height = 512;
    midLight.shadow.camera.near = 0.5;
    midLight.shadow.camera.far = 600;

    // const ambLight = new THREE.AmbientLight(0xff0000, 100);
    // scene.add(ambLight);


    // Audio listener
    const audioListener = new THREE.AudioListener();
    audio = new THREE.Audio(audioListener);

    const audioLoader = new THREE.AudioLoader();
    // Load audio file inside asset folder
    audioLoader.load('../assets/trek_v1.wav', (buffer) => {
        audio.setBuffer(buffer);
        audio.setLoop(false);
        audio.play();  // Start playback
    });

    // About fftSize https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    analyser = new THREE.AudioAnalyser(audio, fftSize);


    const data = analyser.getFrequencyData();


    for (let i = 0, len = data.length; i < len; i++) {
        // access to magnitude of each frequency with data[i].
    }

    // ASSETS
    const loader = new OBJLoader();


    // AirPlane
    let airPlane;


    loader.load('../assets/airplaneResized.obj', function (obj) {
        airPlane = obj;
        airPlane.rotateY(Math.PI / 2);


        // airPlane.position.y = myRadius;

        airPlane.traverse(function (child) { child.castShadow = true; });

        airPlane.castShadow = true; //default is false
        airPlane.receiveShadow = true; //default

        scene.add(airPlane)


        // ASSETS Animation
        updateAirPlane = (t) => {
            // ASSETS Animation

            airPlane.rotation.order = 'ZXY';
            airPlane.rotation.x = -t + (Math.PI / 2) + 0.8;
            airPlane.rotation.z = (Math.cos(t) * 0.001 - 0.1);

            let airPlanePositionY = Math.cos(t + 1);
            let airPlanePositionZ = Math.sin(t + 1);

            airPlane.position.y = airPlanePositionY * myRadius * 0.8;
            airPlane.position.z = airPlanePositionZ * myRadius * -0.8;
        };

    });






    // Tester Box
    let instanceNumber = 36;
    let boxSize = 1;
    const boxHangerGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const boxHangerMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const boxHanger = new THREE.Mesh(boxHangerGeo, boxHangerMat);

    let boxHanger = new Array(instanceNumber)
        .fill(null)
        .map(() => new THREE.Mesh(boxHangerGeo, boxHangerMat));

    boxHanger.forEach((x) => scene.add(x));

    updateBoxHanger = () => {
        boxHanger.forEach((x, i) => {
            x.position.y = Math.cos(i) * myRadius;
            x.position.z = Math.sin(i) * myRadius;
        })
    };


    // updateBoxHanger = (r) => {
    //     boxHanger.scale.set(r * 1.2, r * 1.2, r * 1.2);
    // }






    // RING?
    const ringBahn = new THREE.CylinderGeometry(myRadius, myRadius, myRadius, 12);
    const ringMaterial = new THREE.MeshPhongMaterial({
        color: "#6EB0CA", shininess: 1000
    });
    ringMaterial.side = THREE.BackSide
    const cylinder = new THREE.Mesh(ringBahn, ringMaterial);

    cylinder.rotation.z = Math.PI / 2;

    cylinder.receiveShadow = true;
    // Add cube to Scene
    // scene.add(cylinder);


    // PARTYCLE Sysyem
    const partyPos = new THREE.BufferGeometry();
    const vertices = [];
    let partyMat

    const sprite = new THREE.TextureLoader().load('../assets/disc.png');

    for (let i = 0; i < 10000; i++) {

        const x = 2000 * Math.random() - 1000;
        const y = 2000 * Math.random() - 1000;
        const z = 2000 * Math.random() - 1000;

        vertices.push(x, y, z);

    }

    partyPos.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    partyMat = new THREE.PointsMaterial({ size: 3, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true });
    partyMat.color.setHSL(1.0, 0.3, 0.7);

    const particles = new THREE.Points(partyPos, partyMat);

    scene.add(particles);

    partySize = (l) => {
        partyMat.size = l;
    }





    // create  chemTrail:
    parties = [];

    var addDemo = (system, offset) => {
        system.particleSystem.position.x = offset + 5 - (Math.cos(clock.getElapsedTime()) * 0.001 + 0.1);
        parties.push(system);
    }

    var addDemo2 = (system, offset) => {
        system.particleSystem.position.x = -offset - 5 - (Math.cos(clock.getElapsedTime()) * 0.001 + 0.1);
        parties.push(system);
    }
    var globalScale = 20;


    // texture
    var texture = new THREE.TextureLoader().load('../assets/disc.png');


    addDemo(new Partykals.ParticlesSystem({
        container: scene,
        particles: {
            startAlpha: 1,
            endAlpha: 0,
            startSize: 3.5,
            endSize: 35,
            // acceleration: (0, -1, 0),
            gravity: 0,
            ttl: 20,
            velocity: new Partykals.Randomizers.SphereRandomizer(0.1),
            velocityBonus: new THREE.Vector3(0, 0, 0),
            colorize: true,
            alphaTest: 0.1,
            startColor: new Partykals.Randomizers.ColorsRandomizer(new THREE.Color(0.5, 0.5, 0.2), new THREE.Color(1, 0.5, 1)),
            endColor: new THREE.Color(0, 0, 0),
            blending: "blend",
            worldPosition: true,
            texture: texture,
        },
        system: {
            particlesCount: 1000,
            scale: globalScale,
            emitters: new Partykals.Emitter({
                onInterval: new Partykals.Randomizers.MinMaxRandomizer(0, 5),
                interval: new Partykals.Randomizers.MinMaxRandomizer(0, 0.25),
            }),
            depthWrite: true,
            speed: 5,
            onUpdate: (system) => {
                system.startX = system.startX || system.particleSystem.position.x;
                system.particleSystem.rotation.order = 'ZXY';
                system.particleSystem.position.y = Math.cos(clock.getElapsedTime() + 1) * myRadius * 0.8 + (Math.cos(clock.getElapsedTime()) * -0.001 - 0.5);
                system.particleSystem.position.z = Math.sin(clock.getElapsedTime() + 1) * myRadius * -0.8 + (Math.cos(clock.getElapsedTime()) * 0.0001 - 0.1);
            },
        }


    }), 1);
    addDemo2(new Partykals.ParticlesSystem({
        container: scene,
        particles: {
            startAlpha: 1,
            endAlpha: 0,
            startSize: 3.5,
            endSize: 35,
            // acceleration: (0, -1, 0),
            gravity: 0,
            ttl: 20,
            velocity: new Partykals.Randomizers.SphereRandomizer(0.1),
            velocityBonus: new THREE.Vector3(0, 0, 0),
            colorize: true,
            startColor: new Partykals.Randomizers.ColorsRandomizer(new THREE.Color(0.5, 0.5, 0.2), new THREE.Color(1, 0.5, 1)),
            endColor: new THREE.Color(0, 0, 0),
            blending: "blend",
            worldPosition: true,
            texture: texture,
        },
        system: {
            particlesCount: 1000,
            scale: globalScale,
            emitters: new Partykals.Emitter({
                onInterval: new Partykals.Randomizers.MinMaxRandomizer(0, 5),
                interval: new Partykals.Randomizers.MinMaxRandomizer(0, 0.25),
            }),
            depthWrite: false,
            speed: 5,
            onUpdate: (system) => {
                system.startX = system.startX || system.particleSystem.position.x;
                system.particleSystem.rotation.order = 'ZXY';
                system.particleSystem.position.y = Math.cos(clock.getElapsedTime() + 1) * myRadius * 0.8 + (Math.cos(clock.getElapsedTime()) * 0.001 + 0.5);
                system.particleSystem.position.z = Math.sin(clock.getElapsedTime() + 1) * myRadius * -0.8 + (Math.cos(clock.getElapsedTime()) * 0.0001 - 0.1);
            },
        }


    }), 1);


    // const geometry = new THREE.SphereGeometry(5, 32, 16);
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // const sphere = new THREE.Mesh(geometry, material);
    // sphere.rotateY(Math.PI / 2);
    // scene.add(sphere);

    // sphereUpdate = () => {
    //     sphere.position.y = Math.cos(clock.getElapsedTime() + 1) * myRadius * 0.8;
    //     sphere.position.z = Math.sin(clock.getElapsedTime() + 1) * myRadius * -0.8;
    // }

    animate();

}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize(window.innerWidth, window.innerHeight);


}



//Animation Setup

function animate() {

    requestAnimationFrame(animate);

    // AUDIO
    let k, l, m, h;
    if (analyser) {
        // analyser.getFrequencyData() would be an array with a size of half of fftSize.
        const data = analyser.getFrequencyData();

        const kick = getFrequencyRangeValue(data, frequencyRange.kick);
        const bass = getFrequencyRangeValue(data, frequencyRange.bass);
        const mid = getFrequencyRangeValue(data, frequencyRange.mid);
        const treble = getFrequencyRangeValue(data, frequencyRange.treble);

        // kick, low, mid, high
        k = kick;
        l = bass;
        m = mid;
        h = treble;
    }

    function kicker(kick) {
        let result;
        if (Math.round(kick) > 0) {
            result = kick * 3;
        }
        else {
            result = 0;
        }

        return result;
    }

    let t = clock.getElapsedTime();

    updateCamera(t);
    updateAirPlane(t);
    updateBoxHanger();
    partySize(kicker(k));
    // update(t);

    sphereUpdate();

    // Update Particle System
    for (var i = 0; i < parties.length; ++i) {
        parties[i].update();
    }

    console.log(kicker(k));

    render();

}


function render() {

    const delta = clock.getDelta();


    renderer.render(scene, camera);
}



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


// Particle system from: https://github.com/RonenNess/partykals/tree/master/demo