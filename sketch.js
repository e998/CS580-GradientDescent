var data = [];

var m = 0;
var b = 0;

function setup() {
  createCanvas(500, 500);
}

// Technique of coders called gradient descent of making small adjustments to weights, parameters to the slope and y-intercept based on an error based on the supervised learning process
function gradientDescent() {
  // Learning rate: usually a small number, to reduce the size of the error
  var slider = document.getElementById("myRange");
  var learning_rate = slider.value/100;
  var output = document.getElementById("learning_rate");
  output.innerHTML = slider.value/100;

  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;
    // Calculate a guess:
    var guess = m * x + b;
    // steering  = desired - velocity
    var error = y - guess;
    // Want to adjust according to error, slope depends on what the input actually was
    // take change in the value of slope and multiply based on learning rate
    m = m + (error * x) * learning_rate;
    // take change in value of b and multiply to learning rate
    b = b + (error) * learning_rate;
  }
}

function drawLine() {
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  stroke(255);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  document.getElementById("slope").innerHTML = m
  document.getElementById("intercept").innerHTML = b
}

function mousePressed() {
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  if (x>=0 && x<=1 && y>=0 && y<=1) {
    var point = createVector(x, y);
    data.push(point);
  }
}

function draw() {
  // 252,191,73
  background(20);
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    fill(214,40,40);
    stroke(214,40,40);
    heart(x, y, 8, 8);
  }

  if (data.length > 1) {
    gradientDescent();
    drawLine();
  }
}

function reset() {
  data = [];
}

function undo() {
  data.pop();
}

// heart-shaped points
// http://www.java2s.com/Tutorials/Javascript/Canvas_How_to/Shape/Draw_Heart_shape.htm
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}


var slider = document.getElementById("myRange");
var output = document.getElementById("learning_rate");
output.innerHTML = 0.05; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = learning_rate;
}


