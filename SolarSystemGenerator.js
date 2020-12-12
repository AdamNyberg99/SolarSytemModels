let angle;
var sunTexture;
let sunRadius = 50;
var textures = [4];
let zoom;
var sun;
let cnv;
var easycam;
let view_center;

function preload(){
	sunTexture = loadImage('sun.jpg');
	textures[0] = loadImage('earth.jpg');
	textures[1] = loadImage('mars.jpg');
	textures[2] = loadImage('mercury.jpg');
	textures[3] = loadImage('moon.jpg');
}

function setup() {
	cnv = createCanvas(windowWidth, windowHeight,WEBGL);
	//cnv.mouseWheel(zoomOnScroll);
	
	angle = 0;
	sun = new Planet(sunRadius,0,0, sunTexture);
	sun.spawnMoons(5,1);
	//sun.orbit();
	zoom = 0;
	var view_planet = sun.planets[0];
	view_center = view_planet.pos_vec;
	easycam = createEasyCam();  //new Dw.EasyCam(this._renderer, {distance:300, center:[view_center.x,view_center.y,view_center.z], rotation:[0,0,0,1]});
	easycam.setDistanceMin(sunRadius*3);
	easycam.setDistanceMax(5000);
}

function draw() {
	background(0);
	//let camX = map(mouseX, 0, width, 0, 500);
	//console.log(float(cameraV/PI));
	
	//camera(camX, camX, height/2+zoom, tan(PI/6) ,0,0,0,0,1,0);
	//fill(0, 255, 255);
	//rotateX(angle);
	//rect(0,0,150,150);
	
	//plane(500, 500);
	sun.display();
	sun.orbit();
	
	//ambientLight(90, 90, 90);
	//lightFalloff(0.5,0,0);
    pointLight(255, 255, 255, 0, 0, 0);
	//stroke(255, 255, 255, 100);
	//line(0, 0, 400, 400);
	
	// var view_planet = sun.planets[0];
	// view_center = view_planet.pos_vec;
	// let center = [float(view_center.x), float(view_center.y), float(view_center.z)];
	// easycam.setCenter(center,0);
	//easycam.setRotation([1,1,1,1]);
	//easycam.setDistance(500);
	// let camera_pos = easycam.getPosition();
	// beginShape(LINES);
	//     fill(255);
	//     stroke(255);
	// 	//vertex(view_center.x,view_center.y,view_center.z);
	// 	vertex(0,0,0);
	// 	vertex(camera_pos[0],camera_pos[1],camera_pos[2]);
	// 	vertex(0,0,0);
	// endShape(LINES);
	// let cV = createVector(camera_pos[0],camera_pos[1],camera_pos[2]);

	// var rq = Quaternion.fromBetweenVectors(center, camera_pos);
	
	// var rot = easycam.getRotation();
	// var crq = new Quaternion([rot[3],rot[0],rot[1],rot[2]]);
	// //easycam.setDistance(300);
	// // console.log("P vector is:	" + view_center);
	// // console.log("C vector is:	" + cV);
	// // console.log("Ang = 	" + view_center.angleBetween(cV));
	// // console.log("Rot = 	" + easycam.getRotation());
	
	// console.log("diff=	" + crq.sub(rq));
	// var tr = rq.sub(crq);
	// easycam.setRotation([tr.x,tr.y,tr.z,tr.w]);

}

function zoomOnScroll(event){
	if(event.deltaY > 0 && zoom > -height/2+sun.radius*3.2){
		zoom -= (height/2+zoom)*0.1;
	} else if(zoom+height/2 < 5000){
		zoom += (height/2+zoom)*0.1;
	}
	//console.log(zoom);
	//console.log(height/2+zoom);
}