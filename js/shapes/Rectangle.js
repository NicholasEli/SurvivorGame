/**
 * Rectangle Class
 * @param { class } canvas - Canvas Class
 * @param { int } x - x coordinate
 * @param { int } y - y cooridnate
 * @param { int } width - width of rectangle
 * @param { int } height - height of rectangle
 * @param { string } color - color of rectangle
 **/
export default class Rectangle {
	constructor(canvas, x, y, width, height, color) {
		this.canvas = canvas;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	draw() {
		this.canvas.ctx.beginPath();
		this.canvas.ctx.fillStyle = this.color;
		this.canvas.ctx.rect(this.x, this.y, this.width, this.height);
		this.canvas.ctx.fill();
		this.canvas.ctx.closePath();
	}

	update() {
		this.draw();
	}
}
