// Keep track of our socket connection
var socket;
var r,g,b;
var thickness;

function setup() {
  createCanvas(800, 600);
  background(0);

  r = random(0,255);
  g = random(0,255);
  b = random(0,255);

  thickness = 5;

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('81.98.216.7:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.r);
      // Draw a blue line
      stroke(data.r, data.g, data.b);
      strokeWeight(data.t);
      line(data.x, data.y, data.px, data.py);
    }
  );
}

function draw() {
  // Nothing
  noStroke();
  fill(color(r,g,b));
  rect(0,0,50,50);
}

function mouseDragged() {
  // stroke(color(r,g,b));
  // strokeWeight(5);
  // line(mouseX,mouseY,pmouseX,pmouseY);

  // Send the mouse coordinates
  sendmouse(mouseX, mouseY, pmouseX, pmouseY, r, g, b, thickness);
}

// Function for sending to the socket
function sendmouse(xpos, ypos, pxpos, pypos, red, green, blue, thick) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    px: pxpos,
    py: pypos,
    r: red,
    g: green,
    b: blue,
    t: thick
  };

  // Send that object to the socket
  socket.emit('mouse', data);
}

function keyPressed() {
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
}

function mouseWheel(event) {
  thickness += norm(event.delta, 0.1, 30);
}
