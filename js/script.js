import { rifle } from './sprites.js';
import Canvas from './Canvas.js';
import Survivor from './Survivor.js';

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = async function () {
	console.log('--Server Running');

	const canvas = new Canvas();
	canvas.init();

	timeout(2000);

	const survivor = new Survivor(
		canvas,
		// inner dims
		0,
		0,
		rifle.move.cell.width,
		rifle.move.cell.height,
		// outer dims
		canvas.dimensions.width / 2,
		canvas.dimensions.height / 2,
		rifle.move.cell.width,
		rifle.move.cell.height,
		document.getElementById('survivor')
	);

	survivor.draw();

	let targetingSurvivor = false;
	let routePoints = [];
	canvas.el.onmousedown = (e) => {
		const clientCoordinates = {
			x: e.clientX - canvas.dimensions.x,
			y: e.clientY - canvas.dimensions.y,
		};

		if (
			clientCoordinates.x > survivor.x &&
			clientCoordinates.x < survivor.x + survivor.width &&
			clientCoordinates.y > survivor.y &&
			clientCoordinates.y < survivor.y + survivor.height
		) {
			routePoints = [clientCoordinates];
			targetingSurvivor = true;
		}
	};

	canvas.el.onmousemove = (e) => {
		if (targetingSurvivor) {
			routePoints.push({
				x: e.clientX - canvas.dimensions.x,
				y: e.clientY - canvas.dimensions.y,
			});

			canvas.clear();
			survivor.route(routePoints);
			survivor.draw();
		}
	};

	canvas.el.onmouseup = (e) => {
		targetingSurvivor = false;
		canvas.clear();
		survivor.route(routePoints);
		survivor.draw();
	};

	const playBtn = document.getElementById('play-btn');
	const pauseBtn = document.getElementById('pause-btn');

	let playing = false;
	let routeIndex = 0;
	playBtn.onclick = () => {
		playBtn.classList.remove('active');
		pauseBtn.classList.add('active');
		playing = true;
		const _animate = () => {
			if (playing && !routePoints[routeIndex]) {
				pauseBtn.click();
				playing = false;
				routeIndex = 0;
				routePoints = [];
				return;
			}

			canvas.clear();
			survivor.route(routePoints);
			survivor.x = routePoints[routeIndex].x;
			survivor.y = routePoints[routeIndex].y;
			survivor.draw();
			routeIndex++;

			requestAnimationFrame(() => _animate());
		};

		_animate();
	};

	pauseBtn.onclick = () => {
		pauseBtn.classList.remove('active');
		playBtn.classList.add('active');
		playing = false;
		canvas.clear();
		survivor.draw();
	};
};
