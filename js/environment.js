import Rectangle from './shapes/Rectangle.js';
const color = '#151515';

export function setOuterWalls(canvas) {
	const thickness = 5;
	const { width, height } = canvas.dimensions;

	const walls = [
		//top
		{ x: 0, y: 0, width, height: thickness, color, instance: null },
		//bottom
		{
			x: 0,
			y: height - thickness,
			width: canvas.dimensions.width,
			height: thickness,
			color,
			instance: null,
		},
		//left
		{ x: 0, y: 0, width: thickness, height, color, instance: null },
		// right
		{
			x: width - thickness,
			y: 0,
			width: thickness,
			height,
			color,
			instance: null,
		},
	];

	walls.forEach((wall, index) => {
		const { x, y, width, height, color } = wall;
		const instance = new Rectangle(canvas, x, y, width, height, color);
		walls[index].instance = instance;
		instance.draw();
	});

	return walls;
}

export function setInnerWalls(canvas) {
	const thickness = 5;
	const { width, height } = canvas.dimensions;

	const _width1 = width * 0.25;
	const _height = height * 0.4;
	const _x1 = width * 0.4;
	const _x2 = width * 0.6;
	const _y = height * 0.6;

	const walls = [
		//top - left
		{ x: _x1, y: 0, width: thickness, height: _height, color, instance: null },
		//top - right
		{ x: _x2, y: 0, width: thickness, height: _height, color, instance: null },
		//bottom left
		{
			x: _x1,
			y: _y,
			width: thickness,
			height: _height,
			color,
			instance: null,
		},
		//bottom - right
		{
			x: _x2,
			y: _y,
			width: thickness,
			height: _height,
			color,
			instance: null,
		},
		// center - top - left
		{ x: 0, y: _height, width: _width1, height: thickness, color, instance: null },
		// center - bottom - right
		{ x: width - _width1, y: _y, width: _width1, height: thickness, color, instance: null },
	];

	walls.forEach((wall, index) => {
		const { x, y, width, height, color } = wall;
		const instance = new Rectangle(canvas, x, y, width, height, color);
		walls[index].instance = instance;
		instance.draw();
	});

	return walls;
}
