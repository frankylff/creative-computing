function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
  }
  
  function draw() {
    let drawingColor = color(255, 0, 0);
    let brushSize = 10;
  
    if (mouseIsPressed) {
      noStroke();
      fill(drawingColor);
      ellipse(mouseX, mouseY, brushSize, brushSize);
    }
  }
  
  function keyPressed() {
    if (key === 'r') {
      drawingColor = color(255, 0, 0);
    } else if (key === 'g') {
      drawingColor = color(0, 255, 0);
    } else if (key === 'b') {
      drawingColor = color(0, 0, 255);
    } else if (key === '+') {
      brushSize += 5;
    } else if (key === '-') {
      brushSize = max(5, brushSize - 5);
    }
  }