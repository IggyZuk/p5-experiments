function Walker(x, y, c) {
	this.pos = new p5.Vector(x, y);
	this.color = color(c);
	this.hueOffset = random(255);
	this.stack = [];
	this.life = random(250, 1000)

	this.update = function(map) {
		var n = this.getNeighbours(map);

		this.wrap(map);

		var goodNeighbours = [];
		n.forEach(n => {
			if (n.terrainType == TYPE.GROUND && n.owned == false) {
				goodNeighbours.push(n);
			}
		});

		if (goodNeighbours.length > 0) {
			this.pos = goodNeighbours[int(random(goodNeighbours.length))].pos;
			this.stack.push(this.pos);
		} else if (this.stack.length > 0) {
			this.pos = this.stack.pop();
		} else {
			var similarHue = [];
			var thisDot = map.dots[this.pos.x][this.pos.y];
			var thisDotColor = hue(thisDot.clr);
			n.forEach(n => {
				if (Math.abs(hue(n.clr) - thisDotColor) < 5) {
					similarHue.push(n);
				}
			});

			if (similarHue.length > 0) {
				this.pos = similarHue[int(random(similarHue.length))].pos;
				this.stack.push(this.pos);
			} else {
				this.life = 0;
			}
		}

		var dot = map.dots[this.pos.x][this.pos.y];
		if (dot) {
			this.hueOffset += 1;
			this.hueOffset = this.hueOffset % 255;
			this.color = color(this.hueOffset, 255, 255);

			dot.mark(this.color);
		}

		this.life--;
	};

	this.getNeighbours = function(map) {
		var n = [];
		var currentPos = this.pos.copy();

		if (this.isPositionValid(currentPos.x + 1, currentPos.y, 1, map)) {
			n.push(map.dots[currentPos.x + 1][currentPos.y]);
		}
		if (this.isPositionValid(currentPos.x - 1, currentPos.y, 1, map)) {
			n.push(map.dots[currentPos.x - 1][currentPos.y]);
		}
		if (this.isPositionValid(currentPos.x, currentPos.y + 1, 1, map)) {
			n.push(map.dots[currentPos.x][currentPos.y + 1]);
		}
		if (this.isPositionValid(currentPos.x, currentPos.y - 1, 1, map)) {
			n.push(map.dots[currentPos.x][currentPos.y - 1]);
		}

		n.reverse();

		return n;
	};

	this.isPositionValid = function(x, y, step, map) {
		return (x + step < map.width &&
			y + step < map.height &&
			x - step >= 0 &&
			y - step >= 0);
	};

	this.wrap = function() {
		if (this.pos.x > map.width - 1) this.pos.x = 0;
		else if (this.pos.x < 0) this.pos.x = map.width - 1;
		if (this.pos.y > map.height - 1) this.pos.y = 0;
		else if (this.pos.y < 0) this.pos.y = map.height - 1;
	};
}
