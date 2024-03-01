class ParticleSystem {
    constructor(){
        this.particles = [];
    }

    addParticles(num, loc){
        let size = 10;
        for(let i = 0; i < num; i++){
            let p = new RigidBody(loc.x, loc.y, size);
            this.particles.push(p);
        }
    }

    update(){
        this.particles.forEach( p => {
            p.update();
            p.bounce();
        });
    }

    display(){
        this.particles.forEach( p =>{
            p.display();
        })
    }
}