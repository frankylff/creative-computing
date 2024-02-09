
let data;

function setup() {
    canvas = createCanvas(400, 400);
    let myArr = [];
    data = {"id": 1234, "name":cc, 
            "shapes":[
                {
                    "pos": [100,100],
                    "color": [255,0,0],
                    "shape": "circle",
                },
                {
                    "pos": [200,200],
                    "color": [255,255,0],
                    "shape": "rect",
                }
            ] 
        }
    }

function draw() {
    background(220);
    for (let i = 0; i < data.shapes.length; i++){
        const shapeOnj = data.shapes[i];
        fill(shapeOnj.color);
        if (shapeObj.shpe === 'circle'){
            circle(shapeObj.pos[0], shapeObj.pos[1], 100);
        } else {
            Reflect(shapeObj.pos[0], shapeObj.pos[1], 100, 100);
        }
    }
}