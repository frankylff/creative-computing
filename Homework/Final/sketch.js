let xSun = 0, ySun = 0, zSun = 0;
let xEarth = 0, yEarth = 0, zEarth = 0;
let xMoon = 0, yMoon = 0, zMoon = 0;

let revolutionAngle = 20;
let rotationAngle = 0;
let revolutionRadius = 300;
let sun, earth, moon;
let stars = [];
let camX, camY, camZ = 700;
 
function preload() {
  sun = loadImage("assets/sun.jpg");
  earth = loadImage("assets/earth.jpg");
  moon = loadImage("assets/moon.jpg");
  sound = loadSound("assets/sound.mp3");
}
 
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.mousePressed(canvasPressed);

  for (let i = 0; i < 300; i++) {
    stars.push({
      x: 0,
      y: 0,
      offset: Math.random() * 360,
      orbit: (Math.random() + 0.01) * max(width, height),
      radius: Math.random() * 2,
      vx: Math.floor(Math.random() * 10) - 5,
      vy: Math.floor(Math.random() * 10) - 5,
    });
  }
}
 
////////////////////////////////////////////////////////////////

function drawSun() {
  push();
  translate(xSun, xSun, zSun);
  fill(0, 255, 255);
  texture(sun);
  pointLight(255, 255, 255, 0, 0, 100000);
  rotateY(rotationAngle / 5);
  sphere(200);
  pop();
  push();

  translate(xSun, ySun, zSun);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(800, 0.7, 240);
  pop();
}
 
function drawEarth() {
  xEarth = xSun + 800 * cos(revolutionAngle);
  zEarth = zSun + 800 * sin(revolutionAngle);
  push();
  translate(xEarth, yEarth, zEarth);
  rotateY(rotationAngle);
  texture(earth);
  sphere(40);
  pop();
  push();

  translate(xEarth, yEarth, zEarth);
  rotateX((PI / 180) * 90);
  fill(240);
  torus(60, 0.7, 240);
  pop();
  revolutionAngle += 0.005;
}
 
function drawMoon() {
  xMoon = xEarth + 60 * cos(revolutionAngle * 5);
  zMoon = zEarth + 60 * sin(revolutionAngle * 5);
  push();

  translate(xMoon, yMoon, zMoon);
  rotateY(-rotationAngle);
  texture(moon);
  sphere(10);
  pop();
}
 
function drawStars() {
  colorMode(RGB, 255, 255, 255, 1);
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    push();
    translate(s.x - width / 2, s.y - height / 3, -1000);
    sphere(5);
    pop();
  }
  update();
}
 
////////////////////////////////////////////////////////////////

function update() {
  let originX = width / 2;
  let originY = height / 2;
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    let rad = (frameCount * (1 / (s.orbit * 2 + s.offset)) + s.offset) % TAU;
    s.x = originX + cos(rad) * (s.orbit * 2);
    s.y = originY + sin(rad) * s.orbit;
  }
}
 
function setLight() {
  pointLight(255,255,255,0,0,0,500);
  ambientLight(0);
}
 
function mouseWheel(event) {
  if (event.deltaY > 0) {
    camZ += 10; 
  } else {
    camZ -= 10;
  }
}
 
function canvasPressed() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}

////////////////////////////////////////////////////////////////

function draw() {
  clear();
  background(0);
  setLight();
  drawSun();
  drawEarth();
  drawMoon();
  drawStars();

  camX = (mouseX - width / 2) / 10;
  camY = (mouseY - height / 2) / 10;
  camera(camX, camY-300 , camZ+1000, 0, 0, 0, 0, 1, 0);
  noStroke();
  rotationAngle += 0.01;
}