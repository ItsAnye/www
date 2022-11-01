const keysPressed = {};

const KEY_UP = 'arrowup';
const KEY_LEFT = 'arrowleft';
const KEY_DOWN = 'arrowdown';
const KEY_RIGHT = 'arrowright';
const KEY_W = 'w';
const KEY_A = 'a';
const KEY_S = 's';
const KEY_D = 'd';
const KEY_SHIFT = 'shift';

let playerSettings = {
    walk: 0.2,
    sprint: 0.4,
    walkSFX: 1.5,
    sprintSFX: 2,
    sprintValue: 100,
    canSprint: true,
    sprintLoss: 1,
    sprintAdd: 0.25
}

let safePos = {
    x: undefined,
    y: undefined,
    z: undefined
}

let walkSound = new Audio("Assets/Audio/walk.mp3");
walkSound.loop = true;

let controls;

let blocker = document.getElementById('blocker');
let instructions = document.getElementById('instructions');
let crosshair = document.getElementById('crosshair');

controls = new THREE.PointerLockControls(camera, document.getElementById('scene'));

controls.addEventListener('lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
    crosshair.style.display = 'block';
}, false);

controls.addEventListener('unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
    crosshair.style.display = 'none';
    walkSound.pause();
}, false);

instructions.addEventListener('click', function () {
    controls.lock();
}, false);

function updateControls(){
    if(controls != undefined){
        if(controls.isLocked){
            if(keysPressed[KEY_SHIFT] && playerSettings['sprintValue'] > 0 && playerSettings['canSprint']){
                if(keysPressed[KEY_W] || keysPressed[KEY_UP]){
                    controls.moveForward(playerSettings['sprint']);
                    walkSound.playbackRate = playerSettings['sprintSFX'];
                }
        
                if(keysPressed[KEY_S] || keysPressed[KEY_DOWN]){
                    controls.moveForward(-playerSettings['sprint']);
                    walkSound.playbackRate = playerSettings['sprintSFX'];
                }
        
                if(keysPressed[KEY_D] || keysPressed[KEY_RIGHT]){
                    controls.moveRight(playerSettings['sprint']);
                    walkSound.playbackRate = playerSettings['sprintSFX'];
                }
        
                if(keysPressed[KEY_A] || keysPressed[KEY_LEFT]){
                    controls.moveRight(-playerSettings['sprint']);
                    walkSound.playbackRate = playerSettings['sprintSFX'];
                }
    
                //Less stamina
                playerSettings['sprintValue'] = playerSettings['sprintValue'] - playerSettings['sprintLoss'];
                document.getElementById('stamina').style.backgroundColor = 'orange';
            } else {
                if(keysPressed[KEY_W] || keysPressed[KEY_UP]){
                    controls.moveForward(playerSettings['walk']);
                    walkSound.playbackRate = playerSettings['walkSFX'];
                }
        
                if(keysPressed[KEY_S] || keysPressed[KEY_DOWN]){
                    controls.moveForward(-playerSettings['walk']);
                    walkSound.playbackRate = playerSettings['walkSFX'];
                }
        
                if(keysPressed[KEY_D] || keysPressed[KEY_RIGHT]){
                    controls.moveRight(playerSettings['walk']);
                    walkSound.playbackRate = playerSettings['walkSFX'];
                }
        
                if(keysPressed[KEY_A] || keysPressed[KEY_LEFT]){
                    controls.moveRight(-playerSettings['walk']);
                    walkSound.playbackRate = playerSettings['walkSFX'];
                }
    
                //More stamina
                if(playerSettings['sprintValue'] < 100){
                    playerSettings['sprintValue'] = playerSettings['sprintValue'] + playerSettings['sprintAdd'];  
                    playerSettings['canSprint'] = false; 
                    document.getElementById('stamina').style.backgroundColor = 'orange';
                } else {
                    playerSettings['canSprint'] = true;
                    document.getElementById('stamina').style.backgroundColor = 'lightgreen';
                }
            }
            
            document.getElementById('stamina').style.width = playerSettings['sprintValue'] + 'px';
        } 
    }  
}

document.addEventListener('keydown', (event) => {
    keysPressed[event.key.toLowerCase()] = true;

    if(event.key.toLowerCase() == 'w' || event.key.toLowerCase() == 'a' || event.key.toLowerCase() == 's' || event.key.toLowerCase() == 'd'){
        walkSound.play();
    }

    //Switching
    if(event.key == '1' && weapons['primary'] != undefined){
        selectUI(primary);
        loadWeapon(weapons['primary'], 'primary');
    } else if(event.key == '2' && weapons['secondary'] != undefined){
        selectUI(secondary);
    } else if(event.key == '3' && weapons['melee'] != undefined){
        selectUI(melee);
        loadWeapon(weapons['melee'], 'melee');
    } else if(event.key == '4' && weapons['explosives'] != undefined){
        selectUI(explosives);
    }
}, false);

document.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false;

    if(event.key.toLowerCase() == 'w' || event.key.toLowerCase() == 'a' || event.key.toLowerCase() == 's' || event.key.toLowerCase() == 'd'){
        walkSound.pause();
    }
}, false);