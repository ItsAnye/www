function play() {
    //Showing UI stuff
    document.getElementById("reset").classList.remove("hidden");
    document.getElementById("currentshape_background").classList.remove("hidden");
    document.getElementById("points-background").classList.remove("hidden");
    // document.getElementById("settings_btn_area").classList.remove("hidden");

    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;
    const KEY_SPACE = 32;
    const CELL_EMPTY = 0;
    const CELL_OBSTACLE = -100;
    const TIMER_INTERVAL_DURATION = 200; //ms

    const BLOCK_SIZE = 1;
    const BORDER_COLOR = 0x0000ff;

    let levels = {
        'difference': 20,
        'maxLevel': 10,
        'obstacles': 3,
        'obstaclesRange': 3,
        'level': 1
    }

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();

    let backgroundMusic = new Audio('assets/theme.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play();

    camera.position.x = 0;
    camera.position.y = -50;
    camera.position.z = 40;
    camera.lookAt(0, 0, 20);

    renderer.setClearColor(0x87CEEB);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 0.25;
    controls.target.set(0, 0, 20);
    controls.zoomSpeed = 0.25;
    controls.update();

    let resetControls = document.getElementById('reset');
    resetControls.addEventListener('click', resetControlsClicked, false);

    //Start

    let changes = [];
    let shapeCount = [null, null, null, null, null, null, null];

    let curr_shape = {
        'shape_id': undefined
    };

    let shape_data = [
        //Origin is at bottom-left
        {
            'name': 'Square', //    [][]
            'color': 0xF0F100, //   [][]
            'orientation': [
                [[0, 0], [1, -1], [0, -1], [1, 0]]
            ]
        },

        {
            'name': 'Right L', //    
            'color': 0x1801E8, //    [][][]
            'orientation': [ //      []
                [[0, 0], [-1, 0], [1, 0], [-1, -1]]
            ]
        },

        {
            'name': 'Left L', //     
            'color': 0xEFA000, // [][][]
            'orientation': [ //       []
                [[0, 0], [-1, 0], [1, 0], [1, -1]]
            ]
        },

        {
            'name': 'T', //     [][][]
            'color': 0xA002F1, // []
            'orientation': [
                [[0, 0], [-1, 0], [1, 0], [0, -1]]
            ]
        },

        {
            'name': 'Right Zig-Zag', //[][]
            'color': 0x0AF000, //    [][]     
            'orientation': [
                [[0, 0], [1, 0], [0, -1], [-1, -1]]
            ]
        },

        {
            'name': 'Left Zig-Zag', //[][]
            'color': 0xEF0504, //       [][]
            'orientation': [
                [[0, 0], [-1, 0], [0, -1], [1, -1]]
            ]
        },

        {
            'name': 'Straight Line', //  [][][][]
            'color': 0x0CEFF1,
            'orientation': [
                [[0, 0], [-1, 0], [1, 0], [2, 0]]
            ]
        }
    ];

    let numberOfShapes = shape_data.length;

    let blocks = [];

    let grid_rows = 40;
    let grid_columns = 14; //14
    let paused = false;

    let grid = new Array(grid_rows);

    for (let i = 0; i < grid_rows; i++) {
        grid[i] = new Array(grid_columns);

        for (let j=0; j<grid_columns; j++) {
            grid[i][j] = {
                'taken': CELL_EMPTY,
                'object': null
            };
        }
    }

    timerCalled();
    let timer = setInterval(timerCalled, TIMER_INTERVAL_DURATION);

    function drawBlock(grid_pos, color, rainbow=undefined){
        let position = [
            -grid_columns / 2 + grid_pos[0],
            1 + BLOCK_SIZE / 2 + grid_pos[1]
        ];

        let mesh;

        if(!rainbow){
            mesh = new THREE.Mesh(
                facetedBox(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, 0.1),
                new THREE.MeshStandardMaterial({color: color, flatShading: true, roughness: 0, metalness: -0.5, transparent: true})
            );
        } else {
            mesh = new THREE.Mesh(
                facetedBox(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, 0.1),
                new THREE.MeshNormalMaterial()
            );
        }

        mesh.position.x = position[0];
        mesh.position.y = 0;
        mesh.position.z = position[1];
        scene.add(mesh);

        return mesh;
    };

    writeShapeOrientations();

    let points = 0;

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    let spotLight = new THREE.SpotLight(0xffff00, 0.5);
    spotLight.position.set(50, 10, 50);
    spotLight.target.position.x = 20;
    scene.add(spotLight);
    scene.add(spotLight.target);

    let spotLight2 = new THREE.SpotLight(0x00ffff, 0.5);
    spotLight2.position.set(-50, -10, 50);
    spotLight2.target.position.x = -20;
    scene.add(spotLight2);
    scene.add(spotLight2.target);

    //Functions

    function createGameboard() {
        //Bottom border
        let bottomGeometry = new THREE.BoxGeometry(grid_columns + 1, BLOCK_SIZE, BLOCK_SIZE);
        let bottomMaterial = new THREE.MeshLambertMaterial({color: BORDER_COLOR});
        let bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
        
        bottom.position.set(0, 0, BLOCK_SIZE / 2);
        scene.add(bottom);

        //Left Border
        let leftGeometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, grid_rows);
        let leftMaterial = new THREE.MeshLambertMaterial({color: BORDER_COLOR});
        let left = new THREE.Mesh(leftGeometry, leftMaterial);
        
        left.position.set(-(grid_columns / 2) - 1, 0, grid_rows / 2);
        scene.add(left);

        //Right Border
        let rightGeometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, grid_rows);
        let rightMaterial = new THREE.MeshLambertMaterial({color: BORDER_COLOR});
        let right = new THREE.Mesh(rightGeometry, rightMaterial);
        
        right.position.set(grid_columns / 2, 0, grid_rows / 2);
        scene.add(right);
    }

    function writeShapeOrientations() {
        shape_data.forEach(function(shape) {
            if(shape['name'] != 'Square'){
                let firstOrient = shape['orientation'][0];
            
                for(let i = 0; i < 3; i++) {
                    let nextOrient = [];
        
                    firstOrient.forEach(function(b) {
                        if(b[1] == 0){
                            nextOrient.push([0, b[0]]);
                        } else {
                            nextOrient.push([-b[1], b[0]]);
                        };
                    });
        
                    shape['orientation'].push(nextOrient);
                    firstOrient = nextOrient;
                };
            } else if(shape['name'] = 'Square'){
                let commonOrientation = shape['orientation'][0];
                for(let i = 0; i < 3; i++){
                    shape['orientation'][i + 1] = commonOrientation;
                };
            };
        });
    };

    function facetedBox(w, h, d, f) {
        let hw = w * 0.5, hh = h * 0.5, hd = d * 0.5;
        let vertices = [
            // px
            hw, hh - f, -hd + f,   // 0
            hw, -hh + f, -hd + f,  // 1
            hw, -hh + f, hd - f,   // 2
            hw, hh - f, hd - f,    // 3
            
            // pz
            hw - f, hh - f, hd,    // 4
            hw - f, -hh + f, hd,   // 5
            -hw + f, -hh + f, hd,  // 6
            -hw + f, hh - f, hd,   // 7
            
            // nx
            -hw, hh - f, hd - f,   // 8
            -hw, -hh + f, hd - f,  // 9
            -hw, -hh + f, -hd + f, // 10
            -hw, hh - f, -hd + f,  // 11
            
            // nz
            -hw + f, hh - f, -hd,  // 12
            -hw + f, -hh + f, -hd, // 13
            hw - f, -hh + f, -hd,  // 14
            hw - f, hh - f, -hd,   // 15
            
            // py
            hw - f, hh, -hd + f,   // 16
            hw - f, hh, hd - f,    // 17
            -hw + f, hh, hd - f,   // 18
            -hw + f, hh, -hd + f,  // 19
            
            // ny
            hw - f, -hh, -hd + f,  // 20
            hw - f, -hh, hd - f,   // 21
            -hw + f, -hh, hd - f,  // 22
            -hw + f, -hh, -hd + f  // 23
        ];
        
        let indices = [
            0, 2, 1, 3, 2, 0,
            4, 6, 5, 7, 6, 4,
            8, 10, 9, 11, 10, 8,
            12, 14, 13, 15, 14, 12,
            16, 18, 17, 19, 18, 16,
            20, 21, 22, 23, 20, 22,
            
            // link the sides
            3, 5, 2, 4, 5, 3,
            7, 9, 6, 8, 9, 7,
            11, 13, 10, 12, 13, 11,
            15, 1, 14, 0, 1, 15,
            
            // link the lids
            // top
            16, 3, 0, 17, 3, 16,
            17, 7, 4, 18, 7, 17,
            18, 11, 8, 19, 11, 18,
            19, 15, 12, 16, 15, 19,
            // bottom
            1, 21, 20, 2, 21, 1,
            5, 22, 21, 6, 22, 5,
            9, 23, 22, 10, 23, 9,
            13, 20, 23, 14, 20, 13,
            
            // corners
            // top
            3, 17, 4,
            7, 18, 8,
            11, 19, 12,
            15, 16, 0,
            // bottom
            2, 5, 21,
            6, 9, 22,
            10, 13, 23,
            14, 1, 20
        ];
        
        let geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        geom.setIndex(indices);
        geom.computeVertexNormals();
        return geom;
    };

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {

            if (!startTimestamp) startTimestamp = timestamp;

            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = "+" + Math.floor(progress * (end - start) + start);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function wait(ms){
        let start = new Date().getTime();
        let end = start;
        while(end < start + ms) {
        end = new Date().getTime();
    }
    }

    function flash() {
        let box = document.getElementById('flash_transition');
        box.style.position = "absolute";
        box.style.top = 0;
        box.style.left = 0;
        box.style.opacity = 0;

        box.style.opacity = 1;

        box.addEventListener('transitionend', function(){
            game_over();

            wait(250);

            box.style.opacity = 0;
            box.style.left = "100%";
            box.style.top = "100%";
        });
    }

    function getImpactedRows(shape_id, position, orientation) {
        if (shape_data[shape_id] === undefined){
            //Game over
            clearInterval(timer);
            timer = null;
            paused = true;

            let curr_ui;
            let all_ui = document.getElementsByClassName('ui');
            for(let ui = 0; ui < all_ui.length; ui++){
                curr_ui = all_ui[ui]
                curr_ui.style.position = "relative";
            }
            
            document.getElementById('reset').click(); //Resetting camera
            controls.enabled = false;

            //Flash effect
            flash();
        } else {
            let impactedRows = new Set();
            let blocks = shape_data[shape_id]['orientation'][orientation];
        
            blocks.forEach(function(block) {
                let pos = position[1] + block[1];
                impactedRows.add(pos)
            });
        
            return impactedRows;
        }
    }

    function game_over(){
        document.getElementById('game_over').style.visibility = "visible";
        document.getElementById('game_over').style.position = "absolute";

        document.getElementById('game_over').innerHTML = `\
        <h2 class="center" style="margin-top: 20px;">Game over!</h2>\
        <br>\
        <h4 style="margin-left: 30px;">Points earned: ${points} <span class="end_plus" id="points_bonus">+0</span></h4>\
        <h4 style="margin-left: 30px;">Level reached: ${levels['level']} <span class="end_plus" id="level_bonus">+0</span></h4>\
        <br><br><br><br><br><br><br><br>\
        <h4 class="center"><b>You have earned a total of <span class="end_plus" id="total_bonus">+0</span> tickets!</b></h4>\
        <button onclick="location.reload();" style="margin-left: 50%; transform: translateX(-50%); width: 100px; height: 50px;">Replay</button>`

        //Bonuses
        animateValue(document.getElementById('points_bonus'), 0, points * 2, 2000);
        animateValue(document.getElementById('level_bonus'), 0, (levels['level'] - 1) * 10, 2000);
        animateValue(document.getElementById('total_bonus'), 0, ((points * 2) + ((levels['level'] - 1) * 10)), 2000)
    }

    function isRowComplete(row_id) {
        let row = grid[row_id];
        for(let i = 0; i < grid_columns; i++){
            if(row[i]['taken'] >= CELL_EMPTY){
                return false;
            }
        }
        return true;
    }

    function writeShapeToArray(shape_id, position, orientation, going_down=false) {
        if(curr_shape['shape_id'] != undefined) {
            let curr_pos = curr_shape['pos'];
            let shape = shape_data[curr_shape['shape_id']];
            let blocks = shape['orientation'][curr_shape['orientation']];
            
            blocks.forEach(function(block) {
                let pos = [curr_pos[0] + block[0], curr_pos[1] + block[1]];
                changes.push(['remove', pos, curr_shape['shape_id']]);
            });
        }

        let shape = shape_data[shape_id];
        let blocks = shape['orientation'][orientation];

        let valid_change = true;
        let landed = false;

        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i];
            let pos = [position[0] + block[0], position[1] + block[1]];
            
            changes.push(['add', pos, shape_id]);

            let out_of_grid_sides = (pos[0] < 0) || (pos[0]>=grid_columns);
            let out_of_grid_bottom = (pos[1] < 0) || (pos[1] >= grid_rows);
            let blocked_by_another = !out_of_grid_bottom && !out_of_grid_sides && (grid[pos[1]][pos[0]]['taken'] != CELL_EMPTY) && (grid[pos[1]][pos[0]]['taken'] != (shape_id + 1));

            if (out_of_grid_sides || out_of_grid_bottom || blocked_by_another) {
                valid_change = false;

                if (going_down && (!out_of_grid_sides)) {
                    landed = true;
                    break;
                }
            }

        }

        if (valid_change) {
            curr_shape = {
                'shape_id': shape_id,
                'pos': position,
                'orientation': orientation
            };
            update_changes();
        } else if (landed) {
            position = curr_shape['pos'];
            for (let i=0; i<blocks.length; i++) {
                let block = blocks[i];
                let pos = [position[0] + block[0], position[1] + block[1]];
                grid[pos[1]][pos[0]]['taken'] = -(shape_id+1);
            }
            
        } else {
            changes = [];
        }

        return landed;
    };

    function keyPressed(event) {
        if(event.keyCode == KEY_LEFT){ 
            if(!paused){
                writeShapeToArray(curr_shape['shape_id'], [curr_shape['pos'][0] - 1, curr_shape['pos'][1]], curr_shape['orientation']);
            }
        };

        if(event.keyCode == KEY_UP){
            if(!paused){
                let orient = (4 + curr_shape['orientation'] - 1) % 4;
                writeShapeToArray(curr_shape['shape_id'], curr_shape['pos'], orient);
            }
        };

        if(event.keyCode == KEY_RIGHT){
            if(!paused){
                writeShapeToArray(curr_shape['shape_id'], [curr_shape['pos'][0] + 1, curr_shape['pos'][1]], curr_shape['orientation']);
            }
        };

        if(event.keyCode == KEY_DOWN){
            if(!paused){
                let orient = (4 + curr_shape['orientation'] + 1) % 4;
                writeShapeToArray(curr_shape['shape_id'], curr_shape['pos'], orient);
            }
        };

        if(event.keyCode == KEY_SPACE){
            if(!paused){
                clearInterval(timer);
                timerCalled();
                timer = setInterval(timerCalled, TIMER_INTERVAL_DURATION / 15);
            }
        };
    };

    function resetControlsClicked() {
        camera.position.x = 0;
        camera.position.y = -50;
        camera.position.z = 40;
        camera.lookAt(0, 0, 20);
    };

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    };

    function render() {
        requestAnimationFrame(render);

        document.getElementById('points-text').innerHTML = 'Points: ' + points;
        document.getElementById('level-text').innerHTML = 'Level: ' + levels['level'];

        update_changes();

        renderer.render(scene, camera);
    };

    function update_changes() {
        //Drawing blocks
        changes.forEach(function(b) {
            if (b[0] == 'remove') {
                let pos = b[1];
                scene.remove(grid[pos[1]][pos[0]]['object']);
                grid[pos[1]][pos[0]]['taken'] = CELL_EMPTY;
                grid[pos[1]][pos[0]]['object'] = null;
            } else if (b[0] == 'add') {
                let pos = b[1];
                grid[pos[1]][pos[0]]['taken'] = b[2]+1;
                grid[pos[1]][pos[0]]['object'] = drawBlock(pos, shape_data[b[2]]['color']);
            }
            
        });
        changes = [];
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function timerCalled() {
        if(!paused){
            let landed = false;
            if(curr_shape['shape_id'] == undefined){
                let generating_shape_id = getRandomInt(numberOfShapes);
                landed = writeShapeToArray(generating_shape_id, [grid_columns / 2, grid_rows - 1], 0, true);
        
                if(shapeCount[generating_shape_id] == null){
                    shapeCount[generating_shape_id] = 1;
                } else {
                    shapeCount[generating_shape_id] += 1;
                }
            } else {
                landed = writeShapeToArray(curr_shape['shape_id'], [curr_shape['pos'][0], curr_shape['pos'][1] - 1], curr_shape['orientation'], true);
            }
        
            if (landed) {
                // see if rows need to be removed
                let rowsToCheck = getImpactedRows(curr_shape['shape_id'], curr_shape['pos'], curr_shape['orientation']);
                // convert to a list
                rowsToCheck = [...rowsToCheck]; 
                rowsToCheck = rowsToCheck.sort();
                let rowsToRemove = [];
                for (let j = 0; j < rowsToCheck.length; j++) {
                    let row_id = rowsToCheck[j];
                    if (isRowComplete(row_id)) {
                        rowsToRemove.push(row_id);
                    }
                }
        
                if (rowsToRemove.length > 0) {
                    points += Math.pow(rowsToRemove.length, 2);
                    let num_of_rows_to_go_down = new Array(grid_rows).fill(0);
                    for(let i = 0; i < rowsToRemove.length; i++){
                        let row_id = rowsToRemove[i];
                        for (let j = row_id+1; j < grid_rows; j++) {
                            num_of_rows_to_go_down[j]++;
                        }
                    }
        
                    rowsToRemove = rowsToRemove.reverse();
        
                    for(let i = 0; i < rowsToRemove.length; i++){
                        let row_id = rowsToRemove[i];
                        removeRow(row_id);
                        num_of_rows_to_go_down.splice(row_id, 1);
                    }
        
                    for (let row_id =0; row_id<num_of_rows_to_go_down.length; row_id++) {
                        if (num_of_rows_to_go_down[row_id] > 0) {
                            let cells = grid[row_id];
        
                            for (let j = 0; j < grid_columns; j++) {
                                if (cells[j]['object'] != null) {
                                    cells[j]['object'].position.z -= num_of_rows_to_go_down[row_id] * BLOCK_SIZE;
                                }
                            }
                        }
        
                    }
                }
                
                curr_shape['shape_id'] = undefined;
                changes = [];
        
                clearInterval(timer);
                timer = setInterval(timerCalled, TIMER_INTERVAL_DURATION);
            }
        }
    }

    function removeRow(row_id) {
        //Remove objects from the scene
        let row = grid[row_id];
        for(let i = 0; i < grid_columns; i++){
            scene.remove(row[i]['object']);
        };

        //Splice that row_id out of the grid
        grid.splice(row_id, 1);
        

        //Add an empty row at the end of the grid
        let new_row = new Array(grid_columns);

        for (let j = 0; j < grid_columns; j++) {
            new_row[j] = {
                'taken': CELL_EMPTY,
                'object': null
            };
        }
        grid.push(new_row);

        //Calculate wheter the level remains the same, or level up.
        calculateLevel();
    }

    function playSound() {
        backgroundMusic.play();
    }

    function settingsBtn() {
        if(!paused){
            paused = true;
            clearInterval(timer);
        } else {
            paused = false;
            clearInterval(timer);
            timer = setInterval(timerCalled, TIMER_INTERVAL_DURATION);
        }
    }

    function calculateLevel() {
        preLevel = levels['level'];
        levels['level'] = Math.floor(points / levels['difference']) + 1;
        
        if(preLevel != levels['level']) { //Level up
            levelUp();
        }
    }

    function levelUp() {
        //Remove all current obstacles
        for(let y = 0; y < grid_columns; y++){
            for(let x = 0; x < grid_rows; x++){
                if(grid[x][y]['taken'] == CELL_OBSTACLE){
                    scene.remove(grid[x][y]['object']);
                }
            }
        }
        //Add level up sound effects etc
        createObstacles();
    }

    function createObstacles(){
        let rows_range = [];

        //Finding the rows in which an obstacle could spawn
        let row = levels['level'] * 3; //Formula

        for(let i = 0; i < (levels['obstaclesRange'] * 2); i++){ 
            if(i <= levels['obstaclesRange']){
                rows_range.push(Math.round(row - i));
            } else {
                rows_range.push(Math.round(row + (i - levels['obstaclesRange'])));
            }

        }

        //Creating blocks
        for(let i = 0; i < levels['obstacles']; i = i + 0){
            let index = rows_range[getRandomInt(rows_range.length)];
            let y = getRandomInt(grid_columns);
        
            if(grid[index][y]['taken'] == CELL_EMPTY){
                grid[index][y]['object'] = drawBlock([y, index + 1], 0x808080, true);
                grid[index][y]['taken'] = CELL_OBSTACLE;
                i++;
            }
        
            rows_range.sort(function(a, b){return a - b});
        }
    }

    createGameboard();
    render();

    //Plane
    let planeGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.position.set(0, 0, 0);
    scene.add(plane);

    window.addEventListener('keydown', keyPressed, false);
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', playSound, {once: true});

    //End

    document.getElementById('scene').appendChild(renderer.domElement);
}

play();