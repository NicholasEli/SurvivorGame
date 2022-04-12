import Settings from './Settings.js';
import Canvas from './Canvas.js';
import Survivor from './Survivor.js';

window.onload = function () {
	console.log('--Server Running');

	const canvas = new Canvas();
	canvas.init();

	const settings = new Settings(canvas);
	settings.init();

	const survivor = new Survivor(canvas, 10, 10);
	survivor.init();
};
