import assert from "node:assert";
import { transparentRatio } from "./src/scratchRatio.js";
import { parseLinearGradient, splitTopLevel } from "./src/cssGradient.js";

// build fake RGBA data: N pixels, mark `clear` of them transparent (alpha 0)
function rgba(total, clear) {
  const d = new Uint8ClampedArray(total * 4).fill(255); // opaque
  for (let i = 0; i < clear; i++) d[i * 4 + 3] = 0; // alpha = 0
  return d;
}

// step=1 so every pixel counts in the test
assert.strictEqual(transparentRatio(rgba(100, 0), 1), 0);
assert.strictEqual(transparentRatio(rgba(100, 100), 1), 1);
assert.strictEqual(transparentRatio(rgba(100, 85), 1), 0.85);
assert.strictEqual(transparentRatio(new Uint8ClampedArray(0), 1), 0); // empty

console.log("transparentRatio ok");

// commas inside rgba(...) must not split the stop list
assert.deepStrictEqual(
  splitTopLevel("207.8deg, rgba(255,0,0,0.5) 40%, #000").map((s) => s.trim()),
  ["207.8deg", "rgba(255,0,0,0.5) 40%", "#000"]
);

// the user's gradient
const g = parseLinearGradient(
  "linear-gradient(207.8deg, #FF6B2C 1.4%, #FF7E3E 40.31%, #FF9A5C 59.76%, #FFB97B 98.68%)"
);
assert.strictEqual(g.angle, 207.8);
assert.strictEqual(g.stops.length, 4);
assert.strictEqual(g.stops[0].color, "#FF6B2C");
assert.ok(Math.abs(g.stops[0].stop - 0.014) < 1e-9);
assert.strictEqual(g.stops[3].color, "#FFB97B");

// `to right` direction + rgba stop without a position
const g2 = parseLinearGradient("linear-gradient(to right, rgba(0,0,0,0.5), #fff)");
assert.strictEqual(g2.angle, 90);
assert.deepStrictEqual(g2.stops[0], { color: "rgba(0,0,0,0.5)", stop: null });

console.log("parseLinearGradient ok");
