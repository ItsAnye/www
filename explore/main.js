//Why isn't game name showing up
//Clean crappy CSS for cards lmfao

function createCard(wrapper, name, desc='a new game', bg="ddd"){
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
    scroller.innerHTML += `<div class='card-wrap' onmouseover='this.children[0].style.cursor = "pointer"; this.children[0].style.backgroundColor = "#a7b7be"; this.children[0].style.border = "5px solid transparent"; this.children[0].style.borderImage = "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)"; this.children[0].style.borderImageSlice = "1";' onmouseleave='this.children[0].style.backgroundColor = "#f0f7f8"; this.children[0].style.border = "3px solid black";'><div class='card'><img src="../images/thumbnails/${name.replace(" ", "_")}.png" class="undraggable" width="160px" height: 160px; style="border-radius: 30px;"></div><h2 class="unselectable" style=" margin-top: ${marginTop}px; text-align: center; margin-left: -20px; font-size: ${nameSize}px">${name}</h2></div>`;
}

createCard('new', 'Tetris');
createCard('new', "Fish Ahoy")
createCard('new', "Clicker Survival")