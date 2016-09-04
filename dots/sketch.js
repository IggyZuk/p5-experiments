var rows = 32;
var columns = 32;
var margin = 10;

var time = 0;

var dots = [];

function Dot (x, y) {
	this.pos = new p5.Vector(x * margin, y * margin);
	this.connections = [];
	this.color = color(random(0, 160), 255, 255);
	this.depth = 0;

	this.addConnection = function (dot) {
		this.connections.push(dot);
	};

	this.showDot = function () {
		noStroke();
		fill(map(this.depth, 0, 1, 0, 50));
		rectMode(CENTER);
		rect(this.pos.x, this.pos.y, 4, 4);
	};

	this.show = function () {
		var r = map(this.depth, 0, 1, 4, 0.5);

		for (var i = 0; i < this.connections.length; i++) {
			var connection = this.connections[i];
			strokeWeight(4);
			stroke(map(this.depth, 0.3, 0.7, 50, 200), 255, 255);
			line(this.pos.x, this.pos.y, connection.pos.x, connection.pos.y);
		}
	};
}

function setup () {
	createCanvas(600, 400);
	colorMode(HSB, 255);
	strokeCap(PROJECT);
	// noiseDetail(1, 1);

	translate((width / 2) - (rows * margin) / 2, (height / 2) - (columns * margin) / 2);

	// add dots
	for (var i = 0; i < rows; i++) {
		dots.push([]);
		for (var j = 0; j < columns; j++) {
			dots[i].push(new Dot(i, j));
		}
	}

	// add lines
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			var dot = dots[i][j];
			var step = 1;
			var scale = 0.25;

			dot.depth = noise(i * scale, j * scale);

			if (i + step < rows && j + step < columns && i - step > 0 && j - step > 0) {
				if (noise(i * scale, j * scale) < 0.25 && random(0, 1) < 0.5) {
					dot.addConnection(dots[i - step][j]);
				}
				if (noise(i * scale, j * scale) < 0.3 && random(0, 1) < 0.5) {
					dot.addConnection(dots[i + step][j]);
				}
				if (noise(i * scale, j * scale) < 0.35 && random(0, 1) < 0.5) {
					dot.addConnection(dots[i][j - step]);
				}
				if (noise(i * scale, j * scale) < 0.4 && random(0, 1) < 0.5) {
					dot.addConnection(dots[i][j + step]);
				}
			}
		}
	}
}

function draw () {
	background(0);

	dots = [];

	// add dots
	for (var i = 0; i < rows; i++) {
		dots.push([]);
		for (var j = 0; j < columns; j++) {
			dots[i].push(new Dot(i, j));
		}
	}

	var offset = new p5.Vector();// new p5.Vector(cos(time * 2) * 50, sin(time * 2) * 50);// new p5.Vector(mouseX / 10, mouseY / 10);

	// add lines
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			var dot = dots[i][j];
			var step = 1;
			var scale = 0.125;
			var threshold = 0.35;

			dot.depth = noise(i * scale + offset.x, j * scale + offset.y, time);

			if (isPositionValid(i, j, step)) {
				if (noise(i * scale + offset.x, j * scale + offset.y, time) < threshold) {
					dot.addConnection(dots[i - step][j]);
				}
				if (noise(i * scale + offset.x + 100, j * scale + offset.y + 100, time) < threshold) {
					dot.addConnection(dots[i + step][j]);
				}
				if (noise(i * scale + offset.x + 1000, j * scale + offset.y + 1000, time) < threshold) {
					dot.addConnection(dots[i][j - step]);
				}
				if (noise(i * scale + offset.x + 10000, j * scale + offset.y + 10000, time) < threshold) {
					dot.addConnection(dots[i][j + step]);
				}
				if (noise(i * scale + offset.x + 100000, j * scale + offset.y + 100000, time) < threshold - 0.1) {
					dot.addConnection(dots[i + step][j + step]);
				}
				if (noise(i * scale + offset.x + 1000000, j * scale + offset.y + 1000000, time) < threshold - 0.1) {
					dot.addConnection(dots[i + step][j - step]);
				}
			}
		}
	}

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			var dot = dots[i][j];
			dot.showDot();
		}
	}

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			var dot = dots[i][j];
			dot.show();
		}
	}

	time += 0.002;
}

function isPositionValid (x, y, step) {
	return (x + step < rows &&
	y + step < columns &&
	x - step >= 0 &&
	y - step >= 0);
}

/*
var rows = 32;
var columns = 32;
var margin = 10;
var dotSize = 5;

var time = 0;

var dots = [];

function setup () {
	createCanvas(600, 400);

	colorMode(HSB, 200);

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			dots.push(new p5.Vector(i * margin, j * margin));
		}
	}
}
function draw () {
	background(0);

	var m = 1;
	m = mouseY / 100;

	for (var i = 0; i < dots.length; i++) {
		var v = map(noise(time + (rows + columns * i) * 0.001), 0, 1, 0, 200);
		var c = (sin((rows + columns * i) * 0.01) + 1) / 2 * v;
		fill(c, 100	, 200);
		dotSize = map(v, 0, 200, -5, 10);
		noStroke();
		ellipse(dots[i].x, dots[i].y, dotSize, dotSize);
	}

	time += 0.1 * m;
}

*/
