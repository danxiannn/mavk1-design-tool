# TO DO LIST

## 1. Image Input
- Import an image
- Display the original image on the canvas

## 2. Image Decomposition
- Divide the image into a grid
- Adjust the number and size of blocks
- Explore different grid structures

## 3. Image Reorganization
- Randomly rearrange the position of image blocks
- Control the amount of displacement
- Regenerate different compositions

## 4. Block Modification
- Keep the original image block
- Replace selected blocks with glitch effects
- Fill selected blocks with solid colours
- Leave selected blocks empty

## 5. Manual Interaction
- Select individual blocks
- Move blocks manually
- Change the type of each block

## 6. Custom Textures (Later Development)
- Import external images or patterns
- Use imported textures to replace selected blocks
- Adjust texture scale and position

## 7. Export
- Export the final composition as an image

优先完成1–3：上传图片、分割网格、重新排列图块。

输入图像 → 切网格 → 分析每格颜色和亮度 → 重排 → 按类型渲染每个格子（原图块、纯色、按亮度的 trame、留空，之后再加 glitch 和自定义纹理）→ 手动修改 → 导出

可能涉及一种 image-to-pattern translation（图像到图案的转换）。

例如，假设输入一张照片：
1. 把照片划分成若干矩形区域。
2. 读取每个区域的平均亮度和颜色。
3. 根据亮度决定图案的视觉属性，比如线条密度、粗细、对比度。
4. （可选）在每个区域内导入图案（预设trame或用户导入的trame）。
5. 将所有区域组合起来，形成一张新的图像。

*6. 调整（矩形大小、区域）//随机打乱or手动修改（颜色、位置...）

(所有修改保留原图像，类似ps里的智能对象)

用户输入：图像jpeg.png.webp/视频？


# Grid Tool — 工作流程与功能模块 / Workflow & Modules

工具定位 / Scope：P3 + P4 方向——切分图像网格、分析颜色与亮度、重新排列和替换图块。
(P1 + P2 的毛玻璃 / 光晕效果另做一个工具 / Frosted-glass & halo effects will be a separate tool.)

## 工作流程 / Workflow
输入图像 → 切分网格 → 分析每格颜色与亮度 → 重新排列 → 按类型渲染图块 → 手动修改 → 导出
Import → Grid → Analyse → Rearrange → Render blocks → Edit manually → Export

核心原则 / Core principle：原图始终不被修改，画面由参数和数据重新生成（类似 PS 智能对象）。
The original image is never modified; the result is always re-rendered from parameters and data (like a smart object in Photoshop).

---

## 工作流程 / Workflow
输入图像 → 切分网格 → 分析每格颜色与亮度 → 重新排列 → 按类型渲染图块 → 手动修改 → 导出
Import → Grid → Analyse → Rearrange → Render blocks → Edit manually → Export

## 1. 图像输入 / Image Input
- [x] 导入图像（JPG / PNG）/ Import an image (JPG / PNG)
- [x] 缩放以适应画布 / Fit the image to the canvas
- [ ] 拖拽上传 / Drag-and-drop upload
- [ ] （之后）视频或摄像头输入 / (Later) video or webcam input

## 2. 图像切分 / Image Decomposition
- [x] 将图像切分为网格 / Divide the image into a grid
- [x] 调整格子大小和数量 / Adjust block size and number
- [ ] 探索其他网格结构（不等宽行列、按细节细分）/ Explore other grid structures (uneven rows/columns, subdivision by detail)

## 3. 图像分析 / Image Analysis
- [x] 读取每格平均颜色 / Read the average colour of each block
- [x] 计算每格亮度 / Calculate the brightness of each block
- [ ] 可选：取每格面积最大的颜色 / Optional: use the dominant colour of each block
- [ ] 亮度映射可切换（线条密度、粗细、对比度）/ Switchable brightness mapping (line density, thickness, contrast)

## 4. 图像重组 / Image Reorganisation
- [x] 随机重新排列图块位置 / Randomly rearrange block positions
- [x] 控制打乱比例和距离 / Control shuffle amount and range
- [x] 重新生成不同组合 / Regenerate different compositions
- [ ] 其他重组方式（旋转图块、滑动整行/整列）/ Other methods (rotate blocks, slide rows/columns)

## 5. 图块渲染 / Block Rendering
- [x] 保留原图块 / Keep the original image block
- [x] 填充平均色 / Fill with the average colour
- [x] 按亮度生成线条纹理（trame）/ Generate line textures (trame) from brightness
- [x] 留空 / Leave empty
- [ ] Glitch 效果（待定义：像素错位、通道分离、拉伸等）/ Glitch effects (to define: pixel shift, channel split, stretching, etc.)
- [ ] 更多预设纹理（点、网格、斜线）/ More preset textures (dots, grid, diagonals)

## 6. 手动操作 / Manual Interaction
- [x] 点击格子切换类型 / Click a block to change its type
- [x] 拖动格子交换位置 / Drag a block to swap positions
- [ ] 手动修改单个格子的颜色 / Change the colour of a single block
- [ ] 撤销 / 重做 / Undo / Redo

## 7. 自定义纹理（后期）/ Custom Textures (Later)
- [ ] 导入外部图像或图案 / Import external images or patterns
- [ ] 用导入纹理替换选中图块 / Replace selected blocks with imported textures
- [ ] 调整纹理比例和位置 / Adjust texture scale and position

## 8. 导出 / Export
- [x] 导出 PNG / Export as PNG
- [ ] 按原图分辨率导出 / Export at original resolution
- [ ] （可选）导出 SVG，用于印刷 / (Optional) export as SVG for print

---

## 数据结构备注 / Data Structure Notes
- `cells`：源格子信息（位置、平均色、亮度）/ Source block data (position, average colour, brightness)
- `order`：每个位置显示哪个源格子 / Which source block is shown at each position
- `types`：每个位置的手动类型，空值表示跟随全局设置 / Manual type per position; empty means follow the global setting
- 改变网格大小时，手动修改会被清空 / Changing the grid size clears manual edits