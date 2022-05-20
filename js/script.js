import { rifle } from './sprites.js';
import { slope, direction, distance, degree } from './utils.js';
import Canvas from './Canvas.js';
import Survivor from './Survivor.js';

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = async function () {
	console.log('--Server Running');

	const canvas = new Canvas();
	canvas.init();

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
	let point1 = null;
	let point2 = null;
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
			if (point1 && point2) {
				point1 = null;
				point2 = null;
			}
			if (!point1) {
				targetingSurvivor = true;
				point1 = { x: survivor.x + survivor.width / 2, y: survivor.y + survivor.height / 2 };
			}
		}
	};

	canvas.el.onmousemove = (e) => {
		if (point1 && targetingSurvivor) {
			const clientCoordinates = {
				x: e.clientX - canvas.dimensions.x,
				y: e.clientY - canvas.dimensions.y,
			};
			point2 = clientCoordinates;
			canvas.clear();
			survivor.route(point1, point2);
			survivor.draw();
		}
	};

	canvas.el.onmouseup = (e) => {
		if (point1 && targetingSurvivor) {
			const clientCoordinates = {
				x: e.clientX - canvas.dimensions.x,
				y: e.clientY - canvas.dimensions.y,
			};
			point2 = clientCoordinates;
			canvas.clear();
			survivor.route(point1, point2);
			survivor.draw();
		}
		targetingSurvivor = false;
	};

	const playBtn = document.getElementById('play-btn');
	const pauseBtn = document.getElementById('pause-btn');

	let playing = false;
	playBtn.onclick = () => {
		playBtn.classList.remove('active');
		pauseBtn.classList.add('active');
		playing = true;
		const _degree = degree(point1.x, point1.y, point2.x, point2.y, true);
		survivor.rotation = _degree;
		const _direction = direction(point1.x, point1.y, point2.x, point2.y);
		let index = 1;
		const _animate = () => {
			survivor.x = survivor.x + _direction.x;
			survivor.y = survivor.y + _direction.y;
			canvas.clear();
			survivor.route(point1, point2);
			survivor.draw();
			index++;

			setTimeout(() => requestAnimationFrame(() => _animate()), 200);
		};

		if (point1 && point2) _animate();
	};

	pauseBtn.onclick = () => {
		pauseBtn.classList.remove('active');
		playBtn.classList.add('active');
		playing = false;
		canvas.clear();
		survivor.draw();
	};
};
