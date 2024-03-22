let engine;
let shapes = [];
let walls;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);

  engine = Matter.Engine.create();
  walls = new Walls(engine.world);
  walls.addBottomWall();

  let preCircle = null;
  let anchor = {x: innerWidth/2, y:50};
  const size = 25;
  for (let i = 0; i < 10; i++){
    const circle = createCircle(anchor.x + i * size, anchor.y, size);
    const constraintOptions = {bodyB: circle.body, stiffness:0.5}

    if (preCircle){
      constraintOptions.bodyA = preCircle.body;
    } else {
      constraintOptions.pointA = anchor;
    }

    const constraint = Matter.Constraint.create(constraintOptions);
    Matter.Composite.add(engine.world, constraint);
    preCircle = circle;
  }

  //const circle1 = createCircle(300, 100);
  //const circle2 = createCircle(350, 100);
  //shapes.push(circle1, circle2);
  //const constraintOptions1 = {pointA: {x: 300, y:50}, bodyB: circle1.body, stiffness:0.5}
  //const constraintOptions = {bodyA: circle1.body, bodyB: circle2.body, stiffness:0.5}
  //const constraint = Matter.Constraint.create(constraintOptions);
  //const constraint1 = Matter.Constraint.create(constraintOptions1);
  //Matter.Composite.add(engine.world, constraint);
  //Matter.Composite.add(engine.world, constraint1);

  const matterMouse = Matter.Mouse.create();
  const mcOptions = {mouse: matterMouse};
  const mouseConstraint = Matter.MouseConstraint.create(engine, mcOptions);
  Matter.Composite.add(engine.world, mouseConstraint);
  Matter.Runner.run(engine);

}

function createCircle(x, y, size, options) {
  let shape = new Circle(engine.world, createVector(x, y), createVector(25, 25), options);

  shapes.push(shape);
  return shape;
}

function draw() {
  background(200);
  walls.display();

  for (let i = shapes.length-1; i>=0; i --){
    const s = shapes[i];
    s.display();
    if(s.isDead()){
      shapes.splice(i, 1);
    }
  }
}