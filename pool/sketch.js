var balls = [];
var slider = null;

function setup() {
	createCanvas(600, 400);
	translate(width / 2, height / 2);
	background(0);
	frameRate(30);

	for (var i = 0; i < 128; i++) {
		balls.push(
			new Ball(
				random(-width / 2, width / 2),
				random(-height / 2, height / 2),
				random(1, 4))
		);
	}

	slider = createSlider(0.1, 16, 1);
}

function draw() {
	colorMode(RGB);
	background(0, 16);

	balls.forEach(b => { b.update(); });
	balls.forEach(b => { b.collide(balls); });
	balls.forEach(b => { b.show(); });
}

function Ball(x, y, r) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.r = r;
	this.life = random(1024);
	this.ax = random(-1, 1);
	this.ay = random(-1, 1);

	this.brightness = 64;

	this.update = function() {
		var timeScale = slider.value();

		var s = 0.01;
		this.vx += -this.x * s;
		this.vy += -this.y * s;

		this.life += 0.1;
		this.vx += cos(this.life) * this.ax;
		this.vy += sin(this.life) * this.ay;

		this.x += this.vx;
		this.y += this.vy;

		var friction = 0.9;
		this.vx *= friction;
		this.vy *= friction;

		if (this.x < -width / 2) {
			this.x = -width / 2;
			this.vx = -this.vx;
		} else if (this.x > width / 2) {
			this.x = width / 2;
			this.vx = -this.vx;
		}
		if (this.y < -height / 2) {
			this.y = -height / 2;
			this.vy = -this.vy;
		} else if (this.y > height / 2) {
			this.y = height / 2;
			this.vy = -this.vy;
		}
	}

	this.show = function() {
		colorMode(RGB);

		this.brightness = lerp(this.brightness, 0, 0.33);
		colorMode(HSB);
		strokeWeight(2);
		stroke(this.brightness, 255, 255);
		line(this.x, this.y, this.x + this.vx, this.y + this.vy);

		noStroke();
		fill(this.brightness, 255, 255);
		// ellipse(this.x, this.y, r, r);
	}

	this.collide = function(balls) {
		balls.forEach(b => {
			if (this !== b) {

				var b1 = new p5.Vector(this.x, this.y);
				var b2 = new p5.Vector(b.x, b.y);

				var dist = b2.sub(b1);
				var dir = dist.copy().normalize();
				var r = ((this.r + b.r) / 2);
				var mag = dist.mag();

				if (mag < 100) {
					var grav = 0.05;
					this.vx += dir.x * dist.x * grav;
					this.vy += dir.y * dist.y * grav;
					b.vx += -dir.x * dist.x * grav;
					b.vy += -dir.y * dist.y * grav;
				}

				if (mag <= 17) {
					colorMode(RGB);
					strokeWeight(2);
					stroke(32);
					//line(this.x, this.y, b.x, b.y);
				}

				if (mag < r) {
					// var tx = this.x;
					// var ty = this.y;
					// var tvx = this.vx;
					// var tvy = this.vy;
					//
					// this.x = b.x - dir.x * r;
					// this.y = b.y - dir.y * r;
					// b.x = tx + dir.x * r;
					// b.y = ty + dir.y * r;

					colorMode(HSB);
					strokeWeight(4);
					stroke(0, 255, 255);
					//line(this.x, this.y, b.x + dist.x * 3, this.y + dist.y * 3);

					// this.vx = this.vx + dir.x * b.vx;
					// this.vy = this.vy + dir.y * b.vy;
					// b.vx = -b.vx + dir.x * this.vx;
					// b.vy = -b.vy + dir.y * this.vy;

					// this.vx = this.vx + (this.vx - b.x) * 0.1;
					// this.vy = this.vy + (this.vy - b.y) * 0.1;
					// b.vx = b.vx + (b.vx - this.x) * 0.1;
					// b.vy = b.vy + (b.vy - this.y) * 0.1;

					this.vx = this.vx + dist.x;
					this.vy = this.vy + dist.y;
					b.vx = b.vx - dist.x;
					b.vy = b.vy - dist.y;

					this.brightness = 255;
					b.brightness = 255;
				}
			}
		});
	}
}
