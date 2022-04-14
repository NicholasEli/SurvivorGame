import Image from './shapes/Image.js';

export default class Survivor extends Image {
	constructor(
		canvas,
		sx = null,
		sy = null,
		sWidth = null,
		sHeight = null,
		x,
		y,
		width,
		height,
		image
	) {
		super(canvas, sx, sy, sWidth, sHeight, x, y, width, height, image);
	}
}
