let snippets = document.getElementsByTagName("meltdown-code");
let arr = ['one', 'two', 'three', 'four', 'five'];
let lesson = 'one';

let answers = {};
let tasks = document.getElementById('tasks');

let one = document.getElementById("one");
one.innerHTML += `<h1>This is an h1 tag!</h1>`;

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

function createTask(task, final="undef"){
    tasks.innerHTML += `<div id="task_${tasks.children.length + 1}"><div id="todo_icon"><i class="fa-solid fa-check"></i></div>&nbsp<span>${task}</span><br></div>`;
    answers[`task_${tasks.children.length}`] = final;
}

function createInput(type, pre, placeholder, ans1, ans2, final1, final2){
    tasks.innerHTML += `<div id="task_${tasks.children.length + 1}"><div id="todo_icon"><i class="fa-solid fa-check"></i></div>&nbsp<span>${pre}</span><div><input id="task_${tasks.children.length + 1}_input_${type}" class="task_input" type="${type}" placeholder="${placeholder}"><button class="task_button" onclick="inputSubmitted('${ans1}', '${ans2}', '${type}', '${tasks.children.length + 1}', '${final1}', '${final2}')">Submit</button></div><br></div>`;
}

function inputSubmitted(ans1, ans2, type, index, final1, final2){
    let val = document.getElementById(`task_${index}_input_${type}`).value;
    document.getElementById(`task_${index}_input_${type}`).value = '';
    document.getElementById(`task_${index}_input_${type}`).parentElement.parentElement.innerHTML = `<div id="todo_icon"><i class="fa-solid fa-check"></i></div>&nbsp${final1}<code>&lt;${ans1}&gt;${val}&lt;${ans2}&gt;</code>${final2}`
    answers[`task_${tasks.children.length}`] = decodeHtml(`&lt;${ans1}&gt;${val}&lt;${ans2}&gt;`);

}

formatSnippets();

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

//Live Reload
function refresh() {
    let editor_value = document.getElementById('editor-textarea').value;
    document.getElementById('viewer').srcdoc = editor_value;

    console.log(answers)

    for (const [key, value] of Object.entries(answers)) {
        if(editor_value.includes(value)){
            document.getElementById(key).firstChild.style.backgroundColor = "rgb(0, 196, 0)";
        } else {
            document.getElementById(key).firstChild.style.backgroundColor = "lightgray";
        }
    }
}

//Tasks
createTask('Type <code>Hello World!</code> between the opening and closing tags.', '<h1>Hello World!</h1>');
createInput('input', 'Please Enter Your Name: ', 'Name here...', 'h1', '/h1', 'Type ', ' into your project.')