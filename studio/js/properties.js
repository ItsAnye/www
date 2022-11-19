function updateProperties(){ //Properties options
    //If something is selected
    if(selected != null){
        //Name row
        document.getElementById('name_row').innerHTML = "<th class='center'>Name</th>" + "\
        <th>\
            <form onsubmit='return changeProperties(event, selected)'>\
                <div class='form-group'>\
                    <input type='text' class='form-control properties_input' autocomplete='off' id='nameInput'>\
                </div>\
            </form>\
        </th>\
        ";
        document.getElementById('nameInput').value = selected.name;

        if(selected.type != 'AmbientLight'){
            //Position row
            document.getElementById('position_row').innerHTML = `<th class='center'>Position</th>` + `\
            <th>\
                <form onsubmit='return changeProperties(event, selected)'>\
                    <div class='row'>\
                        <div class='form-group properties_position_row'>\
                            <label class='properties_label' for='positionInputX' style='margin-top: 6px;'>x:&nbsp;&nbsp;</label>\
                            <button class='btn increment-button' onmouseup='incrementStats("pos", "minus", "x")'><i class='fas fa-minus increment-icon'></i></button>\
                            <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("pos", "plus", "x")'><i class='fas fa-plus increment-icon'></i></button>\
                            <div style='overflow: hidden;'>\
                                <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='positionInputX'></span>\
                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </form>\
                \
                <form onsubmit='return changeProperties(event, selected)'>\
                    <div class='row'>\
                        <div class='form-group properties_position_row'>\
                            <label class='properties_label' for='positionInputY' style='margin-top: 6px;'>y:&nbsp;&nbsp;</label>\
                            <button class='btn increment-button' onmouseup='incrementStats("pos", "minus", "y")'><i class='fas fa-minus increment-icon'></i></button>\
                            <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("pos", "plus", "y")'><i class='fas fa-plus increment-icon'></i></button>\
                            <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='positionInputY'></span>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </form>\
                \
                <form onsubmit='return changeProperties(event, selected)'>\
                <div class='row'>\
                    <div class='form-group properties_position_row'>\
                        <label class='properties_label' for='positionInputZ' style='margin-top: 6px;'>z:&nbsp;&nbsp;</label>\
                        <button class='btn increment-button' onmouseup='incrementStats("pos", "minus", "z")'><i class='fas fa-minus increment-icon'></i></button>\
                        <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("pos", "plus", "z")'><i class='fas fa-plus increment-icon'></i></button>\
                        <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='positionInputZ'></span>\
                    </div>\
                </div>\
            </form>\
            </th>\
            `;
            document.getElementById('positionInputX').value = selected.position.x;
            document.getElementById('positionInputY').value = selected.position.y;
            document.getElementById('positionInputZ').value = selected.position.z;

            if(selected.type != 'SpotLight'){
                //Scale row
                document.getElementById('scale_row').innerHTML = `<th class='center'>Scale</th>` + `\
                <th>\
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_scale_row'>\
                                <label class='properties_label' for='scaleInputX' style='margin-top: 6px;'>x:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("scl", "minus", "x")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("scl", "plus", "x")'><i class='fas fa-plus increment-icon'></i></button>\
                                <div style='overflow: hidden;'>\
                                    <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='scaleInputX'></span>\
                                </div>\
                                <div style='height: 10px;'></div>\
                            </div>\
                        </div>\
                    </form>\
                    \
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_scale_row'>\
                                <label class='properties_label' for='scaleInputY' style='margin-top: 6px;'>y:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("scl", "minus", "y")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("scl", "plus", "y")'><i class='fas fa-plus increment-icon'></i></button>\
                                <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='scaleInputY'></span>\
                                <div style='height: 10px;'></div>\
                            </div>\
                        </div>\
                    </form>\
                    \
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_scale_row'>\
                                <label class='properties_label' for='scaleInputZ' style='margin-top: 6px;'>z:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("scl", "minus", "z")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("scl", "plus", "z")'><i class='fas fa-plus increment-icon'></i></button>\
                                <span><input type='number' step=".01" onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='scaleInputZ'></span>\
                            </div>\
                        </div>\
                    </form>\
                </th>\
                `;
                document.getElementById('scaleInputX').value = selected.scale.x;
                document.getElementById('scaleInputY').value = selected.scale.y;
                document.getElementById('scaleInputZ').value = selected.scale.z;

                //Rotation row
                document.getElementById('rotation_row').innerHTML = `<th class='center'>Rotation</th>` + `\
                <th>\
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_rotation_row'>\
                                <label class='properties_label' for='rotationInputX' style='margin-top: 6px;'>x:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("rot", "minus", "x")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("rot", "plus", "x")'><i class='fas fa-plus increment-icon'></i></button>\
                                <div style='overflow: hidden;'>\
                                    <span><input type='number' onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='rotationInputX'></span>\
                                </div>\
                                <div style='height: 10px;'></div>\
                            </div>\
                        </div>\
                    </form>\
                    \
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_rotation_row'>\
                                <label class='properties_label' for='rotationInputY' style='margin-top: 6px;'>y:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("rot", "minus", "y")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("rot", "plus", "y")'><i class='fas fa-plus increment-icon'></i></button>\
                                <span><input type='number' onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='rotationInputY'></span>\
                                <div style='height: 10px;'></div>\
                            </div>\
                        </div>\
                    </form>\
                    \
                    <form onsubmit='return changeProperties(event, selected)'>\
                        <div class='row'>\
                            <div class='form-group properties_rotation_row'>\
                                <label class='properties_label' for='rotationInputZ' style='margin-top: 6px;'>z:&nbsp;&nbsp;</label>\
                                <button class='btn increment-button' onmouseup='incrementStats("rot", "minus", "z")'><i class='fas fa-minus increment-icon'></i></button>\
                                <button class='btn increment-button increment-button-plus' onmouseup='incrementStats("rot", "plus", "z")'><i class='fas fa-plus increment-icon'></i></button>\
                                <span><input type='number' onwheel='this.blur()' class='form-control properties_input' autocomplete='off' id='rotationInputZ'></span>\
                            </div>\
                        </div>\
                    </form>\
                </th>\
                `;
                document.getElementById('rotationInputX').value = radians_to_degrees(selected.rotation.x); //Needs to be converted to radians (user will see degrees).
                document.getElementById('rotationInputY').value = radians_to_degrees(selected.rotation.y);
                document.getElementById('rotationInputZ').value = radians_to_degrees(selected.rotation.z);
            } else {
                document.getElementById('scale_row').innerHTML = '';
            }
        } else {
            document.getElementById('position_row').innerHTML = '';
            document.getElementById('rotation_row').innerHTML = '';
            document.getElementById('scale_row').innerHTML = '';
        }

        //Color row
        if(selected.type == "Mesh" || selected.type == 'AmbientLight' || selected.type == 'SpotLight') {
            document.getElementById('color_row').innerHTML = `<th class='center'>Color</th>` + `\
            <th>\
                <form onsubmit='return changeProperties(event, selected)'>\
                    <div class='row'>\
                        <div class='form-group properties_color_row'>\
                            <div style='overflow: hidden;' id="color_input_div">\

                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </form>\
            </th>\
            `;

            if (selected.type == 'Mesh' && selected.material.type != 'MeshNormalMaterial'){
                let color = rgbToHex(parseInt(selected.material.color.r * 255), parseInt(selected.material.color.g * 255), parseInt(selected.material.color.b * 255))
                document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
            } else if (selected.type == 'SpotLight' || selected.type == 'AmbientLight'){
                let color = rgbToHex(parseInt(selected.color.r * 255), parseInt(selected.color.g * 255), parseInt(selected.color.b * 255))
                document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
            } else {
                document.getElementById("color_input_div").innerHTML = '<b>Please change your material to use colors.</b>';
            }

            if(selected.type == 'Mesh'){
                //Material row
                document.getElementById('material_row').innerHTML = `<th class='center'>Material</th>` + `\
                <th>\
                    <div class='row'>\
                        <div class='form-group properties_material_row'>\
                            <div style='overflow: hidden;' id="material_dropdown_div">\
                                <select id="material_dropdown" onchange="changeMaterialProperty();">\
                                    <option value="standard">Standard</option>\
                                    <option value="basic">Basic</option>\
                                    <option value="rainbow">Rainbow</option>\
                                    <option value="metal">Metal</option>\
                                </select>\
                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </th>\
                `;
            } else {
                document.getElementById('material_row').innerHTML = '';
            }

            //Intensity Row
            if(selected.type == 'SpotLight' || selected.type == 'AmbientLight'){
                document.getElementById('intensity_row').innerHTML = `<th class='center'>Intensity</th>` + `\
                <th>\
                    <div class='row'>\
                        <div class='form-group properties_intensity_row'>\
                            <div style='overflow: hidden;' id="intensity_slider_div">\
                                <input type="range" min="0" max="500" value="${selected.intensity * 100}" class="slider" id="intensity_slider" oninput="changeIntensityProperty();">
                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </th>\
                `;
            } else {
                document.getElementById('intensity_row').innerHTML = '';
            }

            if(selected.type == 'Mesh'){
                document.getElementById('opacity_row').innerHTML = `<th class='center'>Opacity</th>` + `\
                <th>\
                    <div class='row'>\
                        <div class='form-group properties_opacity_row'>\
                            <div style='overflow: hidden;' id="opacity_slider_div">\
                                <input type="range" step="0.1" min="0" max="1" value="${selected.material.opacity}" class="slider" id="opacity_slider" oninput="changeOpacityProperty();">
                            </div>\
                            <div style='height: 10px;'></div>\
                        </div>\
                    </div>\
                </th>\
                `;
            } else {
                document.getElementById('opacity_row').innerHTML = '';
            }

            if(selected.type == 'Mesh'){
                const material_dropdown = document.getElementById('material_dropdown');
                if (selected.material.type == "MeshNormalMaterial"){
                    material_dropdown.value = 'rainbow';
                } else if (selected.material.type == "MeshBasicMaterial"){
                    material_dropdown.value = 'basic';
                } else if (selected.material.type == "MeshStandardMaterial" || selected.material.type == "MeshLambertMaterial"){
                    material_dropdown.value = 'standard';
                } else {
                    material_dropdown.value = 'metal';
                }
            }
        }

    //Spotlight helper

    //If nothing is selected show nothing
    } else {
        let all_properties = document.getElementsByClassName("properties_row");
        for(let i = 0; i < all_properties.length; i++){
            all_properties[i].innerHTML = "";
        }
    }
}

function changeProperties(e, sel){
    //Preventing refresh
    e.preventDefault();

    //Name row
    sel.name = document.getElementById('nameInput').value;

    if(sel.type != 'AmbientLight'){
        //Position row
        sel.position.x = document.getElementById('positionInputX').value;
        sel.position.y = document.getElementById('positionInputY').value;
        sel.position.z = document.getElementById('positionInputZ').value;

        if(sel.type != 'SpotLight'){
            //Rotation row
            sel.rotation.x = degrees_to_radians(document.getElementById('rotationInputX').value);
            sel.rotation.y = degrees_to_radians(document.getElementById('rotationInputY').value);
            sel.rotation.z = degrees_to_radians(document.getElementById('rotationInputZ').value);

            //Scale row
            sel.scale.x = document.getElementById('scaleInputX').value;
            sel.scale.y = document.getElementById('scaleInputY').value;
            sel.scale.z = document.getElementById('scaleInputZ').value;
        }
    } else {
        document.getElementById('position_row').innerHTML = '';
        document.getElementById('rotation_row').innerHTML = '';
    }

    //Color row in changeColorProperty() because there is no e.preventDefault();
    //Material row in changeColorProperty() because there is no e.preventDefault();

    //Update outline if exists
    if(sel.userData.outline != undefined){
        sel.userData.outline.position.copy(sel.position);
        sel.userData.outline.rotation.copy(sel.rotation);

        sel.userData.outline.scale.set(sel.scale.x, sel.scale.y, sel.scale.z);
        sel.userData.outline.scale.multiplyScalar(1.05); //Needs to be slightly larger
    }

    //Update explorer
    populateExplorer();
    updateExplorerClick();
}

function changeColorProperty(color='') {
    if(color == ''){
        if(selected.type == 'Mesh'){
            selected.material.color.setHex("0x" + String(document.getElementById('color_input').value).substring(1))
        } else if(selected.type == 'SpotLight' || selected.type == 'AmbientLight'){
            selected.color.setHex("0x" + String(document.getElementById('color_input').value).substring(1))
        }
        
    } else {
        return "0x" + String(color).substring(1)
    }
}

function changeMaterialProperty() {
    let material_dropdown = document.getElementById('material_dropdown');
    let old_mat = selected.material;

    if(material_dropdown.value == 'standard'){
        selected.material = new THREE.MeshLambertMaterial({color: 0x000000});
        if("color" in old_mat){
            selected.material.color.setHex(changeColorProperty(rgbToHex(parseInt(old_mat.color.r * 255), parseInt(old_mat.color.g * 255), parseInt(old_mat.color.b * 255))));
        }

        let color = rgbToHex(parseInt(selected.material.color.r * 255), parseInt(selected.material.color.g * 255), parseInt(selected.material.color.b * 255))
        document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
    } else if(material_dropdown.value == 'rainbow'){
        selected.material = new THREE.MeshNormalMaterial();
        document.getElementById("color_input_div").innerHTML = '<b>Please change your material to use colors.</b>';
    } else if(material_dropdown.value == 'metal'){
        selected.material = new THREE.MeshPhongMaterial({color: 0x000000});
        if("color" in old_mat){
            selected.material.color.setHex(changeColorProperty(rgbToHex(parseInt(old_mat.color.r * 255), parseInt(old_mat.color.g * 255), parseInt(old_mat.color.b * 255))));
        }

        let color = rgbToHex(parseInt(selected.material.color.r * 255), parseInt(selected.material.color.g * 255), parseInt(selected.material.color.b * 255))
        document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
    } else if(material_dropdown.value == 'basic'){
        selected.material = new THREE.MeshBasicMaterial({color: 0x000000});
        if("color" in old_mat){
            selected.material.color.setHex(changeColorProperty(rgbToHex(parseInt(old_mat.color.r * 255), parseInt(old_mat.color.g * 255), parseInt(old_mat.color.b * 255))));
        }
        
        let color = rgbToHex(parseInt(selected.material.color.r * 255), parseInt(selected.material.color.g * 255), parseInt(selected.material.color.b * 255))
        document.getElementById("color_input_div").innerHTML = `<input type="color" value="${color}" id="color_input" oninput="changeColorProperty();">`;
    }
}

function changeIntensityProperty(){
    selected.intensity = document.getElementById('intensity_slider').value / 100;
}

function changeOpacityProperty(){
    selected.material.transparent = true;
    selected.material.opacity = document.getElementById('opacity_slider').value;
}

function incrementStats(stat, dir, axis){
    if(stat == 'pos'){
        if(dir == 'minus'){
            if(axis == 'x'){
                let currValueX = document.getElementById('positionInputX').value;
                document.getElementById('positionInputX').value = currValueX - posIncrement;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('positionInputY').value;
                document.getElementById('positionInputY').value = currValueY - posIncrement;
            } else {
                let currValueZ = document.getElementById('positionInputZ').value;
                document.getElementById('positionInputZ').value = currValueZ - posIncrement;
            }
        } else {
            if(axis == 'x'){
                let currValueX = document.getElementById('positionInputX').value;
                document.getElementById('positionInputX').value = parseInt(currValueX) + posIncrement;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('positionInputY').value;
                document.getElementById('positionInputY').value = parseInt(currValueY) + posIncrement;
            } else {
                let currValueZ = document.getElementById('positionInputZ').value;
                document.getElementById('positionInputZ').value = parseInt(currValueZ) + posIncrement;
            }
        }
    } else if(stat == 'rot'){
        if(dir == 'minus'){
            if(axis == 'x'){
                let currValueX = document.getElementById('rotationInputX').value;
                document.getElementById('rotationInputX').value = (currValueX - rotIncrement) % 360;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('rotationInputY').value;
                document.getElementById('rotationInputY').value = (currValueY - rotIncrement) % 360;
            } else {
                let currValueZ = document.getElementById('rotationInputZ').value;
                document.getElementById('rotationInputZ').value = (currValueZ - rotIncrement) % 360;
            }
        } else {
            if(axis == 'x'){
                let currValueX = document.getElementById('rotationInputX').value;
                document.getElementById('rotationInputX').value = (parseInt(currValueX) + rotIncrement) % 360;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('rotationInputY').value;
                document.getElementById('rotationInputY').value = (parseInt(currValueY) + rotIncrement) % 360;
            } else {
                let currValueZ = document.getElementById('rotationInputZ').value;
                document.getElementById('rotationInputZ').value = (parseInt(currValueZ) + rotIncrement) % 360;
            }
        }
    } else if(stat == 'scl'){
        if(dir == 'minus'){
            if(axis == 'x'){
                let currValueX = document.getElementById('scaleInputX').value;
                document.getElementById('scaleInputX').value = currValueX - sclIncrement;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('scaleInputY').value;
                document.getElementById('scaleInputY').value = currValueY - sclIncrement;
            } else {
                let currValueZ = document.getElementById('scaleInputZ').value;
                document.getElementById('scaleInputZ').value = currValueZ - sclIncrement;
            }
        } else {
            if(axis == 'x'){
                let currValueX = document.getElementById('scaleInputX').value;
                document.getElementById('scaleInputX').value = parseInt(currValueX) + sclIncrement;
            } else if(axis == 'y'){
                let currValueY = document.getElementById('scaleInputY').value;
                document.getElementById('scaleInputY').value = parseInt(currValueY) + sclIncrement;
            } else {
                let currValueZ = document.getElementById('scaleInputZ').value;
                document.getElementById('scaleInputZ').value = parseInt(currValueZ) + sclIncrement;
            }
        }
    }
}