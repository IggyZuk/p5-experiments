var express = require('express');
var app = express();

var seed = Math.random() * 1000;

// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server started listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
	// We are given a websocket object in our function
	function (socket) {
		console.log('We have a new client: ' + socket.id);

		socket.emit('welcome', { seed: seed});

		// When this user emits, client side: socket.emit('otherevent',some data)
		socket.on('pos',
			function (data) {
				// Data comes in as whatever was sent, including objects
				console.log('Received: ' + data.id + "'pos' " + data.x + ' ' + data.y);

				// Send it to all other clients
				io.sockets.emit('pos', data);
				// socket.broadcast.emit('mouse', data)

				// This is a way to send to everyone including sender
				// io.sockets.emit('message', "this goes to everyone")

			}
		);

		socket.on('disconnect', function () {
			console.log('Client has disconnected');
		});
	}
);
