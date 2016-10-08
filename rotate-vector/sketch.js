var vectorA = null;
var vectorB = null;
var angle = 360;

var steps = angle / 4;
var step = -5;

function setup() {
	createCanvas(600, 400);
	translate(width / 2, height / 2);
	background(64);
	frameRate(30);

	vectorA = new p5.Vector(0, -60);
	vectorB = new p5.Vector(vectorA.x - 34, vectorA.y - 34);

	stroke(75);
	line(-width / 2, 0, width / 2, 0);
	line(0, -height / 2, 0, height / 2);

	drawVectors(255);
}

function draw() {
	if (step < steps) {
		if (step > 0) {
			vectorA.rotate(-(angle / steps) * (PI / 180));
			vectorB.rotate(-(angle / steps) * (PI / 180));
			drawVectors((step + 1) * 255 / steps);
		}
		step++;
	}
}

function drawVectors(a) {
	noStroke();
	fill(255, 0, 255);
	ellipse(0, 0, 5, 5);

	stroke(255, 0, 0, a);
	line(0, 0, vectorA.x, vectorA.y);
	fill(255, 0, 0, a);
	ellipse(vectorA.x, vectorA.y, 5, 5);

	stroke(0, 255, 0, a);
	line(0, 0, vectorB.x, vectorB.y);
	fill(0, 255, 0, a);
	ellipse(vectorB.x, vectorB.y, 5, 5);

	stroke(0, 0, 255, a);
	line(vectorA.x, vectorA.y, vectorB.x, vectorB.y);
}
