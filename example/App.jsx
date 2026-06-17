import { useState } from "react";
import GlowRipple from "../src/GlowRipple.jsx";
import ScratchCard from "../src/ScratchCard.jsx";

export default function App() {
  const [color, setColor] = useState("#ef4444");
  const [glitter, setGlitter] = useState(1); // bump to re-fire confetti
  const [reveal, setReveal] = useState(false); // test: force-reveal the scratch card

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        gap: 32,
        background: "#171717",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* <div style={{ marginTop: "200px" }}>
        <GlowRipple
          color={color}
          size={180}
          confetti={glitter}
          confettiDuration={4000}
          text="Reward Redeemed"
          textColor="#000"
          textStyle={{ fontSize: 18, marginTop: 12 }}
          icon={
            <svg
              width="133"
              height="133"
              viewBox="0 0 133 133"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M123.471 81.2198C121.895 82.7962 120.333 84.3872 118.736 85.9461C117.451 87.202 116.83 88.6997 116.812 90.4917C116.777 94.1282 116.719 97.7618 116.649 101.398C116.483 110.119 110.153 116.46 101.425 116.641C97.8877 116.714 94.3469 116.786 90.8091 116.786C88.7954 116.786 87.1635 117.465 85.753 118.911C82.9438 121.792 80.082 124.619 77.2261 127.454C70.7567 133.879 61.5216 133.873 55.0492 127.439C52.1613 124.569 49.2704 121.699 46.4145 118.794C45.0769 117.433 43.512 116.792 41.6061 116.786C38.1149 116.778 34.6267 116.696 31.1355 116.644C22.0753 116.501 15.7457 110.143 15.6291 101.081C15.5854 97.5899 15.5038 94.102 15.4805 90.6112C15.4689 88.7113 14.7957 87.1524 13.4348 85.8179C10.5293 82.9652 7.65594 80.0776 4.78838 77.1841C-1.58201 70.762 -1.59658 61.5134 4.74759 55.1146C7.61514 52.224 10.4827 49.3335 13.391 46.4837C14.7898 45.1142 15.4747 43.5145 15.4834 41.5593C15.498 38.118 15.5738 34.6767 15.6262 31.2355C15.7632 22.0452 22.0549 15.7483 31.2142 15.623C34.6063 15.5764 38.0013 15.489 41.3934 15.4861C43.4537 15.4861 45.1323 14.7955 46.5748 13.3065C49.3753 10.4189 52.2458 7.59534 55.0988 4.76016C61.4954 -1.59206 70.7654 -1.58623 77.1708 4.77472C79.9917 7.57786 82.833 10.3577 85.5898 13.222C87.1052 14.7984 88.8625 15.5094 91.0277 15.5006C94.3732 15.489 97.7157 15.5793 101.061 15.6318C110.241 15.7775 116.495 22.051 116.643 31.2617C116.699 34.6534 116.795 38.0481 116.786 41.4398C116.78 43.5145 117.509 45.1696 118.989 46.6119C121.906 49.4529 124.774 52.3464 127.636 55.2428C133.799 61.4813 133.814 70.7387 127.676 77.0005C126.286 78.4196 124.867 79.8124 123.463 81.2198H123.471Z"
                fill="url(#paint0_linear_1_13070)"
              />
              <path
                d="M86.2136 68.6967V91.1399C86.2136 92.4865 85.3158 93.3842 83.9692 93.3842H48.0601C46.7135 93.3842 45.8158 92.4865 45.8158 91.1399V68.6967H63.7704V88.8956H68.259V68.6967H86.2136ZM63.7704 52.9864H43.5715C42.2249 52.9864 41.3271 53.8842 41.3271 55.2308V61.9637C41.3271 63.3103 42.2249 64.208 43.5715 64.208H63.7704V52.9864ZM88.4579 52.9864H68.259V64.208H88.4579C89.8045 64.208 90.7022 63.3103 90.7022 61.9637V55.2308C90.7022 53.8842 89.8045 52.9864 88.4579 52.9864ZM81.9494 50.5177L82.1738 49.62C83.0715 47.3756 82.8471 44.6824 81.5005 42.6626C80.1539 40.6427 77.6851 39.5205 75.2164 39.5205C72.0743 39.5205 69.3812 41.316 68.259 44.2336L63.7704 55.2308H74.992C77.9096 55.2308 80.8272 53.4353 81.9494 50.5177ZM72.5232 45.8046C72.9721 44.6824 74.0942 44.0092 75.2164 44.0092C76.1141 44.0092 77.0119 44.458 77.6851 45.3557C78.134 46.2535 78.3584 47.1512 77.9096 48.0489L77.6851 48.9467C77.2363 50.0688 76.1141 50.7421 74.992 50.7421H70.5033L72.5232 45.8046ZM63.7704 44.2336C62.6482 41.316 59.7306 39.5205 56.813 39.5205C54.3442 39.5205 51.8755 40.6427 50.5289 42.887C49.1823 44.9069 48.9578 47.3756 49.8556 49.8444L50.08 50.7421C51.2022 53.4353 54.1198 55.2308 57.0374 55.2308H68.0346L63.7704 44.2336ZM59.5061 45.8046L61.526 50.7421H57.0374C55.9152 50.7421 54.7931 50.0688 54.3442 48.9467L53.8953 48.0489C53.6709 47.1512 53.6709 46.029 54.3442 45.3557C54.7931 44.458 55.6908 44.0092 56.813 44.0092C57.9351 44.0092 59.0573 44.6824 59.5061 45.8046Z"
                fill="url(#paint1_linear_1_13070)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_13070"
                  x1="127.864"
                  y1="4.16753e-06"
                  x2="-10.5808"
                  y2="115.786"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.169927" stop-color="#CF261D" />
                  <stop offset="1" stop-color="#FE4841" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1_13070"
                  x1="66.0147"
                  y1="39.5205"
                  x2="80.4246"
                  y2="89.7378"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="0.759588" stop-color="#E6E6E6" />
                </linearGradient>
              </defs>
            </svg>
          }
        />
      </div> */}

      <ScratchCard
        rewardName="FREE COFEE"
        scratched={reveal}
        revealRatio={0.65}
        rewardIcon={
          <GlowRipple color="#821DCF" size={120} rippleCount={0} icon="🎁" />
        }
        revealedBg="#fff"
        revealedTextColor="#C2410C"
        borderColor="#FF7E3E"
        // autoReveal={true}
        borderWidth={3}
        background="linear-gradient(207.8deg, #994F75 1.4%, #B7678E 40.31%, #D084A7 59.76%, #E8AFC1 98.68%);"
        onComplete={() => console.log("scratch card revealed!")}
      />

      <button
        onClick={() => setReveal((v) => !v)}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
        }}
      >
        {reveal ? "Reset card" : "Reveal card (test)"}
      </button>
      {/* 
      <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
        Background color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <code>{color}</code>
      </label>

      <div style={{ display: "flex", gap: 12 }}>
        {["#FE4841", "#821DCF", "#22c55e", "#3b82f6", "#FFDB69"].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "none",
              background: c,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <button
        onClick={() => setGlitter((n) => n + 1)}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🎉 Fire glitter
      </button> */}
    </div>
  );
}
