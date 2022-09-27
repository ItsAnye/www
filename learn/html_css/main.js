let arr = ['one', 'two', 'three', 'four', 'five'];

let one = document.getElementById("one");
let snippets = document.getElementsByTagName("meltdown-code");
one.innerHTML += `<h1>This is an h1 tag!</h1>`;
let lesson = 'one'

function formatSnippets(){
    for(let i = 0; i < snippets.length; i++) {
        let oldTxt = window[arr[i]].innerHTML;
        let newTxt = '';
        let lang = window[arr[i]].dataset.lang;

        // HTML
        if(lang == 'HTML'){
            let cluster = '';
            let contentCluster = '';
            for(let x = 0; x < oldTxt.length; x++){
                if(oldTxt[x] == '<'){
                    //Opening Tag
                    newTxt += '<span class="tagcolor">&lt;</span>'
                } else if(oldTxt[x] == '>'){
                    //Closing Tag
                    newTxt += '<span class="tagcolor">&gt;</span>';
                } else if(oldTxt[x].toLowerCase() != oldTxt[x].toUpperCase() || oldTxt[x] == '/' || oldTxt[x] == ' ' || oldTxt[x] == ',' || oldTxt[x] == '!' || (oldTxt[x] >= '0' && oldTxt[x] <= '9')){
                    //Tag Name
                    if(oldTxt[x - 1] == '<' || cluster != ''){
                        cluster += oldTxt[x];
                        if(oldTxt[x + 1] == '>'){
                            newTxt += `<span class="tagnamecolor">${cluster}</span>`;
                            cluster = '';
                        }
                    } else {
                        //Content
                        contentCluster += oldTxt[x];

                        if(oldTxt[x + 1] == '<'){
                            newTxt += `<span class="contentcolor">${contentCluster}</span>`;
                            contentCluster = '';
                        }
                    }
                }
            }
        }

        snippets[i].innerHTML = newTxt;
    }
}

formatSnippets();

//Live Reload
function refresh() {
    let editor_value = document.getElementById('editor-textarea').value;
    document.getElementById('viewer').srcdoc = editor_value;

    if(lesson == 'one' && editor_value == '<h1>Hello World!</h1>'){
        document.getElementById('item_one').disabled = false;
        document.getElementById('item_one').style.pointerEvents = 'none';
    } else {
        document.getElementById('item_one').disabled = true;
        document.getElementById('item_one').style.pointerEvents = 'none';
    }
}