function createCard(wrapper, name, desc='a new game', bg="ddd", creators=['Meltdown']){
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
    scroller.innerHTML += `<div class='card-wrap' onclick='window.location.href = "../games/index.html?name=${name}&desc=${encodeURI(desc)}&creators=${encodeURIComponent(JSON.stringify(creators))}"' title='${desc.split('\n')[0]}' onmouseover='this.children[0].style.cursor = "pointer"; this.children[0].style.backgroundColor = "#${bg}"; this.children[0].style.border = "5px solid transparent"; this.children[0].style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)"; this.children[0].style.borderImageSlice = "1";' onmouseleave='this.children[0].style.backgroundColor = "#ddd"; this.children[0].style.border = "3px solid black";'><div class='card'><img src="../images/thumbnails/${name.replace(" ", "_")}.png" class="undraggable" width="160px" height: 160px; style="border-radius: 30px;"></div><h2 class="unselectable" style=" margin-top: ${marginTop}px; text-align: center; margin-left: -20px; font-size: ${nameSize}px">${name}</h2></div>`;
}

createCard('new', 'Tetris', 'A 3D rebuild of the classic Tetris!\nThe aim in Tetris is simple; you bring down blocks from the top of the screen. You can move the blocks around and you can rotate them. Points are scored by making horizontal lines. \n\nControls:\n\n↑: Rotate ↻\n↓: Rotate ↺\n←: Move Left\n→: Move right\n[SPACE]: Drop down\n\nThe more lines you clear at once, the more points you get:\n\n1 line: 1 point\n2 lines: 4 points\n3 lines: 9 points\n4 lines: 16 points\n\nThanks for playing!', '87ceeb', ['Anye']);
createCard('new', "Fish Ahoy", 'fishing is fishy', 'e4d999', ['Westineye', 'Pixie', 'Anye'])
createCard('new', "Clicker Survival", 'A clicker game set in the modern world.\nYou can start by heading over to the corn field. Start clicking, because thats how you earn money at first!\n\nOnce you have enough money, you can leave the corn field and walk up to the tent. Purchasing items in the shop helps increase your cps (clicks per second). This allows you to gain money without even clicking. \n\n Made by JTC and Anye during Meltdown Summer Camp 2022. \n Have fun!', '477547', ['JTC', 'Anye'])