let font;
let points = [];
let t = 0;

const WORD = "SOUL";
const FONT_SIZE = 200;

let textX, textY;

function preload() {
  font = loadFont("3.ttf");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-container");

  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 255);
  strokeCap(ROUND);

  let bounds = font.textBounds(WORD, 0, 0, FONT_SIZE);
  textX = (width - bounds.w) / 2 - bounds.x;
  textY = (height + bounds.h) / 2 - bounds.y - 180;

  points = font.textToPoints(WORD, textX, textY, FONT_SIZE, {
    sampleFactor: 0.22
  });
}

function draw() {
  background(260, 30, 6);

  let moveX = 8 * sin(t * 20);
  let moveY = 5 * sin(t * 15);

  let baseHue = (frameCount * 1.5) % 360;

  // ========= 横向扫描线 =========
  for (let i = 0; i < points.length; i++) {

    let px = points[i].x + moveX;
    let py = points[i].y + moveY;

    // 横向扫描波动（非常克制）
    let wave = 6 * sin(t * 60 + py * 0.2);

    let x1 = px - 10;
    let x2 = px + 10 + wave;

    let h = (baseHue + px * 0.2) % 360;

    stroke(h, 70, 100, 180);
    strokeWeight(1.5);
    line(x1, py, x2, py);
  }

  // ========= 外圈规则点 =========
  noStroke();

  for (let i = 0; i < points.length; i += 4) {

    let px = points[i].x + moveX;
    let py = points[i].y + moveY;

    let h = (baseHue + i * 2) % 360;

    fill(h, 80, 100, 140);
    circle(px, py, 3);
  }

  // ========= 白字 =========
  noStroke();
  fill(0, 0, 100, 90);
  textFont(font);
  textSize(FONT_SIZE);
  text(WORD, textX + moveX, textY + moveY);

  t += 0.02;
}