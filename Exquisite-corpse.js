function setup() {
  createCanvas(400, 600);
  noLoop();
  stroke(40);
  strokeWeight(4);
}

function draw() {
  background(255);
  drawRobot(width/2, 110, 1.0);      // head & shoulders
  drawBody(width/2, 285, 1.0);       // chest/screen
  drawHipsAndLeg(width/2, 435, 1.0); // hips + little feet
}

function drawRobot(cx, cy, s) {
  push();
  translate(cx, cy);
  scale(s);

  // HEAD
  fill(210);
  ellipse(0, 0, 140, 140);                   // head
  fill(40);
  ellipse(-25, -10, 14, 14);                 // eyes
  ellipse( 25, -10, 14, 14);
  rectMode(CENTER);
  rect(0, 10, 10, 14, 2);                    // nose
  rect(0, 32, 60, 6, 5);                   //mouse
  rect(-24,26,12,15,5);                      
  rect(24,26,12,15,5);

  // cheeks
  noStroke();
  fill(224, 170, 175);
  ellipse(-45, 10, 34, 26);
  ellipse( 45, 10, 34, 26);
  stroke(40);

  // small collar
  fill(210);
  rect(0, 78, 34, 16, 4);

  // SHOULDER BAR
  rect(0, 118, 170, 32, 6);

  // ARMS
  // left arm capsule
  rect(-110, 172, 56, 150, 28);
  // right arm capsule
  rect( 110, 172, 56, 150, 28);

  // hands
  noFill();
  strokeWeight(4);
  arc(-110, 250, 40, 28, PI/8, PI+PI/3);
  arc( 110, 250, 40, 28, -PI-PI/3, -PI/8);
  pop();
}

function drawBody(cx, cy, s) {
  push();
  translate(cx, cy);
  scale(s);
  rectMode(CENTER);

  // SCREEN BLOCK
  fill(210);
  rect(0, 0, 150, 110, 10);                 // bezel
  fill(60);
  rect(0, 0, 110, 80, 8);                    // screen

  // ！
  noStroke();
  fill(255);
  rect(0, -15, 30, 35, 3);                   // bar
   rect(0,15,30,15,3);            // dot
  stroke(40);



  pop();
}


function drawHipsAndLeg(cx, cy, s) {
  push();
  translate(cx, cy);
  scale(s);
  rectMode(CENTER);
      // HIPS 
  fill(210);
  rect(0, 0, 140, 170, 70);             

  // little ovals below 
  ellipse(0, 115, 46, 28);
  ellipse(0, 150, 28, 18);
  pop();
}