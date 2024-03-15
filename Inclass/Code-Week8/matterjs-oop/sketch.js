let engine;
let shape = [];

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);

  engine = Matter.Engine.create();
  const box = new Shape(engine.world, createVector(width/2, 40), createVector(80,80));
  const ground = new Shape(engine.world, createVector(width/2, height), createVector(width - 10, 30), {isStatic: true});

  Matter.Runner.run(engine);
  shape.push(box);
  shape.push(ground);
}

function createShape(x, y){
  let shape; 
  if (random() > 0.5) {
    shape = new Rect(engine.world, createVector(x, y), createVector(random(10, 50), random(10, 50)), options);
  } else {
    shape = new Circle(engine.world, createVector(x, y), createVector(random(10, 50), random(10, 50)), options);
  }
  shapes.push(shape);
}

function draw() {
  background(200);
  
  shape.forEach( shape => {
    shape.display();
  })
}