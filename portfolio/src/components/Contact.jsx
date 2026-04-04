import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl1 = new THREE.PointLight(0x38bdf8, 3, 20);
    pl1.position.set(3, 3, 3);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x818cf8, 3, 20);
    pl2.position.set(-3, -2, 2);
    scene.add(pl2);

    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.18, 128, 32),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.7, roughness: 0.15 })
    );
    scene.add(torusKnot);

    const spheres = Array.from({ length: 5 }, (_, i) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 16, 16),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x818cf8 : 0x38bdf8,
          metalness: 0.7,
          roughness: 0.2,
        })
      );
      scene.add(mesh);
      return { mesh, angle: (i / 5) * Math.PI * 2, radius: 1.4, speed: 0.5 + i * 0.06 };
    });

    const pos = new Float32Array(300 * 3).map(() => (Math.random() - 0.5) * 20);
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.4 })
    );
    scene.add(particles);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      const r = mount.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouseY = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    mount.addEventListener("mousemove", onMouseMove);

    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      torusKnot.rotation.x = t * 0.3 + mouseY * 0.4;
      torusKnot.rotation.y = t * 0.5 + mouseX * 0.4;
      spheres.forEach((s) => {
        s.angle += s.speed * 0.01;
        s.mesh.position.set(
          Math.cos(s.angle) * s.radius,
          Math.sin(s.angle * 0.7) * (s.radius * 0.4),
          Math.sin(s.angle) * (s.radius * 0.4)
        );
      });
      particles.rotation.y = t * 0.015;
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 cursor-crosshair" />;
};

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setStatus(null);
    const [response] = await Promise.all([
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => null),
      sleep(1800),
    ]);
    try {
      if (!response) throw new Error();
      const result = await response.json();
      if (response.ok && result.success) {
        setStatus({ type: "success", message: "Message sent successfully" });
        reset();
      } else {
        setStatus({ type: "error", message: "Failed to send message" });
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-5 bg-transparent">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Contact{" "}
          <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Us
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          Let's build scalable digital products together.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">

        {/* TOP — Compact Three.js Banner */}
        <div className="relative rounded-2xl overflow-hidden h-[160px] border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900" />
          <ThreeScene />
          <div className="absolute inset-0 z-10 flex items-center justify-between px-8 pointer-events-none">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-lg font-semibold text-white leading-tight">
                Build Something Amazing 🚀
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Move your cursor · interact with the scene
              </p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-xs font-mono">Available for projects</span>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM — Full Width Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-white/10 dark:border-gray-700 shadow-2xl"
        >
          {/* Terminal top bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-black/60 backdrop-blur-md">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="ml-3 text-xs text-gray-400 font-mono">contact.sh</span>
          </div>

          {/* Form */}
          <div className="p-6 backdrop-blur-xl bg-white/70 text-gray-900 dark:bg-black/70 dark:text-green-400 font-mono text-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div className="grid sm:grid-cols-2 gap-4">
                {["name", "email"].map((field) => (
                  <input
                    key={field}
                    {...register(field, { required: true })}
                    placeholder={`> Enter ${field}`}
                    className="w-full p-3 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 focus:border-sky-500 outline-none"
                  />
                ))}
              </div>

              <input
                {...register("phone", { required: true })}
                placeholder="> Enter phone"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 focus:border-sky-500 outline-none"
              />

              <textarea
                {...register("comment", { required: true })}
                placeholder="> Type your message..."
                className="w-full p-3 h-32 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 focus:border-sky-500 outline-none resize-none"
              />

              {status && (
                <p className={`text-xs ${status.type === "success" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                  {">"} {status.message}
                </p>
              )}

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors font-sans font-medium"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Deploying...
                  </>
                ) : (
                  "Send Message"
                )}
              </motion.button>

            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;