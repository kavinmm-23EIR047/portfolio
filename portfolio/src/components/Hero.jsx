import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import React, { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const letters = "01<>/[]{}constletfunctionreturn";
    const fontSize = 14;
    let columns, drops;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 25, 47, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#3b82f6";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a192f] text-white px-4 overflow-hidden flex items-center justify-center">
      {/* Fullscreen background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a192f]/90 via-[#0a192f]/70 to-[#0a192f] z-10" />

      {/* Centered content */}
      <div className="relative z-20 max-w-6xl w-full mx-auto text-center flex flex-col items-center justify-center">
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-wide"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          I'm a{" "}
          <span className="text-blue-400 drop-shadow-lg">
            <Typewriter
              words={[
                "Full Stack Developer",
                "Creative Coder",
                "Tech Enthusiast",
                "UI/UX Lover",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-300 text-sm md:text-lg max-w-xl mt-2 md:mt-4 px-4 md:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          I build beautiful, responsive, and scalable applications with cutting-edge technologies.
        </motion.p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <a
            href="/kavinresumeintern.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-lg font-semibold shadow-md transition-transform backdrop-blur-md"
              whileHover={{ scale: 1.1 }}
            >
              View Resume
            </motion.button>
          </a>

          <motion.button
            className="px-6 py-2 bg-transparent border border-blue-400 hover:bg-blue-600 hover:text-white rounded-full text-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            onClick={scrollToContact}
          >
            Contact Me
          </motion.button>
        </div>

        {/* Social Icons */}
        <div className="mt-6 flex gap-6 justify-center text-2xl text-blue-400">
          <a
            href="https://www.linkedin.com/in/kavin-m-m-710520272/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/ak_webflair_technologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/kavinmm-23EIR047/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
