import React from "react";
import { motion } from "framer-motion";
import {
  FaPalette,
  FaRobot,
  FaRocket,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

/* =========================================================================
   3D ISOMETRIC LAYERED STACK WITH BRAND GLYPH (Royal Blue & Silver Gray)
   ========================================================================= */
const IsometricPlatform = () => (
  <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center select-none pointer-events-none">
    {/* Ambient White & Silver Radial Glow */}
    <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

    {/* Floating Isometric Layers */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]"
      >
        {/* Layer 3 (Bottom Plate) */}
        <polygon
          points="100,150 168,112 100,74 32,112"
          fill="#06338E"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <polygon points="32,112 100,150 100,158 32,120" fill="#042366" />
        <polygon points="168,112 100,150 100,158 168,120" fill="#052B7A" />

        {/* Layer 2 (Middle Plate) */}
        <polygon
          points="100,126 168,88 100,50 32,88"
          fill="#0840B5"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <polygon points="32,88 100,126 100,134 32,96" fill="#06308A" />
        <polygon points="168,88 100,126 100,134 168,96" fill="#0738A0" />

        {/* Layer 1 (Top Hovering Plate) */}
        <polygon
          points="100,102 168,64 100,26 32,64"
          fill="url(#isometric-top-plate-blue)"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        <polygon points="32,64 100,102 100,110 32,72" fill="#0A4FE0" />
        <polygon points="168,64 100,102 100,110 168,72" fill="#0639A8" />

        {/* Center Glowing Monogram Brand Glyph */}
        <g transform="translate(76, 40) scale(0.48)">
          {/* Hexagonal Outer Frame */}
          <polygon
            points="50,10 90,33 90,79 50,102 10,79 10,33"
            fill="#FFFFFF"
            opacity="0.95"
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
          {/* Inner Hexagon */}
          <polygon
            points="50,24 78,40 78,72 50,88 22,72 22,40"
            fill="#0A4FE0"
          />
          {/* Central Core */}
          <polygon
            points="50,38 68,48 68,68 50,78 32,68 32,48"
            fill="#FFFFFF"
          />
          <polygon
            points="50,46 62,53 62,65 50,72 38,65 38,53"
            fill="#0A4FE0"
          />
        </g>

        <defs>
          <linearGradient id="isometric-top-plate-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#0A4FE0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  </div>
);

/* =========================================================================
   FEATURES DATA
   ========================================================================= */
const features = [
  {
    number: "01",
    icon: FaPalette,
    title: "Premium UI/UX Craftsmanship",
    description:
      "Every interface is designed with meticulous attention to detail, harmonious color palettes, fluid animations, and high conversion flow.",
    mobileDesc: "Meticulous design systems and fluid animations.",
  },
  {
    number: "02",
    icon: FaRobot,
    title: "Intelligent AI Automation",
    description:
      "Integrate custom AI workflows, automated data processing, and smart assistants directly into your operational stack.",
    mobileDesc: "Custom AI workflows and smart assistants.",
  },
  {
    number: "03",
    icon: FaRocket,
    title: "Rapid Sprints & Deployment",
    description:
      "Agile delivery cycles with CI/CD automation get your product to market at record speed without sacrificing code stability.",
    mobileDesc: "Faster delivery with CI/CD automation.",
  },
  {
    number: "04",
    icon: FaShieldAlt,
    title: "Enterprise Architecture",
    description:
      "Robust React and Node.js microservices built for scalability, strict type safety, zero downtime, and ironclad security.",
    mobileDesc: "Scalable, secure, and production-grade systems.",
  },
];

/* =========================================================================
   WHY CHOOSE US COMPONENT (Royal Blue & Silver Gray Theme)
   ========================================================================= */
const WhyChooseUs = () => {
  return (
    <section className="py-24 sm:py-32 px-5 md:px-10 lg:px-16 bg-[#0A4FE0] text-white relative overflow-hidden select-none">
      
      {/* Background Subtle Silver Geometric Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          backgroundPosition: "center center",
        }}
      />

      {/* Ambient Silver & White Glow Flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-white/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#06338E] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-6 uppercase border border-white/20 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#CBD5E1] animate-pulse" />
              THE WEBFLAIR STANDARD
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.12] tracking-tight">
              Why Companies <span className="text-[#CBD5E1]">Choose Us</span>
            </h2>

            <p className="mt-4 text-[#F1F5F9] text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              We merge aesthetic precision with bulletproof software engineering to help ambitious teams outpace the competition.
            </p>
          </motion.div>
        </div>

        {/* -----------------------------------------------------------------
            1. DESKTOP VIEW (1280px+): 4 Quadrants + Central 3D Isometric Stack & Circuits
            ----------------------------------------------------------------- */}
        <div className="hidden xl:block relative min-h-[580px]">
          
          {/* Glowing Animated Curved Circuit Connector SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1200 580"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="circuit-silver-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Trace to Card 01 (Top-Left) */}
            <path
              d="M 520 270 C 470 270, 440 140, 390 140"
              stroke="url(#circuit-silver-glow)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Trace to Card 02 (Top-Right) */}
            <path
              d="M 680 270 C 730 270, 760 140, 810 140"
              stroke="url(#circuit-silver-glow)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Trace to Card 03 (Bottom-Left) */}
            <path
              d="M 520 310 C 470 310, 440 440, 390 440"
              stroke="url(#circuit-silver-glow)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Trace to Card 04 (Bottom-Right) */}
            <path
              d="M 680 310 C 730 310, 760 440, 810 440"
              stroke="url(#circuit-silver-glow)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Connector Terminal Nodes */}
            <circle cx="390" cy="140" r="4.5" fill="#FFFFFF" />
            <circle cx="810" cy="140" r="4.5" fill="#FFFFFF" />
            <circle cx="390" cy="440" r="4.5" fill="#FFFFFF" />
            <circle cx="810" cy="440" r="4.5" fill="#FFFFFF" />
          </svg>

          {/* Central 3D Isometric Platform */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <IsometricPlatform />
          </div>

          {/* 4 Quadrant Cards Grid */}
          <div className="grid grid-cols-2 gap-x-64 gap-y-10 relative z-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, borderColor: "rgba(255, 255, 255, 0.6)" }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 p-7 sm:p-8 rounded-[2.2rem] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.3)] flex flex-col justify-between transition-all duration-300 group hover:bg-white/15 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)]"
                >
                  <div>
                    {/* Header: Icon + Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-white text-[#0A4FE0] flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-2xl font-black text-white/50 tracking-wider">
                        {feature.number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-[#CBD5E1] transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-[#F1F5F9] font-medium leading-relaxed mb-6">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#CBD5E1] pt-4 border-t border-white/15">
                    <FaCheckCircle size={14} className="text-[#CBD5E1]" />
                    <span>Production Certified</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* -----------------------------------------------------------------
            2. TABLET VIEW (768px - 1279px): 4-Column Horizontal Card Row
            ----------------------------------------------------------------- */}
        <div className="hidden md:grid xl:hidden grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white text-[#0A4FE0] flex items-center justify-center text-lg shadow-md">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xl font-black text-white/50">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-2 leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-[#F1F5F9] font-medium leading-relaxed mb-5">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#CBD5E1] pt-3 border-t border-white/15">
                  <FaCheckCircle size={12} />
                  <span>Production Certified</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* -----------------------------------------------------------------
            3. MOBILE VIEW (375px - 767px): Vertical Streamlined Cards with Arrow Button
            ----------------------------------------------------------------- */}
        <div className="md:hidden flex flex-col gap-3.5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-md"
              >
                <div className="w-11 h-11 rounded-xl bg-white text-[#0A4FE0] flex items-center justify-center text-lg flex-shrink-0 shadow-md">
                  <Icon size={18} />
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <h3 className="text-sm font-extrabold text-white tracking-tight truncate">
                    {feature.title}
                  </h3>
                  <p className="text-[11px] text-[#CBD5E1] font-medium truncate mt-0.5">
                    {feature.mobileDesc}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white hover:text-[#0A4FE0] text-white flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer">
                  <FaArrowRight size={11} />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
