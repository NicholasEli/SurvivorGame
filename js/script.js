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

	const survivorDims = {
		width: 75,
		height: 75,
	};
	const survivor = new Survivor(
		canvas,
		character.width / 2 - 50,
		character.height / 2 - 50,
		character.width / 4.3,
		character.height / 4.3,
		canvas.dimensions.width / 2,
		canvas.dimensions.height / 2 + 50,
		50,
		50,
		character.el
	);
	survivor.draw();
};
