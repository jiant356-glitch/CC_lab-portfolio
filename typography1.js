let font;
let points = [];
let t = 0; //时间

function preload(){
    font = loadFont('font.ttf')
}

function setup(){
let canvas = createCanvas(600,600);
canvas.parent("sketch-container");

points = font.textToPoints("SLEEP", 60, 330, 180, {
    sampleFactor: 0.25 //点的稀疏程度
  }); //打出peace 让他变成点组成的那个font

  angleMode(DEGREES);

  noiseDetail(2, 0.5); //线经过时抖动幅度
}


function draw(){

  //左右/上下摆动幅度  
background(92, 172, 217); 
let textWindX = 5 * sin(t * 40);
let textWindY = 5 * sin(t * 20);


  noStroke();
  fill(255, 214, 54);


  fill(255, 120);   // 半透明白
noStroke();
textFont(font);
textSize(180);
text("SLEEP", 60 + textWindX, 330 + textWindY);
  //在i的位置上画点
  for (let i = 0; i < points.length; i++) {
    let baseWind = 0;
    let n = noise(points[i].x * 0.01, points[i].y * 0.01, t * 0.5);
let gust = map(n, 0, 1, -1, 1); //控风术，让风随机
    let windY=0;
    //摆动幅度
    let windX = baseWind + 5 * sin(t * 60 + points[i].y * 0.2 + points[i].x * 0.05) + 12 * gust;
    circle(points[i].x + windX, points[i].y + windY, 3);
  }

 t += 0.02;
  textSize(14);
 // text("t=" + nf(t,1,2), 10, 20); //左上角t的数值
}
