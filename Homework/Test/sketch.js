var engine;
var render;
var rectHorizontal, rectVertical;
var constraintHorizontal, constraintVertical;

function setup() {
  createCanvas(400, 400);

  // 创建 Matter.Engine
  engine = Matter.Engine.create();
  world = engine.world;

  // 创建一个 Render 实例，并设置属性
  render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 400,
      height: 400,
      background: '#fff',
      wireframes: false // 设置为 true 可以显示线框
    }
  });

  // 添加 Render 到文档中
  Matter.Render.run(render);

  // 创建水平和垂直的矩形刚体
  rectHorizontal = Matter.Bodies.rectangle(200, 200, 200, 20);
  rectVertical = Matter.Bodies.rectangle(200, 200, 20, 100);

  // 创建复合刚体
  var size = 200;
  var x = 200;
  var y = 200;
  let partA = Matter.Bodies.rectangle(x, y, size, size / 5);
  let partB = Matter.Bodies.rectangle(x, y, size / 5, size, { render: partA.render });
  let compoundBodyA = Matter.Body.create({
    parts: [partA, partB]
  });

  // 添加刚体到世界
  Matter.World.add(world, [rectHorizontal, rectVertical, compoundBodyA]);

  // 创建连接约束
  constraintHorizontal = Matter.Constraint.create({
    bodyA: rectHorizontal,
    bodyB: rectVertical,
    stiffness: 0.5
  });

  constraintVertical = Matter.Constraint.create({
    bodyA: rectHorizontal,
    bodyB: rectVertical,
    pointA: { x: 0, y: -50 },
    pointB: { x: 0, y: 50 },
    stiffness: 0.5
  });

  // 添加约束到世界
  Matter.World.add(world, [constraintHorizontal, constraintVertical]);
}

function draw() {
  // draw() 函数不再需要，因为渲染由 Matter.Render 实现
}
