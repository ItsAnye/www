//Path: Projects/USER/PROJECT_NAME/
let USER = 'Anye'; //NEEDS TO BE FED FROM MAIN API
let PROJECT_NAME = 'MeltdownStudio'; //NEEDS TO BE FED FROM MAIN API

let loadedRig;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();

let textureLoader = new THREE.TextureLoader();
// let heightMap = textureLoader.load('../Textures/height.png');
let projectData = [];
let toUpdate = [];

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

let sunLightHelper = new THREE.SpotLightHelper(sunLight);
toUpdate.push(sunLightHelper);

sunLight.userData = {
    helper: sunLightHelper
}

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

//Start
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
            outlineVisible: false
        }
    }
);

let textureGrass = textureLoader.load("Images/grasslight-big.jpeg");
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

//End

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

function updateProperties(){ //Properties options
    //If something is selected
    if(selected != null){
        //Name row
        document.getElementById('name_row').innerHTML = "<th class='center'>Name</th>" + "\
        <th>\
            <form onsubmit='return changeProperties(event, selected)'>\
                <div class='form-group'>\
                    <input type='text' class='form-control properties_input' autocomplete='off' id='nameInput'>\
                </div>\
            </form>\
        </th>\
        ";
        document.getElementById('nameInput').value = selected.name;

        if(selected.type != 'AmbientLight'){
            //Position row
            document.getElementById('position_row').innerHTML = `<th class='center'>Position</th>` + `\
            <th>\
                <form onsubmit='return changeProperties(event, selected)'>\
                    <div class='row'>\
                        <div class='form-group properties_position_row'>\
                            <label class='properties_label' for='positionInputX' style='margin-top: 6px;'>x:&nbsp;&nbsp;</label>\
                            <button class='btn increment-button' onmouseup='incrementStats("pos", "minus", "x")'><i class='fas fa-minus increment-icon'></i></button>\
                            <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("pos", "plus", "x")'><i class='fas fa-plus increment-icon'></i></button>\
                            <div style='overflow: hidden;'>\
                                <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='positionInputX'></span>\
                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </form>\
                \
                <form onsubmit='return changeProperties(event, selected)'>\
                    <div class='row'>\
                        <div class='form-group properties_position_row'>\
                            <label class='properties_label' for='positionInputY' style='margin-top: 6px;'>y:&nbsp;&nbsp;</label>\
                            <button class='btn increment-button' onmouseup='incrementStats("pos", "minus", "y")'><i class='fas fa-minus increment-icon'></i></button>\
                            <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("pos", "plus", "y")'><i class='fas fa-plus increment-icon'></i></button>\
                            <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='positionInputY'></span>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </form>\
                \
                <form onsubmit='return changeProperties(event, selected)'>\
                <div class='row'>\
                    <div class='form-group properties_position_row'>\
                        <label class='properties_label' for='positionInputZ' style='margin-top: 6px;'>z:&nbsp;&nbsp;</label>\
                        <button class='btn increment-button' onmouseup='incrementStats("pos", "minus", "z")'><i class='fas fa-minus increment-icon'></i></button>\
                        <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("pos", "plus", "z")'><i class='fas fa-plus increment-icon'></i></button>\
                        <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='positionInputZ'></span>\
                    </div>\
                </div>\
            </form>\
            </th>\
            `;
            document.getElementById('positionInputX').value = selected.position.x;
            document.getElementById('positionInputY').value = selected.position.y;
            document.getElementById('positionInputZ').value = selected.position.z;

            if(selected.type != 'SpotLight'){
                //Scale row
                document.getElementById('scale_row').innerHTML = `<th class='center'>Scale</th>` + `\
                <th>\
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_scale_row'>\
                                <label class='properties_label' for='scaleInputX' style='margin-top: 6px;'>x:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("scl", "minus", "x")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("scl", "plus", "x")'><i class='fas fa-plus increment-icon'></i></button>\
                                <div style='overflow: hidden;'>\
                                    <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='scaleInputX'></span>\
                                </div>\
                                <div style='height: 10px;'></div>\
                            </div>\
                        </div>\
                    </form>\
                    \
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_scale_row'>\
                                <label class='properties_label' for='scaleInputY' style='margin-top: 6px;'>y:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("scl", "minus", "y")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("scl", "plus", "y")'><i class='fas fa-plus increment-icon'></i></button>\
                                <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='scaleInputY'></span>\
                                <div style='height: 10px;'></div>\
                            </div>\
                        </div>\
                    </form>\
                    \
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_scale_row'>\
                                <label class='properties_label' for='scaleInputZ' style='margin-top: 6px;'>z:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("scl", "minus", "z")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("scl", "plus", "z")'><i class='fas fa-plus increment-icon'></i></button>\
                                <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='scaleInputZ'></span>\
                            </div>\
                        </div>\
                    </form>\
                </th>\
                `;
                document.getElementById('scaleInputX').value = selected.scale.x;
                document.getElementById('scaleInputY').value = selected.scale.y;
                document.getElementById('scaleInputZ').value = selected.scale.z;

                //Rotation row
                document.getElementById('rotation_row').innerHTML = `<th class='center'>Rotation</th>` + `\
                <th>\
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_rotation_row'>\
                                <label class='properties_label' for='rotationInputX' style='margin-top: 6px;'>x:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("rot", "minus", "x")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("rot", "plus", "x")'><i class='fas fa-plus increment-icon'></i></button>\
                                <div style='overflow: hidden;'>\
                                    <span><input type='number' onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='rotationInputX'></span>\
                                </div>\
                                <div style='height: 10px;'></div>\
                            </div>\
                        </div>\
                    </form>\
                    \
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_rotation_row'>\
                                <label class='properties_label' for='rotationInputY' style='margin-top: 6px;'>y:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("rot", "minus", "y")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("rot", "plus", "y")'><i class='fas fa-plus increment-icon'></i></button>\
                                <span><input type='number' onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='rotationInputY'></span>\
                                <div style='height: 10px;'></div>\
                            </div>\
                        </div>\
                    </form>\
                    \
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_rotation_row'>\
                                <label class='properties_label' for='rotationInputZ' style='margin-top: 6px;'>z:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("rot", "minus", "z")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("rot", "plus", "z")'><i class='fas fa-plus increment-icon'></i></button>\
                                <span><input type='number' onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='rotationInputZ'></span>\
                            </div>\
                        </div>\
                    </form>\
                </th>\
                `;
                document.getElementById('rotationInputX').value = radians_to_degrees(selected.rotation.x); //Needs to be converted to radians (user will see degrees).
                document.getElementById('rotationInputY').value = radians_to_degrees(selected.rotation.y);
                document.getElementById('rotationInputZ').value = radians_to_degrees(selected.rotation.z);
            } else {
                document.getElementById('scale_row').innerHTML = '';
            }
        } else {
            document.getElementById('position_row').innerHTML = '';
            document.getElementById('rotation_row').innerHTML = '';
            document.getElementById('scale_row').innerHTML = '';
        }

        //Color row
        if(selected.type == "Mesh" || selected.type == 'AmbientLight' || selected.type == 'SpotLight') {
            document.getElementById('color_row').innerHTML = `<th class='center'>Color</th>` + `\
            <th>\
                <form onsubmit='return changeProperties(event, selected)'>\
                    <div class='row'>\
                        <div class='form-group properties_color_row'>\
                            <div style='overflow: hidden;' id="color_input_div">\

                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </form>\
            </th>\
            `;

            if (selected.type == 'Mesh' && selected.material.type != 'MeshNormalMaterial'){
                let color = rgbToHex(parseInt(selected.material.color.r * 255), parseInt(selected.material.color.g * 255), parseInt(selected.material.color.b * 255))
                document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
            } else if (selected.type == 'SpotLight' || selected.type == 'AmbientLight'){
                let color = rgbToHex(parseInt(selected.color.r * 255), parseInt(selected.color.g * 255), parseInt(selected.color.b * 255))
                document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
            } else {
                document.getElementById("color_input_div").innerHTML = '<b>Please change your material to use colors.</b>';
            }

            if(selected.type == 'Mesh'){
                //Material row
                document.getElementById('material_row').innerHTML = `<th class='center'>Material</th>` + `\
                <th>\
                    <div class='row'>\
                        <div class='form-group properties_material_row'>\
                            <div style='overflow: hidden;' id="material_dropdown_div">\
                                <select id="material_dropdown" onchange="changeMaterialProperty();">\
                                    <option value="standard">Standard</option>\
                                    <option value="basic">Basic</option>\
                                    <option value="rainbow">Rainbow</option>\
                                    <option value="metal">Metal</option>\
                                </select>\
                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </th>\
                `;
            } else {
                document.getElementById('material_row').innerHTML = '';
            }

            //Intensity Row
            if(selected.type == 'SpotLight' || selected.type == 'AmbientLight'){
                document.getElementById('intensity_row').innerHTML = `<th class='center'>Intensity</th>` + `\
                <th>\
                    <div class='row'>\
                        <div class='form-group properties_intensity_row'>\
                            <div style='overflow: hidden;' id="intensity_slider_div">\
                                <input type="range" min="0" max="500" value="${selected.intensity * 100}" class="slider" id="intensity_slider" oninput="changeIntensityProperty();">
                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </th>\
                `;
            } else {
                document.getElementById('intensity_row').innerHTML = '';
            }

            if(selected.type == 'Mesh'){
                document.getElementById('opacity_row').innerHTML = `<th class='center'>Opacity</th>` + `\
                <th>\
                    <div class='row'>\
                        <div class='form-group properties_opacity_row'>\
                            <div style='overflow: hidden;' id="opacity_slider_div">\
                                <input type="range" step="0.1" min="0" max="1" value="${selected.material.opacity}" class="slider" id="opacity_slider" oninput="changeOpacityProperty();">
                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </th>\
                `;
            } else {
                document.getElementById('opacity_row').innerHTML = '';
            }

            if(selected.type == 'Mesh'){
                const material_dropdown = document.getElementById('material_dropdown');
                if (selected.material.type == "MeshNormalMaterial"){
                    material_dropdown.value = 'rainbow';
                } else if (selected.material.type == "MeshBasicMaterial"){
                    material_dropdown.value = 'basic';
                } else if (selected.material.type == "MeshStandardMaterial" || selected.material.type == "MeshLambertMaterial"){
                    material_dropdown.value = 'standard';
                } else {
                    material_dropdown.value = 'metal';
                }
            }
        }

    //Spotlight helper

    //If nothing is selected show nothing
    } else {
        let all_properties = document.getElementsByClassName("properties_row");
        for(let i = 0; i < all_properties.length; i++){
            all_properties[i].innerHTML = "";
        }
    }
}

function changeProperties(e, sel){
    //Preventing refresh
    e.preventDefault();

    //Name row
    sel.name = document.getElementById('nameInput').value;

    if(sel.type != 'AmbientLight'){
        //Position row
        sel.position.x = document.getElementById('positionInputX').value;
        sel.position.y = document.getElementById('positionInputY').value;
        sel.position.z = document.getElementById('positionInputZ').value;

        if(sel.type != 'SpotLight'){
            //Rotation row
            sel.rotation.x = degrees_to_radians(document.getElementById('rotationInputX').value);
            sel.rotation.y = degrees_to_radians(document.getElementById('rotationInputY').value);
            sel.rotation.z = degrees_to_radians(document.getElementById('rotationInputZ').value);

            //Scale row
            sel.scale.x = document.getElementById('scaleInputX').value;
            sel.scale.y = document.getElementById('scaleInputY').value;
            sel.scale.z = document.getElementById('scaleInputZ').value;
        }
    } else {
        document.getElementById('position_row').innerHTML = '';
        document.getElementById('rotation_row').innerHTML = '';
    }

    //Color row in changeColorProperty() because there is no e.preventDefault();
    //Material row in changeColorProperty() because there is no e.preventDefault();

    //Update outline if exists
    if(sel.userData.outline != undefined){
        sel.userData.outline.position.copy(sel.position);
        sel.userData.outline.rotation.copy(sel.rotation);

        sel.userData.outline.scale.set(sel.scale.x, sel.scale.y, sel.scale.z);
        sel.userData.outline.scale.multiplyScalar(1.05); //Needs to be slightly larger
    }

    //Update explorer
    populateExplorer();
    updateExplorerClick();
}

function changeColorProperty(color='') {
    if(color == ''){
        if(selected.type == 'Mesh'){
            selected.material.color.setHex("0x" + String(document.getElementById('color_input').value).substring(1))
        } else if(selected.type == 'SpotLight' || selected.type == 'AmbientLight'){
            selected.color.setHex("0x" + String(document.getElementById('color_input').value).substring(1))
        }
        
    } else {
        return "0x" + String(color).substring(1)
    }
}

function changeMaterialProperty() {
    let material_dropdown = document.getElementById('material_dropdown');
    let old_mat = selected.material;

    if(material_dropdown.value == 'standard'){
        selected.material = new THREE.MeshLambertMaterial({color: 0x000000});
        if("color" in old_mat){
            selected.material.color.setHex(changeColorProperty(rgbToHex(parseInt(old_mat.color.r * 255), parseInt(old_mat.color.g * 255), parseInt(old_mat.color.b * 255))));
        }

        let color = rgbToHex(parseInt(selected.material.color.r * 255), parseInt(selected.material.color.g * 255), parseInt(selected.material.color.b * 255))
        document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
    } else if(material_dropdown.value == 'rainbow'){
        selected.material = new THREE.MeshNormalMaterial();
        document.getElementById("color_input_div").innerHTML = '<b>Please change your material to use colors.</b>';
    } else if(material_dropdown.value == 'metal'){
        selected.material = new THREE.MeshPhongMaterial({color: 0x000000});
        if("color" in old_mat){
            selected.material.color.setHex(changeColorProperty(rgbToHex(parseInt(old_mat.color.r * 255), parseInt(old_mat.color.g * 255), parseInt(old_mat.color.b * 255))));
        }

        let color = rgbToHex(parseInt(selected.material.color.r * 255), parseInt(selected.material.color.g * 255), parseInt(selected.material.color.b * 255))
        document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
    } else if(material_dropdown.value == 'basic'){
        selected.material = new THREE.MeshBasicMaterial({color: 0x000000});
        if("color" in old_mat){
            selected.material.color.setHex(changeColorProperty(rgbToHex(parseInt(old_mat.color.r * 255), parseInt(old_mat.color.g * 255), parseInt(old_mat.color.b * 255))));
        }
        
        let color = rgbToHex(parseInt(selected.material.color.r * 255), parseInt(selected.material.color.g * 255), parseInt(selected.material.color.b * 255))
        document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
    }
}

function changeIntensityProperty(){
    selected.intensity = document.getElementById('intensity_slider').value / 100;
}

function changeOpacityProperty(){
    selected.material.transparent = true;
    selected.material.opacity = document.getElementById('opacity_slider').value;
}

//Incrementing
function incrementStats(stat, dir, axis){
    if(stat == 'pos'){
        if(dir == 'minus'){
            if(axis == 'x'){
                let currValueX = document.getElementById('positionInputX').value;
                document.getElementById('positionInputX').value = currValueX - posIncrement;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('positionInputY').value;
                document.getElementById('positionInputY').value = currValueY - posIncrement;
            } else {
                let currValueZ = document.getElementById('positionInputZ').value;
                document.getElementById('positionInputZ').value = currValueZ - posIncrement;
            }
        } else {
            if(axis == 'x'){
                let currValueX = document.getElementById('positionInputX').value;
                document.getElementById('positionInputX').value = parseInt(currValueX) + posIncrement;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('positionInputY').value;
                document.getElementById('positionInputY').value = parseInt(currValueY) + posIncrement;
            } else {
                let currValueZ = document.getElementById('positionInputZ').value;
                document.getElementById('positionInputZ').value = parseInt(currValueZ) + posIncrement;
            }
        }
    } else if(stat == 'rot'){
        if(dir == 'minus'){
            if(axis == 'x'){
                let currValueX = document.getElementById('rotationInputX').value;
                document.getElementById('rotationInputX').value = (currValueX - rotIncrement) % 360;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('rotationInputY').value;
                document.getElementById('rotationInputY').value = (currValueY - rotIncrement) % 360;
            } else {
                let currValueZ = document.getElementById('rotationInputZ').value;
                document.getElementById('rotationInputZ').value = (currValueZ - rotIncrement) % 360;
            }
        } else {
            if(axis == 'x'){
                let currValueX = document.getElementById('rotationInputX').value;
                document.getElementById('rotationInputX').value = (parseInt(currValueX) + rotIncrement) % 360;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('rotationInputY').value;
                document.getElementById('rotationInputY').value = (parseInt(currValueY) + rotIncrement) % 360;
            } else {
                let currValueZ = document.getElementById('rotationInputZ').value;
                document.getElementById('rotationInputZ').value = (parseInt(currValueZ) + rotIncrement) % 360;
            }
        }
    } else if(stat == 'scl'){
        if(dir == 'minus'){
            if(axis == 'x'){
                let currValueX = document.getElementById('scaleInputX').value;
                document.getElementById('scaleInputX').value = currValueX - sclIncrement;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('scaleInputY').value;
                document.getElementById('scaleInputY').value = currValueY - sclIncrement;
            } else {
                let currValueZ = document.getElementById('scaleInputZ').value;
                document.getElementById('scaleInputZ').value = currValueZ - sclIncrement;
            }
        } else {
            if(axis == 'x'){
                let currValueX = document.getElementById('scaleInputX').value;
                document.getElementById('scaleInputX').value = parseInt(currValueX) + sclIncrement;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('scaleInputY').value;
                document.getElementById('scaleInputY').value = parseInt(currValueY) + sclIncrement;
            } else {
                let currValueZ = document.getElementById('scaleInputZ').value;
                document.getElementById('scaleInputZ').value = parseInt(currValueZ) + sclIncrement;
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

//Buildings
let lines = [];

function newBuilding(){
    document.getElementById('new_building').style.visibility = 'visible';

    if(lines.length == 0){
        for(let x = 0; x < document.getElementsByClassName('building_point').length; x++){
            if(document.getElementById(`point${x + 1}`) == null || document.getElementById(`point${x + 1}`) == undefined){
                let line = new LeaderLine(
                    document.getElementById(`point${x}`),
                    document.getElementById(`point0`),
                    {dash: {animation: true}, startPlug: 'behind', endPlug: 'behind', path: 'straight', color: 'rgb(0, 0, 0)'}
                );

                lines.push(line);
            } else {
                let line = new LeaderLine(
                    document.getElementById(`point${x}`),
                    document.getElementById(`point${x + 1}`),
                    {dash: {animation: true}, startPlug: 'behind', endPlug: 'behind', path: 'straight', color: 'rgb(0, 0, 0)'}
                );

                lines.push(line);
            }
            document.getElementById(`point${x}`) //x + 1
        }
    }
}

function fixLine(){
    for(let i = 0; i < lines.length; i++){
        lines[i].position();
    }
}

function removeLines(){
    for(let i = 0; i < lines.length; i++){
        lines[i].remove();
    }
    lines = [];
}

function canceled_building(elem){
    elem.parentNode.style.visibility = 'hidden';
    removeLines();
}

let numWalls = document.getElementById('numWalls').children[0];
numWalls.addEventListener("change", function() {
    if(numWalls.value > 10){
        numWalls.value = 10;
    } else if(numWalls.value < 3){
        numWalls.value = 3;
    }

    document.getElementById('build_btn').style.backgroundColor = 'green';
    document.getElementById('build_btn').style.cursor = 'pointer';

    removeLines();

    //Render points
    let right = document.getElementById('new_building_right')
    right.innerHTML = '';
    for(let i = 0; i < numWalls.value; i++){
        right.innerHTML += `<div class="building_point" id="point${i}"></div>`;
    }

    for(let x = 0; x < document.getElementsByClassName('building_point').length; x++){
        document.getElementsByClassName('building_point')[x].style.left = Math.round(getRandomInt(10, right.offsetWidth - 20) / 30) * 30 + 'px';
        document.getElementsByClassName('building_point')[x].style.top = Math.round(getRandomInt(10, right.offsetHeight - 20) / 30) * 30 + 'px';
        let z = new PlainDraggable(document.getElementsByClassName('building_point')[x], {onMove: fixLine});
        z.snap = {step: 30};
    }

    for(let x = 0; x < document.getElementsByClassName('building_point').length; x++){
        if(document.getElementById(`point${x + 1}`) == null || document.getElementById(`point${x + 1}`) == undefined){
            let line = new LeaderLine(
                document.getElementById(`point${x}`),
                document.getElementById(`point0`),
                {dash: {animation: true}, startPlug: 'behind', endPlug: 'behind', path: 'straight', color: 'rgb(0, 0, 0)'}
            );

            lines.push(line);
        } else {
            let line = new LeaderLine(
                document.getElementById(`point${x}`),
                document.getElementById(`point${x + 1}`),
                {dash: {animation: true}, startPlug: 'behind', endPlug: 'behind', path: 'straight', color: 'rgb(0, 0, 0)'}
            );

            lines.push(line);
        }
        document.getElementById(`point${x}`) //x + 1
    }
});

let wallpaper = document.getElementById('wallpaper').children[0];
wallpaper.addEventListener('change', function(event){
    let output = document.getElementById('wallpaper_preview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src);
    }
});

let flooring = document.getElementById('flooring').children[0];
flooring.addEventListener('change', function(event){
    let output = document.getElementById('flooring_preview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src)
      }
});

//Start Build
let buildingData = [];

function build_structure(){
    let btn = document.getElementById('build_btn');

    if(getComputedStyle(btn).cursor != 'not-allowed'){
        for(let x = 0; x < document.getElementsByClassName('building_point').length; x++){
            let left = document.getElementsByClassName('building_point')[x].style.left.replace('px', '');
            let top = document.getElementsByClassName('building_point')[x].style.top.replace('px', '');
            buildingData.push([left, top]);
        }

        console.log(buildingData);
        //Use buildingData to create a three.js group for the building.
        //Allow user to change building height and scale of model
        //When adding group to projectData, also store buildingData in the group's userData so that you can edit the building later.
    }
}

//Listeners
document.addEventListener('mousedown', onDocumentMouseDown, false);
window.addEventListener('resize', onWindowResize, false);