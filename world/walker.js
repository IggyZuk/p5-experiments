function Walker (x, y, c) {
	this.pos = new p5.Vector(x, y);
	this.color = color(c);
	this.stack = [];
	this.attackCounter = 100;
	this.life = 100;
	this.isActive = true;

	this.update = function (map) {
		var n = this.getNeighbours(map);

		var goodNeighbours = [];
		for (var i = 0; i < n.length; i++) {
			if (n[i].terrainType == TYPE.GROUND) {
				if (n[i].owner == null) {
					goodNeighbours.push(n[i].pos);
				}
				else if (n[i].owner != this) {
					if (--this.attackCounter < 0) {
						goodNeighbours.push(n[i].pos);
						this.isActive = false;
						this.attackCounter = 100;
					}
				}
			}

		}

		if (goodNeighbours.length <= 0) {
			for (var i = 0; i < n.length; i++) {
				if (random() < 0.5) {
					if (--this.attackCounter < 0) {
						this.attackCounter = 25;
						goodNeighbours.push(n[i].pos);
					}
				}
			}
		}

		if (goodNeighbours.length > 0) {
			this.pos = goodNeighbours[floor(random(goodNeighbours.length))];
			this.stack.push(this.pos);
		} else if (this.stack.length > 0) {
			this.pos = this.stack.pop();
		}

		this.wrap(map);

		var dot = map.dots[this.pos.x][this.pos.y];
		dot.mark(this);

		if (--this.life <= 0) {
			this.isActive = false;
		}

	};

	this.getNeighbours = function (map) {
		var n = [];
		var currentPos = this.pos.copy();

		if (this.isPositionValid(currentPos.x + 1, currentPos.y, 1, map)) {
			n.push(map.dots[currentPos.x + 1][currentPos.y]);
		}
		if (this.isPositionValid(currentPos.x - 1, currentPos.y, 1, map)) {
			n.push(map.dots[currentPos.x - 1][ currentPos.y]);
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

	this.isPositionValid = function (x, y, step, map) {
		return (x + step < map.width &&
		y + step < map.height &&
		x - step >= 0 &&
		y - step >= 0);
	};

	this.wrap = function () {
		if (this.pos.x > map.width - 1) this.pos.x = 0;
		else if (this.pos.x < 0) this.pos.x = map.width - 1;
		if (this.pos.y > map.height - 1) this.pos.y = 0;
		else if (this.pos.y < 0) this.pos.y = map.height - 1;
	};
}
