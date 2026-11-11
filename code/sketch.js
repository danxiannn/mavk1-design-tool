
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
  drawLabyrinthFour
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

  noStroke();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let cellColor = small.get(col, row);
      let adjustedColor = adjustColour(cellColor);
      fill(adjustedColor);
      rect(col * cellSize, row * cellSize, cellSize, cellSize);
      drawLabyrinth(
        col * cellSize,
        row * cellSize,
        cellSize,
        adjustedColor,
        labyrinthChoices[row][col]
      );
    }
  }

}

function drawLabyrinth(x, y, size, cellColor, drawingIndex) {
  let luminance = (cellColor[0] * 0.299 + cellColor[1] * 0.587 + cellColor[2] * 0.114);
  let lineColor = luminance > 127 ? 0 : 255;

  noFill();
  stroke(lineColor);
  strokeWeight(max(0.6, size * 0.06));
  labyrinthDrawings[drawingIndex](x, y, size);
}

function drawLabyrinthOne(x, y, size) {
  drawLabyrinthPath(x, y, size, [
    [0.15, 0.15], [0.85, 0.15], [0.85, 0.38], [0.25, 0.38],
    [0.25, 0.62], [0.75, 0.62], [0.75, 0.85], [0.15, 0.85]
  ]);
}

function drawLabyrinthTwo(x, y, size) {
  drawLabyrinthPath(x, y, size, [
    [0.15, 0.85], [0.15, 0.15], [0.62, 0.15], [0.62, 0.42],
    [0.38, 0.42], [0.38, 0.65], [0.85, 0.65], [0.85, 0.85]
  ]);
}

function drawLabyrinthThree(x, y, size) {
  drawLabyrinthPath(x, y, size, [
    [0.15, 0.15], [0.4, 0.15], [0.4, 0.4], [0.85, 0.4],
    [0.85, 0.15], [0.65, 0.15], [0.65, 0.85], [0.15, 0.85]
  ]);
}

function drawLabyrinthFour(x, y, size) {
  drawLabyrinthPath(x, y, size, [
    [0.5, 0.15], [0.5, 0.38], [0.15, 0.38], [0.15, 0.62],
    [0.85, 0.62], [0.85, 0.85], [0.38, 0.85], [0.38, 0.15]
  ]);
}

function drawLabyrinthPath(x, y, size, points) {
  beginShape();
  for (let point of points) {
    vertex(x + size * point[0], y + size * point[1]);
  }
  endShape();
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



// 2-slider(intensity) - local shuffling(swap with other tiles(meibouring?))
// 3-*hue separation/histogram adjustments