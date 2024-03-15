let ps;
let myImg;

function preload(){
  myImg = loadImage('./BG-01.jpg');
}

function setup() {
  createCanvas(600, 600);
  ps = new ParticleSystem();
  noStroke();
}

function draw() {
  background(0);

  //image(myImg, 0, 0, height, width);
  ps.update();
  ps.display();

}

function mousePressed() {
  ps.addParticles(10, createVector(mouseX, mouseY));
}

function mouseDragged() {
  
}