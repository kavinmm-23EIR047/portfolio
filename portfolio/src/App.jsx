import React from "react";
import './index.css';
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import MySkills from "./components/MySkills";
import Portfolio from "./components/Portfolio";
import Reviews from "./components/Reviews"; // ✅ Un-commented
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <motion.section
        id="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <About />
      </motion.section>

      {/* Services Section */}
      <motion.section
        id="services"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Services />
      </motion.section>
<<<<<<< HEAD

      {/* My Skills Section */}
=======
   {/* My Skills Section */}
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <MySkills />
      </motion.section>
<<<<<<< HEAD

=======
>>>>>>> e0321b1a1445198c1bd3c8519232507ee4cf8403
      {/* Portfolio Section */}
      <motion.section
        id="portfolio"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Portfolio />
      </motion.section>

      {/* ✅ Reviews Section */}
      <motion.section
        id="reviews"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Reviews />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Contact />
      </motion.section>

      <Footer />
    </div>
  );
};

export default App;
