var modelInstance = {
	model: null,
	texture: null,
	x: 0,
	y: 0
};

function setup () {
	createCanvas(600, 400, WEBGL);
	modelInstance.model = loadModel('assets/turtle.obj', true);
	modelInstance.texture = loadImage('assets/turtle.png');
}

function draw () {
	background(32);

	modelInstance.x = mouseX - width / 2;
	modelInstance.y = mouseY - height / 2;

	var d = map(dist(0, 0, modelInstance.x, modelInstance.y), 0, width , 0, TWO_PI);

	push();
	translate(modelInstance.x, modelInstance.y, 0);
	rotateZ(atan2(modelInstance.x, modelInstance.y));
	rotateX(d);
	texture(modelInstance.texture);
	model(modelInstance.model);
	pop();
}
