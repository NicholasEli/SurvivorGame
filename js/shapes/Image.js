/**
 * Image Class
 * @param { class } canvas - Canvas Class
 * @param { int } sx - x coordinate of image relative to container x axis
 * @param { int } sy - y cooridnate of relative to container y axis
 * @param { int } sWidth - width of image relative to container
 * @param { int } height - height of image relative to container
 * @param { int } x - x coordinate
 * @param { int } y - y cooridnate
 * @param { int } width - width of rectangle
 * @param { int } height - height of rectangle
 * @param { string } color - color of rectangle
 **/
export default class Image {
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
		this.canvas = canvas;
		this.sx = sx;
		this.sy = sy;
		this.sWidth = sWidth;
		this.sHeight = sHeight;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.image = image;
	}

	draw() {
		this.canvas.ctx.beginPath();
		if (this.sx === null || this.sy === null || !this.sWidth === null || !this.sHeight === null) {
			this.canvas.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		} else {
			this.canvas.ctx.drawImage(
				this.image,
				this.sx,
				this.sy,
				this.sWidth,
				this.sHeight,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
		this.canvas.ctx.closePath();
	}

	update() {
		this.draw();
	}
}
