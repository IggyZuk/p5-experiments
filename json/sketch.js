var animals;
var fruits;

function setup()
{
	noCanvas();

	loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/common.json", gotAnimalData);
	loadJSON("https://raw.githubusercontent.com/dariusk/corpora/master/data/foods/fruits.json", gotFruitData);

	var api = "http://api.giphy.com/v1/gifs/search"
	var search = "harry potter";
	var query = "q=" + search + "&limit=100&rating=g&offset=0";
	var apiKey = "dc6zaTOxFJmzC";

	var url = api + "?" + query + "&api_key=" + apiKey;
	var data = loadJSON(url, data =>
	{
		for (var i = 0; i < data.data.length; i++)
		{
			createImg(data.data[i].images.fixed_height.url);
		}
	});
}

function gotAnimalData(data)
{
	animals = data.animals;
	//tryShowP();
}

function gotFruitData(data)
{
	fruits = data.fruits;
	//tryShowP();
}

function tryShowP()
{
	if (animals && fruits)
	{
		for (var i = 0; i < 30; i++)
		{
			var s = fruits[int(random(fruits.length))] + "-" + animals[int(random(animals.length))] + ", ";
			var p = createP();
			p.html(s);
		}
	}
}

function draw()
{
	background(64);
}
