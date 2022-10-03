let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;

let mouseX, mouseY;

//Start in random position
for(let x = 0; x < document.getElementsByClassName('colored_box').length; x++){
    document.getElementsByClassName('colored_box')[x].style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
    document.getElementsByClassName('colored_box')[x].style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
}

function moveElem(elem, x='', y=''){
    if(x == '' || y == ''){
        elem.style.left = Math.floor(Math.random() * (maxWidth + 1)) + 'px';
        elem.style.top = Math.floor(Math.random() * (maxHeight + 1)) + 'px';
        
        if(elem.style.opacity == '0.3'){
            elem.style.opacity = '0.7';
        } else {
            elem.style.opacity = '0.3'
        }
    } else {
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        
        if(elem.style.opacity == '0.3'){
            elem.style.opacity = '0.7';
        } else {
            elem.style.opacity = '0.3'
        }
    }
}

function ticker(){
    for(let i = 0; i < document.getElementsByClassName('colored_box').length; i++){
        moveElem(document.getElementsByClassName('colored_box')[i]);
    }
}

var bg_movementTicker = window.setInterval(ticker, 2000);

function redirect() {
    $('#desc').fadeOut(1000, function(){
        clearInterval(bg_movementTicker);
        for(let i = 0; i < document.getElementsByClassName('colored_box').length; i++){
            moveElem(document.getElementsByClassName('colored_box')[i], (maxWidth / 2) - 75, (maxHeight / 2) - 75);
        }

        for(let i = 0; i < document.getElementsByClassName('colored_box').length; i++){
            document.getElementsByClassName('colored_box')[i].style.width = maxWidth + 100 + 'px';
            document.getElementsByClassName('colored_box')[i].style.height = maxHeight + 100 + 'px';

            document.getElementsByClassName('colored_box')[i].style.left = '-10px';
            document.getElementsByClassName('colored_box')[i].style.top = '-10px';
        }

        setInterval(function(){
            for(let i = 0; i < document.getElementsByClassName('colored_box').length; i++){
                document.getElementsByClassName('colored_box')[i].style.backgroundColor = '#000000';
                document.getElementsByClassName('colored_box')[i].style.opacity = '1';
            }

            setInterval(function(){
                for(let i = 0; i < document.getElementsByClassName('mouse_particle').length; i++){
                    document.getElementsByClassName('mouse_particle')[i].style.backgroundColor = 'white';
                }
        
                for(let i = 0; i < document.getElementsByClassName('mouse_particle_gold').length; i++){
                    document.getElementsByClassName('mouse_particle_gold')[i].style.backgroundColor = 'white';
                }
            }, 2000);

            setInterval(function(){
                window.location.href = '../studio/';
            }, 2000);
        }, 2000);
    });
};

document.body.innerHTML += '<div id="desc"><h1 style="text-align: center; font-size: 50px; margin-top: 100px;">Create anything with Meltdown Studio!</h1><button onclick="redirect()">CREATE NOW!</button></div>';

function rand(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

var mouseTicker = window.setInterval(function(){
    for(let i = 0; i < document.getElementsByClassName('mouse_particle').length; i++){
        document.getElementsByClassName('mouse_particle')[i].style.left = mouseX + rand(-50, 50) + 'px';
        document.getElementsByClassName('mouse_particle')[i].style.top = mouseY + rand(-50, 50) + 'px';
    }
}, 200);

var mouseTickerGold = window.setInterval(function(){
    for(let i = 0; i < document.getElementsByClassName('mouse_particle_gold').length; i++){
        document.getElementsByClassName('mouse_particle_gold')[i].style.left = mouseX + rand(-25, 25) + 'px';
        document.getElementsByClassName('mouse_particle_gold')[i].style.top = mouseY + rand(-25, 25) + 'px';
    }
}, 100);