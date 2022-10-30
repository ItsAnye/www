let maps = ['dual_ruins'];

const loader = new THREE.GLTFLoader();

//Random item in array
let mapIndex = maps[Math.floor(Math.random() * maps.length)];

loader.load(`Assets/Maps/${mapIndex}.glb`, function ( gltf ) {
        gltf.scene.scale.set(40, 40, 40);
		scene.add(gltf.scene);
	}
);

let wall1Trigger, wall1BB;

if(mapIndex == 'dual_ruins'){
    wall1Trigger = new THREE.Mesh(new THREE.BoxGeometry(1, 20, 27), new THREE.MeshBasicMaterial({color: 0xff0000}));
    wall1Trigger.position.set(26.5, 10, -13.5);

    //Shop BOUNDING BOX
    wall1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    wall1BB.setFromObject(wall1Trigger);
}

function checkCollisions() {
    player.position.set(camera.position.x, camera.position.y, camera.position.z);
    if(playerBB.intersectsBox(wall1BB)){
        camera.position.set(safePos.x, safePos.y, safePos.z);
    } else {
        safePos.x = camera.position.x;
        safePos.y = camera.position.y;
        safePos.z = camera.position.z;
    }
}