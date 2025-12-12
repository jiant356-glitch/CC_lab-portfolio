 function setup() {
  createCanvas(400, 400);
  background(9,9,9);
}

function draw() {
}

function mousePressed() {
  let faceColor = color(random(255), random(255), random(255));
  drawSmiley(mouseX, mouseY, random(50, 100), faceColor);
}

function keyPressed() {
  if (key === 'r') background(255, 0, 0);
  if (key === 'g') background(0, 255, 0);
  if (key === 'b') background(0, 0, 255);
}

// smileface
function drawSmiley(x, y, r, faceColor) {
  push();
  translate(x, y);

  // face
  fill(faceColor);
  stroke(0);
  ellipse(0, 0, r * 2, r * 2);

  // left eye
  fill(0);
  ellipse(-r * 0.5, -r * 0.3, r * 0.25, r * 0.25);

  // right eye
  ellipse(r * 0.5, -r * 0.3, r * 0.25, r * 0.25);

  // mouse
  noFill();
  strokeWeight(3);
  arc(0, r * 0.1, r * 1, r * 0.7, 0, PI);
   pop();
}