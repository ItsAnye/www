function createCard(wrapper, thumbnail, name, desc){
    let scroller = document.getElementById("scrolling-" + wrapper);
    scroller.innerHTML += `<div class='card'><h2>${name}</h2></div>`
}