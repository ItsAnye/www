let wscene = new THREE.Scene();
let wcamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
let wrenderer = new THREE.WebGLRenderer({antialias: true});

document.getElementById('weaponsScene').appendChild(wrenderer.domElement);
wrenderer.setSize(window.innerWidth, window.innerHeight);
wrenderer.setClearColor(0x87CEEB, 0);

wcamera.position.set(65, 3, 0);
wcamera.lookAt(0, 0, 0);

let lighting = new THREE.AmbientLight(0xffffff, 1);
wscene.add(lighting);

function wrender(){
    wrenderer.render(wscene, wcamera);
    requestAnimationFrame(wrender);
}

wrender();

let weapons = {
    'primary': 'M9',
    'secondary': undefined,
    'melee': undefined,
    'explosives': undefined,
}

let ammo = {
    'primary': [9, 45],
    'secondary': undefined,
    'explosives': 0
}

let currWeapon;

function loadWeapon(name, slot){
    weapons[slot] = name;
    loader.load(`Assets/Weapons/${name}.glb`, function(glb){
        glb.scene.traverse(child => {
            if (child.material) child.material.metalness = 0;
        });
    
        if(name == 'M9'){
            glb.scene.scale.set(3, 3, 3);
        } else {
            glb.scene.scale.set(0.04, 0.04, 0.04);
        }
        
        glb.scene.position.set(63, 2, -2);
        if(name == 'M9'){
            glb.scene.rotation.set(Math.PI, deg(250), Math.PI);
        }

        if(currWeapon != undefined){
            wscene.remove(currWeapon);
        }

        currWeapon = glb.scene;
        wscene.add(currWeapon);
    });
}

//Default UI
let primary = document.getElementById('primary');
let secondary = document.getElementById('secondary');
let melee = document.getElementById('melee');
let explosives = document.getElementById('explosives');
let choices = [primary, secondary, melee, explosives];

function selectUI(slot){
    //Deselect other slots
    for(let i = 0; i < choices.length; i++){
        choices[i].style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    //Selected slot
    let name = weapons[slot.id].charAt(0).toUpperCase() + weapons[slot.id].slice(1);
    slot.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    slot.children[0].style.marginTop = '3px';
    slot.children[1].innerHTML = `<p>${name}</p>`;
    slot.children[1].style.marginTop = '-15px';
    slot.children[2].innerHTML = `<img src='./Assets/Weapons/Previews/${name.toLowerCase()}.png' />`;

    if(slot.id == 'primary' || slot.id == 'secondary'){
        document.getElementById('ammoRefills').style.display = 'block';
        document.getElementById('ammoLoadedVal').innerHTML = ammo[slot.id][0];
        document.getElementById('ammoRefillsVal').innerHTML = ammo[slot.id][1];
    } else if(slot.id == 'melee'){
        document.getElementById('ammoRefills').style.display = 'none';
        document.getElementById('ammoLoadedVal').innerHTML = '∞';
    }
}

loadWeapon('knife', 'melee');
selectUI(primary);
selectUI(melee);