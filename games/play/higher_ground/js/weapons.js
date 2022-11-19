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
    'pa': undefined,
    'sa': undefined,
}

let ammo = { 
    'p': 100,
    'y': 100,
    'r': 100,
    'g': 100
}
//                       0        1       2           3            4          5         6            7
let weaponsData = { //Capacity, Reload, AmmoType, Firing Mode, Firing Delay, Damage, Recoil Time, Burst Delay
    'primary': {
        'Scout': [5, 1.8, 'p', 'single', 1, 56, 2, 0], //Scout Elite
        'Reaper': [2, 3, 'p', 'single', 0.2, 57, 0, 0], //MP220
        'Flamer': [100, 4, 'r', 'auto', 0.02, 2, 0, 0], //Flamethrower
        'Central': [1, 3, 'r', 'single', 0, 99, 0, 0], 
        'Sniper': [5, 3, 'y', 'single', 1.75, 72, 3, 0], //Mosin-Nagant
        'RPG': [1, 2, 'y', 'single', 0, 70, 0, 0],
        'Crusher': [20, 2.3, 'y', 'auto', 0.16, 11, 0, 0], //MP5
        'Apollo': [8, 2.7, 'y', 'single', 0.2, 20, 0, 0], //Carbine
        'Rockets': [3, 1.5, 'g', 'single', 0.3, 30, 0, 0], //Avenger 
        'Shotty': [2, 2.7, 'g', 'single', 0.2, 40, 0, 0], //MP220
        'Calamity': [10, 4, 'g', 'burst', .35, 17, 0, 0.07], //FAMAS
        'Brutality': [2, 3, 'g', 'single', 1, 80, 0, 0]
    },
    
    'secondary': {
        'DEagle': [7, 2.3, 'p', 'single', 0.16, 35, 0, 0], //DEagle50
        'Loner': [30, 2, 'p', 'burst', 0.35, 15, 0, 0.07], //UMP9
        'Grinder': [20, 1.8, 'p', 'auto', 0.1, 3, 0, 0],
        'Pistol': [15, 1.5, 'r', 'single', 0.12, 12, 0, 0], //M9
        'Uzi': [32, 1.8, 'r', 'auto', 0.045, 9.25, 0, 0], //MAC-10
        'Mercury': [13, 3, 'y', 'auto', 0.06, 15, 0, 0]
    },
}

let currWeapon;
let selectedSlot;

function loadWeapon(name, slot){
    weapons[slot] = name;
    if(slot == 'primary' || slot == 'secondary'){
        // weapons[slot.charAt(0) + 'a'] = weaponsData[slot][weapons[slot]][0];
    }

    loader.load(`Assets/Weapons/${name}.glb`, function(glb){
        glb.scene.traverse(child => {
            if (child.material) child.material.metalness = 0;
        });
    
        if(name == 'Knife'){
            glb.scene.scale.set(0.04, 0.04, 0.04);
        } else {
            if(name == 'Central'){
                glb.scene.scale.set(6, 6, 6);
            } else {
                glb.scene.scale.set(3, 3, 3);
            }
        }
        
        glb.scene.position.set(63, 2, -2);
        if(name != 'Knife'){
            if(name == 'DEagle'){
                glb.scene.rotation.set(Math.PI, deg(70), Math.PI);
            } else {
                glb.scene.rotation.set(Math.PI, deg(250), Math.PI);
            }
            
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
    selectedSlot = slot;
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

    updateAmmunition(slot.id)
}

function updateAmmunition(slots){
    if(slots == 'primary' || slots == 'secondary'){
        console.log(weapons[slots.charAt(0) + 'a']);
        document.getElementById('ammoRefills').style.display = 'block';
        document.getElementById('ammoLoadedVal').innerHTML = weapons[slots.charAt(0) + 'a'];
        document.getElementById('ammoRefillsVal').innerHTML = ammo[weaponsData[slots][weapons[slots]][2]];
    } else if(slots == 'melee'){
        document.getElementById('ammoRefills').style.display = 'none';
        document.getElementById('ammoLoadedVal').innerHTML = '∞';
    }
}

function getRandomProperty(obj) {
    return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
}

let prim = getRandomProperty(weaponsData['primary']);
loadWeapon(prim, 'primary');
weapons['pa'] = weaponsData['primary'][prim][0];
selectUI(primary);

let sec = getRandomProperty(weaponsData['secondary']);
loadWeapon(sec, 'secondary');
weapons['sa'] = weaponsData['secondary'][sec][0];
selectUI(secondary);

loadWeapon('Knife', 'melee');
selectUI(melee);

//User firing
let fireData;
// let mouseDown = 0; //0 = mouseup, 1 = mousedown
document.addEventListener('mousedown', function(){
    // mouseDown++;
    if(weapons[selectedSlot.id] in weaponsData['primary']){
        fireData = weaponsData['primary'][weapons[selectedSlot.id]];
    } else if(weapons[selectedSlot.id] in weaponsData['secondary']){
        fireData = weaponsData['secondary'][weapons[selectedSlot.id]];
    }

    if(fireData != undefined){
        if(fireData[3] == 'single'){
            if(weapons[selectedSlot.id.charAt(0) + 'a'] > 0){
                weapons[selectedSlot.id.charAt(0) + 'a'] -= 1;
                updateAmmunition(selectedSlot.id);
            } else {
                //Reload
            }
        }
    }
});