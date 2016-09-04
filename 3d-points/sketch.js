var img = null;

var margin = 10;
var dotSize = 1;

var time = 0;

var slider = null;
var slider2 = null;

function preload () {
	img = loadImage('assets/world-heightmap.png');
}

function setup () {
	createCanvas(800, 600, WEBGL);
	perspective(60 / 300 * PI, width / height, 0.1, 10);
	colorMode(HSB, 255);
	frameRate(120);

	slider = createSlider(0, 50, margin);
	slider2 = createSlider(0, 50, dotSize);
}

function draw () {
	background(0);
	ambientLight(64);
	pointLight(0, 0, 255, 0, 100, 200);

	var noiseStep = 0.05;
	var noiseAmp = 50;
	var heightMapAmp = 5;

	margin = slider.value();
	dotSize = slider2.value();

	//	orbitControl();
	// translate(0, 50, 0);
	// rotateY(cos(PI / 8 * time));
	// rotateY(PI);
	rotateX(-PI / 3.5);
	for (var i = 0; i < img.width; i++) {
		for (var j = 0; j < img.height; j++) {
			ambientMaterial(map(brightness(img.get(i, j)), 128, 255, 80, 35), map(brightness(img.get(i, j)), 128, 255, 255, 0), 255);
			push();
			translate((i - img.width / 2) * margin, (j - img.height / 2) * margin, map(brightness(img.get(i, j)), 128, 255, -heightMapAmp, heightMapAmp));// map(noise(i * noiseStep + time, j * noiseStep + time), 0, 1, -noiseAmp, noiseAmp));
			if (brightness(img.get(i, j)) != 0) sphere(dotSize);
			pop();
		}
	}
	line(0, 0, 100, 100);

	time += 0.25;
}
