var pubsub;
var bunker;

function setup()
{
	//noCanvas(600, 400);
	createCanvas(500, 500);
	pubsub = new PubSub();
	bunker = new Bunker();

	pubsub.subscribe("game/message", onMessage);
	pubsub.subscribe("game/turretAdded", onTurretAdded);
	pubsub.subscribe("ui/click", onClick);

	pubsub.publish("game/message",
	{
		message: "This is a custom event!"
	});

	pubsub.unsubscribe("game/message", onMessage);

	pubsub.publish("game/message",
	{
		message: "This should not be seen"
	});
}

function draw()
{
	background(51);
	bunker.show();
}

function onMessage(evt)
{
	console.log("World: " + evt.message);
}

function onTurretAdded(evt)
{
	console.log("World: Oh crap! " + evt.message);
}

function onClick(evt)
{
	console.log("UI: " + evt.message + ": (" + evt.x + ", " + evt.y + ")");
}

function mouseClicked()
{
	pubsub.publish("ui/click",
	{
		message: "you clicked the mouse!",
		x: mouseX,
		y: mouseY
	});
}
