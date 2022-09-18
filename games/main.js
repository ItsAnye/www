//Container Element
let container = document.getElementById('content');

//Reading URL params
const urlParams = new URLSearchParams(window.location.search);
let gamename = urlParams.get('name');
let desc = urlParams.get('desc');
let creatorsStr = urlParams.get('creators')

//Constants (for now)
let views = 0;
let created = '9/18/2022';
let updated = '9/18/2022';
let upvotes = 0;
let downvotes = 0;

//Check if URL params are null, redirect to Explore
if(gamename == null || desc == null || creatorsStr == null){
    window.location.href = `../explore/`
}

let creators = creatorsStr.slice(1, -1).replace(/['"]+/g, '').split(',');

//Image + Title
container.innerHTML += `<img src="../images/thumbnails/${gamename.replace(' ', '_')}.png" style="border: 5px solid black; margin-left: calc(80px + 100px); margin-top: 100px; width: 300px;">`
container.innerHTML += `<h1 class="unselectable" style="position: absolute; margin-left: 500px; margin-top: -300px;">${gamename}</h1>`

//Creators
function showAllCreators() {
    let elem = document.getElementById("creators");
    elem.style.marginTop = "-250px";
    elem.innerHTML = 'By: ';

    for(let x = 0; x < creators.length; x++) {
        if(x == 0){
            elem.innerHTML += creators[x];
        } else {
            if(x == (creators.length - 1)){
                if(creators.length > 2){
                    elem.innerHTML += `, and ${creators[x]}`
                } else {
                    elem.innerHTML += ` and ${creators[x]}`
                }
            } else {
                elem.innerHTML += `, ${creators[x]}`
            }
        }
    }
}

if(creators.length > 1){
    container.innerHTML += `<h3 id="creators" class="unselectable">By: ${creators[0]} <p onclick="showAllCreators();">+${creators.length - 1}</p></h3>`
} else {
    container.innerHTML += `<h3 class="unselectable" style="position: absolute; margin-left: 505px; margin-top: -250px;">By: ${creators[0]}</h3>`
}

//Play button
container.innerHTML += `<div title="Play" onclick="play();" id="play_btn"><i class="fa-solid fa-caret-right" style="font-size: 70px; color: white; margin-left: 130px; margin-top: 2px;"></i></div>`;

//Redirect to game
function play(){
    let formated_name = gamename.toLowerCase().replace(' ', '_')
    window.location.href = `./play/${formated_name}`;
}

//Description
let line_breaks = desc.split('\n');
container.innerHTML += `<div id="desc_box"></div>`

for(let i = 0; i < line_breaks.length; i++) {
    if(line_breaks[i] == ''){
        line_breaks[i] = `<br>`;
    }
    document.getElementById('desc_box').innerHTML += `<p>${line_breaks[i]}</p>`
}

//Delete params from URL
window.history.replaceState(null, null, window.location.pathname);

//Calculating percentages
let up_percent, down_percent;
if(upvotes != 0 && downvotes != 0){
    up_percent = Math.round((upvotes / (upvotes + downvotes) + Number.EPSILON) * 100) / 100 * 100
    down_percent = 100 - up_percent;
} else {
    up_percent = 0;
    down_percent = 0;
}

//Likes / Dislikes
container.innerHTML += `<div id="voting"><span id="up_percent" title="${upvotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} upvotes">${up_percent}%</span><i class="fa-solid fa-angle-up" title="Upvote"></i><span class="unselectable">&nbsp&nbsp&nbsp</span><i class="fa-solid fa-angle-down" title="Downvote"></i><span id="down_percent" title="${downvotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} downvotes">${down_percent}%</span></div>`

//Views
container.innerHTML += `<div id="views" title="${views} views"><i class="fa-solid fa-eye"></i> ${views}</div>`;

//Created / Updated
container.innerHTML += `<div id="info"><div id="created">Created: <br>${created}</div><div id="updated">Updated: <br>${updated}</div></div>`