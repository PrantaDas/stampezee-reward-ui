/** Fraction of fully-transparent (scratched) pixels in raw RGBA data.
 *  Pure + isolated so it can be unit-tested without a canvas. */
export function transparentRatio(data, step = 32) {
  let clear = 0;
  let total = 0;
  for (let i = 3; i < data.length; i += 4 * step) {
    if (data[i] === 0) clear++;
    total++;
  }
  return total ? clear / total : 0;
}
