import Settings from './Settings.js';
import Canvas from './Canvas.js';
import Survivor from './Survivor.js';

window.onload = function () {
	console.log('--Server Running');

	const settings = new Settings();

	const canvas = new Canvas();
	const ctx = canvas.init();

	const survivor = new Survivor(ctx, 10, 10);
	survivor.init();
};
