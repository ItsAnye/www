import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

// camera2
const camera2 = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2,  -100000, 100000);
camera2.position.set(-419.39, -500.87, 9691.72);
camera2.rotation.x = Math.PI/ 2;
camera2.quaternion.setFromEuler(new THREE.Euler(0.13, 0.03, 0));

// scene2
const scene2 = new THREE.Scene();

// spline scene2
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/pVkGFFft5e3dN02W/scene.splinecode',
  (splinescene2) => {
    scene2.add(splinescene2);
  }
);

// renderer2
const renderer2 = new THREE.WebGLRenderer({ antialias: true });
renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.setAnimationLoop(animate2);
document.body.appendChild(renderer2.domElement);

// scene2 settings
renderer2.shadowMap.enabled = true;
renderer2.shadowMap.type = THREE.PCFShadowMap;

scene2.background = new THREE.Color('#000000');
renderer2.setClearAlpha(1);

// orbit controls2
const controls2 = new OrbitControls(camera2, renderer2.domElement);
controls2.enableDamping = true;
controls2.dampingFactor = 0.125;
controls2.enabled = false;

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera2.left = window.innerWidth / - 2;
  camera2.right = window.innerWidth / 2;
  camera2.top = window.innerHeight / 2;
  camera2.bottom = window.innerHeight / - 2;
  camera2.updateProjectionMatrix();
  renderer2.setSize(window.innerWidth, window.innerHeight);
}

function animate2(time) {
  controls2.update();
  renderer2.render(scene2, camera2);
}
