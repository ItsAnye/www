let currTab = 'home';

function degrees_to_radians(degrees) {
    let pi = Math.PI;
    return degrees * (pi/180);
}

function radians_to_degrees(radians) {
  let pi = Math.PI;
  return radians * (180/pi);
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function createTable(n){
	document.getElementById('tbody').innerHTML = ''
	for(let i = 0; i < n; i++){
		document.getElementById('tbody').innerHTML += `<tr><td>&nbsp;</td></tr>`;
	}

	document.getElementById('editing_panel').scroll(10, 0)
}

function select(thing=''){
    if(thing === ''){
        let vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector = vector.unproject(camera);
    
        let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        let intersects = raycaster.intersectObjects(scene.children, true);
    
        if(intersects.length > 0){
            for(let i = 0; i < projectData.length; i++){
                if(projectData[i]['object'] == intersects[0].object){
    
                    //If it's not selected
                    if(projectData[i]['hidden']['selected'] == false){
                        if(selected == sky || selected != null || selected != undefined) {
                            if(projectData[i]['hidden']['outline']){
                                projectData[i]['hidden']['outline'].visible = false;
                            }
    
                            if(Object.keys(selected.userData).length > 0){
                                if(selected.userData.outline == undefined){
                                    if(helper != undefined) scene.remove(helper);
                                    helper = undefined;
                                } else {
                                    selected.userData.outline.visible = false;
                                }
                            }
                        }
    
                        selected = projectData[i].object;
                        projectData[i]['hidden']['selected'] = true;
    
                        //If object isn't selectable, making opacity 0.8 rather than 0.5
                        if(projectData[i]['hidden']['selectable'] == false){
                            //fill
                            if(projectData[i]['hidden']['type'] == 'Rig'){
                                console.log('rig!!!') //Testing 
                            }
                        } else {
                            //Outline doesn't exist here.
                            projectData[i]['hidden']['outline'].visible = true;
                        }
    
                    //If it is selected
                    } else {
                        if(projectData[i]['hidden']['outline']){
                            projectData[i]['hidden']['outline'].visible = false;
                        }
    
                        if(selected != null && Object.keys(selected.userData).length > 0){
                            if(selected.userData.outline == undefined){
                                if(helper != undefined) scene.remove(helper);
                                helper = undefined;
                            } else {
                                selected.userData.outline.visible = false;
                            }
                        }
    
                        projectData[i]['hidden']['selected'] = false;
                        selected = null;
                    }
                }
            };
        };
    } else {
        if(thing['hidden']['selected'] == false){
            if(selected == sky || selected != null || selected != undefined) {
                if(thing['hidden']['outline']){
                    thing['hidden']['outline'].visible = false;
                }

                if(Object.keys(selected.userData).length > 0 && selected.userData.outline != undefined){
                    selected.userData.outline.visible = false;
                }
            }

            selected = thing.object;
            thing['hidden']['selected'] = true;

            //If object isn't selectable, making opacity 0.8 rather than 0.5
            if(thing['hidden']['selectable'] == false){
                //fill
            } else {
                //Outline doesn't exist here.
                thing['hidden']['outline'].visible = true;
            }

        //If it is selected
        } else {
            if(thing['hidden']['outline']){
                thing['hidden']['outline'].visible = false;
            }

            if(selected != null && Object.keys(selected.userData).length > 0 && selected.userData.outline != undefined){
                selected.userData.outline.visible = false;
            }

            thing['hidden']['selected'] = false;
            selected = null;
        }
    }

    if(selected != null){
        if(selected.type == 'SpotLight'){
            for(let x = 0; x < projectData.length; x++){
                if(projectData[x].object.userData.helper != undefined){
                    if(helper != undefined) scene.remove(helper);
                    helper = undefined;
                }
            }

            helper = new THREE.SpotLightHelper(selected)
            scene.add(helper);
        } else {
            for(let i = 0; i < projectData.length; i++){
                if(projectData[i]['object'].type == 'SpotLight'){
                    if(helper != undefined) scene.remove(helper);
                    helper = undefined;
                }
            }
        }
    } else {
        for(let i = 0; i < projectData.length; i++){
            if(projectData[i]['object'].type == 'SpotLight'){
                if(helper != undefined) scene.remove(helper);
                helper = undefined;
            }
        }
    }

    changeTab(undefined, currTab);

	if(selected != null){
		document.getElementById('sub_panels').innerHTML = `<p>${selected.name}</p>`;
		for(let i = 0; i < selected.children.length; i++){
			if(selected.children[0].name != ''){
				document.getElementById('sub_panels').innerHTML += `<p>${selected.children[0].name}</p>`;
			} else {
				document.getElementById('sub_panels').innerHTML += `<p>&lt;child&gt;</p>`;
			}
		}
		createTable(document.getElementById('sub_panels').childElementCount);
	} else {
		document.getElementById('sub_panels').innerHTML = '';
	}
	
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeTab(evt, tab){
    let tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(tab).style.display = "block";

    if(tab == 'edit'){
        if(loadedRig != undefined){
            document.getElementById(tab).innerHTML = "\
            <label for='torso'>\
            <input type='color'></input>"
        } else {
            document.getElementById(tab).innerHTML = "Please load a rig first!";
        }
    } else if(tab == 'animate') {
        if(selected != undefined){
            document.getElementById(tab).innerHTML = `\
            <button id='newAnim_btn' class='center btn menu_btn buttonDefaultSize' onClick='tool = "New Animation"; document.getElementById("newAnim_btn").style.backgroundColor = "darkgrey"; document.getElementById("animator_panel").style.display = "block";'>New</button>`
		} else {
			document.getElementById(tab).innerHTML = 'Please select an object first!';
		}
	} else {
        document.getElementById(tab).style.display = 'block';
    }

    let all = document.getElementsByClassName('tablinks');
    for (let i = 0; i < all.length; i++) {
        all[i].style.backgroundColor = 'lightgrey';
    }
    document.getElementById(tab + '_tab').style.backgroundColor = "darkgrey";

    currTab = tab;
};