import { movingSprites } from './dictonary.js';
import Canvas from './Canvas.js';
// import Settings from './Settings.js';
// import Environment from './Environment.js';
// import Survivor from './Survivor.js';

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = async function () {
	console.log('--Server Running');

	const canvas = new Canvas();
	canvas.init();
};
