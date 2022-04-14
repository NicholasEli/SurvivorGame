import { movingSprites } from './dictonary.js';
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

	const survivorDims = {
		width: 75,
		height: 75,
		image: document.getElementById('survivor'),
	};
	const survivor = new Survivor(
		canvas,
		0,
		0,
		survivorDims.width,
		survivorDims.height,
		canvas.dimensions.width / 2,
		canvas.dimensions.height / 2,
		50,
		50,
		survivorDims.image
	);
	console.log(survivor);
	survivor.draw();
};
