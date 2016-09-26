var balls = [];

function setup() {
	createCanvas(600, 400);
	translate(width / 2, height / 2);

	for (var i = 0; i < 256; i++) {
		balls.push(
			new Ball(
				random(-width / 2, width / 2),
				random(-height / 2, height / 2),
				random(2, 10))
		);
	}
}

function draw() {
	colorMode(RGB);
	background(0);

	balls.forEach(b => {
		b.update();
	});

	balls.forEach(b => {
		b.collide(balls);
		b.show();
	});

	var pb = balls[0];
	strokeWeight(4);
	stroke(255, 64);
	//line(pb.x, pb.y, mouseX - width / 2, mouseY - height / 2);
}

function mousePressed() {
	var pb = balls[0];
	pb.vx = -(pb.x - (mouseX - width / 2)) / 50;
	pb.vy = -(pb.y - (mouseY - height / 2)) / 50;
}

function Ball(x, y, r) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.r = r;

	colorMode(RGB);
	this.brightness = 64;

	this.update = function() {
		var f = 0.1;
		var a = 2;
		this.vx += cos(this.x * f) * a;
		this.vy += sin(this.y * f) * a;

		this.x += this.vx;
		this.y += this.vy;

		var friction = 0.98;
		this.vx *= friction;
		this.vy *= friction;
	}

	this.show = function() {
		colorMode(RGB);

		this.brightness = lerp(this.brightness, 64, 0.1);

		noStroke();
		fill(this.brightness);
		ellipse(this.x, this.y, r, r);
	}

	this.collide = function(balls) {
		balls.forEach(b => {
			if (this !== b) {

				var b1 = new p5.Vector(this.x, this.y);
				var b2 = new p5.Vector(b.x, b.y);

				var dist = b2.sub(b1);
				var dir = dist.copy().normalize();
				var r = ((this.r + b.r) / 2);

				if (dist.mag() < r - 0.1) {
					var tx = this.x;
					var ty = this.y;
					var tvx = this.vx;
					var tvy = this.vy;

					this.x = b.x - dir.x * r;
					this.y = b.y - dir.y * r;
					b.x = tx + dir.x * r;
					b.y = ty + dir.y * r;

					colorMode(HSB);
					stroke(0, 255, 255);
					line(this.x, this.y, this.x + dist.x * 5, this.y + dist.y * 5);

					this.vx = this.vx - dir.x;
					this.vy = this.vy - dir.y;
					b.vx = b.vx + dir.x;
					b.vy = b.vy + dir.y;

					this.brightness = 255;
					b.brightness = 255;
				}
			}
		});
	}
}
