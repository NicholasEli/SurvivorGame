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

	const environment = new Environment([
		{ x: 0, y: 0, width: canvas.width, height: 10 }, // top
		{ x: canvas.width - 10, y: 0, width: 10, height: canvas.height }, // right
		{ x: 0, y: canvas.height - 10, width: canvas.width, height: 10 }, // bottom
		{ x: 0, y: 0, width: 10, height: canvas.height }, // left
		// bottom center
		{ x: canvas.width / 2.5, y: canvas.height - 225, width: 10, height: 225 },
		{ x: canvas.width - canvas.width / 2.5, y: canvas.height - 225, width: 10, height: 225 },
		// top center
		{ x: canvas.width / 2.5, y: 0, width: 10, height: 225 },
		{ x: canvas.width - canvas.width / 2.5, y: 0, width: 10, height: 225 },
		// left center
		{ x: 150, y: canvas.height - 365, width: 165, height: 10 },
		{ x: 150, y: canvas.height - 225, width: 165, height: 10 },
		// right center
		{ x: canvas.width - 300, y: canvas.height - 365, width: 165, height: 10 },
		{ x: canvas.width - 300, y: canvas.height - 225, width: 165, height: 10 },
	]);
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
