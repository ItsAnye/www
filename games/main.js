//Reading URL params
const urlParams = new URLSearchParams(window.location.search);
let gamename = urlParams.get('name');
let desc = urlParams.get('desc');
let creatorsStr = urlParams.get('creators')

//Check if URL params are null, redirect to Explore
if(gamename == null || desc == null || creatorsStr == null){
    window.location.href = `../explore/`
}

let creators = creatorsStr.slice(1, -1).replace(/['"]+/g, '').split(',');

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
document.body.innerHTML += `<div title="Play" onclick="play();" id="play_btn"><i class="fa-solid fa-caret-right" style="font-size: 70px; color: white; margin-left: 130px; margin-top: 2px;"></i></div>`;

//Description
let line_breaks = desc.split('\n');
document.body.innerHTML += `<div id="desc_box"></div>`

for(let i = 0; i < line_breaks.length; i++) {
    if(line_breaks[i] == ''){
        line_breaks[i] = `<br>`;
    }
    document.getElementById('desc_box').innerHTML += `<p>${line_breaks[i]}</p>`
}

//Delete params from URL
window.history.replaceState(null, null, window.location.pathname);

//Redirect to game
function play(){
    let formated_name = gamename.toLowerCase().replace(' ', '_')
    window.location.href = `./play/${formated_name}`;
}