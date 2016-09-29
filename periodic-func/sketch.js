var time = 0;
var step = 0.01;
var slider = null;
var mx = 2;
var my = 2;

function setup() {
	createCanvas(600, 400);
	translate(width / 2, height / 2);
	background(0);
	slider = createSlider(0.0, 50.0, 0.0, 0.0005);
}

function draw() {
	colorMode(RGB);
	background(0);

	time += step;
	//time = slider.value();

	for (var i = 0; i < 1000; i++) {
		drawDot(time, i * 0.2);
	}
}

function drawDot(time, offset) {
	colorMode(HSB);
	strokeWeight((cos(offset * 10) + 1 / 2) * 5);
	var hue = time + offset * 2.5
	stroke(hue, hue > 255 ? 0 : 255, 255);
	line(a(time + offset), b(time + offset), a(time + step + offset), b(time + step + offset));
}

function a(t) {
	return cos(t) * (t * t) * 0.1 * mx;
}

function b(t) {
	return sin(t) * c(t) * my;
}

function c(t) {
	return t * noise(t * 0.1);
}

function mouseDragged() {
	if (keyIsPressed === true) {
		mx = mouseX / 10;
		my = mouseY / 10;
	}
}
