# stampezee-reward-ui

StampEzee reward UI for React: a glowing ripple badge and a scratch-to-reveal ticket card, both with falling-glitter confetti.

## Install

```bash
npm install stampezee-reward-ui
```

React 17+ is a peer dependency. `canvas-confetti` is bundled (used for the glitter).

## GlowRipple

```jsx
import { GlowRipple } from "stampezee-reward-ui";

const [fire, setFire] = useState(0);
<GlowRipple
  color="#C81E14"
  size={180}
  icon={<GiftIcon />}
  text="Reward Redeemed"
  confetti={fire}            // bump this value to re-fire the glitter
/>
```

### GlowRipple props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | string | `"red"` | Main shape + ripple glow color |
| `effectColor` | string | = `color` | Ripple color only |
| `size` | number | `150` | Width & height in px |
| `rippleCount` | number | `4` | How many ripples pulse outward |
| `maxScale` | number | `4` | How far each ripple grows before fading |
| `duration` | number | `5.5` | Seconds for one ripple cycle |
| `icon` | node | — | Centered content (svg / img / emoji) |
| `iconColor` | string | `"#fff"` | Tints the icon via `currentColor` |
| `iconSize` | number | `0.36` | Icon box as a fraction of `size` |
| `text` | node | — | Label under the badge |
| `textColor` | string | `"#000"` | Label color |
| `textStyle` | object | — | CSS overrides for the label |
| `confetti` | any | `false` | Glitter rains whenever this value **changes** |
| `confettiDuration` | number | `4000` | How long the glitter falls (ms) |
| `confettiColors` | string[] | lib palette | Hex colors for the glitter |

## ScratchCard

A scratch-to-reveal card. The reward sits underneath a colored cover that the
user erases by dragging. Once `revealRatio` (default 85%) of the **reward-name
region** is scratched off, glitter rains down. By default the cover stays
scratchable so the user wipes the rest themselves; set `autoReveal` to clear it
all instantly instead. (Pass `scratched` to fully reveal programmatically.)

The reward region is tracked automatically from the reward-name element, so the
glitter fires exactly when the name is uncovered. Override with `rewardRegion`
if you need a custom area.

```jsx
import { ScratchCard } from "stampezee-reward-ui";

<ScratchCard
  color="#E8362D"
  rewardName="FREE COFFEE"
  rewardIcon={<GiftBadge />}
  revealRatio={0.85}          // glitter + auto-reveal once 85% is scratched
  onComplete={() => claim()}
>
  <span>Valid till 7th July 2026</span>
</ScratchCard>
```

Pass `scratched={true}` to reveal it programmatically (skips the scratching).

### ScratchCard props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `background` | string | red gradient | Cover as any CSS: hex / rgb / rgba / named, or `linear-gradient(…)` |
| `width` / `height` | number | `283` / `385` | Card size in px (keep ~189:257 ratio) |
| `rewardName` | node | — | Label under the icon after reveal |
| `rewardIcon` | node | — | Icon centered after reveal |
| `children` | node | — | Extra content below the reward |
| `revealedBg` | string | `"#fff"` | Background of the revealed card |
| `revealedTextColor` | string | `"#111"` | Color of `rewardName` after reveal |
| `borderColor` | string | — | Ticket-shaped border shown once revealed |
| `borderWidth` | number | `3` | Border thickness in px |
| `watermark` | bool | `true` | Faint badge+gift watermark on the cover |
| `tearLine` | bool | `true` | Dashed perforation line near the top |
| `brushSize` | number | `26` | Eraser radius in px |
| `revealRatio` | number | `0.85` | Fraction of the **reward region** scratched that fires glitter |
| `rewardRegion` | `{x,y,w,h}` | name box | Area watched for `revealRatio`; omit to auto-track the reward name |
| `autoReveal` | bool | `false` | Clear the whole cover once `revealRatio` is hit |
| `scratched` | bool | `false` | Controlled: `true` reveals fully |
| `glitter` | bool | `true` | Fire confetti on reveal |
| `glitterDuration` | number | `4000` | How long glitter falls (ms) |
| `glitterColors` | string[] | lib palette | Hex colors for the glitter |
| `onScratchStart` | fn | — | Called once when the user first starts scratching |
| `onComplete` | fn | — | Called once when `revealRatio` is reached |

## License

MIT
