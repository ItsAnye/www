let projector = new THREE.Projector();
let fbxLoader = new THREE.FBXLoader();

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

document.getElementById("scene").appendChild(renderer.domElement);
render();

let updates = setInterval(function(){
    for(let i = 0; i < toUpdate.length; i++){
        toUpdate[i].update();
    }
}, 100);

//Functions
function changeTab(evt, tab){
    let tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";

    if(tab == 'edit'){
        if(loadedRig != undefined){
            document.getElementById(tab).innerHTML = "\
            <label for='torso'>\
            <input type='color'></input>"
        } else {
            document.getElementById(tab).innerHTML = "Please load a rig first!"
        }
    } else {
        document.getElementById(tab).style.display = 'block';
    }

    let all = document.getElementsByClassName('tablinks');
    for (let i = 0; i < all.length; i++) {
        all[i].style.backgroundColor = 'lightgrey';
    }
    document.getElementById(tab + '_tab').style.backgroundColor = "darkgrey";
};

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

function onDocumentMouseDown(event) {
    if(event.clientX <= (window.innerWidth - 300)) {
        if(tool == 'Select'){
            for(let i = 0; i < toUpdate.length; i++){
                scene.remove(toUpdate[i]);
            }
            select();
        } else if(tool == 'Move') {
            console.log(projectData);
        }

        updateProperties();
    }
};

function select(thing=''){
    if(thing === ''){
        let vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector = vector.unproject(camera);
    
        let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        let intersects = raycaster.intersectObjects(scene.children, true);
    
        if(intersects.length > 0){
            for(let i = 0; i < projectData.length; i++){
                if(projectData[i]['object'] == intersects[0].object){
    
                    //If it's not selected
                    if(projectData[i]['hidden']['selected'] == false){
                        if(selected == sky || selected != null || selected != undefined) {
                            if(projectData[i]['hidden']['outline']){
                                projectData[i]['hidden']['outline'].visible = false;
                            }
    
                            if(Object.keys(selected.userData).length > 0){
                                if(selected.userData.outline == undefined){
                                    scene.remove(selected.userData.helper)
                                } else {
                                    selected.userData.outline.visible = false;
                                }
                            }
                        }
    
                        selected = projectData[i].object;
                        projectData[i]['hidden']['selected'] = true;
    
                        //If object isn't selectable, making opacity 0.8 rather than 0.5
                        if(projectData[i]['hidden']['selectable'] == false){
                            //fill
                        } else {
                            //Outline doesn't exist here.
                            projectData[i]['hidden']['outline'].visible = true;
                        }
    
                    //If it is selected
                    } else {
                        if(projectData[i]['hidden']['outline']){
                            projectData[i]['hidden']['outline'].visible = false;
                        }
    
                        if(selected != null && Object.keys(selected.userData).length > 0){
                            if(selected.userData.outline == undefined){
                                scene.remove(selected.userData.helper);
                            } else {
                                selected.userData.outline.visible = false;
                            }
                        }
    
                        projectData[i]['hidden']['selected'] = false;
                        selected = null;
                    }
                }
            };
        };
    } else {
        if(thing['hidden']['selected'] == false){
            if(selected == sky || selected != null || selected != undefined) {
                if(thing['hidden']['outline']){
                    thing['hidden']['outline'].visible = false;
                }

                if(Object.keys(selected.userData).length > 0 && selected.userData.outline != undefined){
                    selected.userData.outline.visible = false;
                }
            }

            selected = thing.object;
            thing['hidden']['selected'] = true;

            //If object isn't selectable, making opacity 0.8 rather than 0.5
            if(thing['hidden']['selectable'] == false){
                //fill
            } else {
                //Outline doesn't exist here.
                thing['hidden']['outline'].visible = true;
            }

        //If it is selected
        } else {
            if(thing['hidden']['outline']){
                thing['hidden']['outline'].visible = false;
            }

            if(selected != null && Object.keys(selected.userData).length > 0 && selected.userData.outline != undefined){
                selected.userData.outline.visible = false;
            }

            thing['hidden']['selected'] = false;
            selected = null;
        }
    }

    if(selected != null){
        if(selected.type == 'SpotLight'){
            for(let x = 0; x < projectData.length; x++){
                if(projectData[x].object.userData.helper != undefined){
                    scene.remove(projectData[x].object.userData.helper);
                }
            }

            scene.add(selected.userData.helper);
        } else {
            for(let i = 0; i < projectData.length; i++){
                if(projectData[i]['object'].type == 'SpotLight'){
                    scene.remove(projectData[i]['object'].userData.helper);
                }
            }
        }
    } else {
        for(let i = 0; i < projectData.length; i++){
            if(projectData[i]['object'].type == 'SpotLight'){
                scene.remove(projectData[i]['object'].userData.helper);
            }
        }
    }
}

//Radians and degrees
function degrees_to_radians(degrees) {
    let pi = Math.PI;
    return degrees * (pi/180);
}

function radians_to_degrees(radians) {
  let pi = Math.PI;
  return radians * (180/pi);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//Color conversions
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

//Explorer options
let coll = document.getElementsByClassName("explorer_collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.firstChild.className = '';
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        
        if (content.style.display === "block") {
            content.style.display = "none";
            this.firstChild.className = 'fa-solid fa-angle-up';
        } else {
            content.style.display = "block";
            this.firstChild.className = 'fa-solid fa-angle-down';
        }
    });
}

function populateExplorer(){
    //Clear
    document.getElementById('explorer_world_content').firstElementChild.innerHTML = '';
    document.getElementById('explorer_light_content').firstElementChild.innerHTML = '';

    for(let i = 0; i < projectData.length; i++) {
        if(projectData[i].object.type == 'Mesh'){
            if(projectData[i].object.geometry.type == 'SphereGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li><i class="fa-solid fa-circle"></i>  ${projectData[i].object.name}</li>`;
            } else if(projectData[i].object.geometry.type == 'BoxGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li><i class="fa-solid fa-cube"></i>  ${projectData[i].object.name}</li>`;
            } else if(projectData[i].object.geometry.type == 'CylinderGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li><i class="fa-solid fa-vial"></i>  ${projectData[i].object.name}</li>`;
            } else if(projectData[i].object.geometry.type == 'ConeGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li><i class="fa-solid fa-ice-cream"></i>  ${projectData[i].object.name}</li>`;
            } else if(projectData[i].object.geometry.type == 'TorusGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li><i class="fa-solid fa-ring"></i>  ${projectData[i].object.name}</li>`;
            }
        } else if(projectData[i].object.type == 'Group'){
            document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li><i class="fa-solid fa-person"></i>  ${projectData[i].object.name}</li>`;
        } else if(projectData[i].object.type == 'AmbientLight' || projectData[i].object.type == 'SpotLight') {
            document.getElementById('explorer_light_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-sun"></i>  ${projectData[i].object.name} <div style="display: inline; float: right; margin-right: 20px;"><i class="fa-regular fa-hand-pointer fa-beat"></i></div></li>`;
        }
    }
}

populateExplorer();

function updateExplorerClick() {
    let li_click_select = document.getElementsByClassName('li_click_select');
    for(let i = 0; i < li_click_select.length; i++){
        li_click_select[i].addEventListener("click", function() {
            selectExplorer(this.innerText.substring(1));
        });
    }
}

updateExplorerClick();

function selectExplorer(name){
    for(let i = 0; i < projectData.length; i++) {
        if(projectData[i].object.name == name){
            select(projectData[i]);
            updateProperties();
            break;
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Listeners
document.addEventListener('mousedown', onDocumentMouseDown, false);
window.addEventListener('resize', onWindowResize, false);