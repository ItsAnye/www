function render(){
    updateControls();

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    playerBB.copy(player.geometry.boundingBox).applyMatrix4(player.matrixWorld);
    checkCollisions();

    if(document.getElementById('health').offsetWidth < 100){
        document.getElementById('health').style.backgroundColor = '#FF0000';
    } else if(document.getElementById('health').offsetWidth < 200){
        document.getElementById('health').style.backgroundColor = '#F74040';
    } else if(document.getElementById('health').offsetWidth < 300){
        document.getElementById('health').style.backgroundColor = '#FF7777';
    } else if(document.getElementById('health').offsetWidth < 390){
        document.getElementById('health').style.backgroundColor = '#000000';
    } else {
        document.getElementById('health').style.backgroundColor = '#B3B3B3';
    }
};

render();