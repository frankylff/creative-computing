let btn;
let numOfCircle = 0;

function setup() {
    createCanvas(400, 400);
    btn = creatButton("Click Me");
    btn.addClass('my-button');
    btn.mousePressed(btnPressed);
    }

function draw() {
    background(210);
    for (let i = 0; i < numOfCircle; i++) {
        circle(random(width),random(height),random(5,15));
    }
}