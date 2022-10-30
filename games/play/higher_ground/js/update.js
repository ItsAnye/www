function render(){
    updateControls();

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    playerBB.copy(player.geometry.boundingBox).applyMatrix4(player.matrixWorld);
    checkCollisions();
};

render();