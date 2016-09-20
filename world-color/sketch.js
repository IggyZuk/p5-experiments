"use strict";

var img = null;

var worldMap = null;

var margin = 10;
var dotSize = 9.9;

var players = [];

function preload() {
	img = loadImage('assets/world.png');
}

function setup() {
	createCanvas(600, 400);
	colorMode(HSB, 255);
	frameRate(60);

	translate(
		width / 2 - (img.width * margin) / 2 + dotSize / 2,
		height / 2 - (img.height * margin) / 2 + dotSize / 2
	);

	buildWorld();
	addPlayers(10);
}

function buildWorld() {
	worldMap = {
		dots: [],
		width: img.width,
		height: img.height
	};

	for (var i = 0; i < worldMap.width; i++) {
		worldMap.dots.push([]);
		for (var j = 0; j < worldMap.height; j++) {
			worldMap.dots[i].push(new Dot(i, j, img.get(i, j), dotSize, margin));
		}
	}
}

function addPlayers(count) {
	players = [];

	for (var i = 0; i < count; i++) {
		var player = new Player(i, color(map(i, 0, count, 0, 255), random(180, 255), 255));
		player.start();
		players.push(player);
	}

	for (var i = 0; i < players.length; i++) {
		players[i].update(worldMap);
	}
}

function draw() {
	background(0);

	for (var i = 0; i < players.length; i++) {
		players[i].update(worldMap);
	}

	for (var i = 0; i < worldMap.width; i++) {
		for (var j = 0; j < worldMap.height; j++) {
			var dot = worldMap.dots[i][j];
			dot.show(margin);
		}
	}
}

function keyPressed() {
	buildWorld();
	addPlayers(10);
}
