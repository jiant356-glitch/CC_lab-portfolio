let pigeonX, pigeonY;
let speed = 3;

let people = [];
let food = [];
let score = 0;

// timer
let gameTime = 30;
let startTime;
let gameOver = false;

// freeze on hit
let frozen = false;
let freezeStart = 0;
let freezeDuration = 5000;

// start screen
let started = false;

// restart button
let playAgainButton;

function setup() {
  createCanvas(600, 400);
  setupGame(); // initialize game values
}

function setupGame() {
  score = 0;
  frozen = false;
  gameOver = false;
  started = false;

  pigeonX = width / 2;
  pigeonY = height / 2;

  people = [];
  food = [];

  // create people
  for (let i = 0; i < 5; i++) {
    people.push({
      x: random(width),
      y: random(height - 100),
      dir: random([-1, 1]),
      speed: random(0.5, 1.5)
    });
  }

  // create food
  for (let i = 0; i < 20; i++) {
    food.push({
      x: random(20, width - 20),
      y: random(20, height - 20),
      eaten: false
    });
  }

  if (playAgainButton) {
    playAgainButton.remove();
    playAgainButton = null;
  }
}

function draw() {
  background(200, 239, 255);

  // ---------- START SCREEN ----------
  if (!started) {
    drawStartScreen();
    return;
  }

  // ---------- TIMER ----------
  let timePassed = (millis() - startTime) / 1000;
  let timeLeft = max(0, gameTime - floor(timePassed));

  if (timeLeft === 0) {
    gameOver = true;
  }

  fill(0);
  textSize(16);
  text("Time: " + timeLeft, 10, 40);

  // ---------- END SCREEN ----------
  if (gameOver) {
    drawEndScreen();
    return;
  }

  // ---------- UNFREEZE ----------
  if (frozen && millis() - freezeStart > freezeDuration) {
    frozen = false;
  }

  // ---------- PEOPLE ----------
  for (let p of people) {
    p.x += p.dir * p.speed;
    if (p.x < 0 || p.x > width) {
      p.dir *= -1;
    }
    drawPerson(p.x, p.y);
  }

  // collision → freeze
  for (let p of people) {
    if (dist(pigeonX, pigeonY, p.x, p.y) < 30 && !frozen) {
      frozen = true;
      freezeStart = millis();
    }
  }

  // ---------- FOOD ----------
  for (let f of food) {
    if (!f.eaten) {
      fill(230, 180, 80);
      ellipse(f.x, f.y, 10, 10);
      fill(150, 100, 50);
      ellipse(f.x + 3, f.y - 2, 4, 4);
    }
  }

  // ---------- MOVE PIGEON ----------
  handleMovement();

  // keep pigeon on screen
  pigeonX = constrain(pigeonX, 0, width);
  pigeonY = constrain(pigeonY, 0, height);

  // ---------- DRAW PIGEON ----------
  drawPigeon();

  // ---------- EAT FOOD ----------
  for (let f of food) {
    if (!f.eaten && dist(pigeonX, pigeonY, f.x, f.y) < 20) {
      f.eaten = true;
      score++;
    }
  }

  // ---------- UI ----------
  fill(0);
  textSize(16);
  text("Food collected: " + score, 10, 20);

  if (frozen) {
    fill(255, 0, 0);
    textSize(14);
    text("Hit a person! Frozen 5s!", 10, 60);
  }
}

function drawStartScreen() {
  fill(0);
  textAlign(CENTER, CENTER);

  textSize(36);
  text("Pigeon Dinner", width / 2, height / 2 - 60);

  textSize(18);
  text("Collect at least 20 food in 30 seconds!", width / 2, height / 2 - 15);
  text("Avoid people or you'll freeze for 5s.", width / 2, height / 2 + 15);

  textSize(16);
  text("Press SPACE to start", width / 2, height / 2 + 60);
}


function drawEndScreen() {
  textAlign(CENTER, CENTER);

  if (score >= 20) {
    fill(0);
    textSize(32);
    text("YOU ARE FULL!", width / 2, height / 2 - 40);
  } else {
    fill(255, 0, 0);
    textSize(32);
    text("YOU DIED (Too Hungry)", width / 2, height / 2 - 40);
  }

  textSize(20);
  fill(0);
  text("Final Score: " + score, width / 2, height / 2);

  // -------- PLAY AGAIN BUTTON --------
  if (!playAgainButton) {
    playAgainButton = createButton("Play Again");
    playAgainButton.position(width / 2 - 50, height / 2 + 50);
    playAgainButton.mousePressed(restartGame);
  }
}

function restartGame() {
  playAgainButton.remove();
  playAgainButton = null;

  setupGame(); // reset everything
  started = false; // goes back to start screen
  loop(); // resume drawing
}

function handleMovement() {
  if (frozen || gameOver) return;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65))  pigeonX -= speed;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) pigeonX += speed;
  if (keyIsDown(UP_ARROW) || keyIsDown(87))    pigeonY -= speed;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83))  pigeonY += speed;
}

function drawPigeon() {
  fill(150);
  ellipse(pigeonX, pigeonY, 40, 30);
  fill(255, 200, 0);
  triangle(pigeonX + 20, pigeonY - 5, pigeonX + 30, pigeonY, pigeonX + 20, pigeonY + 5);
  fill(255);
  circle(pigeonX + 10, pigeonY - 3, 10);
  fill(0);
  circle(pigeonX + 12, pigeonY - 3, 5);
}

function drawPerson(x, y) {
  stroke(0);
  strokeWeight(2);
  line(x, y - 20, x, y);
  line(x - 5, y - 15, x + 5, y - 20);
  noStroke();
  fill(255, 220, 180);
  ellipse(x, y - 25, 10, 10);
}


function keyPressed() {
  if (!started && key === ' ') {
    started = true;
    startTime = millis();
  }
}