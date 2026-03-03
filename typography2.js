let font;
let points = [];
let t = 0;

// “鸽子飞过”的扫描位置
let birdX = 0;

const WORD = "和平哥";   
const FONT_SIZE = 200;

function preload() {
  font = loadFont("1.ttf");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-container");

  angleMode(DEGREES);
  noiseDetail(2, 0.5);

 
  let bounds = font.textBounds(WORD, 0, 0, FONT_SIZE);
  let x = (width - bounds.w) / 2 - bounds.x;
  let y = (height + bounds.h) / 2 - bounds.y - 150;

  // 风吹点阵）
  points = font.textToPoints(WORD, x, y, FONT_SIZE, {
    sampleFactor: 0.22
  });

  // 保存居中坐标
  setup._textX = x;
  setup._textY = y;
}

function draw() {
  background(255, 212, 103);

  // 时间推进
  t += 0.02;

  // 鸽子从左飞到右（循环）
  birdX = (frameCount * 3) % width;

  // 中间半透明实心字：也轻微漂 
  let textWindX = map(noise(t * 0.2), 0, 1, -4, 4);
  let textWindY = map(noise(100 + t * 0.2), 0, 1, -1.5, 1.5);

  noStroke();
  fill(255, 90); // 半透明白
  textFont(font);
  textSize(FONT_SIZE);
  text(WORD, setup._textX + textWindX, setup._textY + textWindY);

  // 外层点阵：鸽子扫过增强飘动
  noStroke();

  for (let i = 0; i < points.length; i++) {
    let px = points[i].x;
    let py = points[i].y;

    // 阵风噪声（每个点不同）
    let n = noise(px * 0.01, py * 0.01, t * 0.5);
    let gust = map(n, 0, 1, -1, 1);

    // 鸽子扫过的影响强度（离 birdX 越近越强）
    let d = abs(px - birdX);
    let radius = 200;
    let strength = 1 - constrain(d / radius, 0, 1); // 0~1

    // 平时的小风（一直存在，幅度很小）
    let ambient = 2 * sin(t * 60 + py * 0.2) + 2 * gust;

    // 扫过时的强风（被 strength 放大）
    let burst =
      (8 * sin(t * 60 + py * 0.2 + px * 0.05) + 12 * gust) * strength;

    let baseWind = 0;
//不同的风向加在一起
    let windX = baseWind + ambient + burst;
    let windY = (2 * gust) * strength;

    // 扫过变色：平时偏白，扫过变蓝
    // strength=0 -> (255,255,255) 白
    // strength=1 -> (180,220,255) 浅蓝
    let r = map(strength, 0, 1, 255, 180);
    let g = map(strength, 0, 1, 255, 220);
    let b = map(strength, 0, 1, 255, 255);

    // 扫过时更亮一点（透明度更高）
    let alpha = map(strength, 0, 1, 160, 255);
    fill(r, g, b, alpha);

    // 扫过变大
    let size = map(strength, 0, 1, 2, 6);

    circle(px + windX, py + windY, size);
  }



}