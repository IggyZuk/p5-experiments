var time = 0;
var slider = null;

function setup() {
	createCanvas(600, 400);
	translate(width / 2, 0);
	background(0);
	slider = createSlider(0, 10000);
}

function draw() {
	colorMode(RGB);
	background(0);

	time += 0.05;
	//time = slider.value();

	for (var i = 0; i < 1000; i++) {
		drawDot(time * 0.01, i * 0.1);
	}
}

function drawDot(time, offset) {
	colorMode(HSB);
	noStroke();
	fill(time + offset * 2.5, 255, 255);
	ellipse(a(time + offset), b(time + offset), offset, offset);
}

function a(t) {
	return cos(t * sin(t)) * t;
}

function b(t) {
	return sin(t * cos(t)) * t + 5 * t;
}
