import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

/* ================= PARTICLES ================= */
const Particles = ({ darkMode }) => {
  const ref = useRef();

  const particles = useMemo(() => {
    const count = window.innerWidth < 768 ? 1500 : 3500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();

    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    ref.current.position.z = Math.sin(t * 0.3) * 0.5;
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color={darkMode ? "#38bdf8" : "#0ea5e9"} // accent / primary
        size={darkMode ? 0.025 : 0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={darkMode ? 0.9 : 0.6}
      />
    </Points>
  );
};

/* ================= BACKGROUND ================= */
const DevBackground = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">

      {/* 🌈 BASE */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          darkMode ? "bg-darkBg" : "bg-lightBg"
        }`}
      />

      {/* 🔵 BLUR GRADIENT BLOBS (MAIN DESIGN) */}

      {/* Top Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/30 blur-[120px] rounded-full" />

      {/* Right Glow */}
      <div className="absolute top-1/3 right-[-150px] w-[500px] h-[500px] bg-secondary/30 blur-[120px] rounded-full" />

      {/* Bottom Glow */}
      <div className="absolute bottom-[-100px] left-1/3 w-[500px] h-[400px] bg-accent/30 blur-[120px] rounded-full" />

      {/* Extra subtle layer (dark richness) */}
      {darkMode && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-transparent to-[#020617]" />
      )}

      {/* 🧠 THREE.JS */}
      <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 2]}>
        <ambientLight intensity={darkMode ? 0.4 : 0.7} />
        <Particles darkMode={darkMode} />
      </Canvas>

      {/* 🧊 GLASS OVERLAY (IMPORTANT) */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/60 dark:bg-black/50" />
    </div>
  );
};

export default DevBackground;