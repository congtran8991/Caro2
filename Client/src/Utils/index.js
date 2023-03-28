const POINT = 5;
export const createArr = (num) => {
  const arr = Array.from(Array(num), (numItem, index) => index + 1);
  return arr;
};

export const checkLeftCross = (objTick, newTick) => {
  const { x, y, tick } = newTick;
  let isTick = objTick[`${x + "_" + y}`] === tick;
  let dem = 0;
  let index = 0;
  while (isTick) {
    dem++;
    index++;
    isTick = objTick[`${x + index + "_" + (y + index)}`] === tick;
    if (dem === POINT) return true;
  }

  dem = 0;
  index--;
  isTick = objTick[`${x + index + "_" + (y + index)}`] === tick;
  while (isTick) {
    dem++;
    index--;
    isTick = objTick[`${x + index + "_" + (y + index)}`] === tick;
    if (dem === POINT) return true;
  }

  return false;
};

export const checkRightCross = (objTick, newTick) => {
  const { x, y, tick } = newTick;
  let isTick = objTick[`${x + "_" + y}`] === tick;
  let dem = 0;
  let index = 0;
  while (isTick) {
    dem++;
    index++;
    isTick = objTick[`${x - index + "_" + (y + index)}`] === tick;
    if (dem === POINT) return true;
  }

  dem = 0;
  index--;
  isTick = objTick[`${x - index + "_" + (y + index)}`] === tick;
  while (isTick) {
    dem++;
    index--;
    isTick = objTick[`${x - index + "_" + (y + index)}`] === tick;
    if (dem === POINT) return true;
  }

  return false;
};

export const checkHorizontal = (objTick, newTick) => {
  const { x, y, tick } = newTick;
  let isTick = objTick[`${x + "_" + y}`] === tick;
  let dem = 0;
  let index = 0;
  while (isTick) {
    dem++;
    index++;
    isTick = objTick[`${x + "_" + (y + index)}`] === tick;
    if (dem === POINT) return true;
  }

  dem = 0;
  index--;
  isTick = objTick[`${x + "_" + (y + index)}`] === tick;
  while (isTick) {
    dem++;
    index--;
    isTick = objTick[`${x + "_" + (y + index)}`] === tick;
    if (dem === POINT) return true;
  }

  return false;
};

export const checkVertical = (objTick, newTick) => {
  const { x, y, tick } = newTick;
  let isTick = objTick[`${x + "_" + y}`] === tick;
  let dem = 0;
  let index = 0;
  while (isTick) {
    dem++;
    index++;
    isTick = objTick[`${x + index + "_" + y}`] === tick;
    if (dem === POINT) return true;
  }

  dem = 0;
  index--;
  isTick = objTick[`${x + index + "_" + y}`] === tick;
  while (isTick) {
    dem++;
    index--;
    isTick = objTick[`${x + index + "_" + y}`] === tick;
    if (dem === POINT) return true;
  }

  return false;
};
