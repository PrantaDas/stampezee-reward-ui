import { useEffect, useLayoutEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { transparentRatio } from "./scratchRatio.js";
import { parseLinearGradient, gradientEndpoints } from "./cssGradient.js";

export { transparentRatio };

// Exact ticket outline (viewBox 189x257): rounded card with two notches +
// a tear line near the top. Stretched to the card via preserveAspectRatio=none.
const TICKET_PATH =
  "M178.187 0C183.864 0.000272473 188.467 4.60296 188.467 10.2803V36.8467C177.626 37.1637 168.935 46.0509 168.935 56.9688C168.935 67.8866 177.626 76.7728 188.467 77.0898V246.72C188.467 252.397 183.864 257 178.187 257H10.2793C4.60198 257 0 252.397 0 246.72V77.0996C0.0220711 77.0997 0.0443185 77.1006 0.0664062 77.1006C11.1847 77.1005 20.1982 68.087 20.1982 56.9688C20.1982 45.8504 11.1847 36.837 0.0664062 36.8369C0.0443192 36.8369 0.0220704 36.8368 0 36.8369V10.2803C0 4.60291 4.60198 0.000199819 10.2793 0H178.187Z";
const NOTCH_Y = 56.9688 / 257; // tear-line height as a fraction of the card

// Scalloped badge + gift watermark drawn faintly on the cover (viewBox 0 0 133).
const BADGE_PATH =
  "M123.471 81.2198C121.895 82.7962 120.333 84.3872 118.736 85.9461C117.451 87.202 116.83 88.6997 116.812 90.4917C116.777 94.1282 116.719 97.7618 116.649 101.398C116.483 110.119 110.153 116.46 101.425 116.641C97.8877 116.714 94.3469 116.786 90.8091 116.786C88.7954 116.786 87.1635 117.465 85.753 118.911C82.9438 121.792 80.082 124.619 77.2261 127.454C70.7567 133.879 61.5216 133.873 55.0492 127.439C52.1613 124.569 49.2704 121.699 46.4145 118.794C45.0769 117.433 43.512 116.792 41.6061 116.786C38.1149 116.778 34.6267 116.696 31.1355 116.644C22.0753 116.501 15.7457 110.143 15.6291 101.081C15.5854 97.5899 15.5038 94.102 15.4805 90.6112C15.4689 88.7113 14.7957 87.1524 13.4348 85.8179C10.5293 82.9652 7.65594 80.0776 4.78838 77.1841C-1.58201 70.762 -1.59658 61.5134 4.74759 55.1146C7.61514 52.224 10.4827 49.3335 13.391 46.4837C14.7898 45.1142 15.4747 43.5145 15.4834 41.5593C15.498 38.118 15.5738 34.6767 15.6262 31.2355C15.7632 22.0452 22.0549 15.7483 31.2142 15.623C34.6063 15.5764 38.0013 15.489 41.3934 15.4861C43.4537 15.4861 45.1323 14.7955 46.5748 13.3065C49.3753 10.4189 52.2458 7.59534 55.0988 4.76016C61.4954 -1.59206 70.7654 -1.58623 77.1708 4.77472C79.9917 7.57786 82.833 10.3577 85.5898 13.222C87.1052 14.7984 88.8625 15.5094 91.0277 15.5006C94.3732 15.489 97.7157 15.5793 101.061 15.6318C110.241 15.7775 116.495 22.051 116.643 31.2617C116.699 34.6534 116.795 38.0481 116.786 41.4398C116.78 43.5145 117.509 45.1696 118.989 46.6119C121.906 49.4529 124.774 52.3464 127.636 55.2428C133.799 61.4813 133.814 70.7387 127.676 77.0005C126.286 78.4196 124.867 79.8124 123.463 81.2198H123.471Z";
const GIFT_PATH =
  "M86.2136 68.6967V91.1399C86.2136 92.4865 85.3158 93.3842 83.9692 93.3842H48.0601C46.7135 93.3842 45.8158 92.4865 45.8158 91.1399V68.6967H63.7704V88.8956H68.259V68.6967H86.2136ZM63.7704 52.9864H43.5715C42.2249 52.9864 41.3271 53.8842 41.3271 55.2308V61.9637C41.3271 63.3103 42.2249 64.208 43.5715 64.208H63.7704V52.9864ZM88.4579 52.9864H68.259V64.208H88.4579C89.8045 64.208 90.7022 63.3103 90.7022 61.9637V55.2308C90.7022 53.8842 89.8045 52.9864 88.4579 52.9864ZM81.9494 50.5177L82.1738 49.62C83.0715 47.3756 82.8471 44.6824 81.5005 42.6626C80.1539 40.6427 77.6851 39.5205 75.2164 39.5205C72.0743 39.5205 69.3812 41.316 68.259 44.2336L63.7704 55.2308H74.992C77.9096 55.2308 80.8272 53.4353 81.9494 50.5177ZM72.5232 45.8046C72.9721 44.6824 74.0942 44.0092 75.2164 44.0092C76.1141 44.0092 77.0119 44.458 77.6851 45.3557C78.134 46.2535 78.3584 47.1512 77.9096 48.0489L77.6851 48.9467C77.2363 50.0688 76.1141 50.7421 74.992 50.7421H70.5033L72.5232 45.8046ZM63.7704 44.2336C62.6482 41.316 59.7306 39.5205 56.813 39.5205C54.3442 39.5205 51.8755 40.6427 50.5289 42.887C49.1823 44.9069 48.9578 47.3756 49.8556 49.8444L50.08 50.7421C51.2022 53.4353 54.1198 55.2308 57.0374 55.2308H68.0346L63.7704 44.2336ZM59.5061 45.8046L61.526 50.7421H57.0374C55.9152 50.7421 54.7931 50.0688 54.3442 48.9467L53.8953 48.0489C53.6709 47.1512 53.6709 46.029 54.3442 45.3557C54.7931 44.458 55.6908 44.0092 56.813 44.0092C57.9351 44.0092 59.0573 44.6824 59.5061 45.8046Z";

// Cover gradient stops from the reference SVG.
// Default cover: the reference red diagonal gradient, as a CSS string.
const DEFAULT_BG =
  "linear-gradient(231deg, #CF261D 17%, #EF3E35 39%, #E95F58 46%, #F5423A 52%, #FE4841 100%)";

const ticketMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 189 257' preserveAspectRatio='none'><path d='${TICKET_PATH}' fill='#000'/></svg>`
)}")`;

/**
 * ScratchCard — a scratch-to-reveal ticket. The reward sits underneath; a
 * colored cover on top is erased as the user drags. Once `revealRatio` of the
 * cover is scratched away the rest auto-reveals and glitter rains down.
 *
 * @example
 *   <ScratchCard rewardName="FREE COFFEE" rewardIcon={<GiftBadge />} />
 *
 * PROPS
 *  background      string  Cover as any CSS: hex / rgb / rgba / named, or
 *                          `linear-gradient(<deg|to side>, <stops>)`.       default red gradient
 *  width / height  number  Card size in px (keep ~189:257 ratio).          default 283 / 385
 *  rewardName      node    Label shown under the icon after reveal.
 *  rewardIcon      node    Icon shown centered after reveal.
 *  children        node    Extra content below the reward (e.g. "Valid till…").
 *  revealedBg      string  Background of the revealed card.                default "#fff"
 *  revealedTextColor string Color of `rewardName` after reveal.           default "#111"
 *  borderColor     string  Ticket-shaped border shown once revealed.      default none
 *  borderWidth     number  Border thickness in px.                        default 3
 *  watermark       bool    Draw the faint badge+gift watermark on the cover. default true
 *  tearLine        bool    Draw the dashed perforation line near the top.   default true
 *  brushSize       number  Eraser radius in px.                            default 26
 *  revealRatio     number  Fraction of the reward region scratched (0–1) that
 *                          fires the glitter.                               default 0.85
 *  rewardRegion    object  { x, y, w, h } fractions of the card to watch.
 *                          Omit to auto-track the reward-name element.       default name box
 *  autoReveal      bool    Clear the whole cover once revealRatio is hit
 *                          (otherwise the user wipes the rest).             default false
 *  scratched       bool    Controlled: true reveals fully, false resets.   default false
 *  glitter         bool    Fire confetti on reveal.                        default true
 *  glitterDuration number  How long glitter falls, in ms.                 default 4000
 *  glitterColors   string[] Hex colors for the glitter.
 *  onScratchStart  fn      Called once when the user first starts scratching.
 *  onComplete      fn      Called once when revealRatio is reached.
 *  style           object  Extra styles for the outer wrapper.
 */
export default function ScratchCard({
  background = DEFAULT_BG, // any CSS: hex / rgb / rgba / named, or linear-gradient(...)
  width = 283,
  height = 385,
  rewardName,
  rewardIcon,
  children,
  revealedBg = "#fff",
  revealedTextColor = "#111",
  borderColor,
  borderWidth = 3,
  watermark = true,
  tearLine = true,
  brushSize = 26,
  revealRatio = 0.85,
  rewardRegion, // optional { x, y, w, h } fractions; omit to auto-track the reward name
  autoReveal = false, // true => clear the whole cover once revealRatio is hit
  scratched = false,
  glitter = true,
  glitterDuration = 4000,
  glitterColors,
  onScratchStart,
  onComplete,
  style,
}) {
  const canvasRef = useRef(null);
  const nameRef = useRef(null); // reward-name element, for accurate region sampling
  const drawing = useRef(false);
  const moves = useRef(0);
  const last = useRef(null); // previous pointer pos for continuous strokes
  const started = useRef(false); // onScratchStart fired once
  const fired = useRef(false); // glitter/onComplete fired once
  const [revealed, setRevealed] = useState(false);

  function paintCover() {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    // fill: parse a CSS linear-gradient into a canvas gradient, else use the
    // string directly as a solid color (canvas accepts hex / rgb / rgba / named).
    if (background.includes("linear-gradient")) {
      const { angle, stops } = parseLinearGradient(background);
      const { x0, y0, x1, y1 } = gradientEndpoints(angle, width, height);
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      stops.forEach((s, i) => {
        const at = s.stop ?? (stops.length > 1 ? i / (stops.length - 1) : 0);
        g.addColorStop(Math.min(1, Math.max(0, at)), s.color);
      });
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = background;
    }
    ctx.fillRect(0, 0, width, height);

    // soft diagonal sheen
    const sheen = ctx.createLinearGradient(0, 0, width, height);
    sheen.addColorStop(0.35, "rgba(255,255,255,0)");
    sheen.addColorStop(0.5, "rgba(255,255,255,0.14)");
    sheen.addColorStop(0.65, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    // dashed tear line between the notches
    if (tearLine) {
      const y = height * NOTCH_Y;
      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 7]);
      ctx.beginPath();
      ctx.moveTo(width * 0.14, y);
      ctx.lineTo(width * 0.86, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // faint badge + gift watermark, centered a bit below middle
    if (watermark) {
      const s = (width * 0.62) / 133;
      ctx.save();
      ctx.translate(width / 2, height * 0.62);
      ctx.scale(s, s);
      ctx.translate(-66.5, -66.5);
      ctx.fillStyle = "rgba(255,255,255,0.18)"; // faint badge backing
      ctx.fill(new Path2D(BADGE_PATH));
      ctx.fillStyle = "#fff"; // crisp white gift
      ctx.fill(new Path2D(GIFT_PATH));
      ctx.restore();
    }
  }

  // paint before the browser shows the frame, else the reward flashes unscratched
  useLayoutEffect(() => {
    paintCover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [background, width, height, watermark, tearLine]);

  function rainGlitter() {
    if (!glitter) return;
    const end = Date.now() + glitterDuration;
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 270,
        spread: 60,
        startVelocity: 28,
        gravity: 1.2,
        ticks: 250,
        origin: { x: Math.random(), y: -0.05 },
        colors: glitterColors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  // fire glitter + onComplete once; optionally clear the whole cover
  function complete() {
    if (fired.current) return;
    fired.current = true;
    if (autoReveal) setRevealed(true);
    rainGlitter();
    onComplete?.();
  }

  // controlled: true => fully reveal (hide cover), false => reset
  useEffect(() => {
    if (scratched) {
      setRevealed(true);
      complete();
    } else if (fired.current || revealed) {
      fired.current = false;
      started.current = false;
      moves.current = 0;
      setRevealed(false);
      paintCover();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scratched]);

  // canvas-pixel rect to watch for `revealRatio`: explicit rewardRegion,
  // else the live bounding box of the reward-name element, else the whole card.
  function sampleRect(cv) {
    const clamp = (x, y, w, h) => ({
      x: Math.max(0, Math.min(width - 1, Math.floor(x))),
      y: Math.max(0, Math.min(height - 1, Math.floor(y))),
      w: Math.max(1, Math.min(width, Math.floor(w))),
      h: Math.max(1, Math.min(height, Math.floor(h))),
    });
    if (rewardRegion) {
      return clamp(rewardRegion.x * width, rewardRegion.y * height, rewardRegion.w * width, rewardRegion.h * height);
    }
    if (nameRef.current) {
      const card = cv.getBoundingClientRect();
      const n = nameRef.current.getBoundingClientRect();
      const sx = width / card.width;
      const sy = height / card.height;
      const pad = 4; // px of slack around the glyph box
      return clamp(
        (n.left - card.left) * sx - pad,
        (n.top - card.top) * sy - pad,
        n.width * sx + pad * 2,
        n.height * sy + pad * 2
      );
    }
    return { x: 0, y: 0, w: width, h: height };
  }

  function eraseAt(e) {
    const cv = canvasRef.current;
    const rect = cv.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const y = ((e.clientY - rect.top) / rect.height) * height;
    const ctx = cv.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#000"; // opaque => full erase, no faded edges
    ctx.strokeStyle = "#000";

    // draw a continuous round-capped line from the last point (smooth, no gaps)
    const p = last.current;
    if (p) {
      ctx.lineWidth = brushSize * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    last.current = { x, y };

    // measure scratch progress over just the reward-name area, not the whole card
    if (++moves.current % 6 === 0 && !fired.current) {
      const r = sampleRect(cv);
      const { data } = ctx.getImageData(r.x, r.y, r.w, r.h);
      // step 1 here: the reward box is small, so sample every pixel for accuracy
      if (transparentRatio(data, 1) >= revealRatio) complete();
    }
  }

  const start = (e) => {
    drawing.current = true;
    last.current = null; // begin a fresh stroke
    if (!started.current) {
      started.current = true;
      onScratchStart?.();
    }
    e.currentTarget.setPointerCapture?.(e.pointerId);
    eraseAt(e);
  };
  const move = (e) => drawing.current && eraseAt(e);
  const stop = () => {
    drawing.current = false;
    last.current = null;
  };

  return (
    // outer wrapper is NOT masked, so the border stroke isn't clipped
    <div style={{ position: "relative", width, height, userSelect: "none", ...style }}>
      {/* masked ticket card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: revealedBg,
          WebkitMaskImage: ticketMask,
          maskImage: ticketMask,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        {/* reward face (underneath) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            paddingTop: `${NOTCH_Y * 100}%`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          {rewardIcon}
          {rewardName != null && (
            <div ref={nameRef} style={{ fontWeight: 800, fontSize: 20, color: revealedTextColor }}>
              {rewardName}
            </div>
          )}
          {children}
        </div>

        {/* scratch cover */}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={stop}
          onPointerLeave={stop}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            touchAction: "none",
            cursor: "grab",
            opacity: revealed ? 0 : 1,
            pointerEvents: revealed ? "none" : "auto",
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {/* ticket-shaped border, shown once revealed (non-scaling stroke = even width) */}
      {borderColor && (
        <svg
          viewBox="0 0 189 257"
          preserveAspectRatio="none"
          width={width}
          height={height}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <path
            d={TICKET_PATH}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderWidth}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
