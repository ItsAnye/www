//Path: Projects/USER/PROJECT_NAME/
let USER = 'Anye'; //NEEDS TO BE FED FROM MAIN API
let PROJECT_NAME = 'MeltdownStudio'; //NEEDS TO BE FED FROM MAIN API

let loadedRig;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});

let textureLoader = new THREE.TextureLoader();
// let heightMap = textureLoader.load('../Textures/height.png');
let projectData = [];
let helper, outline;
outline = new THREE.BoxHelper(loadedRig, 0xff0000);
scene.add(outline);

let posIncrement = 5;
let rotIncrement = 20;
let sclIncrement = 1;

camera.position.set(0, 0, -5);
camera.lookAt(0, 0, 0);

renderer.setClearColor(0x87CEEB);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

let ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
ambientLight.name = 'AmbientLight';

scene.add(ambientLight);

projectData.push(
    {
        object: ambientLight,
        hidden: {
            selected: false,
            selectable: false,
        }
    }
);

let sunLight = new THREE.SpotLight(0xffffff, 1, 1000, Math.PI / 4);
sunLight.position.set(0, 10, 0);
sunLight.lookAt(0, 0, 0)
sunLight.name = 'SpotLight1';

scene.add(sunLight);

projectData.push(
    {
        object: sunLight,
        hidden: {
            selected: false,
            selectable: false,
        }
    }
);

let skyGeoemtry = new THREE.BoxGeometry(10000, 10000, 10000);
let skyMaterial = new THREE.MeshBasicMaterial({color: 0x87CEEB, side: THREE.DoubleSide});
let sky = new THREE.Mesh(skyGeoemtry, skyMaterial);
sky.name = 'Sky';

scene.add(sky);

selected = null;
let objectName = true;

let sphereGeometry = new THREE.SphereGeometry(1);
let sphereMaterial = new THREE.MeshNormalMaterial();
let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.set(0, 0, 0);
sphere.name = "Sphere1";
scene.add(sphere);

let sphereOutlineGeometry = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.BackSide});
let sphereOutlineMesh = new THREE.Mesh(sphereGeometry, sphereOutlineGeometry);
sphereOutlineMesh.position = sphere.position;
sphereOutlineMesh.scale.multiplyScalar(1.05);
sphereOutlineMesh.visible = false;
scene.add(sphereOutlineMesh);

sphere.userData['outline'] = sphereOutlineMesh;

projectData.push(
    {
        object: sphere,
        hidden: {
            selected: false,
            selectable: true,
            outline: sphereOutlineMesh,
            outlineVisible: false,
            type: 'Rig'
        }
    }
);

let textureGrass = textureLoader.load("Images/grass.jpeg");
textureGrass.wrapS = THREE.RepeatWrapping;
textureGrass.wrapT = THREE.RepeatWrapping;
textureGrass.repeat.set(10, 10);

let planeGeometry = new THREE.BoxGeometry(500, 500, 1);
let planeMaterial = new THREE.MeshStandardMaterial({
    map: textureGrass, 
    // displacementMap: heightMap,
    displacementScale: 1,
    transparent: false,
    depthTest: true
});

let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.name = 'Plane';

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = -10;
plane.position.z = 0;

scene.add(plane);
projectData.push(
    {
        object: plane,
        texture: textureGrass,
        hidden: {
            selected: false,
            selectable: false,
        }
    }
);

let projector = new THREE.Projector();
let fbxLoader = new THREE.FBXLoader();

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

document.getElementById("scene").appendChild(renderer.domElement);
render();

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown(event) {
    if(event.clientX <= (window.innerWidth - 300) && event.clientY > 110) {
        if(tool == 'Select'){
            if(helper != undefined) scene.remove(helper);
            helper = undefined;
            select();
        } else if(tool == 'Move') {
            console.log(projectData);
        }

        updateProperties();
    }
};

document.addEventListener('mousedown', onDocumentMouseDown, {passive: true});
window.addEventListener('resize', onWindowResize, {passive: true});