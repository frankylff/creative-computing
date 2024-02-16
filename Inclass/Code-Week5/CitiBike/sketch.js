let data;
function preload() {
    data = loadJSON('./Data/2023-11-06.json')
}

function setup() {
    createCanvas(600, 600);
    console.log('station', data.stations.lenght);
}

function draw() {
    background(200);
}