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

		this.routePoints = [];
	}

	route(points) {
		if (!points || (points && !points.length)) this.canvas.ctx.beginPath();
		this.canvas.ctx.moveTo(points[0].x, points[0].y);
		points.forEach((point, index) => {
			if (!point || !points[index + 1]) return;
			const xc = (point.x + points[index + 1].x) / 2;
			const yc = (point.y + points[index + 1].y) / 2;
			this.canvas.ctx.quadraticCurveTo(point.x, point.y, xc, yc);
		});
		let i = 0;
		if (points.length > 3) i = points.length - 2;
		if (i > 0) {
			this.canvas.ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
		}

		this.canvas.ctx.lineWidth = 3;
		this.canvas.ctx.setLineDash([5, 15]);
		this.canvas.ctx.strokeStyle = '#39ff14';
		this.canvas.ctx.stroke();

		const lastNode = points[points.length - 1];
		this.canvas.ctx.fillStyle = '#39ff14';
		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(lastNode.x, lastNode.y, 5, 0, 2 * Math.PI);
		this.canvas.ctx.fill();
	}
}
