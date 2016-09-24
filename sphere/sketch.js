var vertices = [];

function setup() {
	pixelDensity(0.5);
	createCanvas(800, 600, WEBGL);
	colorMode(HSB, 255, 255, 255);
}

function createSphere(r) {
	vertices = [];

	var r = 100 * r;
	var theta = 32;
	var phi = 8;

	for (var i = 0; i < theta; i++) {
		for (var j = 0; j < phi; j++) {
			addVertex(Spherical(
				r,
				i / theta * 360,
				j / phi * 360));
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
	createSphere(((cos(frameCount * 0.025) + 1) / 2) * 2 + 1);

	background(0);

	rotateX(frameCount * 0.01);
	rotateY(frameCount * 0.01);
	//rotateZ(frameCount * 0.01);

	// vertices.forEach(v => {
	// 	push();
	// 	basicMaterial(random(100, 255), 255, 255);
	// 	translate(
	// 		v.x,
	// 		v.y,
	// 		v.z
	// 	);
	// 	sphere(3);
	// 	pop();
	// });

	for (var i = 0; i < vertices.length; i++) {
		for (var j = 0; j < vertices.length; j++) {
			var a = vertices[i];
			var b = vertices[j];

			if (random() < 0.01) {
				if (random() < 0.9) {
					fill(map(dist(a.x, a.y, a.z, b.x, b.y, b.z), 0, 550, 255, 0), 255, 255);
				} else {
					fill(random(255), 255, 255);
				}
				line(a.x, a.y, a.z, b.x, b.y, b.z);
			}
		}
	}
}
