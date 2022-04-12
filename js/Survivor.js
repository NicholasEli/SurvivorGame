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
		this.routeNodes = [];
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

		const _drawPath = () => {
			console.clear();
			this.canvas.ctx.moveTo(routeNodes[0].x, routeNodes[0].y);
			routeNodes.forEach((node, index) => {
				if (!routeNodes[index] || !routeNodes[index + 1]) return;
				const xc = (routeNodes[index].x + routeNodes[index + 1].x) / 2;
				const yc = (routeNodes[index].y + routeNodes[index + 1].y) / 2;
				this.canvas.ctx.quadraticCurveTo(routeNodes[index].x, routeNodes[index].y, xc, yc);
			});
			const i = routeNodes.length - 2;
			this.canvas.ctx.quadraticCurveTo(
				routeNodes[i].x,
				routeNodes[i].y,
				routeNodes[i + 1].x,
				routeNodes[i + 1].y
			);
			this.canvas.ctx.lineWidth = 3;
			this.canvas.ctx.stroke();
		};

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
				this.routeNodes = [];
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
				this.routeNodes = routeNodes;
				_drawPath();
			}

			if (onTarget && routeNodes.length <= 1) {
				console.log('--setting route (none)');
				this.routeNodes = [];
			}

			onTarget = false;
			routeNodes = [];
			clientCoords = null;
		};
	}
}
