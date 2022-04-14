export default class Canvas {
	constructor() {
		this.el = null;
		this.dimensions = null;
		this.ctx = null;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	init() {
		const canvas = document.createElement('canvas');
		const dimensions = canvas.getBoundingClientRect();
		const ctx = canvas.getContext('2d');

		this.el = canvas;
		this.dimensions = dimensions;
		this.ctx = ctx;
	}
}
