export default class Survivor {
	constructor(canvas, settings, x = 0, y = 0) {
		this.canvas = canvas;
		this.settings = settings;
		this.width = 50;
		this.height = 50;
		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 75;
		this.health = 100;
		this.sprite = 'idle-0';
	}

	calcWidthHeight(sprite) {
		if (sprite === 'idle-0') {
			this.width = 100;
			this.height = 66;
		}
	}

	init() {
		if (!this.canvas && !this.settings) return;

		const sprite = document.getElementById(this.sprite);
		this.calcWidthHeight(this.sprite);
		this.canvas.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
		//this.ctx.strokeRect(this.x, this.y, this.width, this.height);

		this.drawRoute();
	}

	drawRoute() {
		let onTarget = false;
		this.canvas.el.onmousedown = (e) => {
			const canvasBounds = this.canvas.el.getBoundingClientRect();
			const clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };
			if (
				clientCoords.x > this.x &&
				clientCoords.x < this.x + this.width &&
				clientCoords.y > this.y &&
				clientCoords.y < this.y + this.height &&
				this.settings.planning
			) {
				console.log('--selecting survivor');
				onTarget = true;
			}
		};

		this.canvas.el.onmousemove = (e) => {
			if (onTarget) {
				console.log('--drawing route');
			}
		};

		this.canvas.el.onmouseup = (e) => {
			if (onTarget) {
				console.log('--setting route');
			}
			onTarget = false;
		};
	}
}
