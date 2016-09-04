function Actor () {
	this.position = new Point(0, 0);
	this.normal = new Point(0, 0);
	this.direction = 0;

	this.edgeIndex = 0;
	this.distance = 0;

	this.update = function (planet) {
		this.distance += this.direction * 5;

		if (this.distance > planet.edges[this.edgeIndex].length()) {
			this.distance -= planet.edges[this.edgeIndex].length();
			this.edgeIndex = this.wrapIndex(++this.edgeIndex, planet.edges.length);
		}
		else if (this.distance < 0) {
			this.edgeIndex = this.wrapIndex(--this.edgeIndex, planet.edges.length);

			this.distance += planet.edges[this.edgeIndex].length();
		}

		this.position = planet.edges[this.edgeIndex].lerp(this.distance / planet.edges[this.edgeIndex].length());
		this.normal = planet.edges[this.edgeIndex].normal();
	};

	this.render = function () {
		var n = this.position.add(this.normal.mul(25));
		stroke(255);
		strokeWeight(25);
		strokeCap(SQUARE);
		line(this.position.x, this.position.y, n.x, n.y);
	};

	this.wrapIndex = function (index, count) {
		if (index < 0) return count - 1;
		if (index >= count) return 0;
		return index;
	};

	this.dir = function (dir) {
		this.direction = dir;
	};
}
