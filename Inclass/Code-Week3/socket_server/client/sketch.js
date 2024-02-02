let ws;
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.addClass('background');
  background(220);

  ws = new WebSocket("ws://localhost:3000")
}

function mouseDragged() {
  line(pmouseX, pmouseY, mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}