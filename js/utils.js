/**
 * Calcs slope between  two points
 * @param { int } x1 - x coordinate of object 1
 * @param { int } y1 - y coordinate of object 1
 * @param { int } x2 - x coordinate of object 2
 * @param { int } y2 - y coordinate of object 2
 * @return { object } rise, run and slope
 **/
export function slope(x1, x2, y1, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return { x, y, slope: y / x };
}

/**
 * Calcs degree between  two points
 * @param { int } x1 - x coordinate of object 1
 * @param { int } y1 - y coordinate of object 1
 * @param { int } x2 - x coordinate of object 2
 * @param { int } y2 - y coordinate of object 2
 * @return { float } degree from point A and point B
 **/
export function degree(x1, x2, y1, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  const radians = Math.atan2(y, x);
  let degrees = (radians * 180) / Math.PI - 90;
  while (degrees >= 360) degrees -= 360;
  while (degrees < 0) degrees += 360;

  return degrees;
}

/**
 * Calcs distance between the center of two points
 * @param { int } x1 - x coordinate of object 1
 * @param { int } y1 - y coordinate of object 1
 * @param { int } x2 - x coordinate of object 2
 * @param { int } y2 - y coordinate of object 2
 * @return { float } distance between the center of two objects
 **/
export function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/**
 * Calcs direction between two points
 * @param { int } x1 - x coordinate of object 1
 * @param { int } y1 - y coordinate of object 1
 * @param { int } x2 - x coordinate of object 2
 * @param { int } y2 - y coordinate of object 2
 * @return { object } direction of travel angle for x & y cooridnates
 **/
export function direction(x1, y1, x2, y2) {
  const _slope = slope(x1, y1, x2, y2);
  const angle = Math.atan2(_slope.y, _slope.x);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  return velocity;
}

/**
 * Determines if two objects have collided at their borders
 * @param { float } disatnce - distance between the center of two objects
 * @param { int } r1 - radius ( or area ) of object 1
 * @param { int } x2 - radius ( or area ) of object 2
 * @return { boolean } true or false based on if items have collided
 **/
export function collision(distance, r1, r2) {
  if (distance < r1 + r2) {
    return true;
  }

  return false;
}

/**
 * Animate elements on a loop
 * @param { class } canvas - Canvas class
 * @param { function } callback - returns true false value to keep animating
 * @param { boolean } stop - tells animation when to stop running
 **/
export function animate(canvas, callback, stop = false) {
  if (!canvas || !callback) return;

  const { ctx, dimensions } = canvas;

  if (stop === false) requestAnimationFrame(() => animate(canvas, callback, stop));

  ctx.clearRect(0, 0, dimensions.width, dimensions.height);

  stop = callback();
}
