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

		this.orientation = {
			x: this.x + this.width / 2,
			y: 0,
		};
	}

	route(point1, point2) {
		if (!point1) return;
		this.canvas.ctx.beginPath();

		if (point1) {
			this.canvas.ctx.fillStyle = '#39ff14';
			this.canvas.ctx.beginPath();
			this.canvas.ctx.arc(point1.x, point1.y, 5, 0, 2 * Math.PI);
			this.canvas.ctx.fill();
			this.canvas.ctx.moveTo(point1.x, point1.y);
		}
		if (point2) this.canvas.ctx.lineTo(point2.x, point2.y);

		this.canvas.ctx.lineWidth = 3;
		this.canvas.ctx.setLineDash([5, 15]);
		this.canvas.ctx.strokeStyle = '#39ff14';
		this.canvas.ctx.stroke();

		this.canvas.ctx.fillStyle = '#39ff14';
		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(point2.x, point2.y, 5, 0, 2 * Math.PI);
		this.canvas.ctx.fill();
	}
}
