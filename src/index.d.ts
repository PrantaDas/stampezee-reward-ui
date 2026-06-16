import * as React from "react";

export interface GlowRippleProps {
  /** Main shape + ripple glow color. @default "red" */
  color?: string;
  /** Ripple color only (overrides `color`). @default color */
  effectColor?: string;
  /** Width & height of the badge, in px. @default 150 */
  size?: number;
  /** How many ripples pulse outward. @default 4 */
  rippleCount?: number;
  /** How far each ripple grows before fading. @default 4 */
  maxScale?: number;
  /** Seconds for one ripple cycle. @default 5.5 */
  duration?: number;

  /** Centered content: <svg>, <img>, emoji, etc. */
  icon?: React.ReactNode;
  /** Tints the icon via currentColor. @default "#fff" */
  iconColor?: string;
  /** Icon box as a fraction of `size` (0–1). @default 0.36 */
  iconSize?: number;

  /** Label shown under the badge. */
  text?: React.ReactNode;
  /** Label color. @default "#000" */
  textColor?: string;
  /** CSS overrides for the label, e.g. { fontSize: 18, marginTop: 12 }. */
  textStyle?: React.CSSProperties;

  /** Glitter rains down whenever this value CHANGES (truthy). Bump a counter to re-fire. @default false */
  confetti?: unknown;
  /** How long the glitter falls, in ms. @default 4000 */
  confettiDuration?: number;
  /** Hex colors for the glitter. */
  confettiColors?: string[];
}

export const GlowRipple: React.FC<GlowRippleProps>;

export interface ScratchCardProps {
  /** Cover as any CSS: hex / rgb / rgba / named, or `linear-gradient(<deg|to side>, <stops>)`. */
  background?: string;
  /** Card width in px (keep ~189:257 ratio). @default 283 */
  width?: number;
  /** Card height in px. @default 385 */
  height?: number;
  /** Label shown under the icon after reveal. */
  rewardName?: React.ReactNode;
  /** Icon shown centered after reveal. */
  rewardIcon?: React.ReactNode;
  /** Extra content below the reward (e.g. "Valid till…"). */
  children?: React.ReactNode;
  /** Background of the revealed card. @default "#fff" */
  revealedBg?: string;
  /** Color of `rewardName` after reveal. @default "#111" */
  revealedTextColor?: string;
  /** Ticket-shaped border color shown once revealed. */
  borderColor?: string;
  /** Border thickness in px. @default 3 */
  borderWidth?: number;
  /** Draw the faint badge+gift watermark on the cover. @default true */
  watermark?: boolean;
  /** Draw the dashed perforation line near the top. @default true */
  tearLine?: boolean;
  /** Eraser radius in px. @default 26 */
  brushSize?: number;
  /** Fraction of the reward region scratched (0–1) that fires the glitter. @default 0.85 */
  revealRatio?: number;
  /** Area watched for `revealRatio`, as fractions of the card. Omit to auto-track the reward-name element. */
  rewardRegion?: { x: number; y: number; w: number; h: number };
  /** Clear the whole cover once `revealRatio` is hit (otherwise the user wipes the rest). @default false */
  autoReveal?: boolean;
  /** Controlled: true instantly reveals the card fully. @default false */
  scratched?: boolean;
  /** Fire confetti on reveal. @default true */
  glitter?: boolean;
  /** How long glitter falls, in ms. @default 4000 */
  glitterDuration?: number;
  /** Hex colors for the glitter. */
  glitterColors?: string[];
  /** Called once when the user first starts scratching. */
  onScratchStart?: () => void;
  /** Called once when `revealRatio` is reached. */
  onComplete?: () => void;
  /** Extra styles for the outer wrapper. */
  style?: React.CSSProperties;
}

export const ScratchCard: React.FC<ScratchCardProps>;

/** Fraction of fully-transparent (scratched) pixels in raw RGBA data. */
export function transparentRatio(data: Uint8ClampedArray | number[], step?: number): number;
