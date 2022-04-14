import Image from './shapes/Image.js';

export default class Survivor extends Image {
	constructor() {
		super();
	}

	draw() {
		console.log(this);
	}
}
