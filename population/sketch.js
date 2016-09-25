"use strict";

var world = null;

var resources = [
	{ id: 0, name: "water", color: "#26A5FF" },
	{ id: 1, name: "corn", color: "#FFE11C" },
	{ id: 2, name: "bread", color: "#C28B13" },
	{ id: 3, name: "cotton", color: "#E3E3E3" },
	{ id: 4, name: "sugar", color: "#FFFFFF" },
	{ id: 5, name: "tobaco", color: "#58CC00" },
	{ id: 6, name: "meat", color: "#CF1111" },
	{ id: 7, name: "wine", color: "#A229FF" },
	{ id: 8, name: "wood", color: "#5E3119" },
	{ id: 9, name: "stone", color: "#8787A1" }
];

function setup() {
	createCanvas(920, 720);
	translate(width / 2, height / 2);
	colorMode(HSB);
	background(0);
	world = new World(24, 128);
}

function draw() {
	colorMode(RGB);
	background(0, 64);
	world.render();
}

function World(citiesCount, merchantsCount) {
	this.cities = [];
	this.merchants = [];

	for (var i = 0; i < citiesCount; i++) {
		this.cities.push(new City(i, random(-width / 2 + 100, width / 2 - 100), random(-height / 2 + 100, height / 2 - 100)));
	}

	for (var i = 0; i < this.cities.length; i++) {
		var l = random(1, 3);
		for (var j = 0; j < l; j++) {

			var randomCity = null;
			while (randomCity == null) {
				var r = this.cities[floor(random(this.cities.length))];
				if (this.cities[i] !== r) {
					randomCity = r;
				}
			}

			if (randomCity) {
				this.cities[i].addNeighbourCity(randomCity);
			}
		}
	}

	for (var i = 0; i < merchantsCount; i++) {
		var randomCity = this.cities[floor(random(0, this.cities.length))];
		this.merchants.push(new Merchant(randomCity, random(255)));
	}

	this.render = function() {
		this.cities.forEach(c => { c.renderCity(); });
		this.cities.forEach(c => { c.renderRoads(); });

		this.merchants.forEach(m => {
			m.update();
			m.render();
		});

		this.cities.forEach(c => { c.renderUI(); });
	}

	this.getCityWithId = function(id) {
		this.cities.forEach(c => {
			if (c.id === id) {
				return c;
			}
		});
	}
}

function City(id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.level = 1;

	this.resources = [];
	this.neighbourCities = [];

	this.color = 64;

	for (var i = 0; i < resources.length; i++) {
		if (random() < 0.3) {
			this.resources.push(resources[i]);
		}
	}

	this.addNeighbourCity = function(neighbourCity) {
		this.neighbourCities.push(neighbourCity);
	}

	this.renderCity = function() {
		colorMode(RGB);

		noStroke();
		this.color = lerp(this.color, 64, 0.05)
		fill(this.color);
		ellipse(this.x, this.y, 10 * this.level, 10 * this.level);
	}

	this.renderRoads = function() {
		colorMode(RGB);

		stroke(64);
		strokeWeight(2);
		this.neighbourCities.forEach(c => {
			line(this.x, this.y, c.x, c.y);
		});
	}

	this.renderUI = function() {
		colorMode(RGB);

		for (var i = 0; i < this.resources.length; i++) {
			var cWithHash = this.resources[i].color;
			var c = cWithHash.substring(1, cWithHash.length);

			noStroke();
			fill(unhex(c.substring(0, 2)), unhex(c.substring(2, 4)), unhex(c.substring(4, 6)));
			rect(this.x - 10, this.y - i * 10 - 25, 8, 8);
		}
	}
}

function Merchant(startingCity, hue) {
	var states = {
		STANDING: 0,
		MOVING: 1
	};
	this.state = states.STANDING;
	this.neighbourCityId = 0;

	this.city = startingCity;
	this.x = this.city.x;
	this.y = this.city.y;
	this.speed = 0.05;
	this.resource = null;
	this.hue = hue;

	this.update = function() {
		if (this.state === states.STANDING) {
			if (this.city.resources.length > 0) {
				this.resource = this.city.resources.shift();
				this.neighbourCityId = floor(random(0, this.city.neighbourCities.length));
			}
			this.state = states.MOVING;
		} else if (this.state === states.MOVING) {
			var neighbourCity = this.city.neighbourCities[this.neighbourCityId];
			if (neighbourCity) {
				this.x = lerp(this.x, neighbourCity.x, this.speed);
				this.y = lerp(this.y, neighbourCity.y, this.speed);
				if (dist(this.x, this.y, neighbourCity.x, neighbourCity.y) < 10) {
					this.city = neighbourCity;
					if (this.resource) {
						this.city.resources.push(this.resource);
						this.city.resources.push(this.resource);
						while (this.city.resources.length > 10) {
							this.city.resources = [];
							this.city.level++;
							this.city.color = 255;
						}
					}
					this.state = states.STANDING;
				}
			}
		}
	}

	this.render = function() {
		colorMode(HSB);
		noStroke();
		fill(color(this.hue, 255, 255));
		ellipse(this.x, this.y, 15, 15);
	}
}
