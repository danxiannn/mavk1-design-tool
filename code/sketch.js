
let img;             //image input
let blocks = [];     //array of blocks（按显示顺序排列？）
let cellSize = 20;   //size of each cell
let cols, rows;      //number of columns and rows
let labyrinthChoices = [];
let previousGrid = "";

const labyrinthDrawings = [
  drawLabyrinthOne,
  drawLabyrinthTwo,
  drawLabyrinthThree,
  drawLabyrinthFour,
  drawLabyrinthFive,
  drawLabyrinthSix
];

const diagonalDrawings = [
  drawSlash,
  drawSlash,
  drawSlash,
  drawBackslash
];


function setup() {

  createCanvas(800, 800);
  createFileInput(handleFile); // 上传按钮
  noLoop();                    // 不自动循环，需要时才重画
  
  // 找到页面上所有滑杆，让它们一动就重画
  let sliders = selectAll("input[type=range]");
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].input(redraw);
  }
  select("#trame").changed(redraw); // 切换 trame 时重画
  select("#saveButton").mousePressed(savePNG); // 点按钮就保存
}

// 选了文件以后运行
function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data, imageReady);
  }
}

// 图片加载好以后运行：按比例调整画布大小
function imageReady() {
  let scale = 600 / max(img.width, img.height);
  resizeCanvas(round(img.width * scale), round(img.height * scale));
  redraw();
}

// 画马赛克
function draw() {
  background(255);

  if (!img) {
    return; // 还没有图片，就不画
  }

  // 读取滑杆的值
  cellSize = select("#size").value();// 获取滑杆的值，作为每格的大小

  cols = ceil(width / cellSize);
  rows = ceil(height / cellSize);

  let gridKey = `${cellSize},${cols},${rows}`;
  if (gridKey !== previousGrid) {
    labyrinthChoices = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => floor(random(labyrinthDrawings.length)))
    );
    previousGrid = gridKey;
  }

  // 把图缩小成 cols × rows 个像素，每个像素≈一格的平均色
  let small = img.get();
  small.resize(cols, rows);

  //看用户选了哪种 trame
  let trame = select("#trame").value();
  let drawings = null; // 要用的图案组，null 表示不画

  if (trame === "labyrinth") {
    drawings = labyrinthDrawings;
  } else if (trame === "diagonal") {
    drawings = diagonalDrawings;
  }

  noStroke();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let cellColor = small.get(col, row);
      let adjustedColor = adjustColour(cellColor);
      noStroke();
      fill(adjustedColor);
      rect(col * cellSize, row * cellSize, cellSize, cellSize);
      // 选了图案才画 trame
      if (drawings !== null) {
        drawLabyrinth(
          col * cellSize,
          row * cellSize,
          cellSize,
          adjustedColor,
          labyrinthChoices[row][col],
          drawings
        );
      }
    }
  }

}

// function drawLabyrinth(x, y, size, cellColor, drawingIndex, drawings) {
//   let luminance = (cellColor[0] * 0.299 + cellColor[1] * 0.587 + cellColor[2] * 0.114);  //算这一格有多亮
//   // let lineColor = luminance > 127 ? 0 : 255;  //决定线是黑还是白 -- ? : 是 if ... else 的简写 -- “如果亮度大于 127（偏亮），线就用 0（黑）；否则用 255（白）。”

//   if (luminance > 127) {
//     // 亮的格子：往黑色走一半
//     stroke(cellColor[0] * 0.5, cellColor[1] * 0.5, cellColor[2] * 0.5);
//   } else {
//     // 暗的格子：往白色走一半
//     stroke(
//       cellColor[0] + (255 - cellColor[0]) * 0.5,
//       cellColor[1] + (255 - cellColor[1]) * 0.5,
//       cellColor[2] + (255 - cellColor[2]) * 0.5
//     );
//   }
  // noFill();          //形状里面不填充颜色，只画轮廓线
  // // stroke(lineColor,120); //线的颜色，半透明
  // strokeWeight(max(0.3, size * 0.03));  //线的粗细，最小为 0.6--线宽是格子大小的 6%，格子大线就粗，格子小线就细。max(0.6, ...) 是“取比较大的那个”，保证线宽最少是 0.6，格子很小时线也不会细到消失。
  // strokeJoin(ROUND); //圆角

  // blendMode(MULTIPLY); // 正片叠底：线和底色相乘
  // drawings[drawingIndex % drawings.length](x, y, size);
  // blendMode(BLEND);    // 画完换回正常模式
// }

function drawLabyrinth(x, y, size, cellColor, drawingIndex, drawings) {
  stroke(0, 80, 170);  // 油墨色：riso 蓝，可以换成别的颜色
  noFill();
  strokeWeight(max(0.3, size * 0.03));
  strokeJoin(ROUND);

  blendMode(MULTIPLY); // 正片叠底
  drawings[drawingIndex % drawings.length](x, y, size);
  blendMode(BLEND);    // 换回正常
}

function drawLabyrinthOne(x, y, size) {
  drawLabyrinthPath(x, y, size, [
    [0, 0.1], [0.9, 0.1], [0.9, 0.3], [0.8, 0.3],
    [0.8, 0.2], [0.7, 0.2], [0.7, 0.3], [0.6, 0.3], 
    [0.6, 0.2], [0.5, 0.2], [0.5, 0.3], [0.4, 0.3],
    [0.4, 0.2], [0.3, 0.2], [0.3, 0.3], [0.2, 0.3], 
    [0.2, 0.2], [0.1, 0.2], [0.1, 0.9], [0.2, 0.9], 
    [0.2, 0.4], [0.3, 0.4], [0.3, 0.7], [0.4, 0.7], 
    [0.4, 0.4], [0.5, 0.4], [0.5, 0.7], 
    [0.6, 0.7], [0.6, 0.4], [0.7, 0.4], [0.7, 0.7],
    [0.8, 0.7], [0.8, 0.4], [0.9, 0.4], [0.9, 0.8],
    [0.3, 0.8], [0.3, 0.9], [1, 0.9]
  ]);
}

function drawLabyrinthTwo(x, y, size) {
  drawLabyrinthPath(x, y, size, [
    [1, 0.1], [0.9, 0.1], [0.9, 0.9], [0.8, 0.9],[0.8,0.1],
    [0.1, 0.1], [0.1, 0.2], [0.7, 0.2], [0.7, 0.9],[0.6, 0.9],
    [0.6, 0.3], [0.5, 0.3], [0.5, 0.9], [0.2, 0.9],[0.2, 0.8],
    [0.4, 0.8], [0.4, 0.7], [0.2, 0.7], [0.2, 0.6],[0.4, 0.6],
    [0.4, 0.5], [0.2, 0.5], [0.2, 0.4], [0.4, 0.4],[0.4, 0.3],
    [0.1, 0.3], [0.1, 1]
  ]);
}

function drawLabyrinthThree(x, y, size) {
  drawLabyrinthPath(x, y, size, [
    [0, 0.9], [0.9, 0.9], [0.9, 0.1], [0.1, 0.1],
    [0.1, 0.8], [0.8, 0.8], [0.8, 0.2], [0.2, 0.2],
    [0.2, 0.7], [0.7, 0.7], [0.7, 0.3], [0.3, 0.3],
    [0.3, 0.6], [0.6, 0.6], [0.6, 0.4], [0.4, 0.4],
    [0.4, 0.5], [0.5, 0.5]
  ]);
}

function drawLabyrinthFour(x, y, size) {
  //groupline 1
  drawLabyrinthPath(x, y, size, [
    [0, 0.1], [0.8, 0.1], [0.8, 0.7], [0.4, 0.7], [0.4, 0.5], 
    [0.6, 0.5], [0.6, 0.3], [0.2, 0.3],[0.2, 0.9], [1, 0.9]
  ]);
    //groupline 2
  drawLabyrinthPath(x, y, size, [
    [0.9, 0], [0.9, 0.8], [0.3, 0.8], [0.3, 0.4], [0.5, 0.4],
    [0.5, 0.6], [0.7, 0.6], [0.7, 0.2], [0.1, 0.2], [0.1,1]
  ]);
}

function drawLabyrinthFive(x, y, size) {
  drawLabyrinthPath(x, y, size, [
    [0.1, 0], [0.1, 0.6], [0.2, 0.6], [0.2, 0.1],
    [0.9, 0.1], [0.9, 0.2], [0.3, 0.2], [0.3, 0.4],
    [0.4, 0.4], [0.4, 0.3], [0.5, 0.3], [0.5, 0.4],
    [0.6, 0.4], [0.6, 0.3], [0.7, 0.3], [0.7, 0.4],
    [0.8, 0.4], [0.8, 0.3], [0.9, 0.3], [0.9, 0.5],
    [0.3, 0.5], [0.3, 0.6], [0.9, 0.6], [0.9, 0.7],
    [0.1, 0.7], [0.1, 0.8], [0.9, 0.8], [0.9, 0.9], [0, 0.9]
  ]);
}

function drawLabyrinthSix(x, y, size) {
  //groupline 1
  drawLabyrinthPath(x, y, size, [
    [0.5, 0.5], [0.5, 0.4], [0.6, 0.4], [0.6, 0.6], [0.4, 0.6], 
    [0.4, 0.3], [0.7, 0.3], [0.7, 0.7],[0.3, 0.7], [0.3, 0.2],
    [0.8, 0.2], [0.8, 0.8], [0.2, 0.8], [0.2, 0.1], [0.9, 0.1],
    [0.9, 0.9], [0.1, 0.9], [0.1, 0], [1,0], [1,1], [0,1], [0,0],
    []
  ]);

function drawLabyrinthPath(x, y, size, points) {
  beginShape();
  for (let point of points) {
    vertex(x + size * point[0], y + size * point[1]);
  }
  endShape();
}


// 斜线 /
function drawSlash(x, y, size) {
    drawLabyrinthPath(x, y, size, [[0, 0.5], [0.5, 0]]); // 左上角那条短线
  drawLabyrinthPath(x, y, size, [[0, 1], [1, 0]]);     // 中间对角线
  drawLabyrinthPath(x, y, size, [[0.5, 1], [1, 0.5]]); // 右下角那条短线
}

// 斜线 \
function drawBackslash(x, y, size) {
  drawLabyrinthPath(x, y, size, [[0.5, 0], [1, 0.5]]); // 右上角那条短线
  drawLabyrinthPath(x, y, size, [[0, 0], [1, 1]]);     // 中间对角线
  drawLabyrinthPath(x, y, size, [[0, 0.5], [0.5, 1]]); // 左下角那条短线
}

 // 调整一个颜色：c 是 [r, g, b, a]
 function adjustColour(c) {
   let r = c[0];
  let g = c[1];
  let bl = c[2];

  // 1. 亮度：三个颜色都加同一个数
  let brightness = select("#brightness").value();
  r = r + brightness;
  g = g + brightness;
  bl = bl + brightness;

  // 2. 对比度：以中间灰 128 为中心，往两边推开或拉近
  let contrast = select("#contrast").value();
  r = (r - 128) * contrast + 128;
  g = (g - 128) * contrast + 128;
  bl = (bl - 128) * contrast + 128;

  // 3. 饱和度：以这个颜色自己的灰为中心，往外推开或拉近
  let saturation = select("#saturation").value();
  let grey = (r + g + bl) / 3;
  r = grey + (r - grey) * saturation;
  g = grey + (g - grey) * saturation;
  bl = grey + (bl - grey) * saturation;

  return [r, g, bl];
}


// 把画布保存成 PNG 图片
function savePNG() {
  saveCanvas("grid-mosaic", "png");
}

// 2-slider(intensity) - local shuffling(swap with other tiles(meibouring?))
// 3-*hue separation/histogram adjustments