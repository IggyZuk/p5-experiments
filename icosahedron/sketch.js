var vertices = [];
var faces = [];
var scl = 100;

function setup() {
	createCanvas(800, 600, WEBGL);
	colorMode(HSB, 255, 255, 255);
	createIco();
}

function createIco() {
	var t = (1 + Math.sqrt(5)) / 2;

	addVertex(new Point3D(-1, t, 0));
	addVertex(new Point3D(1, t, 0));
	addVertex(new Point3D(-1, -t, 0));
	addVertex(new Point3D(1, -t, 0));

	addVertex(new Point3D(0, -1, t));
	addVertex(new Point3D(0, 1, t));
	addVertex(new Point3D(0, -1, -t));
	addVertex(new Point3D(0, 1, -t));

	addVertex(new Point3D(t, 0, -1));
	addVertex(new Point3D(t, 0, 1));
	addVertex(new Point3D(-t, 0, -1));
	addVertex(new Point3D(-t, 0, 1));

	// 5 faces around point 0
	addTriangle(new TriangleIndices(0, 11, 5));
	addTriangle(new TriangleIndices(0, 5, 1));
	addTriangle(new TriangleIndices(0, 1, 7));
	addTriangle(new TriangleIndices(0, 7, 10));
	addTriangle(new TriangleIndices(0, 10, 11));

	// 5 adjacent faces
	addTriangle(new TriangleIndices(1, 5, 9));
	addTriangle(new TriangleIndices(5, 11, 4));
	addTriangle(new TriangleIndices(11, 10, 2));
	addTriangle(new TriangleIndices(10, 7, 6));
	addTriangle(new TriangleIndices(7, 1, 8));

	// 5 faces around point 3
	addTriangle(new TriangleIndices(3, 9, 4));
	addTriangle(new TriangleIndices(3, 4, 2));
	addTriangle(new TriangleIndices(3, 2, 6));
	addTriangle(new TriangleIndices(3, 6, 8));
	addTriangle(new TriangleIndices(3, 8, 9));

	// 5 adjacent faces
	addTriangle(new TriangleIndices(4, 9, 5));
	addTriangle(new TriangleIndices(2, 4, 11));
	addTriangle(new TriangleIndices(6, 2, 10));
	addTriangle(new TriangleIndices(8, 6, 7));
	addTriangle(new TriangleIndices(9, 8, 1));
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
}

function TriangleIndices(a, b, c) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.clr = int(random(255));
}

function draw() {
	background(0);

	rotateX(frameCount * PI / 64);
	rotateZ(frameCount * PI / 64);

	vertices.forEach(v => {
		push();
		translate(
			v.x * scl,
			v.y * scl,
			v.z * scl
		);
		// sphere(10);
		pop();
	});

	var diff = 0;
	faces.forEach(t => {
		var a = vertices[t.a];
		var b = vertices[t.b];
		var c = vertices[t.c];
		var clr = color(t.clr, 255, 255);

		fill(clr);
		t.clr += 1;
		t.clr = t.clr % 255;

		diff += 0.01;
		var r = (cos(frameCount * 0.01) + 1) / 2 * 1.1 + 0.25;

		beginShape();
		vertex(a.x * (scl * r), a.y * (scl * r), a.z * (scl * r));
		vertex(b.x * (scl * r), b.y * (scl * r), b.z * (scl * r));
		vertex(c.x * (scl * r), c.y * (scl * r), c.z * (scl * r));
		endShape();

		var l = 1.1;
		push();
		//line(a.x * scl * r * l, a.y * scl * r * l, a.z * scl * r * l, 0, 0, 0);
		pop();
	});
}
