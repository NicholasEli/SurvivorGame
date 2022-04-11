export default class Canvas {
	constructor() {
		this.el = null;
		this.ctx = null;
		this.width = 768;
		this.height = 580;
		this.y = 0;
		this.x = null;
	}

	init() {
		const canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		document.body.append(canvas);

		this.el = canvas;
		this.ctx = this.el.getContext('2d');

		const bounds = this.el.getBoundingClientRect();
		this.width = bounds.width;
		this.height = bounds.height;
		this.y = bounds.y;
		this.x = bounds.x;

		return {
			element: this.canvas,
			context: this.ctx,
		};
	}

	get getDimensions() {
		const bounds = this.el.getBoundingClientRect();
		return bounds;
	}
}
