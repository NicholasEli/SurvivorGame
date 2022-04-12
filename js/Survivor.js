export default class Survivor {
	constructor(x = 0, y = 0) {
		this.width = 50;
		this.height = 50;
		this.x = 0;
		this.y = 0;
		this.width = 75;
		this.height = 75;
		this.health = 100;
		this.sprite = 'idle-0';
		this.minNodes = 3;
		this.routeNodes = [];
	}

	init() {
		if (!window.Canvas) return;
		this.drawSurvivor();
		this.setRoute();
		window.Survivor = this;
	}

	drawSurvivor() {
		const sprite = document.getElementById(this.sprite);
		window.Canvas.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
		//window.Canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);
		window.Survivor = this;
	}

	drawRoutePath(routeNodes) {
		if (!routeNodes.length || (routeNodes.length && routeNodes.length < this.minNodes)) return;
		window.Canvas.ctx.beginPath();
		window.Canvas.ctx.moveTo(routeNodes[0].x, routeNodes[0].y);
		routeNodes.forEach((node, index) => {
			if (!routeNodes[index] || !routeNodes[index + 1]) return;
			const xc = (routeNodes[index].x + routeNodes[index + 1].x) / 2;
			const yc = (routeNodes[index].y + routeNodes[index + 1].y) / 2;
			window.Canvas.ctx.quadraticCurveTo(routeNodes[index].x, routeNodes[index].y, xc, yc);
		});
		const i = routeNodes.length - 2;
		window.Canvas.ctx.quadraticCurveTo(
			routeNodes[i].x,
			routeNodes[i].y,
			routeNodes[i + 1].x,
			routeNodes[i + 1].y
		);

		window.Canvas.ctx.lineWidth = 3;
		window.Canvas.ctx.setLineDash([5, 15]);
		window.Canvas.ctx.strokeStyle = '#39ff14';
		window.Canvas.ctx.stroke();

		const lastNode = routeNodes[routeNodes.length - 1];
		window.Canvas.ctx.fillStyle = '#39ff14';
		window.Canvas.ctx.beginPath();
		window.Canvas.ctx.arc(lastNode.x, lastNode.y, 5, 0, 2 * Math.PI);
		window.Canvas.ctx.fill();
	}

	setRoute() {
		let onTarget = false;
		let routeNodes = [];
		let canvasBounds = null;
		let clientCoords = null;

		window.Canvas.el.onmousedown = (e) => {
			onTarget = false;
			routeNodes = [];
			clientCoords = null;
			canvasBounds = window.Canvas.el.getBoundingClientRect();
			clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };
			if (
				clientCoords.x > this.x &&
				clientCoords.x < this.x + this.width &&
				clientCoords.y > this.y &&
				clientCoords.y < this.y + this.height &&
				window.Settings.planning
			) {
				console.log('--selecting survivor');
				routeNodes = [
					{
						x: this.x + this.width / 2,
						y: this.y + this.height / 2,
					},
				];
				onTarget = true;
			}
		};

		window.Canvas.el.onmousemove = (e) => {
			if (onTarget) {
				const previousNode = routeNodes[routeNodes.length - 1];
				clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };

				console.log('--drawing route');
				routeNodes.push(clientCoords);
				if (routeNodes && routeNodes.length > this.minNodes) {
					window.Canvas.clear();
					this.drawRoutePath(routeNodes);
					this.drawSurvivor();
				}
			}
		};

		window.Canvas.el.onmouseup = (e) => {
			if (onTarget && routeNodes.length > this.minNodes) {
				console.log('--setting route');
				this.routeNodes = routeNodes;
			} else {
				this.routeNodes = [];
			}
			window.Canvas.clear();
			this.drawRoutePath(routeNodes);
			this.drawSurvivor();

			onTarget = false;
		};
	}

	moveSurvivor() {
		if (this.routeNodes && this.routeNodes.length) {
			let moveSpriteIndex = 0;
			let nodeIndex = 0;
			const fps = 20;

			const _animate = () => {
				this.x = this.routeNodes[nodeIndex].x - this.width / 2;
				this.y = this.routeNodes[nodeIndex].y - this.height / 2;
				if (moveSpriteIndex >= 19) moveSpriteIndex = 0;
				this.sprite = `move-${moveSpriteIndex}`;

				if (this.routeNodes.length - 1 === this.routeNodes.length) {
					this.sprite = 'idle-0';
				}

				window.Canvas.clear();
				this.drawRoutePath(this.routeNodes);
				this.drawSurvivor();

				nodeIndex = nodeIndex + 1;
				moveSpriteIndex = moveSpriteIndex + 1;

				setTimeout(() => {
					if (nodeIndex < this.routeNodes.length - 1) {
						window.requestAnimationFrame(_animate);
					}
				}, 1000 / fps);
			};

			_animate();
		}
	}
}
