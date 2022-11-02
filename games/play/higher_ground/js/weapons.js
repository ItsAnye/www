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
    'primary': undefined,
    'secondary': undefined,
    'melee': undefined,
    'explosives': undefined,
}

let ammo = { 
    'primary': [9, 45],
    'secondary': [10, 90],
    'explosives': 0
}

let weaponsData = { //Capacity, Reload, AmmoType
    'primary': {
        'Scout': [5, 1.8, 'p'],
        'Reaper': [2, 3, 'p'],
        'Flamer': [100, 4, 'r'],
        'Central': [3, 3, 'r'],
        'Sniper': [5, 3, 'y'],
        'RPG': [1, 2, 'y'],
        'Crusher': [20, 2.3, 'y'],
        'Apollo': [8, 2.7, 'y'],
        'Rockets': [4, 1.5, 'g'],
        'Shotty': [2, 2.7, 'g'],
        'Calamity': [10, 4, 'g'],
        'Brutality': [2, 3, 'g']
    },
    
    'secondary': {
        'DEagle': [7, 2.3, 'p'],
        'Loner': [30, 2, 'p'],
        'Grinder': [20, 1.8, 'p'],
        'Pistol': [15, 1.5, 'r'],
        'Uzi': [32, 1.8, 'r'],
        'Mercury': [13, 3, 'y'],
    },
}

let currWeapon;

function loadWeapon(name, slot){
    weapons[slot] = name;
    loader.load(`Assets/Weapons/${name}.glb`, function(glb){
        glb.scene.traverse(child => {
            if (child.material) child.material.metalness = 0;
        });
    
        if(name == 'Knife'){
            glb.scene.scale.set(0.04, 0.04, 0.04);
        } else {
            glb.scene.scale.set(3, 3, 3);
        }
        
        glb.scene.position.set(63, 2, -2);
        if(name != 'Knife'){
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
        choices[i].style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
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



function getRandomProperty(obj) {
    return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
}

loadWeapon(getRandomProperty(weaponsData['primary']), 'primary');
selectUI(primary);

loadWeapon(getRandomProperty(weaponsData['secondary']), 'secondary');
selectUI(secondary);

loadWeapon('Knife', 'melee');
selectUI(melee);