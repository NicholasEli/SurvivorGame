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
		let routeNodes = [];
		let canvasBounds = null;
		let clientCoords = null;

		this.canvas.el.onmousedown = (e) => {
			canvasBounds = this.canvas.el.getBoundingClientRect();
			clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };
			if (
				clientCoords.x > this.x &&
				clientCoords.x < this.x + this.width &&
				clientCoords.y > this.y &&
				clientCoords.y < this.y + this.height &&
				this.settings.planning
			) {
				console.log('--selecting survivor');
				onTarget = true;
				routeNodes.push(clientCoords);
			}
		};

		this.canvas.el.onmousemove = (e) => {
			if (onTarget) {
				const previousNode = routeNodes[routeNodes.length - 1];
				clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };

				if (
					parseInt(clientCoords.x - previousNode.x) > 50 ||
					parseInt(clientCoords.y - previousNode.y) > 50
				) {
					console.log('--drawing route');
					routeNodes.push(clientCoords);
				}
			}
		};

		this.canvas.el.onmouseup = (e) => {
			if (onTarget && routeNodes.length > 1) {
				console.log('--setting route');
				console.log(routeNodes);
			}
			onTarget = false;
			routeNodes = [];
			clientCoords = null;
		};
	}
}
