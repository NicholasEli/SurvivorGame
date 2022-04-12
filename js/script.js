import Settings from './Settings.js';
import Canvas from './Canvas.js';
import Survivor from './Survivor.js';

window.onload = function () {
	console.log('--Server Running');

	const settings = new Settings();
	settings.init();

	const canvas = new Canvas();
	const canvasProps = canvas.init();

	const survivor = new Survivor(canvas.element, canvasProps.context, 10, 10);
	survivor.init();
};
