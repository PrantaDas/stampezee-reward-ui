// Minimal CSS `linear-gradient()` parser → data a canvas can draw.
// Supports `<angle>deg` or `to <side>` plus rgb()/rgba()/hex/named color stops
// with optional `%` positions. Pure (no canvas) so it can be unit-tested.

const DIRS = {
  "to top": 0,
  "to right": 90,
  "to bottom": 180,
  "to left": 270,
  "to top right": 45,
  "to right top": 45,
  "to bottom right": 135,
  "to right bottom": 135,
  "to bottom left": 225,
  "to left bottom": 225,
  "to top left": 315,
  "to left top": 315,
};

// split on `sep` but ignore separators inside parentheses (e.g. rgba(…)).
export function splitTopLevel(str, sep = ",") {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of str) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === sep && depth === 0) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

/** Parse `linear-gradient(...)` into { angle, stops: [{ color, stop|null }] }. */
export function parseLinearGradient(value) {
  const inner = value.slice(value.indexOf("(") + 1, value.lastIndexOf(")"));
  const parts = splitTopLevel(inner).map((s) => s.trim());

  let angle = 180;
  let i = 0;
  const head = parts[0];
  const deg = head.match(/^(-?[\d.]+)deg$/);
  if (deg) {
    angle = +deg[1];
    i = 1;
  } else if (head in DIRS) {
    angle = DIRS[head];
    i = 1;
  }

  const stops = parts.slice(i).map((p) => {
    const m = p.match(/\s+(-?[\d.]+)%\s*$/);
    if (m) return { color: p.slice(0, m.index).trim(), stop: +m[1] / 100 };
    return { color: p.trim(), stop: null };
  });

  return { angle, stops };
}

/** Endpoints of the gradient line for a CSS angle over a w×h box. */
export function gradientEndpoints(angle, w, h) {
  const rad = (angle * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);
  const len = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
  const hx = (dx * len) / 2;
  const hy = (dy * len) / 2;
  return { x0: w / 2 - hx, y0: h / 2 - hy, x1: w / 2 + hx, y1: h / 2 + hy };
}
