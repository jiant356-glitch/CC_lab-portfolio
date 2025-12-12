// "Breathing Wall" optical illusion
// Uses nested for loops + if/else to create a bulging / breathing grid

let cellSize = 40;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(20);

  // center of "breath" – try mouse, or switch to width/2, height/2
  let cx = mouseX;
  let cy = mouseY;

  // if mouse is off canvas at start, you can default to center
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    cx = width / 2;
    cy = height / 2;
  }

  // nested for loops: draw grid
  for (let y = cellSize / 2; y < height; y += cellSize) {
    for (let x = cellSize / 2; x < width; x += cellSize) {

      // distance from this cell to the "breathing center"
      let d = dist(x, y, cx, cy);

      // base size and color
      let size = cellSize * 0.7;
      let c = 80;

      // if close enough, make it "bulge" / "breathe"
      if (d < 150) {
        // map distance to a bigger size
        size = map(d, 0, 150, cellSize * 1.2, cellSize * 0.7);

        // make color brighter near center
        c = map(d, 0, 150, 255, 80);
      } else {
        // farther away: small and darker
        size = cellSize * 0.5;
        c = 50;
      }

      fill(c);
      rect(x, y, size, size);
    }
  }

  // simple title text
  fill(255);
  textAlign(LEFT);
  textSize(14);
  text("Breathing Wall – move your mouse", 10, 20);
}