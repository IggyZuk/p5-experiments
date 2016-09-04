function Planet () {
	this.points = [];
	this.edges = [];

	this.create = function (edgeCount) {
		this.points = [];
		this.edges = [];

		var angle = 0;
		for (var i = 0; i < edgeCount; i++) {
			angle += 360 / edgeCount;
			var r = map(noise(i * 0.2), 0, 1, 50, 200);
			this.points[i] = new Point(cos(radians(angle)) * r, sin(radians(angle)) * r);
		}

		for (var i = 0; i <= this.points.length; i++) {
			if (i == this.points.length) {
				this.edges[this.points.length - 1] = new Edge(this.points[this.points.length - 1], this.points[0]);
			} else {
				this.edges[i] = new Edge(this.points[i], this.points[i + 1]);
			}
		}
	};

	this.render = function () {
		noStroke();
		fill(0, 255, 0);
		ellipse(0, 0, 20, 20);

		for (var i = 0; i < this.edges.length; i++) {
			stroke(255, 0, 0);
			strokeWeight(5);
			line(this.edges[i].pointA.x, this.edges[i].pointA.y, this.edges[i].pointB.x, this.edges[i].pointB.y);

			stroke(0, 255, 0);
			strokeWeight(2);
			var midPoint = this.edges[i].lerp(0.5);
			var normal = this.edges[i].normal();
			var normalFromMidpoint = midPoint.add(normal.mul(10));
			line(midPoint.x, midPoint.y, normalFromMidpoint.x, normalFromMidpoint.y);
		}

		for (var i = 0; i < this.points.length; i++) {
			noStroke(0);
			fill(0, 0, 0, 128);
			beginShape(TRIANGLE_STRIP);
			vertex(0, 0);
			vertex(this.points[i].x, this.points[i].y);
			if (this.points[i + 1] != null) vertex(this.points[i + 1].x, this.points[i + 1].y);
			else vertex(this.points[0].x, this.points[0].y);
			endShape();
		}
	};
}

function Point (x, y) {
	this.x = x;
	this.y = y;

	this.add = function (other) {
		var xx = this.x + other.x;
		var yy = this.y + other.y;
		return new Point(xx, yy);
	};

	this.sub = function (other) {
		var xx = this.x - other.x;
		var yy = this.y - other.y;
		return new Point(xx, yy);
	};

	this.mul = function (val) {
		var xx = this.x * val;
		var yy = this.y * val;
		return new Point(xx, yy);
	};

	this.div = function (val) {
		var xx = this.x / val;
		var yy = this.y / val;
		return new Point(xx, yy);
	};

	this.rotateRight = function () {
		var tempx = this.x;
		var tempy = this.y;
		this.x = tempy;
		this.y = -tempx;
		return this;
	};

	this.rotateLeft = function () {
		var tempx = this.x;
		var tempy = this.y;
		this.x = -tempy;
		this.y = tempx;
		return this;
	};

	Point.lerp = function (pointA, pointB, val) {
		var lerpx = lerp(pointA.x, pointB.x, val);
		var lerpy = lerp(pointA.y, pointB.y, val);
		return new Point(lerpx, lerpy);
	};

	this.normalize = function () {
		var l = this.length();
		this.x = this.x / l;
		this.y = this.y / l;
		return this;
	};

	this.length = function () {
		return sqrt(this.x * this.x + this.y * this.y);
	};
}

function Edge (pointA, pointB) {
	this.pointA = pointA;
	this.pointB = pointB;

	this.normal = function () {
		var point = (this.pointB.sub(this.pointA));
		point.rotateRight();
		point.normalize();
		return point;
	};

	this.length = function () {
		var p = this.pointB.sub(this.pointA);
		return sqrt(p.x * p.x + p.y * p.y);
	};

	this.lerp = function (val) {
		return Point.lerp(this.pointA, this.pointB, val);
	};
}
