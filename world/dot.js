var TYPE = {
	GROUND:
	{
		value: 0,
		name: 'Ground'
	},
	WATER:
	{
		value: 1,
		name: 'Water'
	},
};

function Dot(x, y, c, size)
{
	this.pos = new p5.Vector(x, y);
	this.size = size;
	this.terrainType = TYPE.WATER;
	this.owner = null;
	this.scl = 1;

	if (brightness(c) == 255)
	{
		this.terrainType = TYPE.GROUND;
	}

	this.show = function(margin)
	{
		noStroke();

		if (this.owner != null)
		{
			fill(this.terrainType == TYPE.GROUND ? this.owner.color : 50);
		}
		else
		{
			fill(this.terrainType == TYPE.GROUND ? 24 : 16);
		}

		this.scl = lerp(this.scl, 1, 0.15);
		ellipse(this.pos.x * margin, this.pos.y * margin, this.size * this.scl, this.size * this.scl);
	};

	this.mark = function(owner)
	{
		// if (this.owner != owner) {
		this.owner = owner;
		this.scl = 2;
		// }
	};
}
