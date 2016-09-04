var socket;

var planet;
var actor;
var dummyPos;

function setup () {
	createCanvas(600, 400);
	translate(width / 2, height / 2);

	// Start a socket connection to the server
	// Some day we would run this server somewhere else
	socket = io.connect('http://localhost:3000');

	socket.on('welcome', function (data) {
		console.log('Random Seed: ' + data.seed);

		randomSeed(data.seed);
		noiseSeed(data.seed);
		planet.create(32);
	});
	// We make a named event called 'pos' and write an
	// anonymous callback function
	socket.on('pos',
		// When we receive data
		function (data) {
			console.log(socket.id + ', ' + data.id);
			if (socket.id != data.id) {
				dummyPos = new Point(data.x, data.y);
			}
		}
	);

	planet = new Planet();
	planet.create(32);
	actor = new Actor();

	dummyPos = new Point(0, 0);
}

function draw () {
	background(64);

	actor.update(planet);

	planet.render();
	actor.render();

	noStroke();
	fill(255, 0, 0);
	ellipse(dummyPos.x, dummyPos.y, 25, 25);

	if (actor.direction != 0) {
		sendPos(socket.id, actor.position);
	}
}

function keyPressed () {
	if (keyCode === LEFT_ARROW) {
		actor.dir(-1, 0);
	}
	else if (keyCode === RIGHT_ARROW) {
		actor.dir(1, 0);
	}
}

function keyReleased () {
	if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
		actor.dir(0);
	}
}

// Function for sending to the socket
function sendPos (playerId, pos) {
	// We are sending!
	console.log('sendPos: ' + playerId + ': ' + pos.x + ' ' + pos.y);

	// Make a little object with  and y
	var data = {
		id: playerId,
		x: pos.x,
		y: pos.y
	};

	// Send that object to the socket
	socket.emit('pos', data);
}
