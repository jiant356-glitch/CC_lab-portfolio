// Simple emotion-based real clock with THREE hands
let emotion = "normal";
let timeInSeconds;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  // start from real current time
  timeInSeconds = hour() * 3600 + minute() * 60 + second();
}

function draw() {
  // --- speed based on emotion ---
  let speed = 1;
  if (emotion === "happy") speed = 2;
  if (emotion === "tired") speed = 0.5;

  // update internal clock time
  timeInSeconds += (deltaTime / 1000) * speed;
  timeInSeconds %= 86400;

  // convert to usable time
  let h = floor(timeInSeconds / 3600) % 24;
  let m = floor((timeInSeconds % 3600) / 60);
  let s = floor(timeInSeconds % 60);

  // background color
  if (emotion === "happy") background(255, 230, 130);
  else if (emotion === "tired") background(200);
  else background(200, 220, 255);

  // --- draw simple clock face ---
  push();
  translate(width/2, height/2);
  fill(255);
  stroke(0);
  ellipse(0, 0, 200, 200);

  // --- SECOND HAND ---
  let secAngle = map(s, 0, 60, 0, 360) - 90;
  stroke(0);
  strokeWeight(3);
  line(0, 0, cos(secAngle) * 80, sin(secAngle) * 80);

  // --- MINUTE HAND ---
  let minAngle = map(m + s/60, 0, 60, 0, 360) - 90;
  strokeWeight(5);
  line(0, 0, cos(minAngle) * 60, sin(minAngle) * 60);

  // --- HOUR HAND ---
  let hourAngle = map((h % 12) + m/60, 0, 12, 0, 360) - 90;
  strokeWeight(7);
  line(0, 0, cos(hourAngle) * 40, sin(hourAngle) * 40);

  pop();

  // UI text
  fill(0);
  noStroke();
  textAlign(CENTER);
  text("Emotion: " + emotion, width/2, 30);
  text("H = happy, N = normal, T = tired", width/2, 50);
}

function keyPressed() {
  if (key === 'H' || key === 'h') emotion = "happy";
  if (key === 'N' || key === 'n') emotion = "normal";
  if (key === 'T' || key === 't') emotion = "tired";
}