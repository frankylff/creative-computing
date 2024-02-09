let data;
let resPromise;

/*
function preload(){
    data = loadJSON('data.json');
}
*/

function setup() {
    createCanvas(400, 400);
    background(220);

    resPromise = fetch('data.json');
    resPromise.then( (res) => {
        res.json().then( jsonObj => {
            data = jsonObj;
        });
    });
}

function draw() {
    background(220);
    if (!data) return;

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