/**
 * Circle Class
 * @param { class } canvas - Canvas Class
 * @param { int } x - x coordinate
 * @param { int } y - y cooridnate
 * @param { int } r - radius of circle
 * @param { string } color - color of cirlce
 **/
export default class Circle {
	constructor(canvas, x, y, radius, color) {
		this.canvas = canvas;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw() {
		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.canvas.ctx.fillStyle = this.color;
		this.canvas.ctx.fill();
		this.canvas.ctx.closePath();
	}

	update() {
		this.draw();
	}
}
