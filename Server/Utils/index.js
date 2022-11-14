// eslint-disable-next-line no-undef

const createArr = (num) => {
  const arr = Array.from(Array(num), (numItem, index) => index + 1);
  return arr;
};

const checkLeftCross = (objTick, newTick) => {
  const { x, y, tick } = newTick;
  let isTick = objTick[`${x + "_" + y}`] === tick;
  let dem = 0;
  let index = 0;
  while (isTick) {
    dem++;
    index++;
    isTick = objTick[`${x + index + "_" + (y + index)}`] === tick;
    if (dem === 5) return true;
  }

  dem = 0;
  index--;
  isTick = objTick[`${x + index + "_" + (y + index)}`] === tick;
  while (isTick) {
    dem++;
    index--;
    isTick = objTick[`${x + index + "_" + (y + index)}`] === tick;
    if (dem === 5) return true;
  }

  return false;
};

const checkRightCross = (objTick, newTick) => {
  const { x, y, tick } = newTick;
  let isTick = objTick[`${x + "_" + y}`] === tick;
  let dem = 0;
  let index = 0;
  while (isTick) {
    dem++;
    index++;
    isTick = objTick[`${x - index + "_" + (y + index)}`] === tick;
    if (dem === 2) return true;
  }

  dem = 0;
  index--;
  isTick = objTick[`${x - index + "_" + (y + index)}`] === tick;
  while (isTick) {
    dem++;
    index--;
    isTick = objTick[`${x - index + "_" + (y + index)}`] === tick;
    if (dem === 2) return true;
  }

  return false;
};

const checkHorizontal = (objTick, newTick) => {
  const { x, y, tick } = newTick;
  let isTick = objTick[`${x + "_" + y}`] === tick;
  let dem = 0;
  let index = 0;
  while (isTick) {
    dem++;
    index++;
    isTick = objTick[`${x + "_" + (y + index)}`] === tick;
    if (dem === 5) return true;
  }

  dem = 0;
  index--;
  isTick = objTick[`${x + "_" + (y + index)}`] === tick;
  while (isTick) {
    dem++;
    index--;
    isTick = objTick[`${x + "_" + (y + index)}`] === tick;
    if (dem === 5) return true;
  }

  return false;
};

const checkVertical = (objTick, newTick) => {
  const { x, y, tick } = newTick;
  let isTick = objTick[`${x + "_" + y}`] === tick;
  let dem = 0;
  let index = 0;
  while (isTick) {
    dem++;
    index++;
    isTick = objTick[`${x + index + "_" + y}`] === tick;
    if (dem === 5) return true;
  }

  dem = 0;
  index--;
  isTick = objTick[`${x + index + "_" + y}`] === tick;
  while (isTick) {
    dem++;
    index--;
    isTick = objTick[`${x + index + "_" + y}`] === tick;
    if (dem === 5) return true;
  }

  return false;
};

const checkWinGame = (data) => {

  if (Object.entries(data).length === 0) return false;
  const { objTick, newTick } = data;
  const isWin =
    checkHorizontal(objTick, newTick) ||
    checkVertical(objTick, newTick) ||
    checkLeftCross(objTick, newTick) ||
    checkRightCross(objTick, newTick);
  return isWin;
};

module.exports = {
  createArr,
  checkWinGame,
};
