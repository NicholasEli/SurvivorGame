import { movingSprites } from './dictonary.js';

export default class Survivor {
	constructor(x = 0, y = 0) {
		this.width = 50;
		this.height = 50;
		this.x = 100;
		this.y = 100;
		this.width = 75;
		this.height = 75;
		this.health = 100;
		this.sprite = 'idle-0';
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
		const xAxis = this.x + this.width / 2;
		const yAxis = this.y + this.height / 2;
		window.Canvas.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
		//window.Canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);
		window.Survivor = this;
	}

	drawRoutePath(routeNodes) {
		if (!routeNodes.length) return;
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

		// Get the intial mouse event
		window.Canvas.el.onmousedown = (e) => {
			onTarget = false;
			routeNodes = [];
			clientCoords = null;
			canvasBounds = window.Canvas.el.getBoundingClientRect();
			clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };

			if (!window.Settings.planning) return;

			console.log('--selecting survivor');

			onTarget = true;
			window.Canvas.el.classList.add('selecting');

			routeNodes = [
				{
					x: this.x + this.width / 2,
					y: this.y + this.height / 2,
				},
			];
		};

		// Draw route on mouse move
		window.Canvas.el.onmousemove = (e) => {
			if (!onTarget) return;

			console.log('--drawing route');

			window.Canvas.el.classList.remove('selecting');
			window.Canvas.el.classList.add('drawing');
			const previousNode = routeNodes[routeNodes.length - 1];
			clientCoords = { x: e.clientX - canvasBounds.x, y: e.clientY - canvasBounds.y };

			routeNodes.push(clientCoords);
			window.Canvas.clear();
			this.drawRoutePath(routeNodes);
			this.drawSurvivor();
		};

		// Set final coords on mouse up
		window.Canvas.el.onmouseup = (e) => {
			console.log('--setting route');

			window.Canvas.el.classList.remove('drawing');

			this.routeNodes = routeNodes;
			window.Canvas.clear();
			this.drawRoutePath(routeNodes);
			this.drawSurvivor();

			onTarget = false;
		};
	}

	orientSurvivor(nextX, nextY) {
		let xDiff = 0;
		if (nextX > this.x) xDiff = nextX - this.x;
		if (this.x > nextX) xDiff = this.x - nextY;

		let yDiff = nextY - this.y;
		if (nextY > this.y) xDiff = nextY - this.y;
		if (this.y > nextY) xDiff = this.y - nextY;

		let theta = Math.atan2(yDiff, xDiff); // range (-PI, PI]
		theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
		console.log(theta);

		// if (theta >= 0 && theta < 45) this.sprite = 'move-90';
		// if (theta >= 45 && theta < 90) this.sprite = 'move-180';
		// if (theta >= 90 && theta < 135) this.sprite = 'move-180';
		// if (theta >= 135 && theta < 180) this.sprite = 'move-270';
		// if (theta >= 180 && theta < 225) this.sprite = 'move-225';
		// if (theta >= 225 && theta < 270) this.sprite = 'move-270';
		// if (theta >= 270 && theta < 315) this.sprite = 'move-315';
		// if (theta >= 315 && theta <= 360) this.sprite = 'move-0';
	}

	// Moves survivor in direction of drawn route
	moveSurvivor() {
		if (!this.routeNodes || (this.routeNodes && !this.routeNodes.length)) return;
		let moveSpriteIndex = 0;
		let nodeIndex = 0;
		const fps = 5;

		const _animate = () => {
			this.x = this.routeNodes[nodeIndex].x - this.width / 2;
			this.y = this.routeNodes[nodeIndex].y - this.height / 2;
			const nextNode = this.routeNodes[nodeIndex + 1];
			if (nextNode) {
				this.orientSurvivor(nextNode.x - this.width / 2, nextNode.y - this.height / 2);
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
