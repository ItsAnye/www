const urlParams = new URLSearchParams(window.location.search);
let gamename = urlParams.get('name');
let desc = urlParams.get('desc');
let creators = urlParams.get('creators').slice(1, -1).replace(/['"]+/g, '').split(',');

//Image + Title
document.body.innerHTML += `<img src="../images/thumbnails/${gamename.replace(' ', '_')}.png" style="border: 5px solid black; margin-left: calc(80px + 100px); margin-top: 100px; width: 300px;">`
document.body.innerHTML += `<h1 class="unselectable" style="position: absolute; margin-left: 500px; margin-top: -300px;">${gamename}</h1>`

//Creators
if(creators.length > 1){
    document.body.innerHTML += `<h3 class="unselectable" style="position: absolute; margin-left: 505px; margin-top: -270px;">By: ${creators[0]} <p>+${creators.length - 1}</p></h3>`
} else {
    document.body.innerHTML += `<h3 class="unselectable" style="position: absolute; margin-left: 505px; margin-top: -250px;">By: ${creators[0]}</h3>`
}

//Play button
document.body.innerHTML += `<div title="Play" id="play_btn"><i class="fa-solid fa-caret-right" style="font-size: 70px; color: white; margin-left: 130px; margin-top: 2px;"></i></div>`;