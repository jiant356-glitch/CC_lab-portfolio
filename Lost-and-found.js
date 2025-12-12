function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(70, 179, 237);
  
  
  //light
  
    fill(255, 240, 84,200);
  rect(0,190,400,25);
  rect(190,0,20,400);
  
  



  
 
  push();
    blendMode(HARD_LIGHT);
  rotate(180/4);
    rect(270,-300,20,400);
  pop();
  
   push();
    blendMode(HARD_LIGHT);
  rotate(-180/4);
    rect(-10,-160,20,400);
  pop();
 
  //sun
  fill(255, 240, 84);
  circle(200, 200, 100);
  
  
  //lake
  fill(70, 83, 168);
  rect(0, 200, 400, 200);
  fill(255,255,255);
  rect(150,220,95,5);
  rect(160,230,80,5);
rect(170,240,60,5);
  //cherryblossom
  fill(212, 157, 200);
  ellipse(350,100,150,150);
    ellipse(380,190,60,60);
     ellipse(290,200,50,50);
  ellipse(280,30,60,60);
  
  //tree
  fill(115, 82, 55);
  push();
  rotate(-18);
  rect(300,180,16,200);
  pop();
  
  triangle(390, 220, 380, 200, 250, 100);
  
  
  //flower
  noStroke();
  fill(255, 217, 252);
  ellipse(320,80,120,120);
  ellipse(360,180,80,80);
  ellipse(340,230,50,50);
    ellipse(270,140,40,40);
   ellipse(320,180,30,30);
  
  fill(255, 255, 255);
  ellipse(250,80,50,50);
  ellipse(390,120,80,80);
  ellipse(380,240,30,30);
  
  //house
  fill(74,45,34);
  triangle(0, 180, 0, 350, 200, 350);
  rect(0,350,100,100);
  fill(163, 52, 27);
    rect(0,345,198,5);
}