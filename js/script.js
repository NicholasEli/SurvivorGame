import { movingSprites } from './dictonary.js';
import Canvas from './Canvas.js';
import Settings from './Settings.js';
import Environment from './Environment.js';
import Survivor from './Survivor.js';

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = async function () {
	console.log('--Server Running');

	const canvas = new Canvas();
	canvas.init();

	const container = document.getElementById('survivor');

	let image = document.createElement('img');
	image.id = `idle-0`;
	image.src = `./assets/survivor/rifle/idle/survivor-idle_rifle_0.png`;
	image.setAttribute('alt', `survivor idle - 0`);
	container.append(image);

	movingSprites.forEach((key) => {
		const image = document.createElement('img');
		image.id = `move-${key.degree}`;
		image.src = `./assets/survivor/rifle/move/survivor-move_rifle_${key.degree}.png`;
		image.setAttribute('alt', `survivor move - ${key.degree}`);
		container.append(image);
	});

	// Allow canvas & images to load
	await timeout(1000);

	const walls = [
		{ x: 0, y: 0, width: canvas.width, height: 25 },
		{ x: 0, y: canvas.height - 25, width: canvas.width, height: 25 },
		{ x: 0, y: 0, width: 25, height: canvas.height },
		{ x: canvas.width - 25, y: 0, width: 25, height: canvas.height },
	];

	const vertical = {
		width: 25,
		height: canvas.height / 2,
		quantity: 4,
		center: canvas.width / 2,
		offset: 100,
	};

	for (let i = 0; i < vertical.quantity; i++) {
		let wall = {
			width: vertical.width,
			height: vertical.height - vertical.offset,
		};

		if (i % 2 === 0) {
			wall.x = vertical.center - vertical.offset;
		} else {
			wall.x = vertical.center + vertical.offset;
		}

		if (i < vertical.quantity / 2) {
			wall.y = 0;
		} else {
			wall.y = vertical.height + vertical.offset;
		}

		walls.push(wall);
	}

	const horizontal = {
		width: canvas.width / 2,
		height: 25,
		quantity: 4,
		center: canvas.height / 2,
		offset: 100,
	};

	for (let i = 0; i < horizontal.quantity; i++) {
		let wall = {
			width: horizontal.width - horizontal.offset * 2,
			height: horizontal.height,
		};

		if (i < horizontal.quantity / 2) {
			wall.x = horizontal.offset + horizontal.height;
		} else {
			wall.x = horizontal.width + horizontal.offset;
		}

		if (i % 2 === 0) {
			wall.y = horizontal.center - horizontal.offset;
		} else {
			wall.y = horizontal.center + horizontal.offset;
		}

		walls.push(wall);
	}

	const environment = new Environment(walls);
	environment.init();
	window.Canvas.update = () => {
		environment.init();
	};

	const survivor = new Survivor(10, 10);

	const playCallback = () => {
		survivor.moveSurvivor();
	};

	const pauseCallback = () => {
		console.log(settings);
	};
	const settings = new Settings(playCallback, pauseCallback);
	settings.init();
	survivor.init();
};
