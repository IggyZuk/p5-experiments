var margin = 50;

function World() {
	this.map = new Map(32);
	this.player = new PlayerCharacter(ThrowDiceRoll(), ThrowDiceRoll(), this.map.getStartingNode());
}

function PlayerCharacter(attack, health, startingNode) {
	this.attack = attack;
	this.health = health;
	this.node = startingNode;

	this.leftDice = ThrowDiceRoll();
	this.rightDice = ThrowDiceRoll();

	this.reduceAttack = function(value) {
		this.attack -= value;
	}

	this.reduceHealth = function(value) {
		this.health -= value;
	}

	this.isAlive = function() {
		this.health > 0;
	}

	this.goLeft = function() {
		this.attack += this.leftDice;
		this.landOnNextNode(this.node.connections[0]);
	}

	this.goRight = function() {
		this.health += this.rightDice;
		this.landOnNextNode(this.node.connections[1]);
	}

	this.landOnNextNode = function(node) {
		this.node = node;
		this.node.event.trigger();
		this.applyEventEffect(this.node.event);
		this.node.event = null;
		this.leftDice = ThrowDiceRoll();
		this.rightDice = ThrowDiceRoll();
	}

	this.applyEventEffect = function(event) {
		this.attack -= event.attack;
		this.health -= event.health;

		this.attack = max(0, this.attack);
		this.health = max(0, this.health);

		if (!this.isAlive()) {
			console.log("GAME OVER!");
		}
	}

	this.show = function() {
		var size = 12;
		var x = (this.node.order - this.node.depth / 2) * margin;
		var y = -this.node.depth * margin;

		textSize(30);
		stroke(0);
		fill(0, 255, 0);
		ellipse(x, y, size, size);
		fill(0, 0, 255);
		text(this.attack, x - size, y + size / 2);
		fill(255, 0, 0);
		text(this.health, x + size, y + size / 2);

		textSize(50);
		fill(0, 0, 255);
		text("+" + this.leftDice, -100, y);
		fill(255, 0, 0);
		text("+" + this.rightDice, 100, y);
	}
}

function Map(depths) {
	this.nodes = [];

	this.createNodes = function(depth) {
		for (var depth = 0; depth < depths; depth++) {
			for (var j = 0; j <= depth; j++) {
				var node = new Node(depth, j);
				this.nodes.push(node);
			}
		}
	}

	this.connectNodes = function(depths) {
		for (var depth = 0; depth <= depths; depth++) {

			currentNodes = this.getAllNodesInDepth(depth);
			nextNodes = this.getAllNodesInDepth(depth + 1);

			if (currentNodes.length > 0 && nextNodes.length > 0) {
				var nextConnectionIdx = 0;
				for (var i = 0; i < currentNodes.length; i++) {
					for (var j = 0; j < 2; j++) {
						currentNodes[i].connections.push(nextNodes[nextConnectionIdx]);
						nextConnectionIdx++;
					}
					nextConnectionIdx--;
				}
			}
		}
	}

	this.getAllNodesInDepth = function(depth) {
		var nodesInDepth = [];
		for (var i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].depth == depth) {
				nodesInDepth.push(this.nodes[i]);
			}
		}
		return nodesInDepth;
	}

	this.getStartingNode = function() {
		return this.nodes[0];
	}

	this.createNodes(depths);
	this.connectNodes(depths);
}

function Node(depth, order) {
	this.depth = depth;
	this.order = order;
	this.connections = [];
	this.event = null;

	if (depth > 0) {
		this.event = new Event(max(0, ThrowDiceRoll() - ThrowDiceRoll() + depth), max(0, ThrowDiceRoll() - ThrowDiceRoll() + depth));
	}

	this.show = function() {
		var size = 40;
		var x = (this.order - this.depth / 2) * margin;
		var y = -this.depth * margin;

		stroke(0);
		fill(255);
		ellipse(x, y, size, size);

		if (this.event) {
			this.event.show(x, y, size);
		}
	}
}

function Event(attack, health) {
	this.TYPE = {
		STATS: 0,
		MONSTER: 1
	}

	this.attack = attack;
	this.health = health;
	this.type = ThrowDiceRoll() >= 5 ? this.TYPE.MONSTER : this.TYPE.STATS;

	if (this.type === this.TYPE.MONSTER) {
		this.attack = max(1, attack);
		this.health = max(1, health);
	}

	this.trigger = function() {
		if (this.type === this.TYPE.MONSTER) {
			console.log("You encounter a monster (" + this.attack + ", " + this.health + ")");
		} else {
			console.log("Your stats are reduced by (" + this.attack + ", " + this.health + ")");
		}
	}

	this.show = function(x, y, size) {
		textSize(15);
		stroke(0);
		fill(0, 0, 255);
		text("-" + this.attack, x - size / 4, y + size / 5);
		fill(255, 0, 0);
		text("-" + this.health, x + size / 4, y + size / 5);
	}
}

function ThrowDiceRoll() {
	return round(random(1, 6));
}

var world = null;

function setup() {
	createCanvas(600, 400);
	translate(width / 2, height - 100);

	textSize(20);
	textAlign(CENTER);

	world = new World();
	console.log(world);
}

function draw() {
	background(64);

	push();
	translate(0, world.player.node.depth * margin);
	world.map.nodes.forEach(n => {
		n.show();
	});

	world.player.show();
	pop();
};

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		world.player.goLeft();
	} else if (keyCode === RIGHT_ARROW) {
		world.player.goRight();
	}
}
