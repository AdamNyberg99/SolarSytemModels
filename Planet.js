class Planet{
    
    constructor(radius, distance, orbitalSpeed,img){
        this.radius = radius;
        this.distance = distance;
        this.orbitalSpeed = orbitalSpeed;
        this.img = img;
        
        this.planets = [];
        this.angle  = 0;
        this.v = p5.Vector.random3D();
        this.v.mult(distance);
        
        this.v2 = createVector(1, 0, 1);
        this.p = this.v.cross(this.v2);
        this.p_N = this.p.normalize();
        this.pos_vec = (this.v.mult(cos(this.angle))).add((this.p.cross(this.v)).mult(sin(this.angle)));
        
        this.red = random(0,255);
        this.green = random(0,255);
        this.blue = random(0,255);
    }

    orbit(){
        this.angle +=  this.orbitalSpeed;
        if(this.planets != null){
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].orbit();
            }
        }
    }

    spawnMoons(total, level){
        this.planets.length = total;
        for (let i = 0; i < this.planets.length; i++) {
            let r = this.radius/(level*2);
            let d = random(this.radius +r+100/level, this.radius+r+100/level*2);
            let o = random(-0.005,0.005);
            let index = int(random(0,textures.length))
            this.planets[i] = new Planet(r, d, o, textures[index]);
            if(level < 3){
                let numMoons = int(random(0,3));
                this.planets[i].spawnMoons(numMoons, level+1);
            }
        }
    }

    display(){

        push();
        noStroke();
        
        let v_temp = createVector(this.v.x, this.v.y, this.v.z);
        
        // Rodigues Rotation Formula
        let Rv = (v_temp.mult(cos(this.angle))).add((this.p.cross(this.v)).mult(sin(this.angle)));
        //rotate(this.angle);
        this.pos_vec=Rv;
        // strokeWeight(1);
        // stroke(255);
        //  beginShape(LINES);
	    //  fill(255);
	    //  stroke(255);
	    //  vertex(0,0,0);
	    //  vertex(Rv.x,Rv.y,Rv.z);
	    //  endShape(LINES);
        //line(0,0,0,p.x*5,p.y*5,p.z*5);
        //line(0,0,0,Rv.x,Rv.y,Rv.z);
        if(this == sun.planets[1]){
        pointLight(255, 0, 0, Rv.x, Rv.y, Rv.z);
        }
        translate(Rv.x, Rv.y, Rv.z);
        //ambientLight([10, 0, 0], 0);
        
        noStroke();
        
        ambientMaterial(this.red, this.green, this.blue);


        //texture(this.img);
        sphere(this.radius);


        if(this.planets != null){
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].display();
            }
        }
        
        pop();
    }
}