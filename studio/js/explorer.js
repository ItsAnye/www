//Explorer options
let coll = document.getElementsByClassName("explorer_collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.firstChild.className = '';
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        
        if (content.style.display === "block") {
            content.style.display = "none";
            this.firstChild.className = 'fa-solid fa-angle-up';
        } else {
            content.style.display = "block";
            this.firstChild.className = 'fa-solid fa-angle-down';
        }
    });
}

function populateExplorer(){
    //Clear
    document.getElementById('explorer_world_content').firstElementChild.innerHTML = '';
    document.getElementById('explorer_light_content').firstElementChild.innerHTML = '';

    for(let i = 0; i < projectData.length; i++) {
        if(projectData[i].object.type == 'Mesh'){
            if(projectData[i].object.geometry.type == 'SphereGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="obj_click_select"><i class="fa-solid fa-circle"></i>  ${projectData[i].object.name}</li>`;
            } else if(projectData[i].object.geometry.type == 'BoxGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="obj_click_select"><i class="fa-solid fa-cube"></i>  ${projectData[i].object.name}</li>`;
            } else if(projectData[i].object.geometry.type == 'CylinderGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="obj_click_select"><i class="fa-solid fa-vial"></i>  ${projectData[i].object.name}</li>`;
            } else if(projectData[i].object.geometry.type == 'ConeGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="obj_click_select"><i class="fa-solid fa-ice-cream"></i>  ${projectData[i].object.name}</li>`;
            } else if(projectData[i].object.geometry.type == 'TorusGeometry'){
                document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="obj_click_select"><i class="fa-solid fa-ring"></i>  ${projectData[i].object.name}</li>`;
            }
        } else if(projectData[i].object.type == 'Group'){
            document.getElementById('explorer_world_content').firstElementChild.innerHTML += `<li class="rig_click_select"><i class="fa-solid fa-person"></i>  ${projectData[i].object.name}</li>`;
        } else if(projectData[i].object.type == 'AmbientLight' || projectData[i].object.type == 'SpotLight') {
            document.getElementById('explorer_light_content').firstElementChild.innerHTML += `<li class="li_click_select"><i class="fa-solid fa-sun"></i>  ${projectData[i].object.name}</li>`;
        }
    }
}

populateExplorer();

function updateExplorerClick() {
    let obj_click_select = document.getElementsByClassName('obj_click_select');
    let rig_click_select = document.getElementsByClassName('rig_click_select');
    let li_click_select = document.getElementsByClassName('li_click_select');

    for(let i = 0; i < obj_click_select.length; i++){
        obj_click_select[i].addEventListener("click", function() {
            selectExplorer(this.innerText.substring(1));
        });
    }

    for(let i = 0; i < rig_click_select.length; i++){
        rig_click_select[i].addEventListener("click", function() {
            selectExplorer(this.innerText.substring(1));
        });
    }

    for(let i = 0; i < li_click_select.length; i++){
        li_click_select[i].addEventListener("click", function() {
            selectExplorer(this.innerText.substring(1));
        });
    }
}

updateExplorerClick();

function selectExplorer(name){
    for(let i = 0; i < projectData.length; i++) {
        if(projectData[i].object.name == name){
            select(projectData[i]);
            updateProperties();
            break;
        }
    }
}