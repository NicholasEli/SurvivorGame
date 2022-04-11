export default class Survivor {
	constructor(ctx, x = 0, y = 0) {
		this.ctx = ctx;
		this.width = 50;
		this.height = 50;
		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 75;
		this.health = 100;
		this.sprite = 'idle-0';
		this.moving = false;
	}

	calcWidthHeight(sprite) {
		if (sprite === 'idle-0') {
			this.width = 100;
			this.height = 66;
		}
	}

	init() {
		const sprite = document.getElementById(this.sprite);
		this.calcWidthHeight(this.sprite);
		this.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
		//this.ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
}
