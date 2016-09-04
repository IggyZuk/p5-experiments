var nameP;

var button;
var slider;
var input;

var tint;

var img;

function setup () {
	var c = createCanvas(600, 400);
	translate(width / 2, height / 2);

	c.drop(gotFile);

	nameP = createP('Your Name!');

	button = createButton('Change Color');
	createElement('br');
	button.mousePressed(changeColor);
	createElement('br');
	slider = createSlider(0, 100, 50);
	createElement('br');
	input = createInput('hello');

	tint = color(128);
}

function draw () {
	background(64);

	fill(tint);
	ellipse(0, 0, slider.value(), slider.value());

	text(input.value(), 10, 20);
	nameP.html(input.value().substring(0, slider.value()));

	// Draw the image onto the canvas
	if (img) image(img, 0, 0, width, height);

	// nameP.position(mouseX, mouseY);
}

function changeColor () {
	tint = color(random(255));
	createElement('h1', 'hey');
}

function gotFile (file) {
	img = createImg(file.data);
}
