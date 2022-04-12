import Settings from './Settings.js';
import Canvas from './Canvas.js';
import Survivor from './Survivor.js';

window.onload = function () {
	console.log('--Server Running');

	const canvas = new Canvas();
	const survivor = new Survivor(10, 10);

	const playCallback = () => {
		console.log();
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
