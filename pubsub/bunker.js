function Bunker()
{
	var turrets = [];

	pubsub.subscribe("game/message", onMessage);
	pubsub.subscribe("ui/click", onClick);

	function onMessage(evt)
	{
		console.log("Bunker: " + evt.message);
	}

	function onClick(evt)
	{
		turrets.push(createVector(evt.x, evt.y));

		console.log("Build turret at: (" + evt.x + ", " + evt.y + ")");

		pubsub.publish("game/turretAdded",
		{
			message: "New tower added!"
		});
	}

	this.show = function()
	{
		turrets.forEach(entry =>
		{
			rect(entry.x, entry.y, 25, 25);
		});
	}
}
