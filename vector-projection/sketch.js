var v1 = new p5.Vector(100, 0);
var v2 = new p5.Vector(0, 0);

function setup () {
	createCanvas(600, 400);
	translate(width / 2, height / 2);
	angleMode(DEGREES);
}

function draw () {
	background(64);

	if (!mouseIsPressed) {
		v1 = new p5.Vector(mouseX - width / 2, mouseY - height / 2);
	} else {
		v2 = new p5.Vector(mouseX - width / 2, mouseY - height / 2);
	}

	strokeWeight(2);
	stroke(255, 0, 0);
	line(0, 0, v2.x, v2.y);
	stroke(0, 0, 255);
	line(0, 0, v1.x, v1.y);

	strokeWeight(4);
	stroke(0, 255, 0);
	var p = project(v1, v2);
	var offset = (p.copy().rotate(90).normalize().mult(1));
	line(offset.x, offset.y, p.x + offset.x, p.y + offset.y);

	strokeWeight(4);
	stroke(0, 255, 255);
	line(p.x + offset.x, p.y + offset.y, v1.x, v1.y);
}

function project (u, v) {
	var vNormal = v.copy().normalize();
	var angle = p5.Vector.dot(u, vNormal);
	return vNormal.mult(angle);
}
