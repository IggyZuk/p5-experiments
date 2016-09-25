var vertices = [];
var indices = [];
var drawVertices = false;

function setup() {
	pixelDensity(0.5);
	createCanvas(800, 600, WEBGL);
	colorMode(HSB, 255, 255, 255);

	createSphere(250, 16, 16);
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
	background(64);
	orbitControl();

	if (drawVertices) {
		vertices.forEach(v => {
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
		var a = vertices[indices[i]];
		var b = vertices[indices[i + 1]];
		var c = vertices[indices[i + 2]];

		fill((hue(a.clr) + hue(b.clr) + hue(c.clr)) / 3, 255, 255);
		triangle(
			a.x, a.y, a.z,
			b.x, b.y, b.z,
			c.x, c.y, c.z);
	}
}
