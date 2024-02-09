let data;

function preload(){
    data = loadJSON('data.json');
}

function setup() {
    createCanvas(400, 400);
    }

function draw() {
    background(200);
    for (let i = 0; i < data.shapes.length; i++){
        const shapeObj = data.shapes[i];
        fill(shapeObj.color);
        if (shapeObj.shape === 'circle'){
            circle(shapeObj.pos[0], shapeObj.pos[1], 100);
        } else {
            rect(shapeObj.pos[0], shapeObj.pos[1], 100, 100);
        }
    }
}