for(let i = 0; i < 30; i++){
    document.getElementById('frames_ind').innerHTML += `<span>${i * 30}</span>`
}

$('#editing_panel').on('scroll', function () {
    $('#frames_ind').scrollLeft($(this).scrollLeft());
});

$('#editing_panel').on('scroll', function () {
    $('#sub_panels').scrollTop($(this).scrollTop());
});

$('#anim_pointer').draggable({containment: "#d_ghost", axis: "x", scroll: false});

setTimeout(function(){
    document.getElementById('editing_panel').scrollTop = document.getElementById('editing_panel').scrollHeight;
    setTimeout(function(){
        document.getElementById('editing_panel').scrollTop = 0;
    }, 500);
}, 10);
