"use strict";

var img = null;

var worldMap;

var margin = 10;
var dotSize = 8;

var players = [];
var startTime = 0;

function preload()
{
	img = loadImage('assets/world.png');
}

function setup()
{
	console.time("Initializing Time");

	createCanvas(600, 400);
	colorMode(HSB, 255);
	frameRate(60);

	translate(
		width / 2 - (img.width * margin) / 2 + dotSize / 2,
		height / 2 - (img.height * margin) / 2 + dotSize / 2
	);

	buildWorld();
	addPlayers(8);

	console.group();
	console.info("Initializing world!");
	console.table(players);
	console.dir(worldMap);
	console.assert(players.length == 8);
	console.warn("How did you get here!?");
	console.error("STOP!");
	console.groupEnd();

	console.timeEnd("Initializing Time");

	var p = createP('');
	var button = createButton("Restart");
	button.parent(p);

	button.mouseClicked(function()
	{
		keyPressed();
	});
}

function buildWorld()
{
	worldMap = {
		dots: [],
		width: img.width,
		height: img.height
	};

	for (var i = 0; i < worldMap.width; i++)
	{
		worldMap.dots.push([]);
		for (var j = 0; j < worldMap.height; j++)
		{
			worldMap.dots[i].push(new Dot(i, j, img.get(i, j), dotSize, margin));
		}
	}
}

function addPlayers(count)
{
	players = [];

	for (var i = 0; i < count; i++)
	{
		var player = new Player(i, color(map(i, 0, count, 0, 255), random(180, 255), 255));
		player.start();
		players.push(player);
	}

	for (var i = 0; i < players.length; i++)
	{
		players[i].update(worldMap);
	}
}

function draw()
{
	background(0);

	if (++startTime > 30)
	{
		for (var i = 0; i < players.length; i++)
		{
			players[i].update(worldMap);
		}
	}

	for (var i = 0; i < worldMap.width; i++)
	{
		for (var j = 0; j < worldMap.height; j++)
		{
			var dot = worldMap.dots[i][j];
			dot.show(margin);
		}
	}
}

function keyPressed()
{
	buildWorld();
	addPlayers(8);
	startTime = 0;

	console.count("key pressed");
}
