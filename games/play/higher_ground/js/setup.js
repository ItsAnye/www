let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});

document.getElementById('scene').appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB);

camera.position.set(65, 3, 0);
camera.lookAt(0, 0, 0);

//Player
var player = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshLambertMaterial({color: 0xff0000}));
player.position.set(65, 3, 0);
scene.add(player);

//Player BOUNDING BOX
var playerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
playerBB.setFromObject(player);

let light = new THREE.SpotLight(0xffffff, 1.5, 1000, Math.PI / 2);
light.position.set(0, 0, 50);
scene.add(light);

let ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);