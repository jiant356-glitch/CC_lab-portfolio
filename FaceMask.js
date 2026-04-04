let faceMesh;
let video;
let faces = [];

let maskImg;

function preload() {
  faceMesh = ml5.faceMesh({
  maxFaces: 1
});


 maskImg = loadImage("FaceMask.png");
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];

    // faceOval
    let faceOval = face.faceOval;

    // 算出整张脸的大概范围，拿来放图片
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    for (let i = 0; i < faceOval.keypoints.length; i++) {
      let keypoint = faceOval.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;

      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
      if (y < minY) {
        minY = y;
      }
      if (y > maxY) {
        maxY = y;
      }
    }

    // 脸型
    push();
    fill(255, 232, 229);
    noStroke();

    beginShape();

    for (let i = 0; i < faceOval.keypoints.length; i++) {
      let keypoint = faceOval.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;

      vertex(x, y);
    }

    endShape(CLOSE);
    pop();

    
    
    // left eyeline
 
let leftEyeLine = [
  33, 246, 161, 160, 159, 158, 157, 173
];

push();
    
    noFill();                 
stroke(166, 207, 68);     
strokeWeight(5);   

beginShape();

for (let i = 0; i < leftEyeLine.length; i++) {
  let index = leftEyeLine[i];

  let x = face.keypoints[index].x;
  let y = face.keypoints[index].y;

  vertex(x, y);
}

endShape();
pop();

    
    
     // right eyeline
 
let rightEyeLine = [
  263, 466, 388, 387, 386, 385, 384, 398
];

push();
   
    noFill();                 
stroke(166, 207, 68);     
strokeWeight(5);   

beginShape();

for (let i = 0; i < rightEyeLine.length; i++) {
  let index = rightEyeLine[i];

  let x = face.keypoints[index].x;
  let y = face.keypoints[index].y;

  vertex(x, y);
}

endShape();
pop();

    
    
    
    // left eyebrow
    let leftEyebrow = face.leftEyebrow;

    push();
    fill(166, 207, 68);
    noStroke();
    beginShape();

    for (let i = 0; i < leftEyebrow.keypoints.length; i++) {
      let keypoint = leftEyebrow.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;

      vertex(x, y);
    }

    endShape(CLOSE);
    pop();

    // right eyebrow
    let rightEyebrow = face.rightEyebrow;

    push();
    fill(166, 207, 68);
    noStroke();

    beginShape();

    for (let i = 0; i < rightEyebrow.keypoints.length; i++) {
      let keypoint = rightEyebrow.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;

      vertex(x, y);
    }

    endShape(CLOSE);
    pop();

    // lips
    let lips = face.lips;

    push();
    fill(255, 108, 240);
    noStroke();

    beginShape();

    for (let i = 0; i < lips.keypoints.length; i++) {
      let keypoint = lips.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;

      vertex(x, y);
    }

    endShape(CLOSE);
    pop();

    // left eye
    let leftEye = face.leftEye;

    push();
    fill(255, 189, 250);
    noStroke();

    beginShape();

    for (let i = 0; i < leftEye.keypoints.length; i++) {
      let keypoint = leftEye.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;

      vertex(x, y);
    }

    endShape(CLOSE);
    pop();

    // right eye
    let rightEye = face.rightEye;

    push();
    fill(255, 189, 250);
    noStroke();

    beginShape();

    for (let i = 0; i < rightEye.keypoints.length; i++) {
      let keypoint = rightEye.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;

      vertex(x, y);
    }

    endShape(CLOSE);
    pop();

    // 图片最上面
    image(
      maskImg,
      minX - 20,
      minY - 20,
      (maxX - minX) + 40,
      (maxY - minY) + 40
    );
  }
}