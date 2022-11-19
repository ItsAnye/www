function insertRig() {
    fbxLoader.load('Assets/T-Pose.fbx', function(mesh){
        mesh.traverse(function(child){
            child.castShadow = true;
            child.receiveShadow = true;
            child.frustumCulled = false;
        })
        mesh.name = 'Rig' + Math.floor(Math.random() * (999 - 100 + 1) + 100);

        loadedRig = mesh;

        loadedRig.rotation.y = Math.PI;
        scene.add(loadedRig);

        projectData.push(
            {
                object: mesh,
                hidden: {
                    selected: false,
                    selectable: false,
                }
            }
        );

        document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li><i class="fa-solid fa-person"></i>  ${mesh.name}</li>`;
        updateExplorerClick();
    });
};

function newObjectDropdown(){
    if(document.getElementById('INSERTnewObjectDropdown').style.display == "none"){
        document.getElementById('INSERTnewObjectDropdown').style.display = "block";
    } else {
        document.getElementById('INSERTnewObjectDropdown').style.display = "none";
    };
};

function createObject(obj){
    let object = obj.value;
    if(object == 'Sphere'){
        let objectName = 'Sphere' + Math.floor(Math.random()*(999-100+1)+100);
        let objectGeometry = objectName + 'Geometry';
        let objectMaterial = objectName + 'Material';

        let objectOutlineMaterial = objectName + 'OutlineMaterial';
        let objectOutlineMesh = objectName + 'OutlineMesh';

        window[objectGeometry] = new THREE.SphereGeometry(1);
        window[objectMaterial] = new THREE.MeshNormalMaterial();
        window[objectName] = new THREE.Mesh(window[objectGeometry], window[objectMaterial]);
        window[objectName].name = objectName;

        window[objectName].position.set(10, 0, 0);
        scene.add(window[objectName]);

        window[objectOutlineMaterial] = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.BackSide});
        window[objectOutlineMesh] = new THREE.Mesh(window[objectGeometry], window[objectOutlineMaterial]);
        window[objectOutlineMesh].position.copy(window[objectName].position);
        window[objectOutlineMesh].scale.multiplyScalar(1.05);
        window[objectOutlineMesh].visible = false;
        scene.add(window[objectOutlineMesh]);

        window[objectName].userData['outline'] = window[objectOutlineMesh];

        projectData.push(
            {
                object: window[objectName],
                hidden: {
                    selected: false,
                    selectable: true,
                    outline: window[objectOutlineMesh],
                    outlineVisible: false
                }
            }
        );

        document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-circle"></i>  ${objectName}</li>`;
        updateExplorerClick();
    } else if(object == 'Cube'){
        let objectName = 'Cube' + Math.floor(Math.random()*(999-100+1)+100);
        let objectGeometry = objectName + 'Geometry';
        let objectMaterial = objectName + 'Material';

        let objectOutlineMaterial = objectName + 'OutlineMaterial';
        let objectOutlineMesh = objectName + 'OutlineMesh';

        window[objectGeometry] = new THREE.BoxGeometry(5, 5, 5);
        window[objectMaterial] = new THREE.MeshLambertMaterial({color: 0xff0000});
        window[objectName] = new THREE.Mesh(window[objectGeometry], window[objectMaterial]);
        window[objectName].position.x += 20;
        window[objectName].name = objectName;

        scene.add(window[objectName]);

        window[objectOutlineMaterial] = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.BackSide});
        window[objectOutlineMesh] = new THREE.Mesh(window[objectGeometry], window[objectOutlineMaterial]);
        window[objectOutlineMesh].position.copy(window[objectName].position);
        window[objectOutlineMesh].scale.multiplyScalar(1.05);
        window[objectOutlineMesh].visible = false;
        scene.add(window[objectOutlineMesh]);

        window[objectName].userData['outline'] = window[objectOutlineMesh];
        
        projectData.push(
            {
                object: window[objectName],
                hidden: {
                    selected: false,
                    selectable: true,
                    outline: window[objectOutlineMesh],
                    outlineVisible: false
                }
            }
        );
        
        document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-cube"></i>  ${objectName}</li>`;
        updateExplorerClick();
    } else if(object == 'Cylinder'){
        let objectName = 'Cylinder' + Math.floor(Math.random()*(999-100+1)+100); //0-999
        let objectGeometry = objectName + 'Geometry';
        let objectMaterial = objectName + 'Material';

        let objectOutlineMaterial = objectName + 'OutlineMaterial';
        let objectOutlineMesh = objectName + 'OutlineMesh';

        window[objectGeometry] = new THREE.CylinderGeometry(2, 2, 5, 32);
        window[objectMaterial] = new THREE.MeshLambertMaterial({color: 0xffff00});
        window[objectName] = new THREE.Mesh(window[objectGeometry], window[objectMaterial]);
        window[objectName].name = objectName;

        window[objectName].position.set(20, 0, 0);
        scene.add(window[objectName]);

        window[objectOutlineMaterial] = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.BackSide});
        window[objectOutlineMesh] = new THREE.Mesh(window[objectGeometry], window[objectOutlineMaterial]);
        window[objectOutlineMesh].position.copy(window[objectName].position);
        window[objectOutlineMesh].scale.multiplyScalar(1.05);
        window[objectOutlineMesh].visible = false;
        scene.add(window[objectOutlineMesh]);

        window[objectName].userData['outline'] = window[objectOutlineMesh];

        projectData.push(
            {
                object: window[objectName],
                hidden: {
                    selected: false,
                    selectable: true,
                    outline: window[objectOutlineMesh],
                    outlineVisible: false
                }
            }
        );

        document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-vial"></i>  ${objectName}</li>`;
        updateExplorerClick();
    } else if(object == 'Cone'){
        let objectName = 'Cone' + Math.floor(Math.random()*(999-100+1)+100); //0-999
        let objectGeometry = objectName + 'Geometry';
        let objectMaterial = objectName + 'Material';

        let objectOutlineMaterial = objectName + 'OutlineMaterial';
        let objectOutlineMesh = objectName + 'OutlineMesh';

        window[objectGeometry] = new THREE.ConeGeometry(2, 4, 32);
        window[objectMaterial] = new THREE.MeshLambertMaterial({color: 0x00ff00});
        window[objectName] = new THREE.Mesh(window[objectGeometry], window[objectMaterial]);
        window[objectName].name = objectName;

        window[objectName].position.set(20, 0, 0);
        scene.add(window[objectName]);

        window[objectOutlineMaterial] = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.BackSide});
        window[objectOutlineMesh] = new THREE.Mesh(window[objectGeometry], window[objectOutlineMaterial]);
        window[objectOutlineMesh].position.copy(window[objectName].position);
        window[objectOutlineMesh].scale.multiplyScalar(1.05);
        window[objectOutlineMesh].visible = false;
        scene.add(window[objectOutlineMesh]);

        window[objectName].userData['outline'] = window[objectOutlineMesh];

        projectData.push(
            {
                object: window[objectName],
                hidden: {
                    selected: false,
                    selectable: true,
                    outline: window[objectOutlineMesh],
                    outlineVisible: false
                }
            }
        );

        document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-ice-cream"></i>  ${objectName}</li>`;
        updateExplorerClick();
    } else if(object == 'Ring'){
        let objectName = 'Ring' + Math.floor(Math.random()*(999-100+1)+100); //0-999
        let objectGeometry = objectName + 'Geometry';
        let objectMaterial = objectName + 'Material';

        let objectOutlineMaterial = objectName + 'OutlineMaterial';
        let objectOutlineMesh = objectName + 'OutlineMesh';

        window[objectGeometry] = new THREE.TorusGeometry(3, 1, 16, 100);
        window[objectMaterial] = new THREE.MeshLambertMaterial({color: 0x00ffff});
        window[objectName] = new THREE.Mesh(window[objectGeometry], window[objectMaterial]);
        window[objectName].name = objectName;

        window[objectName].position.set(20, 0, 0);
        scene.add(window[objectName]);

        window[objectOutlineMaterial] = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.BackSide});
        window[objectOutlineMesh] = new THREE.Mesh(window[objectGeometry], window[objectOutlineMaterial]);
        window[objectOutlineMesh].position.copy(window[objectName].position);
        window[objectOutlineMesh].scale.multiplyScalar(1.05);
        window[objectOutlineMesh].visible = false;
        scene.add(window[objectOutlineMesh]);

        window[objectName].userData['outline'] = window[objectOutlineMesh];

        projectData.push(
            {
                object: window[objectName],
                hidden: {
                    selected: false,
                    selectable: true,
                    outline: window[objectOutlineMesh],
                    outlineVisible: false
                }
            }
        );

        document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-ring"></i>  ${objectName}</li>`;
        updateExplorerClick();
    } else if(object == 'Pyramid'){
        let objectName = 'Pyramid' + Math.floor(Math.random()*(999-100+1)+100); //0-999
        let objectGeometry = objectName + 'Geometry';
        let objectMaterial = objectName + 'Material';

        let objectOutlineMaterial = objectName + 'OutlineMaterial';
        let objectOutlineMesh = objectName + 'OutlineMesh';

        window[objectGeometry] = new THREE.ConeGeometry(2, 2, 4);
        window[objectMaterial] = new THREE.MeshLambertMaterial({color: 0xd46e53});
        window[objectName] = new THREE.Mesh(window[objectGeometry], window[objectMaterial]);
        window[objectName].name = objectName;

        window[objectName].position.set(20, 0, 0);
        scene.add(window[objectName]);

        window[objectOutlineMaterial] = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.BackSide});
        window[objectOutlineMesh] = new THREE.Mesh(window[objectGeometry], window[objectOutlineMaterial]);
        window[objectOutlineMesh].position.copy(window[objectName].position);
        window[objectOutlineMesh].scale.multiplyScalar(1.05);
        window[objectOutlineMesh].visible = false;
        scene.add(window[objectOutlineMesh]);

        window[objectName].userData['outline'] = window[objectOutlineMesh];

        projectData.push(
            {
                object: window[objectName],
                hidden: {
                    selected: false,
                    selectable: true,
                    outline: window[objectOutlineMesh],
                    outlineVisible: false
                }
            }
        );

        document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-ice-cream"></i>  ${objectName}</li>`;
        updateExplorerClick();
    };

    document.getElementById('newMeshDropdownDefault').selected = 'true';
};

function createLight(obj){
    let object = obj.value;

    if(object == 'SpotLight'){
        let objectName = 'SpotLight' + Math.floor(Math.random()*(999-100+1)+100);

        window[objectName] = new THREE.SpotLight(0xffffff, 1);
        window[objectName].name = objectName;

        window[objectName].position.set(10, 0, 0);
        scene.add(window[objectName]);

        let helper = new THREE.SpotLightHelper(window[objectName]);

        window[objectName].userData = {
            helper: helper
        }

        projectData.push(
            {
                object: window[objectName],
                hidden: {
                    selected: false,
                    selectable: false
                }
            }
        );

        document.getElementById('explorer_light_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-sun"></i>  ${objectName} <div style="display: inline; float: right; margin-right: 20px;"><i class="fa-regular fa-hand-pointer fa-beat"></i></div></li>`;
        updateExplorerClick();
    }

    document.getElementById('newLightDropdownDefault').selected = 'true';
};

let updates = setInterval(function(){
    for(let i = 0; i < toUpdate.length; i++){
        toUpdate[i].update();
    }
}, 100);