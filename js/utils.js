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
  return { x, y, s: y / x };
}

/**
 * Calcs degree between  two points
 * @param { int } x1 - x coordinate of object 1
 * @param { int } y1 - y coordinate of object 1
 * @param { int } x2 - x coordinate of object 2
 * @param { int } y2 - y coordinate of object 2
 * @return { float } degree from point A and point B
 **/
export function degree(x1, y1, x2, y2, is360 = false) {
  let deltaX = x1 - x2;
  let deltaY = y1 - y2;
  let radians = Math.atan2(deltaY, deltaX);
  let degrees = (radians * 180) / Math.PI - 90;
  if (is360) degrees = (degrees + 360) % 360;

  return degrees;
}

/**
 * Set canvas rotation based on 360 degree circumference
 * @param { degree } 360 calcuation
 * @return { float } canvas related rotation to circumference
 **/
export function rotation(degree) {
  return 0.016 * degree;
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
  const _slope = slope(x1, x2, y1, y2);

  return Math.sqrt(Math.pow(_slope.x, 2) + Math.pow(_slope.y, 2));
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
  const _slope = slope(x1, x2, y1, y2);
  const angle = Math.atan2(_slope.y, _slope.x);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  return velocity;
}

/**
 * Determines if two arc objects have collided at their borders
 * @param { float } disatnce - distance between the center of two objects
 * @param { int } r1 - radius ( or area ) of object 1
 * @param { int } x2 - radius ( or area ) of object 2
 * @return { boolean } true or false based on if items have collided
 **/
export function arcCollision(distance, r1, r2) {
  if (distance < r1 + r2) {
    return true;
  }

  return false;
}

/**
 * Determines if rect character has reached destination
 * @param { object } character - rect object - "character"
 * @param { object } endpont - x and y coordinates
 * @return { boolean } true or false if character reached destination
 **/
export function characterCollision(character, endPoint, buffer = 5) {
  const center = {
    x: character.x + character.width / 2,
    y: character.y + character.height / 2,
  };

  const bounds = {
    left: endPoint.x - buffer,
    right: endPoint.x + buffer * 2,
    top: endPoint.y - buffer,
    bottom: endPoint.y + buffer * 2,
  };

  if (
    center.x >= bounds.left &&
    center.x <= bounds.right &&
    center.y >= bounds.top &&
    center.y <= bounds.bottom
  ) {
    return true;
  }

  return false;
}
