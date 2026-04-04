import { useEffect, useState } from "react";

const LINES = [
  { text: "$ npm run dev", type: "prompt" },
  { text: "> akwebflairtechnologies@1.0.0 dev", type: "output" },
  { text: "> vite", type: "output" },
  { text: "", type: "output" },
  { text: "AK WebFlair Technologies is starting...", type: "key" },
  { text: "", type: "output" },
  {
    text: "➜  Live: https://akwebflairtechnologies.vercel.app",
    type: "success",
  },
  { text: "➜  Loading components...", type: "output" },
  { text: "➜  Initializing animations...", type: "output" },
];

const STAGES = [
  { t: 300, label: "initializing modules...", pct: 15 },
  { t: 900, label: "loading portfolio sections...", pct: 35 },
  { t: 1500, label: "bundling assets...", pct: 60 },
  { t: 2200, label: "rendering UI...", pct: 85 },
  { t: 3000, label: "welcome to AK WebFlair 🚀", pct: 100 },
];

const TOTAL_DURATION = 3500;

export default function DevLoader({ onDone }) {
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

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, 200 + i * 250)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const timers = STAGES.map(({ t, label, pct }) =>
      setTimeout(() => setStage({ label, pct }), t)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!onDone) return;

    const t = setTimeout(() => {
      onDone();
    }, TOTAL_DURATION);

    return () => clearTimeout(t);
  }, [onDone]);

  const dark = isDark;

  const bg = dark
    ? "linear-gradient(135deg, #0d1117, #161b22)"
    : "linear-gradient(135deg, #f8fafc, #ffffff)";

  const winBg = dark ? "#161b22" : "#ffffff";
  const border = dark ? "#30363d" : "#d0d7de";
  const accent = dark ? "#58a6ff" : "#2563eb";
  const muted = dark ? "#8b949e" : "#64748b";

  const colors = {
    prompt: accent,
    output: muted,
    success: "#22c55e",
    key: "#f59e0b",
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
        transition: "all 0.4s ease",
        fontFamily: "'Courier New', Courier, monospace",
        padding: "16px",
      }}
    >
      {/* COMPANY BRAND */}
      <div
        style={{
          marginBottom: 24,
          textAlign: "center",
          animation: "fadeIn 0.8s ease",
          width: "100%",
        }}
      >
        <img
          src="/images/logo.jpg"
          alt="AK WebFlair Logo"
          style={{
            width: "clamp(70px, 15vw, 90px)",
            height: "clamp(70px, 15vw, 90px)",
            borderRadius: "50%",
            objectFit: "cover",
            border: `3px solid ${accent}`,
            boxShadow: "0 0 20px rgba(37,99,235,0.3)",
            display: "block",
            margin: "0 auto",
          }}
        />

        <h2
          style={{
            marginTop: 12,
            fontSize: "clamp(18px, 4vw, 24px)",
            fontWeight: 700,
            color: accent,
            letterSpacing: 1,
          }}
        >
          AK WebFlair Technologies
        </h2>

        <p
          style={{
            fontSize: "clamp(10px, 2.5vw, 13px)",
            color: muted,
            wordBreak: "break-word",
          }}
        >
          akwebflairtechnologies.vercel.app
        </p>
      </div>

      {/* TERMINAL WINDOW */}
      <div
        style={{
          width: "100%",
          maxWidth: 550,
          minWidth: 280,
          background: winBg,
          borderRadius: 16,
          border: `1px solid ${border}`,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          marginBottom: 20,
        }}
      >
        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderBottom: `1px solid ${border}`,
            flexWrap: "wrap",
          }}
        >
          <span style={dot("#ff5f57")} />
          <span style={dot("#ffbd2e")} />
          <span style={dot("#28c840")} />
          <span
            style={{
              marginLeft: 10,
              fontSize: "clamp(10px, 2vw, 12px)",
              color: muted,
            }}
          >
            AK WebFlair Dev Server
          </span>
        </div>

        {/* TERMINAL CONTENT */}
        <div
          style={{
            padding: "16px",
            minHeight: 180,
          }}
        >
          {visibleLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: "clamp(11px, 2vw, 13px)",
                lineHeight: 1.8,
                color: colors[line.type] || colors.output,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {line.text || "\u00A0"}
            </div>
          ))}

          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 14,
              background: accent,
              marginLeft: 2,
              animation: "blink 0.8s step-end infinite",
            }}
          />
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div
        style={{
          width: "100%",
          maxWidth: 550,
          minWidth: 280,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "clamp(10px, 2vw, 12px)",
            color: muted,
            marginBottom: 6,
          }}
        >
          <span>{stage.label}</span>
          <span>{stage.pct}%</span>
        </div>

        <div
          style={{
            height: 5,
            background: border,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${stage.pct}%`,
              background: accent,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

const dot = (color) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: color,
  display: "inline-block",
});