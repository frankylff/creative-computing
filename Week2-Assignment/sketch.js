function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
  }
  
  function draw() {
    let drawingColor = color(255, 0, 0); // 初始绘图颜色为红色
    let brushSize = 10; // 初始笔刷大小
  
    if (mouseIsPressed) { // 当鼠标被按下时
      noStroke(); // 不要笔划
      fill(drawingColor); // 填充颜色
      ellipse(mouseX, mouseY, brushSize, brushSize); // 在鼠标位置画圆形
    }
  }
  
  function keyPressed() {
    if (key === 'r') { // 当按下 'r' 键时，将绘图颜色设置为红色
      drawingColor = color(255, 0, 0);
    } else if (key === 'g') { // 当按下 'g' 键时，将绘图颜色设置为绿色
      drawingColor = color(0, 255, 0);
    } else if (key === 'b') { // 当按下 'b' 键时，将绘图颜色设置为蓝色
      drawingColor = color(0, 0, 255);
    } else if (key === '+') { // 当按下 '+' 键时，增加笔刷大小
      brushSize += 5;
    } else if (key === '-') { // 当按下 '-' 键时，减少笔刷大小
      brushSize = max(5, brushSize - 5); // 确保笔刷大小不小于5
    }
  }