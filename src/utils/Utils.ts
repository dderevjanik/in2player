// Downloaded from internet
export const getNearest = (rX: number, segments: [number, number, string][]) => {
  let nearestValue = -1;
  let nearestIndex = -1;

  console.log('x: ', rX);
  segments.forEach((item, index) => {
    const from = item[0];
    const to = item[1];
    const distanceFrom = Math.abs(from - rX);
    if (nearestValue === -1 || distanceFrom < nearestValue) {
      console.log('FROM: ', nearestValue, nearestIndex, distanceFrom);
      nearestValue = distanceFrom;
      nearestIndex = index;
    }
    const distanceTo = Math.abs(to - rX);
    if (nearestValue === -1 || distanceTo < nearestValue) {
      console.log('TO: ', nearestValue, nearestIndex, distanceTo);
      nearestValue = distanceTo;
      nearestIndex = index;
    }
  });

  return nearestIndex;
};
