export default class Environment {
	constructor(walls = []) {
		this.walls = walls;
	}

	init() {
		this.drawWalls();

		window.Environment = this;
	}

	drawWalls() {
		this.walls.forEach(({ x, y, width, height }) => {
			window.Canvas.ctx.beginPath();
			window.Canvas.ctx.fillStyle = '#000000';
			window.Canvas.ctx.rect(x, y, width, height);
			window.Canvas.ctx.fill();
		});
	}
}
