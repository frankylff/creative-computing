class Rect extends Shape {
    constructor(world, pos, size, options){
        super(world, pos, size, options);
    }

    createBody(pos){
        return Matter.Bodies.rectangle(pos.x, pos.y, this.size.x, this.size.y, options);
    }

    display(){
        rect(this.body.position.x, this.body.position.y, this.size.x, this.size.y);
    }

} 