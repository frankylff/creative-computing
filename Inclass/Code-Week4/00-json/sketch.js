let data;
let btn;

function preload(){
    data = loadJSON('data.json');
}

function setup() {
    createCanvas(400, 400);
    background(220);
    btn = creatBotton('click me');
    btn.position(0, 430);
    btn.mousePressed( event => background(random(255)) );
}

/*
function draw() {
    background(200);
    for (let i = 0; i < data.shapes.length; i++){
        let shapeObj = data.shapes[i];
        fill(shapeObj.color);
        if (shapeObj.shape === 'circle'){
            circle(shapeObj.pos[0], shapeObj.pos[1], 100);
        } else {
            rect(shapeObj.pos[0], shapeObj.pos[1], 100, 100);
        }
    }
}
*/