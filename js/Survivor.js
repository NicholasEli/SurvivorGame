export default class Survivor {
	constructor(canvas, x = 0, y = 0) {
		this.canvas = canvas;
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
		if (!this.canvas) return;
		this.drawSurvivor();
		//this.ctx.strokeRect(this.x, this.y, this.width, this.height);

		this.drawRoute();
		window.Survivor = this;
	}

	drawSurvivor() {
		const sprite = document.getElementById(this.sprite);
		this.calcWidthHeight(this.sprite);
		this.canvas.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
		window.Survivor = this;
	}

	drawRoute() {
		const minDistanceBetweenNodes = 25;
		const minNodes = 3;
		let onTarget = false;
		let routeNodes = [];
		let canvasBounds = null;
		let clientCoords = null;

		const _drawPath = () => {
			if (!routeNodes.length || (routeNodes.length && routeNodes.length < minNodes)) return;
			this.canvas.ctx.beginPath();
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
			this.canvas.ctx.setLineDash([5, 15]);
			this.canvas.ctx.strokeStyle = '#39ff14';
			this.canvas.ctx.stroke();

			const lastNode = routeNodes[routeNodes.length - 1];
			this.canvas.ctx.fillStyle = '#39ff14';
			this.canvas.ctx.beginPath();
			this.canvas.ctx.arc(lastNode.x, lastNode.y, 5, 0, 2 * Math.PI);
			this.canvas.ctx.fill();
		};

		this.canvas.el.onmousedown = (e) => {
			onTarget = false;
			routeNodes = [];
			clientCoords = null;
			canvasBounds = this.canvas.el.getBoundingClientRect();
			clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };
			if (
				clientCoords.x > this.x &&
				clientCoords.x < this.x + this.width &&
				clientCoords.y > this.y &&
				clientCoords.y < this.y + this.height &&
				window.Settings.planning
			) {
				console.log('--selecting survivor');
				routeNodes = [];
				onTarget = true;
				routeNodes.push(clientCoords);
			}
		};

		this.canvas.el.onmousemove = (e) => {
			if (onTarget) {
				const previousNode = routeNodes[routeNodes.length - 1];
				clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };

				if (
					parseInt(clientCoords.x - previousNode.x) > minDistanceBetweenNodes ||
					parseInt(clientCoords.y - previousNode.y) > minDistanceBetweenNodes
				) {
					console.log('--drawing route');
					routeNodes.push(clientCoords);
					if (routeNodes && routeNodes.length > minNodes) {
						this.canvas.clear();
						_drawPath();
						this.drawSurvivor();
					}
				}
			}
		};

		this.canvas.el.onmouseup = (e) => {
			if (onTarget && routeNodes.length > minNodes) {
				console.log('--setting route');
				this.routeNodes = routeNodes;
			} else {
				this.routeNodes = [];
			}
			this.canvas.clear();
			_drawPath();
			this.drawSurvivor();
			onTarget = false;
		};
	}

	moveSurvivor() {
		if (this.routeNodes && this.routeNodes.length) {
			let frameCount = 0;
		}
	}
}
