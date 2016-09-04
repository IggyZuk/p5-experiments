function Player (id, c) {
	this.id = id;
	this.color = c;
	this.walkers = [];
	this.spawnTimer = 50;

	this.start = function () {
		this.addWalker(getRandomGroundDot());
	};

	this.addWalker = function (dot) {
		var walker = new Walker(dot.pos.x, dot.pos.y, this.color);
		this.walkers.push(walker);
	};

	this.update = function (worldMap) {
		if (--this.spawnTimer <= 0) {
			var dot = getRandomGroundDotWithColor(this.color);
			if (dot != null) {
				this.addWalker(dot);
				this.spawnTimer = 100 / (countTerritoryWithColor(this.color));
			} else {
				players.splice(id, 1);
				console.log('PLAYER DIED: ', id);
			}
		}

		for (var i = 0; i < this.walkers.length; i++) {
			this.walkers[i].update(worldMap);
		}

		for (var i = this.walkers.length - 1; i >= 0; i--) {
			if (this.walkers[i].isActive == false) {
				this.walkers.splice(i, 1);
			}
		}
	};
}

function getRandomGroundDot () {
	var dots = [];

	for (var i = 0; i < worldMap.width; i++) {
		for (var j = 0; j < worldMap.height; j++) {
			var dot = worldMap.dots[i][j];
			if (dot.terrainType == TYPE.GROUND) {
				dots.push(dot);
			}
		}
	}

	if (dots.length > 0) {
		return dots[floor(random(dots.length))];
	}

	return null;
}

function getRandomGroundDotWithColor (c) {
	var dots = [];

	for (var i = 0; i < worldMap.width; i++) {
		for (var j = 0; j < worldMap.height; j++) {
			var dot = worldMap.dots[i][j];
			if (dot.terrainType == TYPE.GROUND && dot.owner && dot.owner.color == c) {
				dots.push(dot);
			}
		}
	}

	if (dots.length > 0) {
		return dots[floor(random(dots.length))];
	}

	return null;
}

function countTerritoryWithColor (c) {
	var count = 0;
	for (var i = 0; i < worldMap.width; i++) {
		for (var j = 0; j < worldMap.height; j++) {
			var dot = worldMap.dots[i][j];
			if (dot.owner && dot.owner.color == c) {
				++count;
			}
		}
	}
	return count;
}
