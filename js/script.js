import Settings from './Settings.js';
import Canvas from './Canvas.js';
import Survivor from './Survivor.js';

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = async function () {
	console.log('--Server Running');

	const idleImageCount = 0;
	const container = document.getElementById('survivor');

	let image = document.createElement('img');
	image.id = `idle-0`;
	image.src = `./assets/survivor/rifle/idle/survivor-idle_rifle_0.png`;
	image.setAttribute('alt', `survivor idle - 0`);
	container.append(image);

	const movingImageCount = 20;
	for (let i = 0; i < movingImageCount; i++) {
		const image = document.createElement('img');
		image.id = `move-${i}`;
		image.src = `./assets/survivor/rifle/move/survivor-move_rifle_${i}.png`;
		image.setAttribute('alt', `survivor move - ${i}`);
		container.append(image);
	}

	// Allow images to load
	await timeout(1000);

	const canvas = new Canvas();
	const survivor = new Survivor(10, 10);

	const playCallback = () => {
		survivor.moveSurvivor();
	};

	const pauseCallback = () => {
		console.log(settings);
	};
	const settings = new Settings(playCallback, pauseCallback);

	canvas.init();
	settings.init();
	survivor.init();
};
