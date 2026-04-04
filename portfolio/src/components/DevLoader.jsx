import { useEffect, useState } from "react";

const LINES = [
  { text: "$ npm run dev", type: "prompt" },
  { text: "> portfolio@1.0.0 dev", type: "output" },
  { text: "> vite", type: "output" },
  { text: "", type: "output" },
  { text: "VITE v5.2.0  ready in 143ms", type: "key" },
  { text: "", type: "output" },
  { text: "  ➜  Local:   http://localhost:5173/", type: "success" },
  { text: "  ➜  Loading components...", type: "output" },
];

const STAGES = [
  { t: 300,  label: "initializing...",        pct: 10 },
  { t: 800,  label: "loading modules...",     pct: 30 },
  { t: 1400, label: "bundling assets...",     pct: 55 },
  { t: 1900, label: "mounting components...",pct: 80 },
  { t: 2500, label: "ready!",                 pct: 100 },
];

const TOTAL_DURATION = 3000;

export default function DevLoader({ onDone }) {

  /* ✅ FIXED THEME DETECTION */
  const getTheme = () => {
    if (typeof window === "undefined") return false;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) return savedTheme === "dark";

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDark, setIsDark] = useState(getTheme());
  const [visibleLines, setVisibleLines] = useState([]);
  const [stage, setStage] = useState({
    label: "initializing...",
    pct: 0,
  });

  /* ✅ SYNC WITH HTML CLASS */
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    const obs = new MutationObserver(updateTheme);

    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => obs.disconnect();
  }, []);

  /* ✅ TYPEWRITER EFFECT */
  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, 200 + i * 280)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  /* ✅ PROGRESS STAGES */
  useEffect(() => {
    const timers = STAGES.map(({ t, label, pct }) =>
      setTimeout(() => setStage({ label, pct }), t)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  /* ✅ COMPLETE LOADER */
  useEffect(() => {
    if (!onDone) return;

    const t = setTimeout(() => {
      onDone();
    }, TOTAL_DURATION);

    return () => clearTimeout(t);
  }, [onDone]);

  /* 🎨 THEME COLORS */
  const dark = isDark;

  const bg      = dark ? "#0d1117" : "#f5f5f0";
  const winBg   = dark ? "#161b22" : "#ffffff";
  const barBg   = dark ? "#21262d" : "#f6f8fa";
  const border  = dark ? "#30363d" : "#d0d7de";
  const trackBg = dark ? "#30363d" : "#d0d7de";
  const accent  = dark ? "#58a6ff" : "#0969da";
  const muted   = dark ? "#8b949e" : "#57606a";

  const colors = {
    prompt:  dark ? "#58a6ff" : "#0969da",
    output:  dark ? "#8b949e" : "#57606a",
    success: dark ? "#3fb950" : "#1a7f37",
    key:     dark ? "#e3b341" : "#9a6700",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        transition: "background 0.3s",
        fontFamily: "'Courier New', Courier, monospace",
        padding: "1rem",
      }}
    >
      {/* TERMINAL WINDOW */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: winBg,
          borderRadius: 10,
          border: `1px solid ${border}`,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        {/* TITLE BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 14px",
            background: barBg,
            borderBottom: `1px solid ${border}`,
          }}
        >
          <span style={dot("#ff5f57")} />
          <span style={dot("#ffbd2e")} />
          <span style={dot("#28c840")} />
          <span style={{ marginLeft: 8, fontSize: 11, color: muted }}>
            ~/portfolio — dev server
          </span>
        </div>

        {/* TERMINAL CONTENT */}
        <div style={{ padding: "16px 18px", minHeight: 160 }}>
          {visibleLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: 13,
                lineHeight: 1.9,
                color: colors[line.type] || colors.output,
                whiteSpace: "pre",
              }}
            >
              {line.text || "\u00A0"}
            </div>
          ))}

          {/* BLINK CURSOR */}
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 14,
              background: accent,
              marginLeft: 2,
              verticalAlign: "text-bottom",
              animation: "blink 0.8s step-end infinite",
            }}
          />
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: muted,
            marginBottom: 5,
          }}
        >
          <span>{stage.label}</span>
          <span>{stage.pct}%</span>
        </div>

        <div
          style={{
            height: 3,
            background: trackBg,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${stage.pct}%`,
              background: accent,
              borderRadius: 2,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* BLINK ANIMATION */}
      <style>
        {`@keyframes blink { 50% { opacity: 0; } }`}
      </style>
    </div>
  );
}

/* 🔧 helper */
const dot = (color) => ({
  width: 11,
  height: 11,
  borderRadius: "50%",
  background: color,
  display: "inline-block",
});