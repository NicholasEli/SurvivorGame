import Canvas from './Canvas.js';
import Survivor from './Survivor.js';

window.onload = function () {
	console.log('--Server Running');
	const canvas = new Canvas();
	const ctx = canvas.init();

	const survivor = new Survivor(ctx, 10, 10);
	survivor.init();
};
