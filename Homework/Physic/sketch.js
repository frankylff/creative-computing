let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Body = Matter.Body;
let Runner = Matter.Runner;
let Constraint = Matter.Constraint;
let Events = Matter.Events;

let engine;
let world;
let cylinderA;
let cylinderB;
let cylinderC;
let dam;
let piston;

let waters = [];
let runner;
let constraint;
let constraintB;

function setup() {
    createCanvas(600, 600);

    engine = Engine.create();
    runner = Runner.create();
    world = engine.world;

    Runner.run(runner, engine);

    let render = Render.create({
        element: document.getElementById('matter-container'),
        engine: engine,
        options: {
            width: 600,
            height: 600,
            wireframes: false,
            background: '#D4F2E7'
        }
    });
    
Render.run(render);

    cylinderA = Bodies.rectangle(505, 140, 200, 290, {isStatic: true, render:{
        fillStyle: '#778899',
        strokeStyle: '#778899',
        lineWidth: 1}});
    cylinderB = Bodies.rectangle(505, height-140, 200, 290, {isStatic: true, render:{
        fillStyle: '#778899',
        strokeStyle: '#778899',
        lineWidth: 1}});
    cylinderC = Bodies.rectangle(width - 5, height / 2, 10, 50, {isStatic: true, render:{
        fillStyle: '#778899',
        strokeStyle: '#778899',
        lineWidth: 1}});
    dam = Bodies.rectangle(width - 190, height / 2, 10, height, {isStatic: true, render:{
        fillStyle: '#778899',
        strokeStyle: '#778899',
        lineWidth: 1}});
    
    piston = Bodies.rectangle(width - 20, height / 2, 30, 30, {render:{
        fillStyle: '#808080',
        strokeStyle: '#808080',
        lineWidth: 1}});

    cylinderA.friction = 0.001;
    cylinderB.friction = 0.001;
    piston.friction = 0.001;

    let partA = Bodies.rectangle(width / 2, height / 2, 200, 10, {render:{
        fillStyle: '#8B4513',
        strokeStyle: '#8B4513',
        lineWidth: 1}});
    let partB = Bodies.rectangle(width / 2, height / 2, 10, 200, {render:{
        fillStyle: '#8B4513',
        strokeStyle: '#8B4513',
        lineWidth: 1}});

    let waterwheel = Body.create({
        parts: [partA, partB]
    });

    constraint = Constraint.create({
        pointA: { x: width / 2, y: height / 2 },
        bodyB: waterwheel,
        stiffness: 1,
        damping:0.01
    });

    constraintB = Constraint.create({
        bodyA: waterwheel,
        pointA: { x: 65, y: 0 },
        bodyB: piston,
        pointB: { x: 0, y: 0 },
        stiffness: 1,
        damping:0.01,
        render: {
            lineWidth: 10,
            strokeStyle: '#663300'
        }
    });

    World.add(world, [waterwheel, cylinderA, cylinderB, cylinderC, dam, piston, constraint, constraintB]);

    setInterval(function() {
        if (waters.length < 300) {
            let x = random(0, 300);
            let water = Bodies.circle(x, -10, 8, 
                { label: 'circle', 
                render:{
                fillStyle: '#87CEEB',
                strokeStyle: '#87CEEB',
                lineWidth: 1}
                }
            ); 
            waters.push(water);
            World.add(world, water);
        }
        if (water.position.y > height) {
            waters.splice(i, 1);
            World.remove(world, water);
        }
    }, 3);

}

function draw() {
    for (let i = waters.length - 1; i >= 0; i--) {
        let water = waters[i];
        if (water.position.y > height + 100) {
            waters.splice(i, 1);
            World.remove(world, water);
        }
    }
}
