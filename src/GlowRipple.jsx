import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const SHAPE =
  "M245.154 254.069C243.569 255.654 241.998 257.254 240.392 258.821C239.1 260.084 238.476 261.59 238.458 263.392C238.423 267.049 238.364 270.702 238.294 274.359C238.127 283.128 231.762 289.504 222.986 289.685C219.429 289.759 215.868 289.832 212.311 289.832C210.286 289.832 208.645 290.515 207.227 291.968C204.402 294.866 201.525 297.708 198.653 300.559C192.148 307.019 182.862 307.013 176.354 300.544C173.45 297.658 170.543 294.772 167.671 291.851C166.326 290.482 164.753 289.838 162.836 289.832C159.326 289.823 155.818 289.741 152.308 289.688C143.197 289.545 136.833 283.152 136.716 274.039C136.672 270.529 136.59 267.022 136.566 263.512C136.554 261.602 135.877 260.034 134.509 258.692C131.588 255.824 128.698 252.92 125.815 250.011C119.409 243.553 119.395 234.253 125.774 227.819C128.657 224.913 131.541 222.006 134.465 219.141C135.872 217.764 136.56 216.155 136.569 214.189C136.584 210.729 136.66 207.268 136.713 203.808C136.85 194.567 143.177 188.235 152.387 188.109C155.798 188.063 159.211 187.975 162.622 187.972C164.694 187.972 166.382 187.277 167.832 185.78C170.648 182.876 173.535 180.037 176.403 177.186C182.835 170.799 192.157 170.805 198.597 177.201C201.434 180.02 204.291 182.815 207.063 185.695C208.587 187.28 210.354 187.995 212.531 187.986C215.895 187.975 219.256 188.065 222.62 188.118C231.85 188.265 238.139 194.573 238.288 203.835C238.344 207.245 238.441 210.658 238.432 214.069C238.426 216.155 239.158 217.819 240.647 219.27C243.58 222.126 246.464 225.036 249.341 227.948C255.539 234.221 255.553 243.53 249.382 249.826C247.984 251.253 246.557 252.654 245.145 254.069H245.154Z";

const KEYFRAMES = `@keyframes glow-ripple {
  from { transform: scale(1);   opacity: 0.9; }
  to   { transform: scale(var(--gr-max)); opacity: 0; }
}`;

/**
 * GlowRipple — an animated rounded-squircle badge with pulsing ripples,
 * an optional centered icon, a label, and optional falling-glitter confetti.
 *
 * Everything is per-instance and driven by props — nothing is hard-coded.
 *
 * @example Basic
 *   <GlowRipple color="#C81E14" />
 *
 * @example Full "reward redeemed" card
 *   <GlowRipple
 *     color="#C81E14"             // badge + ripple color
 *     size={180}                  // px (width = height)
 *     icon={<GiftIcon />}         // anything centered
 *     text="Reward Redeemed"      // label under the badge
 *     textColor="#000"
 *     confetti={fireKey}          // see "confetti" note below
 *   />
 *
 * PROPS
 *  color           string   Main shape + ripple glow color.            default "red"
 *  effectColor     string   Ripple color only (overrides `color`).     default = color
 *  size            number   Width & height of the badge, in px.         default 150
 *  rippleCount     number   How many ripples pulse outward.            default 4
 *  maxScale        number   How far each ripple grows before fading.    default 4
 *  duration        number   Seconds for one ripple cycle.               default 5.5
 *
 *  icon            node     Centered content: <svg>, <img>, emoji, etc. default none
 *  iconColor       string   Tints the icon via currentColor.            default "#fff"
 *  iconSize        number   Icon box as a fraction of `size` (0–1).     default 0.36
 *
 *  text            node     Label shown under the badge.                default none
 *  textColor       string   Label color.                                default "#000"
 *  textStyle       object   CSS overrides for the label, e.g.           default none
 *                           { fontSize: 18, marginTop: 12 }
 *
 *  confetti        any      Glitter rains down whenever this value
 *                           CHANGES (truthy). Use a counter/key that
 *                           you bump to re-fire: confetti={count}.      default false
 *  confettiDuration number  How long the glitter falls, in ms.          default 4000
 *  confettiColors  string[] Hex colors for the glitter.                 default lib palette
 *
 * NOTE: requires `canvas-confetti` (npm i canvas-confetti) for the glitter.
 */
export default function GlowRipple({
  color = "red", // main shape + ripple background color
  effectColor, // optional: ripple color, defaults to `color`
  size = 150, // width & height of the badge (px)
  rippleCount = 4,
  maxScale = 4,
  duration = 5.5, // seconds
  icon, // anything to show centered: <img>, an emoji, an svg icon, etc.
  iconColor = "#fff", // color applied to the icon (currentColor / text)
  iconSize = 0.36, // icon box as a fraction of `size`
  text, // label shown under the badge
  textColor = "#000", // label color
  textStyle, // optional style overrides for the label, e.g. { fontSize: 18 }
  confetti: showConfetti = false, // truthy => glitter falls. Change the value to re-fire.
  confettiDuration = 4000, // ms the glitter keeps falling
  confettiColors, // optional array of hex colors; defaults to canvas-confetti's
}) {
  const ripple = effectColor ?? color;

  const rootRef = useRef(null);
  useEffect(() => {
    if (!showConfetti) return;
    const end = Date.now() + confettiDuration;
    let raf;
    (function frame() {
      // rain: drop straight down from random points along the top edge
      confetti({
        particleCount: 4,
        angle: 270, // straight down
        spread: 60,
        startVelocity: 25,
        gravity: 1.2,
        ticks: 250,
        origin: { x: Math.random(), y: -0.05 },
        colors: confettiColors,
      });
      if (Date.now() < end) raf = requestAnimationFrame(frame);
    })();
    return () => cancelAnimationFrame(raf);
  }, [showConfetti, confettiDuration, confettiColors]);
  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <style>{KEYFRAMES}</style>
      <svg
        viewBox="119 170 137 138"
        width="100%"
        height="100%"
        style={{ overflow: "visible", display: "block" }}
      >
        {Array.from({ length: rippleCount }, (_, i) => (
          <path
            key={i}
            d={SHAPE}
            fill={ripple}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              "--gr-max": maxScale,
              animation: `glow-ripple ${duration}s linear infinite`,
              animationDelay: `${-(i / rippleCount) * duration}s`,
            }}
          />
        ))}
        <path
          d={SHAPE}
          fill={color}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>

      {icon != null && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
            color: iconColor,
            fontSize: size * iconSize,
          }}
        >
          {icon}
        </div>
      )}

      {text != null && (
        <p
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
            whiteSpace: "nowrap",
            textAlign: "center",
            fontWeight: "bold",
            color: textColor,
            ...textStyle,
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}
