import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

// camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 100000);
camera.position.set(775.69, 352.72, -518.5);
camera.quaternion.setFromEuler(new THREE.Euler(-1.57, 0.44, 1.56));

// scene
const scene = new THREE.Scene();

// spline scene
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/VrUPbpHq-7jRMzpW/scene.splinecode',
  (splineScene) => {
    scene.add(splineScene);
  }
);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color('#87ceeb');
renderer.setClearAlpha(0);

// // orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;
controls.enabled = false;

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
}

let tl = new TimelineMax().delay(0.5);

function change(index){
    if(index == 0){
        controls.target.set(0, 0, 0);
        tl.to(camera.position, 3, {x: 437.41, y: 211.74, z: 292.80, ease: Expo.easeInOut});
        $("#title").css({'font-size': '150px'});
        $("#header").fadeOut(1000);
        $("#apartments").fadeIn(3000);
    } else if(index == 1){
        tl.to(camera.position, 3, {x: 161.42, y: 121.46, z: 288.92, ease: Expo.easeInOut})
        tl.to(controls.target, 3, {x: -200, y: 100, ease: Expo.easeInOut}, '-=3');
        $("#apartments").fadeOut(3000);
        $("#shop").fadeIn(3000);
    } else if(index == 2){
        tl.to(camera.position, 3, {x: 250, y: 186, z: -286.35, ease: Expo.easeInOut});
        $("#shop").fadeOut(3000);
        $("#hall").fadeIn(3000);
    } else if(index == 3){
        tl.to(camera.position, 3, {x: 406.75, y: 137.91, z: -228.40, ease: Expo.easeInOut});
        tl.to(controls.target, 3, {x: 0, y: 0, ease: Expo.easeInOut}, '-=3');
        $("#hall").fadeOut(3000);
        $("#play").fadeIn(3000);
    } else if(index == 4){
        tl.to(camera.position, 3, {x: -198, y: 88.69, z: 143.73, ease: Expo.easeInOut});
        tl.to(controls.target, 3, {x: -200, y: 100, ease: Expo.easeInOut}, '-=3');
        $("#play").fadeOut(3000);
        $("#updates").fadeIn(3000);
    } else if(index == -1) {
        tl.to(camera.position, 3, {x: 775.69, y: 352.72, z: -518.5, ease: Expo.easeInOut});
        tl.to(controls.target, 3, {x: 0, y: 0, ease: Expo.easeInOut}, '-=3');
        $("#updates").fadeOut(3000);
        $("#header").fadeIn(1000);
        $("#title").css({'font-size': '32px'});
    } else if(index >= 5){
        //Don't show apartments, show overview!
        indexx = -1;
        change(-1);
    } 
}

let indexx = -1;

let nextBtn = document.getElementById('next')
nextBtn.addEventListener('click', function(){
    indexx++;
    change(indexx);
});