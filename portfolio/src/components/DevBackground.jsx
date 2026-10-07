import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const Particles = () => {
  const ref = useRef();
  const particles = useMemo(() => {
    const count = window.innerWidth < 768 ? 1000 : 2500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.015;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.015} sizeAttenuation depthWrite={false} opacity={0.25} />
    </Points>
  );
};

const DevBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden" style={{ backgroundColor: "var(--bg-main)" }}>
      <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default DevBackground;