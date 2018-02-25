// Downloaded from internet
export const getNearest = (rX: number, segments: [number, number, string][]) => {
  let nearestValue = -1;
  let nearestIndex = -1;

  segments.forEach((item, index) => {
    const from = item[0];
    const to = item[1];
    const distanceFrom = Math.abs(from - rX);
    if (nearestValue === -1 || distanceFrom < nearestValue) {
      nearestValue = distanceFrom;
      nearestIndex = index;
    }
    const distanceTo = Math.abs(to - rX);
    if (nearestValue === -1 || distanceTo < nearestValue) {
      nearestValue = distanceTo;
      nearestIndex = index;
    }
  });

  return nearestIndex;
};
