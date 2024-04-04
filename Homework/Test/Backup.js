let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner,
    Constraint = Matter.Constraint,
    Events = Matter.Events;

let engine;
let world;
let machineA;
let machineB;
let machineA2;
let machineB2;
let machineC;
let machineD;
//let machineE;
let pistons;

let balls = [];
let runner;
//let box;
let constraint;
let constraintB;
//let customRect;
let Piston;
let ConstraintB;

function setup() {
    createCanvas(600, 600);
    engine = Engine.create();
    runner = Runner.create();
    world = engine.world;

    Runner.run(runner, engine);

    let render = Render.create({
        element: document.getElementById('matter-container'), // 使用指定的容器元素
        engine: engine,
        options: {
            width: 600,
            height: 600,
            wireframes: false // 禁用线框模式
        }
    });
    

// 将 Render 对象添加到页面上
Render.run(render);

    machineA = Bodies.rectangle(502, height / 2 + 20, 200, 10, {isStatic: true});
    machineA2 = Bodies.rectangle(750, height / 2 + 20, 200, 10, {isStatic: true});
    machineB = Bodies.rectangle(502, height / 2 - 20, 200, 10, {isStatic: true});
    machineB2 = Bodies.rectangle(750, height / 2 - 20, 200, 10, {isStatic: true});
    machineC = Bodies.rectangle(width, height / 2, 10, 40, {isStatic: true});
    machineD = Bodies.rectangle(width - 193, 150, 5, 340, {isStatic: true});
    //machineE = Bodies.rectangle(width - 193, 450, 5, 280, {isStatic: true});
    
    pistons = Bodies.rectangle(width - 100, height / 2, 40, 40);

    machineA.friction = 0.001;
    machineB.friction = 0.001;
    pistons.friction = 0.001;

    let partA = Bodies.rectangle(width / 2, height / 2, 200, 10);
    let partB = Bodies.rectangle(width / 2, height / 2, 10, 200, { render: partA.render });

    let compoundBodyA = Body.create({
        parts: [partA, partB],
        render: {
            fillStyle: '#FF0000', // 设置填充颜色为红色
            strokeStyle: '#000000', // 设置描边颜色为黑色
            lineWidth: 1 // 设置描边线宽
        }
    });

    //box = Bodies.rectangle(width / 2, height / 2, 200, 10);

    constraint = Constraint.create({
        pointA: { x: width / 2, y: height / 2 },
        bodyB: compoundBodyA,
        stiffness: 1,
        damping:0.01
    });

    constraintB = Constraint.create({
        bodyA: compoundBodyA,
        pointA: { x: 30, y: 0 }, // 将 pointA 设置为 box 的最左端
        bodyB: pistons,
        pointB: { x: 0, y: 0 }, // 设置 pointB 为 pistons 的正中心
        stiffness: 0.1,
        damping:0.01,
    });
    

    //customRect = new CustomRect(box, 200, 10);
    //let Rect1; 
    //Rect1 = new CustomRect(partA, 200, 10);
    //let Rect2;
    //Rect2 = new CustomRect(partB, 200, 10);
    //Piston = new CustomRect(pistons, 30, 30);

    World.add(world, [compoundBodyA, machineA, machineA2, machineB, machineB2,machineC, machineD, pistons, constraint, constraintB]);

    /*for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];
        fill(255, 0, 0);
        if (ball.position.y > height) {
            balls.splice(i, 1);
            World.remove(world, ball);
        } else {
            ellipse(ball.position.x, ball.position.y, 20);
        }
    }

    if (balls.length < 100) {
        let x = random(150, 300);
        let ball = Bodies.circle(x, 0, 10, { label: 'circle' }); 
        balls.push(ball);
        World.add(world, ball);
    }*/

    setInterval(function() {
        if (balls.length < 50000) {
            let x = random(150, 300);
            let ball = Bodies.circle(x, 0, 10, { label: 'circle' }); 
            balls.push(ball);
            World.add(world, ball);
        }
        if (ball.position.y > height) {
            balls.splice(i, 1);
            World.remove(world, ball);
        }
    }, 5); // 每秒创建一个新球

}

function draw() {

    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];
        if (ball.position.y > height + 100) { // 如果球的 y 坐标大于 canvas 的高度 + 100，说明它已经足够远了
            balls.splice(i, 1); // 从数组中移除该球
            World.remove(world, ball); // 从世界中移除该球
        }
    }
    /*background(255);

    Matter.Engine.update(engine);

  // 获取约束的锚点坐标
    let pointA = constraintB.bodyA.position;
    let pointB = constraintB.bodyB.position;

    noStroke();
    fill(100);
    rectMode(CENTER);
    rect(machineA.position.x, machineA.position.y, 200, 10);
    rect(machineB.position.x, machineB.position.y, 200, 10);
    rect(machineC.position.x, machineC.position.y, 10, 40);
    rect(machineD.position.x, machineD.position.y, 10, 340);
    //rect(machineE.position.x, machineE.position.y, 10, 280);
    

    //customRect.display();
    Piston.display();
    //Rect1.display();
    //Rect2.display();
    //ConstraintB.display();

    stroke(0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);

    noStroke();

    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];
        fill(255, 0, 0);
        if (ball.position.y > height) {
            balls.splice(i, 1);
            World.remove(world, ball);
        } else {
            ellipse(ball.position.x, ball.position.y, 20);
        }
    }

    if (balls.length < 100) {
        let x = random(150, 300);
        let ball = Bodies.circle(x, 0, 10, { label: 'circle' }); 
        balls.push(ball);
        World.add(world, ball);
    }*/
}

/*class CustomRect {
    constructor(body, width, height) {
        this.body = body;
        this.width = width;
        this.height = height;
    }

    display() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(0, 0, 255);
        rect(0, 0, this.width, this.height);
        pop();
    }
}
*/

//将constraintB的pointA连接到box的最左端，使其的位置会根据box的运动而改变。