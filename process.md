# TO DO LIST

Import → Grid → Analyse → Rearrange → Render blocks → Edit manually → Export
image-to-pattern translation

## 1. Image Input
- [x] Import an image (JPG / PNG)
- [x] Fit the image to the canvas
- [ ] *Drag-and-drop upload
- [ ] *(Later) video or webcam input

## 1-2. Image Adjustments
- [x] Brightness, contrast, saturation
- [ ] Levels: black point, white point, midtones
- [ ] Reset all adjustments
- [ ] (Later) curves
- [ ] (Optional) adjust block colours after the mosaic step

## 2. Image Decomposition
- [x] Divide the image into a grid
- [x] Adjust block size and number
- [ ] Explore other grid structures (uneven rows/columns, subdivision by detail)

## 3. Image Analysis
- [x] Read the average colour of each block
- [x] Calculate the brightness of each block
- [x] Optional: use the dominant colour of each block
- [ ] Switchable brightness mapping (line density, thickness, contrast)

## 4. * Image Reorganisation
slider -- 完全不动 → 全部打乱
- [ ] No shuffle by default; start from original positions
- [ ] Swap a few blocks locally
- [ ] Fully shuffle (optional)
- [ ] Move blocks only within a nearby range
- [ ] Other methods (rotate blocks, slide rows/columns)

## 5. Block Rendering
- [x] Keep the original image block
- [x] Fill with the average colour
- [ ] Generate line textures (trame) from brightness
- [ ] Leave empty
- [ ] Glitch effects (to define: pixel shift, channel split, stretching, etc.)
- [ ] More preset textures (dots, grid, diagonals)

## 6. Manual Interaction
- [ ] Click a block to change its type
- [ ] Drag a block to swap positions
- [ ] Change the colour of a single block
- [ ] Undo / Redo

## 7. Custom Textures (Later)
- [ ] Import external images or patterns
- [ ] Replace selected blocks with imported textures
- [ ] Adjust texture scale and position

## 8. Export
- [ ] Export as PNG
- [ ] Export at original resolution
- [ ] (Optional) export as SVG for print


For example, suppose a photograph is input:
1. Divide the photograph into several rectangular regions.
2. Read the average brightness and colour of each region.
3. Determine the visual properties of the pattern—such as line density, thickness and contrast—based on the brightness.
4. (Optional) Import a pattern (a preset pattern or one imported by the user) into each region.
5. Combine all the regions to form a new image.

*6. Adjust (rectangle size, regions) // Randomise or manually modify (colour, position, etc.)

(All modifications are applied whilst preserving the original image, like Smart Objects in Photoshop)