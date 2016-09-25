var vertices = [];
var indices = [];

var drawVertices = false;
var showColor = true;

function setup() {
	pixelDensity(1);
	createCanvas(1080, 720, WEBGL);
	colorMode(HSB, 255, 255, 255);
	createSphere(255, 32, 32);
}

function createSphere(r, t, p) {
	vertices = [];
	indices = [];
	var r = r;
	var theta = t - 1;
	var phi = p;

	for (var i = 0; i <= theta; i++) {
		var c = color(i / theta * 255, 255, 255);
		for (var j = 0; j < phi; j++) {
			var v = Spherical(
				r,
				(i / theta) * 180,
				(j / phi) * 360);

			v.clr = c;
			addVertex(v);
		}
	}

	for (var i = 0; i < theta; i++) {
		for (var j = 0; j < phi; j++) {
			var first = (i * phi) + j;
			var second = first + phi;

			indices.push(first);
			indices.push(second);
			indices.push(first + 1);

			indices.push(second);
			indices.push(second + 1);
			indices.push(first + 1);
		}
	}
}

function addVertex(v) {
	vertices.push(v);
}

function addTriangle(t) {
	faces.push(t);
}

function Point3D(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.clr = color(random(255), 255, 255);
}

function Spherical(r, theta, phi) {
	var v = new Point3D();
	var snt = sin(theta * PI / 180);
	var cnt = cos(theta * PI / 180);
	var snp = sin(phi * PI / 180);
	var cnp = cos(phi * PI / 180);
	v.x = r * snt * cnp;
	v.y = r * cnt;
	v.z = -r * snt * snp;
	return v;
}

function draw() {
	background(0);
	orbitControl();

	var noiseVertices = [];
	var noiseStrength = 0.0025;
	var noiseSpeed = 0.01;

	vertices.forEach(v => {

		var noisePoint = new Point3D();
		noisePoint.x = v.x * noiseStrength + frameCount * noiseSpeed;
		noisePoint.y = v.y * noiseStrength + frameCount * noiseSpeed;
		noisePoint.z = v.z * noiseStrength + frameCount * noiseSpeed;

		var noiseValue = map(noise(noisePoint.x, noisePoint.y, noisePoint.z), 0, 1, -0.6, 2.15);

		var vp = new Point3D(v.x, v.y, v.z);
		var p = new Point3D(
			vp.x *= noiseValue,
			vp.y *= noiseValue,
			vp.z *= noiseValue
		);

		p.clr = color(map(noiseValue, -0.5, 1.5, 100, 0), 255, 255);

		noiseVertices.push(p);
	});


	if (drawVertices) {
		noiseVertices.forEach(v => {
			push();
			basicMaterial(v.clr);
			translate(
				v.x,
				v.y,
				v.z
			);
			sphere(5);
			pop();
		});
	}

	for (var i = 0; i < indices.length - 3; i += 3) {
		var a = noiseVertices[indices[i]];
		var b = noiseVertices[indices[i + 1]];
		var c = noiseVertices[indices[i + 2]];

		var averageHue = (hue(a.clr) + hue(b.clr) + hue(c.clr)) / 3;
		if (showColor) fill(averageHue, 255, 255);
		else fill(averageHue);

		triangle(
			a.x, a.y, a.z,
			b.x, b.y, b.z,
			c.x, c.y, c.z
		);

		//fill(0);
		//line(a.x, a.y, a.z, b.x, b.y, b.z);
		//line(a.x, a.y, a.z, c.x, c.y, c.z);
		//line(c.x, c.y, c.z, b.x, b.y, b.z);
	}
}
