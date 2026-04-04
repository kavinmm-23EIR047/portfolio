import React, { useEffect, useState } from "react";
import "./index.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import MySkills from "./components/MySkills";
import Portfolio from "./components/Portfolio";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DevLoader from "./components/DevLoader";
import DevBackground from "./components/DevBackground";

import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.classList.toggle("dark", systemDark);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DevLoader />;

  return (
    <div className="relative min-h-screen overflow-x-hidden text-gray-900 dark:text-white">

      {/* 🔥 NEW BACKGROUND */}
      <DevBackground />

      {/* CONTENT */}
      <div className="relative z-10">
        <Header />

        <section id="hero">
          <Hero />
        </section>

        <motion.section id="about" variants={sectionVariants} initial="hidden" whileInView="visible" transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <About />
        </motion.section>

        <motion.section id="services" variants={sectionVariants} initial="hidden" whileInView="visible" transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <Services />
        </motion.section>

        <motion.section id="skills" variants={sectionVariants} initial="hidden" whileInView="visible" transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <MySkills />
        </motion.section>

        <motion.section id="portfolio" variants={fadeScale} initial="hidden" whileInView="visible" transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <Portfolio />
        </motion.section>

        <motion.section id="reviews" variants={fadeScale} initial="hidden" whileInView="visible" transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <Reviews />
        </motion.section>

        <motion.section id="contact" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <Contact />
        </motion.section>

        <Footer />
      </div>
    </div>
  );
};

export default App;