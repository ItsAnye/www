let currBoat = 'none';
let backpack = 'simple';
let currFishingRod = 'simple';

let shopMenuDiv = document.getElementById("shop-menu");
let mapMenuDiv = document.getElementById("map-menu");

let level = 1;
let xp = 0;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
let renderer = new THREE.WebGLRenderer();
    
function toggleShop(){
    if(shopMenuDiv.style.display == "" || shopMenuDiv.style.display == 'none'){
        shopMenuDiv.style.display = "block";
    } else {
        shopMenuDiv.style.display = "none";
    }
}

function toggleMap(){
    if(mapMenuDiv.style.display == "" || mapMenuDiv.style.display == 'none'){
        mapMenuDiv.style.display = "block";
    } else {
        mapMenuDiv.style.display = "none";
    }
}

function shopTab(evt, name, elem) {
    for(let i = 0; i <  document.getElementsByClassName("tabcontent").length; i++) {
        document.getElementsByClassName("tabcontent")[i].style.display = "none";
    }

    for(let i = 0; i < document.getElementsByClassName("tablinks").length; i++) {
        document.getElementsByClassName("tablinks")[i].className = document.getElementsByClassName("tablinks")[i].className.replace(" active", "");
        document.getElementsByClassName("tablinks")[i].style.backgroundColor = '#fdff85';
    }

    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
    elem.style.backgroundColor = '#feffd6'
}

function deg(degrees){
    let pi = Math.PI;
    return degrees * (pi/180);
}

let mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "Models/" );

function terrainModel(model, x, y, z, roty=Math.PI, scale=1, boat=false){
    mtlLoader.load( `${model}.mtl`, function( materials ){
        materials.preload();

        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( "Models/" );
        objLoader.load( `${model}.obj`, function( object ){
            object.scale.set( scale*10, scale*10, scale*10 ); 
            object.position.set( x, y, z ); 
            object.rotation.set(deg(270), roty, Math.PI); 
            scene.add( object );
            if(boat){
                currBoat = object;
            }
        });
    });
}

function start(){
    //Background Music
    let backgroundMusic = new Audio('theme.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play();

    //Username
    let username = 'Player';
    document.getElementById("home").style.display = "none";
    document.getElementById("chat").style.display = "block";
    document.getElementById("fishing_warning").style.display = "block";
    document.getElementById("inventory").style.display = "block";

    //Chat code
    cash = 0;
    let socket = io();

    let messages = document.getElementById('messages');
    let form = document.getElementById('chatForm');
    let input = document.getElementById('chatInput');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', [username, input.value]);
            input.value = '';
        }
    });

    socket.on('chat message', function(msg) { 
        let item = document.createElement('li'); 
        item.textContent = `[${msg[0]}]: ${msg[1]}`;
        messages.appendChild(item);
    });

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
    const KEY_SPACE = ' ';

    let playerSettings = {
        turnSpeed: Math.PI * 0.01,
        speed: 0.2,
        sprintSpeed: 0.4
    }

    camera.position.set(-14.2, 12.35, 6.53);
    camera.up.set(0, 0, 1);

    //Player
    let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    let player = new THREE.Mesh(cubeGeometry, cubeMaterial);

    player.position.z = 1;
    scene.add(player);

    //Player BOUNDING BOX
    let playerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    playerBB.setFromObject(player);

    //Shop Trigger Box
    let shopTrigger = new createBox(500, 120, 6, 0x0000ff);
    shopTrigger.position.set(0, 20, 3);

    //Shop BOUNDING BOX
    let shopBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    shopBB.setFromObject(shopTrigger);

    //Ocean Trigger Box
    let oceanTrigger = new createBox(500, 500, 6, 0x0000ff);
    oceanTrigger.position.set(0, -312, 3);

    //Ocean BOUNDING BOX
    let oceanBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    oceanBB.setFromObject(oceanTrigger);

    //Sell Trigger Box
    let sellTrigger = new createBox(7, 7, 6, 0x0000ff);
    sellTrigger.position.set(9, 15, 3);

    //Sell BOUNDING BOX
    let sellBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    sellBB.setFromObject(sellTrigger);

    let ambient = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambient);

    //Controls
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    //Plane
    let planeGeometry = new THREE.BoxGeometry(500, 120, 5);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffeaa3});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.position.set(0, 20, -2.5);
    scene.add(plane);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x87CEEB);

    //Object functions
    function createBox(x, y, z, color) {
        let geo = new THREE.BoxGeometry(x, y, z);
        let mat = new THREE.MeshLambertMaterial({color: color});
        let mesh = new THREE.Mesh(geo, mat);

        return mesh;
    }

    document.getElementById("money").style.display = "block";
    document.getElementById("shop-container").style.display = "block";

    function formatCash(money) {
        if(money >= 1000000000000000){
            let moneyStr = `${Math.round((money / 1000000000000000) * 10) / 10}q`
            return moneyStr;
        } else if(money >= 1000000000000){
            let moneyStr = `${Math.round((money / 1000000000000) * 10) / 10}t`
            return moneyStr;
        } else if(money >= 1000000000){
            let moneyStr = `${Math.round((money / 1000000000) * 10) / 10}b`
            return moneyStr;
        } else if(money >= 1000000){
            let moneyStr = `${Math.round((money / 1000000) * 10) / 10}m`
            return moneyStr;
        } else {
            return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    let backpackItems = [];
        
    //Rod Chances
    let fishingRodChances = {
        'simple': {
            'basic_fish': 60,
            'common_fish': 20,
            'purple_fish': 10,
            'rainbow_fish': 5,
            'golden_fish': 3,
            'luxury_fish': 2,
        },
        'basic': {
            'basic_fish': 50,
            'common_fish': 10,
            'purple_fish': 15,
            'golden_fish': 20,
            'rainbow_fish': 2,
            'luxury_fish': 3,
        },
        'classic': {
            'basic_fish': 10,                
            'common_fish': 20,
            'purple_fish': 20,
            'golden_fish': 20,
            'rainbow_fish': 20,
            'luxury_fish': 10,
        },
        'captains': {
            'basic_fish': 3,
            'common_fish': 30,
            'purple_fish': 15,
            'golden_fish': 20,
            'rainbow_fish': 17,
            'luxury_fish': 15,
        },
    }

    let fishPrices = {
        'basic': 15,
        'common': 30,
        'purple': 60,
        'golden': 84,
        'rainbow': 100,
        'luxury': 250
    }

    let backpackSpace = {
        'simple': 5,
        'medium': 10,
        'large': 20,
        'captians': 50,
        'supreme': 100,
    }

    function updateControls(){
        //Movement Controls      
        if(controls.enabled){
            controls.target.copy(player.position);

            if(keysPressed[KEY_SHIFT]){
                //Left and Right Rotation
                if(keysPressed[KEY_LEFT]){
                    player.rotation.z += playerSettings.turnSpeed;
                }
        
                if(keysPressed[KEY_RIGHT]){
                    player.rotation.z -= playerSettings.turnSpeed;
                }  
                
                //W and S Movement
                if(keysPressed[KEY_W] || keysPressed[KEY_UP]){
                    player.position.x -= Math.sin(player.rotation.z) * playerSettings.sprintSpeed;
                    player.position.y -= -Math.cos(player.rotation.z) * playerSettings.sprintSpeed;
        
                    camera.position.x -= Math.sin(player.rotation.z) * playerSettings.sprintSpeed;
                    camera.position.y -= -Math.cos(player.rotation.z) * playerSettings.sprintSpeed;
                }
        
                if(keysPressed[KEY_S] || keysPressed[KEY_DOWN]){
                    player.position.x += Math.sin(player.rotation.z) * playerSettings.sprintSpeed;
                    player.position.y += -Math.cos(player.rotation.z) * playerSettings.sprintSpeed;
        
                    camera.position.x += Math.sin(player.rotation.z) * playerSettings.sprintSpeed;
                    camera.position.y += -Math.cos(player.rotation.z) * playerSettings.sprintSpeed;
                }
            } else {
                //Left and Right Rotation
                if(keysPressed[KEY_LEFT]){
                    player.rotation.z += playerSettings.turnSpeed;
                }
        
                if(keysPressed[KEY_RIGHT]){
                    player.rotation.z -= playerSettings.turnSpeed;
                }
                
                //W and S Movement
                if(keysPressed[KEY_W] || keysPressed[KEY_UP]){
                    player.position.x -= Math.sin(player.rotation.z) * playerSettings.speed;
                    player.position.y -= -Math.cos(player.rotation.z) * playerSettings.speed;
        
                    camera.position.x -= Math.sin(player.rotation.z) * playerSettings.speed;
                    camera.position.y -= -Math.cos(player.rotation.z) * playerSettings.speed;
                }
        
                if(keysPressed[KEY_S] || keysPressed[KEY_DOWN]){
                    player.position.x += Math.sin(player.rotation.z) * playerSettings.speed;
                    player.position.y += -Math.cos(player.rotation.z) * playerSettings.speed;
        
                    camera.position.x += Math.sin(player.rotation.z) * playerSettings.speed;
                    camera.position.y += -Math.cos(player.rotation.z) * playerSettings.speed;
                }
            }
        }

        document.getElementById("userMoney").innerHTML = formatCash(cash);
    }

    function render() {
        updateControls();
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        //Collisions
        playerBB.copy(player.geometry.boundingBox).applyMatrix4(player.matrixWorld);
        checkCollisions();

        document.getElementById('usedInv').innerHTML = backpackItems.length
        document.getElementById('totalInv').innerHTML = backpackSpace[backpack];

        //Level
        document.getElementById('levelTXT').innerHTML = level;
        document.getElementById('level_prog_bar').style.width = `${xp}%`;
    };

    function rndm(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
        
    function checkCollisions(){
        if(playerBB.intersectsBox(shopBB)){
            //Stop them from fishing on sand (warning)
            document.getElementById("fishing_warning").style.display = "block";
            document.getElementById("fishing_button").style.display = "none";
            document.getElementById("shop-container").style.display = "block";
            player.position.z = 1
        } else {
            document.getElementById("fishing_warning").style.display = "none";
            document.getElementById("fishing_button").style.display = "block";
            document.getElementById("shop-container").style.display = "none";
            player.position.z = 2;        
        }

        if(playerBB.intersectsBox(oceanBB)){
            if(currBoat == 'none'){
                player.position.set(0, 0, 1)
                camera.position.set(-14.199055273781712, 12.353887215027605, 6.530574471481823);
            } else {
                currBoat.position.set(player.position.x, player.position.y, player.position.z - 2)
            }
        }

        if(playerBB.intersectsBox(sellBB)){
            document.getElementById('sell-menu').style.display = "block";
            document.getElementById('sell_btn').style.display = "block";
        } else {
            document.getElementById('sell-menu').style.display = "none";
            document.getElementById('sell_btn').style.display = "none";
        }
    }      
    render();

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key.toLowerCase()] = true;
    }, false);

    document.addEventListener('keyup', (event) => {
        keysPressed[event.key.toLowerCase()] = false;
    }, false);

    //Start

    function sellItem(name, price) {
        document.getElementById('sell-menu').innerHTML += `<div class='shopItem'><div style="display: inline; margin-left: 20px;">${name}</div><span style="color: green;">&nbsp&nbsp&nbsp&nbsp$${price}<span></div>`
    }

    //Palm Trees - Front Row
    terrainModel('tree_palmDetailedTall', -211, 30, 0);
    terrainModel('tree_palmDetailedTall', -171, 30, 0);
    terrainModel('tree_palmDetailedTall', -131, 30, 0);
    terrainModel('tree_palmDetailedTall', -91, 30, 0);
    terrainModel('tree_palmDetailedTall', -51, 30, 0);
    terrainModel('tree_palmDetailedTall', -11, 30, 0);
    terrainModel('tree_palmDetailedTall', 29, 30, 0);
    terrainModel('tree_palmDetailedTall', 69, 30, 0);
    terrainModel('tree_palmDetailedTall', 109, 30, 0);
    terrainModel('tree_palmDetailedTall', 149, 30, 0);
    terrainModel('tree_palmDetailedTall', 189, 30, 0);
    terrainModel('tree_palmDetailedTall', 229, 30, 0);
    terrainModel('tree_palmDetailedTall', 220, 30, 0);

    //Palm Trees - Back Row
    terrainModel('tree_palmDetailedTall', -191, 50, 0);
    terrainModel('tree_palmDetailedTall', -151, 50, 0);
    terrainModel('tree_palmDetailedTall', -111, 50, 0);
    terrainModel('tree_palmDetailedTall', -71, 50, 0);
    terrainModel('tree_palmDetailedTall', -31, 50, 0);
    terrainModel('tree_palmDetailedTall', 9, 50, 0);
    terrainModel('tree_palmDetailedTall', 49, 50, 0);
    terrainModel('tree_palmDetailedTall', 89, 50, 0);
    terrainModel('tree_palmDetailedTall', 129, 50, 0);
    terrainModel('tree_palmDetailedTall', 169, 50, 0);
    terrainModel('tree_palmDetailedTall', 209, 50, 0);


    //Random things to make the beach look nice
    terrainModel('platform_beach', 50, 15, 0)
    terrainModel('cactus_tall', 50, 15, 0)
    terrainModel('platform_beach', -70, -10, 0)
    terrainModel('cactus_tall', -70, -10, 0)

    terrainModel('path_wood', -160, -51, 0, deg(90), 2)
    terrainModel('path_wood', 0, -51, 0, deg(90), 2)
    terrainModel('path_wood', 160, -51, 0, deg(90), 2)

    //Ocean Props
    //terrainModel('water/watercraftPack_026', 0, -250, 0, undefined, 0.3)//Simple Boat
    //terrainModel('water/watercraftPack_022', 0, -75, 0, undefined, 0.4)//Classical Boat
    //terrainModel('water/watercraftPack_001', 0, -95, 0, undefined, 0.3)//Cargo Boat
    //terrainModel('canoe', -8, -51, 0)//Starter boat
    //terrainModel('water/watercraftPack_004', -8, -51, 0, undefined, 0.4)//Pirate Ship

    //Tent
    terrainModel('tent_detailedOpen', 9, 15, 0)

    //Shop
    shopItem('Boats', 'Canoe', 'The Canoe has very low speed, and cannot go very far out into the waters.', 100);
    shopItem('Boats', 'Classic Boat', 'The Classic Boat has a medium speed, now with a motor.', 500);
    shopItem('Boats', 'Simple Boat', 'The Simple Boat has a high speed, with 2 seats.', 1000);
    shopItem('Boats', 'Cargo Ship', 'The Cargo Ship has 6 seats, and unlocks delivery.', 3000);
    shopItem('Boats', 'Pirate Ship', 'The Pirate Ship has 10 seats, and unlocks attacking.', 10000);
    shopItem('Rods', 'Basic Fishing Rod', 'A higher chance of catching basic and common fish.', 500);
    shopItem('Rods', 'Classic Fishing Rod', 'A higher chance of catching purple and golden fish.', 1000);
    shopItem('Rods', 'Captain\'s Fishing Rod', 'A higher chance of catching golden and luxury fish.', 3000);
    shopItem('Backpacks', 'Medium Backpack', 'Capacity: 10 fish', 2000)
    shopItem('Backpacks', 'Large Backpack', 'Capacity: 20 fish', 5000)
    shopItem('Backpacks', 'Captians Backpack', 'Capacity: 50 fish', 7000)
    shopItem('Backpacks', 'Supreme Backpack', 'Capacity: 100 fish', 10000)

    let currentFishes = [];

    function shopItem(tab, name, desc, price, img=false){
        if(img == false){
            document.getElementById(tab).innerHTML += `
            <div class='shopItem' id="${name.toLowerCase().replace(' ', '_')}">
                <div class="img">
                    <i class="fa-solid fa-camera"></i>
                </div>

                <div class="shopTitle"><span class="space">&nbsp;&nbsp;</span>${name}</div>
                <div class="shopDesc">
                    <span class="space">&nbsp;&nbsp;</span><span style="color: green; font-size: 30px; line-height: 110%;">$${price}</span>
                    <br><br><br>
                    <span class="space">&nbsp;&nbsp;</span>${desc}
                </div>
            </div>
        `
        }
    }

    //Fishing
    document.getElementById('fishing_button').addEventListener("click", function() {
        document.getElementById('fishing_button').style.visibility = "hidden";
        setTimeout(function () {
            //Filling array with probability
            setTimeout(function (){
                for(let a = 0; a < fishingRodChances[currFishingRod]['basic_fish']; a++){
                    currentFishes.push('basic')
                }
                
                for(let b = 0; b < fishingRodChances[currFishingRod]['common_fish']; b++){
                    currentFishes.push('common')
                }
                
                for(let c = 0; c < fishingRodChances[currFishingRod]['purple_fish']; c++){
                    currentFishes.push('purple')
                }
                
                for(let d = 0; d < fishingRodChances[currFishingRod]['rainbow_fish']; d++){
                    currentFishes.push('rainbow')
                }
                
                for(let e = 0; e < fishingRodChances[currFishingRod]['golden_fish']; e++){
                    currentFishes.push('golden')
                }
                
                for(let f = 0; f < fishingRodChances[currFishingRod]['luxury_fish']; f++){
                    currentFishes.push('luxury')
                }

                if(backpackItems.length >= backpackSpace[backpack]){
                    document.getElementById('fishing_button').style.visibility = "visible";
                    player.position.set(0, 0, 1);
                    camera.position.set(-14.2, 12.35, 6.53);
                } else {
                    backpackItems.push(currentFishes[rndm(0, 99)]);
                    document.getElementById('fishing_button').style.visibility = "visible";
                    document.getElementById('sell-menu').innerHTML = '';

                    for(let x = 0; x < backpackItems.length; x++){
                        sellItem(backpackItems[x], fishPrices[backpackItems[x]])
                    }
                }

                currentFishes = [];
            }, 1000)
        }, rndm(1000, 10000))
    });

    document.getElementById('sell_btn').addEventListener('mousedown', function() {
        for(let sell = 0; sell < document.getElementById('sell-menu').children.length; sell++){
            cash += fishPrices[document.getElementById('sell-menu').children[sell].children[0].innerHTML];
        }

        document.getElementById('sell-menu').innerHTML = '';
        backpackItems = [];
    })
}

let elem;
setTimeout(function(){
    let slides = document.getElementsByClassName("shopItem");
    let thisName;
    for (let i = 0; i < slides.length; i++) {
        slides[i].onclick = function(e) {
            if(e.target.nodeName != 'DIV'){
                if(e.target.parentNode.nodeName == 'P'){
                    thisName = e.target.parentNode.parentNode.children[0];
                } else {
                    thisName = e.target.parentNode.children[0];
                }
            } else {
                if(e.target.classList == "shopItem"){
                    thisName = e.target.children[0];
                } else {
                    thisName = e.target;
                }
            }

            if(thisName.innerHTML == 'Basic Fishing Rod' && cash >= 500){
                currFishingRod = 'basic';
                cash = cash - 500;
                elem = document.getElementById('basic_fishing_rod')
                elem.remove()
            } else if(thisName.innerHTML == 'Classic Fishing Rod' && cash >= 1000){
                currFishingRod = 'classic';
                cash = cash - 1000;
                elem = document.getElementById('classic_fishing_rod')
                elem.remove()
            } else if(thisName.innerHTML == "Captains Fishing Rod" && cash >= 3000){
                currFishingRod = 'captains';
                cash = cash - 3000;
                elem = document.getElementById('captains_fishing_rod')
                elem.remove()
            } else if(thisName.innerHTML == "Medium Backpack" && cash >= 500){
                backpack = 'medium';
                cash = cash - 500;
                elem = document.getElementById('medium_backpack')
                elem.remove()
            } else if(thisName.innerHTML == "Large Backpack" && cash >= 50000){
                backpack = 'large';
                cash = cash - 50000;
                elem = document.getElementById('large_backpack')
                elem.remove()
            } else if(thisName.innerHTML == "Captains Backpack" && cash >= 70000){
                backpack = 'captains';
                cash = cash - 700000;
                elem = document.getElementById('captains_backpack')
                elem.remove();
            } else if(thisName.innerHTML == "Supreme Backpack" && cash >= 100000){
                    backpack = 'supreme';
                    cash = cash - 100000;
                    elem = document.getElementById('supreme_backpack')
                    elem.remove();
            } else if(thisName.innerHTML == "Canoe" && cash >= 100){
                    cash = cash - 100;
                    terrainModel('canoe', -8, -51, 0, undefined, 1, true);
            }
        };
    }
}, 2000);

terrainModel('canoe', -8, -51, 0, undefined, 1, true)

let minigameMenuDiv = document.getElementById('games_container');
function toggleMinigames() {
    if(minigameMenuDiv.style.display == "" || minigameMenuDiv.style.display == 'none'){
        minigameMenuDiv.style.display = "block";
        document.getElementById('openBTN').style.right = '300px';
        document.getElementById('btn_txt').style.marginTop = '25px';
        document.getElementById('btn_txt').innerHTML = 'C<br>L<br>O<br>S<br>E';
    } else {
        minigameMenuDiv.style.display = "none";
        document.getElementById('openBTN').style.right = '0';
        document.getElementById('btn_txt').style.marginTop = '35px';
        document.getElementById('btn_txt').innerHTML = 'O<br>P<br>E<br>N';
    }
}

let waterGeo = new THREE.BoxGeometry(500, 500, 5);
let tLoader = new THREE.TextureLoader();
let flowmap = tLoader.load('textures/flowmap.png')

let water = new THREE.Water(waterGeo, {
    scale: 1,
    flowSpeed: 0.05,
    reflectivity: 0.1,
    flowMap: flowmap,
    color: 0x57a8e6
})

water.position.set(0, -290, -2.5);
water.rotation.z = Math.PI;
scene.add(water);

let quests = {
    'one': {
        'Catch ten fish': 15,
        'Buy a boat': 10,
        'Upgrade your fishing rod': 10,
    },
    'two': {
       'Get 1000 coins': 20,
    }
}