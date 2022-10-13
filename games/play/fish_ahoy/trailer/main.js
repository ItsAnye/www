var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB);
document.getElementById('scene').appendChild(renderer.domElement);

// let controls = new THREE.OrbitControls( camera, renderer.domElement );
let loader = new THREE.TextureLoader();

//Start
let tl = new TimelineMax().delay(1)
camera.up.set(0, 1, 0);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("assets/");

let objects = [];

function terrainModel(model, x, y, z, roty = Math.PI, rotz = Math.PI, rotx = Math.PI / 2, scale = 1) {
    mtlLoader.load(`${model}.mtl`, function (materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("assets/");
        objLoader.load(`${model}.obj`, function (object) {
            object.scale.set(scale * 10, scale * 10, scale * 10);
            object.position.set(x, y, z);
            object.rotation.set(rotx, roty, rotz);
            objects.push(object);
            scene.add(object);
        });
    });
}

let ambient = new THREE.AmbientLight(0xffffff, 0.7);
// scene.add(ambient);

function deg(radians){
  var pi = Math.PI;
  return radians * (180/pi);
}

//Intro
function scene_one() {
    //Plane
    var planeGeometry = new THREE.BoxGeometry(500, 500, 5);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffeaa3, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, -180, -2.5);

    scene.add(plane);

    //Ocean
    let oceanTexture = loader.load('./assets/water.png')
    oceanTexture.wrapS = THREE.RepeatWrapping;
    oceanTexture.wrapT = THREE.RepeatWrapping;
    oceanTexture.repeat.set(30, 30);

    var oceanGeometry = new THREE.BoxGeometry(5000, 5000, 5);
    var oceanMaterial = new THREE.MeshBasicMaterial({map: oceanTexture, color: 0x57a8e6});
    var ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.position.set(0, 2570, -2.5);

    scene.add(ocean);

    camera.position.set(0.27, -77.08, -65.43)
    camera.lookAt(plane.position);

    //Animations
    tl.to(camera.rotation, 4, {x: Math.PI / 3, ease: Expo.easeOut}).to(camera.rotation, 4, {x: Math.PI / 2, ease: Expo.easeOut});

    //Spotlight
    let light = new THREE.SpotLight(0xffffff, 1);
    light.position.set(2500, 3000, 100);
    scene.add(light);

    const textureFlare0 = loader.load( "./assets/lensflare0.png" );
    const textureFlare1 = loader.load( "./assets/lensflare3.png" );

    const lensflare = new THREE.Lensflare();

    lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 1 ));
    lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 1 ));
    lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 1 ));
    lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 1 ));

    lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 1 ));
    lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 1 ));
    lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 1 ));
    lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 1 ));


    light.add(lensflare);

    setInterval(function(){
        document.getElementById('presents').style.opacity = '1';

        setInterval(function(){
            document.getElementById('presents').style.opacity = '0';

            setInterval(function(){
                document.getElementById('name').style.opacity = '1';
                document.getElementById('name').style.letterSpacing = '7px';
                document.getElementById('name').style.fontSize = '130px';

                setInterval(function(){
                    document.getElementById('name').style.opacity = '0';
                }, 2000);
            }, 2000)
        }, 2000)

        
    }, 2000)
}

//Canoe Floating
function scene_two(){
    //Camera
    camera.position.set(100, 100, 100)
    camera.rotation.set(0.76, -0.01, 0.01)

    //Light
    let spotlight2 = new THREE.SpotLight(0xffffff, 2);
    spotlight2.position.set(100, 100, 100);
    spotlight2.target.position.set(100, 130, 50);
    scene.add(spotlight2);
    scene.add(spotlight2.target)
    
    //Ocean
    let oceanTexture = loader.load('./assets/water.png')
    oceanTexture.wrapS = THREE.RepeatWrapping;
    oceanTexture.wrapT = THREE.RepeatWrapping;
    oceanTexture.repeat.set(30, 30);

    var oceanGeometry = new THREE.BoxGeometry(5000, 5000, 5);
    var oceanMaterial = new THREE.MeshBasicMaterial({map: oceanTexture, color: 0x57a8e6});
    var ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.position.set(0, 0, 0);

    scene.add(ocean);

    //Canoe
    terrainModel('canoe', 20, 200, 50, Math.PI / 4, deg(0), Math.PI / 2, 2);

    setTimeout(function(){
        //Animations
        tl.to(objects[0].position, 15, {x: 150, y: 100, ease: Expo.easeNone})
    }, 100)
}

//Canoe Breaking
function scene_three(){
    //Plane
    var planeGeometry = new THREE.BoxGeometry(500, 500, 5);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffeaa3, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, -180, -2.5);

    scene.add(plane);

    //Ocean
    let oceanTexture = loader.load('./assets/water.png')
    oceanTexture.wrapS = THREE.RepeatWrapping;
    oceanTexture.wrapT = THREE.RepeatWrapping;
    oceanTexture.repeat.set(30, 30);

    var oceanGeometry = new THREE.BoxGeometry(5000, 5000, 5);
    var oceanMaterial = new THREE.MeshBasicMaterial({map: oceanTexture, color: 0x57a8e6});
    var ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.position.set(0, 2570, -2.5);

    scene.add(ocean);

    camera.position.set(0.27, -77.08, -65.43)
    camera.lookAt(plane.position);

    terrainModel('canoe', 0, 200, -15, Math.PI, Math.PI, Math.PI / 2, 2);
    terrainModel('log_stackLarge', 0, 0, 10, Math.PI / 3, Math.PI, Math.PI / 2, 2)

    //Light
    let spotlight2 = new THREE.SpotLight(0xffffff, 2);
    spotlight2.position.set(0.27, -77.08, -65.43);
    spotlight2.target.position.set(0, 200, -15);
    scene.add(spotlight2);
    scene.add(spotlight2.target);

    //Animations
    setTimeout(function(){
        tl.to(objects[0].position, 3, {y: 50, ease: Linear.easeNone}).to(objects[0].position, 1, {y: 0, ease: Linear.easeNone}).to(objects[0].rotation, 1, {y: -Math.PI + 2, ease: Linear.easeNone}, "-=1").to({}, 1, {}).to(objects[0].position, 0.25, {z: 10, ease: Linear.easeNone}).to(objects[1].position, 0.5, {z: -15, ease: Expo.easeOut});
        tl.to(camera.position, 2, {x: 16.73, y: -10.72, z: -37.31, ease: Expo.easeOut});
    }, 100);
}

//Wood into tent
function scene_four(){
    //Plane
    var planeGeometry = new THREE.BoxGeometry(500, 500, 5);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffeaa3, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, -180, -2.5);

    scene.add(plane);

    //Ocean
    let oceanTexture = loader.load('./assets/water.png')
    oceanTexture.wrapS = THREE.RepeatWrapping;
    oceanTexture.wrapT = THREE.RepeatWrapping;
    oceanTexture.repeat.set(30, 30);

    var oceanGeometry = new THREE.BoxGeometry(5000, 5000, 5);
    var oceanMaterial = new THREE.MeshBasicMaterial({map: oceanTexture, color: 0x57a8e6});
    var ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.position.set(0, 2570, -2.5);

    scene.add(ocean);

    camera.position.set(0.27, -77.08, -65.43)
    camera.lookAt(plane.position);

    //Models
    terrainModel('log', 6, 0, -15, Math.PI, Math.PI, Math.PI / 2, 2)
    terrainModel('log', 3, 0, -15, Math.PI, Math.PI, Math.PI / 2, 2)
    terrainModel('log', 0, 0, -15, Math.PI, Math.PI, Math.PI / 2, 2)
    terrainModel('log', -3, 0, -15, Math.PI, Math.PI, Math.PI / 2, 2)
    terrainModel('log', -6, 0, -15, Math.PI, Math.PI, Math.PI / 2, 2)

    terrainModel('tent_detailedOpen', 0, 0, -75, undefined, -Math.PI, undefined, 3);

    //Light
    let spotlight2 = new THREE.SpotLight(0xffffff, 2);
    spotlight2.position.set(0.27, -77.08, -65.43);
    spotlight2.target.position.set(0, 200, -15);
    scene.add(spotlight2);
    scene.add(spotlight2.target);

    //Animations
    setTimeout(function(){
        let group = new THREE.Group();

        group.add(objects[0]);
        group.add(objects[1]);
        group.add(objects[2]);
        group.add(objects[3]);
        group.add(objects[4]);

        scene.add(group);

        tl.to(objects[0].rotation, 1, {x: Math.PI, y: -Math.PI / 4, ease: Expo.easeOut}).to(objects[0].position, 1, {y: -20, ease: Expo.easeOut}, '-=1');
        tl.to(objects[1].rotation, 1, {x: Math.PI, y: Math.PI / 4, ease: Expo.easeOut}).to(objects[1].position, 1, {x: -3, y: -20, ease: Expo.easeOut}, '-=1');
        tl.to(objects[2].position, 1, {x: 1, y: -12, z: -18, ease: Expo.easeOut});
        tl.to(camera.position, 1, {x: -12.27, y: -52.54, z: -52.56, ease: Expo.easeOut}, '-=1');
        tl.to(objects[3].rotation, 1, {x: Math.PI, y: -Math.PI / 4, ease: Expo.easeOut}).to(objects[3].position, 1, {x: 6, y: -8, ease: Expo.easeOut}, '-=1');
        tl.to(objects[4].rotation, 1, {x: Math.PI, y: Math.PI / 4, ease: Expo.easeOut}).to(objects[4].position, 1, {x: -3, y: -8, ease: Expo.easeOut}, '-=1');
        tl.to(camera.position, 1, {x: 0.27, y: -77.08, z: -65.43, ease: Expo.easeOut}, '-=1');

        tl.to(group.position, 0.5, {z: -75, ease: Expo.easeOut});
        tl.to(objects[5].position, 0.5, {z: -15, ease: Expo.easeOut})
        
    }, 1000);
}

//Palm trees spawning
function scene_five(){
    //Plane
    var planeGeometry = new THREE.BoxGeometry(5000, 5000, 5);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffeaa3, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, -180, -2.5);

    scene.add(plane);

    camera.position.set(-0.4, -204.7, -75.5);

    //Models
    terrainModel('tree_palmDetailedTall', 200, -20, -200, undefined, undefined, undefined, 8);
    terrainModel('tree_palmDetailedTall', 130, 5, -200, undefined, undefined, undefined, 8);
    terrainModel('tree_palmDetailedTall', 60, -30, -200, undefined, undefined, undefined, 8);
    terrainModel('tree_palmDetailedTall', -10, 20, -200, undefined, undefined, undefined, 8);
    terrainModel('tree_palmDetailedTall', -80, 15, -200, undefined, undefined, undefined, 8);
    terrainModel('tree_palmDetailedTall', -150, 30, -200, undefined, undefined, undefined, 8);
    terrainModel('tree_palmDetailedTall', -220, -10, -200, undefined, undefined, undefined, 8);

    terrainModel('tent_detailedOpen', -10, -70, -200, undefined, Math.PI, Math.PI / 2, 8);

    //Light
    let spotlight = new THREE.SpotLight(0xffffff, 2);
    spotlight.position.set(-0.4, -204, 100);
    spotlight.target.position.set(0, 0, 0);
    scene.add(spotlight);
    scene.add(spotlight.target);

    //Light
    let spotlight2 = new THREE.SpotLight(0xffffff, 2);
    spotlight2.position.set(0.27, -77.08, -65.43);
    spotlight2.target.position.set(200, 0, 0);
    scene.add(spotlight2);
    scene.add(spotlight2.target);

    //Animations
    setTimeout(function(){
        tl.to(objects[0].position, 0.5, {z: 0, ease: Expo.easeOut});
        tl.to(objects[1].position, 0.5, {z: 0, ease: Expo.easeOut});
        tl.to(objects[2].position, 0.5, {z: 0, ease: Expo.easeOut});
        tl.to(objects[3].position, 0.5, {z: 0, ease: Expo.easeOut});
        tl.to(objects[4].position, 0.5, {z: 0, ease: Expo.easeOut});
        tl.to(objects[5].position, 0.5, {z: 0, ease: Expo.easeOut});
        tl.to(objects[6].position, 0.5, {z: 0, ease: Expo.easeOut});
        tl.to(objects[7].position, 0.5, {z: 0, ease: Expo.easeOut});
    }, 1000);
};

//Boats overview
function scene_six(){
    //Camera
    camera.position.set(0, 100, 70)
    camera.rotation.set(0.76, -0.01, 0.01)

    //Light
    let spotlight2 = new THREE.SpotLight(0xffffff, 2);
    spotlight2.position.set(100, 100, 100);
    spotlight2.target.position.set(100, 130, 50);
    scene.add(spotlight2);
    scene.add(spotlight2.target)
    
    //Ocean
    let oceanTexture = loader.load('./assets/water.png')
    oceanTexture.wrapS = THREE.RepeatWrapping;
    oceanTexture.wrapT = THREE.RepeatWrapping;
    oceanTexture.repeat.set(30, 30);

    var oceanGeometry = new THREE.BoxGeometry(5000, 5000, 5);
    var oceanMaterial = new THREE.MeshBasicMaterial({map: oceanTexture, color: 0x57a8e6});
    var ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.position.set(0, 0, 0);

    scene.add(ocean);

    //Boats
    terrainModel('canoe', 40, 180, 0, deg(0), deg(0), Math.PI / 2, 4);
    terrainModel('classic', 80, 180, 0, deg(0), deg(0), Math.PI / 2, 1);
    terrainModel('simple', 120, 180, 0, deg(0), deg(0), Math.PI / 2, 1);
    terrainModel('professional', 160, 180, 0, deg(0), deg(0), Math.PI / 2, 0.6);
    terrainModel('deluxe', 200, 180, 0, deg(0), deg(0), Math.PI / 2, 0.65);
    setTimeout(function(){
        //Animations
        tl.to(camera.position, 5, {x: 200, ease: Expo.easeNone});
        
    }, 100)
};

scene_six();

//End

function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    // controls.update();
}

render()