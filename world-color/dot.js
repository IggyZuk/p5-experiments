var TYPE = {
	GROUND: {
		value: 0,
		name: 'Ground'
	},
	WATER: {
		value: 1,
		name: 'Water'
	},
};

function Dot(x, y, c, size) {
	this.pos = new p5.Vector(x, y);
	this.size = size;
	this.terrainType = TYPE.WATER;
	this.owned = false;
	this.scl = 1;
	this.clr = color(0, 0, 0);

	if (brightness(c) == 255) {
		this.terrainType = TYPE.GROUND;
	}

	this.show = function(margin) {
		noStroke();

		if (this.owned != null) {
			fill(this.terrainType == TYPE.GROUND ? this.clr : 0);
		} else {
			fill(this.terrainType == TYPE.GROUND ? 0 : 0);
		}

		this.scl = lerp(this.scl, 1, 0.15);
		rect(this.pos.x * margin, this.pos.y * margin, this.size * this.scl, this.size * this.scl);
	};

	this.mark = function(clr) {
		this.owned = true;
		//this.scl = 2;
		this.clr = clr;
	};
}
