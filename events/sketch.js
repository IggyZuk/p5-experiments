function setup () {
	createCanvas(600, 400);
	translate(width / 2, height / 2);
}

function draw () {
	background(64);
	OnMouseMoved(mouseX, mouseY);
}

function OnMouseMoved (x, y) {
	var pos = {
		x: x,
		y: y
	};

	var evt = new CustomEvent('mouse_moved', {
		detail: pos
	});

	window.dispatchEvent(evt);
}

window.addEventListener('mouse_moved', function (e) {
	console.log('Mouse Moved: ', e.detail.x, e.detail.y);
});
