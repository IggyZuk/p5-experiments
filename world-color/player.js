function Player(id, c) {
	this.id = id;
	this.color = c;
	this.walkers = [];

	this.start = function() {
		this.addWalker(getRandomGroundDot());
	};

	this.addWalker = function(dot) {
		var walker = new Walker(dot.pos.x, dot.pos.y, this.color);
		this.walkers.push(walker);
	};

	this.update = function(worldMap) {
		this.walkers.forEach(w => {
			w.update(worldMap);
		});

		for (var i = 0; i < this.walkers.length; i++) {
			if (this.walkers[i].life <= 0) {
				this.walkers.splice(i, 1);
			}
		}
	}
}

function getRandomGroundDot() {
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
