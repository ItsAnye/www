let wip_desc = "This experience is currently being built and is under construction. We apologize for any inconveniences.";
let wip_thumb = "MELTDOWN-wip";

function createCard(wrapper, name, desc='a new game', bg="ddd", creators=['Meltdown'], wip=false){
    let scroller = document.getElementById(`scrolling-${wrapper}`);
    let nameSize;
    let marginTop;
    if(name.length > 15){
        nameSize = 16;
        marginTop = -25;
    } else {
        nameSize = 24;
        marginTop = -35;
    }

    if(!wip){
        scroller.innerHTML += `<div class='card-wrap' onclick='window.location.href = "../games/index.html?name=${name}&desc=${encodeURI(desc)}&creators=${encodeURIComponent(JSON.stringify(creators))}&wip=${wip}"' title='${desc.split('\n')[0]}' onmouseover='this.children[0].style.cursor = "pointer"; this.children[0].style.backgroundColor = "#${bg}"; this.children[0].style.border = "5px solid transparent"; this.children[0].style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)"; this.children[0].style.borderImageSlice = "1";' onmouseleave='this.children[0].style.backgroundColor = "#ddd"; this.children[0].style.border = "3px solid black";'><div class='card'><img src="../images/thumbnails/${name.replace(" ", "_")}.png" class="undraggable" width="160px" height: 160px; style="border-radius: 30px;"></div><h2 class="unselectable" style=" margin-top: ${marginTop}px; text-align: center; margin-left: -20px; font-size: ${nameSize}px">${name}</h2></div>`;
    } else {
        scroller.innerHTML += `<div class='card-wrap' onclick='window.location.href = "../games/index.html?name=${name}&desc=${encodeURI(desc)}&creators=${encodeURIComponent(JSON.stringify(creators))}&wip=${wip}"' title='${desc.split('\n')[0]}' onmouseover='this.children[0].style.cursor = "pointer"; this.children[0].style.backgroundColor = "#${bg}"; this.children[0].style.border = "5px solid transparent"; this.children[0].style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)"; this.children[0].style.borderImageSlice = "1";' onmouseleave='this.children[0].style.backgroundColor = "#ddd"; this.children[0].style.border = "3px solid black";'><div class='card'><img src="../images/thumbnails/${wip_thumb}.png" class="undraggable" width="160px" height: 160px; style="border-radius: 30px;"></div><h2 class="unselectable" style=" margin-top: ${marginTop}px; text-align: center; margin-left: -20px; font-size: ${nameSize}px">${name}</h2></div>`;
    }
    
}

//New
createCard('new', 'Tetris', 'A 3D rebuild of the classic Tetris!\nThe aim in Tetris is simple; you bring down blocks from the top of the screen. You can move the blocks around and you can rotate them. Points are scored by making horizontal lines. \n\nControls:\n\n???: Rotate ???\n???: Rotate ???\n???: Move Left\n???: Move right\n[SPACE]: Drop down\n\nThe more lines you clear at once, the more points you get:\n\n1 line: 1 point\n2 lines: 4 points\n3 lines: 9 points\n4 lines: 16 points\n\nThanks for playing!', '87ceeb', ['Anye']);
createCard('new', "Fish Ahoy", 'fishing is fishy', 'e4d999', ['Westineye', 'Pixie', 'Anye'])
createCard('new', "Clicker Survival", 'A clicker game set in the modern world.\nYou can start by heading over to the corn field. Start clicking, because thats how you earn money at first!\n\nOnce you have enough money, you can leave the corn field and walk up to the tent. Purchasing items in the shop helps increase your cps (clicks per second). This allows you to gain money without even clicking. \n\n Made by JTC and Anye during Meltdown Summer Camp 2022. \n Have fun!', '477547', ['JTC', 'Anye'])

//Work in Progress
createCard('wip', "Higher Ground", wip_desc, 'ddd', ['Anye'], true);
createCard('wip', 'Mad World', wip_desc, 'ddd', ['Anye'], true);
createCard('wip', 'Pizza Legends', wip_desc, 'ddd', ['Anye'], true);
createCard('wip', 'Tower of Hell', wip_desc, 'ddd', ['Anye'], true);

//Official WIP
createCard('official', "Studio", 'A tool to help you create your own games on Meltdown', 'ddd', ['Meltdown'], true)
createCard('official', "Clips", 'A tool to help you create cutscenes and animations', 'ddd', ['Meltdown'], true)
createCard('official', "Info", "Our offical documentation", 'ddd', ['Meltdown'], true)
createCard('official', "Dev", 'Where all of our staff can report bugs/feature requests', 'ddd', ['Meltdown'], true)
createCard('official', "Learn", 'Learn all the programming skills you need to work with us!', 'ddd', ['Meltdown'], true)