
let img;             //image input
let blocks = [];     //array of blocks（按显示顺序排列？）
let blockSize = 20;   //size of each block
let cellsize;         //size of each cell
let cols, rows;      //number of columns and rows
// let blockIndex = 0;    //current block index
// let blockCount = 0;    //total number of blocks
let slider;          //slider for controlling the number of blocks


function setup() {
  createCanvas(600, 600);
  noLoop(); // 不自动循环，只有改动时才重画
}