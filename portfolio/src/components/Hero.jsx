import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaRocket, FaBriefcase, FaSmile, FaHeadset, FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  CheckCircle2,
  Clock3,
  Code2,
  Compass,
  FileText,
  Gauge,
  Heart,
  Lightbulb,
  MapPin,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

/* ---------------------------------------------------------
   WebFlair Hero — Fully Responsive Across All Devices
   (Desktop 1440px+, Tablet 768px-1024px, Mobile 375px)
--------------------------------------------------------- */

const services = [
  "CRM & UI Dashboards",
  "Landing & E-Commerce",
  "AI Automation Agents",
  "SEO Optimization",
  "MERN & Postgres",
  "Flutter & React Native",
];

const legacyStats = (projectCount) => [
  { icon: FaRocket, value: "1+", label: "Years building digital products" },
  { icon: FaBriefcase, value: projectCount === null ? "—" : String(projectCount), label: "Projects completed" },
  { icon: FaSmile, value: "98%", label: "Clients who return" },
  { icon: FaHeadset, value: "24/7", label: "Someone's awake" },
];

const float = (delay = 0, distance = 8, duration = 4) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
});

/* ----- Robot illustration: Vector Design ----- */
const RobotIllustration = () => (
  <motion.svg
    viewBox="0 0 240 260"
    className="w-full h-full drop-shadow-2xl"
    initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
    animate={{ opacity: 1, scale: 1, rotate: -4 }}
    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
  >
    {/* antenna */}
    <motion.g {...float(0, 6, 3)}>
      <line x1="120" y1="18" x2="120" y2="38" stroke="var(--brand-indigo)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="120" cy="14" r="9" fill="var(--brand-indigo-light)" />
    </motion.g>

    {/* head */}
    <motion.g {...float(0.2, 5, 4)}>
      <rect x="55" y="38" width="130" height="100" rx="36" fill="var(--border-light)" />
      {/* screen face */}
      <rect x="78" y="64" width="84" height="54" rx="20" fill="var(--brand-indigo)" />
      <motion.circle
        cx="105" cy="91" r="7" fill="var(--brand-indigo-light)"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
      />
      <motion.circle
        cx="135" cy="91" r="7" fill="var(--brand-indigo-light)"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
      />
      {/* ears */}
      <circle cx="50" cy="88" r="13" fill="var(--bg-light)" />
      <circle cx="190" cy="88" r="13" fill="var(--bg-light)" />
    </motion.g>

    {/* body */}
    <g>
      <path d="M70 150 h100 a26 26 0 0 1 26 26 v40 a26 26 0 0 1 -26 26 H70 a26 26 0 0 1 -26 -26 v-40 a26 26 0 0 1 26 -26 Z" fill="var(--bg-light)" stroke="var(--brand-indigo)" strokeWidth="4" />
      <rect x="100" y="178" width="40" height="40" rx="14" fill="var(--brand-indigo)" />
      <path d="M112 198 l8 8 16 -18" stroke="var(--bg-light)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* arm gesturing toward dashboard */}
    <motion.path
      d="M170 178 q34 4 46 -10"
      stroke="var(--brand-indigo)" strokeWidth="8" fill="none" strokeLinecap="round"
      animate={{ rotate: [0, 6, 0] }}
      style={{ originX: "170px", originY: "178px" }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    />
    <circle cx="216" cy="168" r="9" fill="var(--brand-indigo-light)" />

    {/* other arm */}
    <path d="M70 178 q-30 6 -38 28" stroke="var(--brand-indigo)" strokeWidth="8" fill="none" strokeLinecap="round" />
    <circle cx="32" cy="206" r="9" fill="var(--brand-indigo-light)" />

    {/* legs */}
    <rect x="84" y="232" width="16" height="22" rx="8" fill="var(--brand-indigo)" />
    <rect x="140" y="232" width="16" height="22" rx="8" fill="var(--brand-indigo)" />
  </motion.svg>
);

/* ----- Dashboard mockup ----- */
const bars = [38, 52, 44, 68, 58, 80, 70, 92];

const DashboardMockup = () => (
  <div className="w-full h-full bg-white rounded-[1.4rem] sm:rounded-[1.8rem] p-4 sm:p-6 md:p-7 flex flex-col justify-between gap-3 sm:gap-5 relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-[#CBD5E1]">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs sm:text-sm font-mono text-[#0F172A] font-bold tracking-wide">studio.live</span>
      </div>
      <span className="text-[10px] sm:text-xs font-mono text-[#0A4FE0] bg-[#0A4FE0]/10 px-2.5 py-1 rounded-lg font-bold">+18.4%</span>
    </div>

    {/* Chart Area */}
    <div className="flex items-end gap-1.5 sm:gap-2.5 flex-1 w-full mt-1 sm:mt-2 min-h-[60px] sm:min-h-[80px]">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md sm:rounded-t-lg"
          style={{ background: i === bars.length - 1 ? "#0A4FE0" : "#CBD5E1" }}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>

    {/* Bottom Stats */}
    <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
      {[
        { label: "Uptime", val: "99.98%" },
        { label: "Avg load", val: "0.4s" },
        { label: "Builds", val: "12" },
      ].map((s) => (
        <div key={s.label} className="bg-[#F1F5F9] rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-[#E2E8F0]/60 shadow-sm flex flex-col justify-center">
          <p className="text-[8px] sm:text-[10px] text-[#64748B] font-semibold font-mono mb-0.5 sm:mb-1">{s.label}</p>
          <p className="text-xs sm:text-base md:text-lg font-bold text-[#0A4FE0] font-mono leading-none">{s.val}</p>
        </div>
      ))}
    </div>
  </div>
);

const LegacyHero = () => {
  const [projectCount, setProjectCount] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadProjectCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || ""}/api/projects`, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load projects");
        const projects = await response.json();
        if (Array.isArray(projects)) setProjectCount(projects.length);
      } catch (error) {
        if (error.name !== "AbortError") setProjectCount(0);
      }
    };
    loadProjectCount();
    return () => controller.abort();
  }, []);

  return (
    <section className="relative w-full pt-8 pb-14 sm:pb-20 lg:pt-12 lg:pb-24 bg-[#0A4FE0] overflow-hidden">
      {/* Matte overlay paper-texture & subtle grid effect */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          backgroundPosition: "center center",
        }}
      />

      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        
        {/* ============ MAIN TOP ROW (2 Cols on Desktop, 1 Col Stacked on Tablet/Mobile) ============ */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
          
          {/* ============ LEFT: HEADLINE + SERVICES + CTAS ============ */}
          <div className="flex flex-col text-left">
            {/* Service Pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-7"
            >
              {services.map((s) => (
                <span
                  key={s}
                  className="text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider text-white bg-white/[0.15] border border-white/20 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 shadow-sm backdrop-blur-sm"
                >
                  {s}
                </span>
              ))}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Space_Grotesk',_sans-serif] text-4xl sm:text-6xl md:text-6xl lg:text-[74px] xl:text-[80px] font-extrabold text-white leading-[1.05] tracking-tight mb-2 sm:mb-3"
            >
              We build
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-max mb-6"
            >
              <h1 className="font-['Space_Grotesk',_sans-serif] text-4xl sm:text-6xl md:text-6xl lg:text-[74px] xl:text-[80px] font-extrabold text-[#CBD5E1] leading-[1.05] tracking-tight">
                good software.
              </h1>
              <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 400 14" preserveAspectRatio="none">
                <motion.path
                  d="M2 10 Q100 2 200 8 T398 6"
                  stroke="#FFFFFF"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            {/* Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#F1F5F9] text-base sm:text-xl md:text-2xl max-w-xl mb-8 sm:mb-10 leading-relaxed font-medium"
            >
              CRM platforms, UI dashboards, high-converting e-commerce & landing pages, and Python AI automation agents built with MERN, Postgres, Flutter, and React Native.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto"
            >
              <Link
                to="/support"
                className="flex items-center justify-center gap-1.5 sm:gap-2.5 bg-white text-[#0A4FE0] hover:bg-[#F1F5F9] font-extrabold px-3 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all text-xs sm:text-sm shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:scale-105 whitespace-nowrap"
              >
                <span>Start a project</span> <FaArrowRight size={12} className="hidden xs:inline-block" />
              </Link>
              <Link
                to="/products"
                className="flex items-center justify-center gap-1.5 sm:gap-2 text-white font-bold border-2 border-white/30 px-3 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-white/10 transition-colors text-xs sm:text-sm whitespace-nowrap"
              >
                <span>See our work</span>
              </Link>
            </motion.div>
          </div>

          {/* ============ RIGHT: COLLAGE (DASHBOARD + ROBOT + STICKERS) ============ */}
          <div className="relative w-full h-[300px] xs:h-[350px] sm:h-[440px] md:h-[480px] lg:h-[540px] xl:h-[580px] flex items-center justify-center my-4 lg:my-0 select-none">
            {/* Dashboard Mockup Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="absolute w-[88%] xs:w-[84%] sm:w-[78%] lg:w-[78%] aspect-[4/3] z-10"
              style={{ top: "2%", left: "1%" }}
            >
              <DashboardMockup />
            </motion.div>

            {/* Robot Illustration - Nudged to bottom-right on mobile/tab so dashboard content stays visible */}
            <div
              className="absolute w-[38%] xs:w-[36%] sm:w-[34%] lg:w-[44%] aspect-[240/260] z-20 pointer-events-none"
              style={{ bottom: "-8%", right: "-4%" }}
            >
              <RobotIllustration />
            </div>

            {/* Floating Sticker: Live Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ delay: 0.7, duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[0%] right-[2%] sm:right-[4%] bg-white rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3.5 shadow-2xl flex items-center gap-2.5 sm:gap-3 border border-white/20 z-30"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-[#0A4FE0] opacity-60" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-[#0A4FE0]" />
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#0A4FE0]">Shipping live</span>
            </motion.div>

            {/* Floating Sticker: Bolt / Automation */}
            <motion.div
              animate={{ rotate: 8, y: [0, 10, 0] }}
              transition={{ delay: 0.85, duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[4%] left-[-1%] sm:left-[-3%] bg-[#CBD5E1] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-2xl z-30"
            >
              <FaBolt className="text-[#0A4FE0]" size={20} />
            </motion.div>
          </div>

        </div>

        {/* ============ BOTTOM: SINGLE HORIZONTAL STAT CARD ENGINE ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 sm:mt-14 lg:mt-16 w-full bg-white text-[#0F172A] rounded-2xl sm:rounded-[2.2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)] border border-[#E2E8F0]"
        >
          <div className="grid grid-cols-4 divide-x divide-dashed divide-[#CBD5E1] w-full">
            {legacyStats(projectCount).map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="p-2.5 xs:p-3.5 sm:p-6 lg:p-8 flex flex-col justify-center gap-1 min-w-0 text-left"
                >
                  <Icon className="text-[#0A4FE0] flex-shrink-0" size={14} />
                  <p className="text-xs xs:text-sm sm:text-2xl lg:text-3xl font-black text-[#0A4FE0] leading-none mt-0.5 truncate font-mono">
                    {s.value}
                  </p>
                  <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-[#64748B] leading-tight truncate sm:whitespace-normal">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const roadmap = [
  { number: "01", title: "Explore", copy: "Understand your goals and define the right path.", Icon: Compass },
  { number: "02", title: "Plan & Design", copy: "Shape the experience, architecture and roadmap.", Icon: FileText },
  { number: "03", title: "Develop", copy: "Build with modern technology and proven practices.", Icon: Code2 },
  { number: "04", title: "Test & Optimise", copy: "Refine performance, security and scalability.", Icon: Gauge },
  { number: "05", title: "Launch & Support", copy: "Launch with confidence and keep improving.", Icon: Rocket },
];

const journeyStats = [
  { value: "50+", label: "Projects Delivered", Icon: BarChart3 },
  { value: "30+", label: "Happy Clients", Icon: Users },
  { value: "99.9%", label: "Uptime Reliability", Icon: Clock3 },
  { value: "4.8/5", label: "Client Satisfaction", Icon: Sparkles },
];

const journeyServices = [
  { title: "Web Development", Icon: Code2, tone: "text-blue-600 bg-blue-50" },
  { title: "Mobile App Development", Icon: Bot, tone: "text-emerald-500 bg-emerald-50" },
  { title: "Cloud & DevOps", Icon: ShieldCheck, tone: "text-sky-600 bg-sky-50" },
  { title: "AI & ML Integration", Icon: Sparkles, tone: "text-orange-500 bg-orange-50" },
  { title: "E-Commerce Solutions", Icon: CheckCircle2, tone: "text-emerald-500 bg-emerald-50" },
  { title: "UI/UX Design", Icon: Palette, tone: "text-violet-600 bg-violet-50" },
  { title: "Database Architecture", Icon: FileText, tone: "text-teal-600 bg-teal-50" },
  { title: "Automation & APIs", Icon: Braces, tone: "text-purple-600 bg-purple-50" },
];

const values = [
  { title: "Collaboration", copy: "Open communication and teamwork.", Icon: Users, tone: "text-blue-600 bg-blue-50" },
  { title: "Continuous Learning", copy: "We stay curious and improve every day.", Icon: Lightbulb, tone: "text-orange-500 bg-orange-50" },
  { title: "Ownership", copy: "We take responsibility for outcomes.", Icon: CheckCircle2, tone: "text-emerald-500 bg-emerald-50" },
  { title: "Work-Life Balance", copy: "Great work needs room to recharge.", Icon: Heart, tone: "text-pink-500 bg-pink-50" },
];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.58, delay, ease: [0.16, 1, 0.3, 1] },
});

function Eyebrow({ children }) {
  return <span className="journey-eyebrow"><i />{children}</span>;
}

function RoadmapVisual() {
  return <motion.div {...rise(0.16)} className="roadmap-visual" aria-label="Our project roadmap">
    <svg className="roadmap-path" viewBox="0 0 730 520" aria-hidden="true"><defs><linearGradient id="roadFill" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#0b57db" /><stop offset="1" stopColor="#3b8cff" /></linearGradient><filter id="roadGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs><path d="M48 481 C180 470 162 411 303 413 C480 415 563 374 505 330 C458 294 495 267 585 254 C710 235 636 165 674 81" fill="none" stroke="url(#roadFill)" strokeWidth="70" strokeLinecap="round" opacity=".96" /><path d="M48 481 C180 470 162 411 303 413 C480 415 563 374 505 330 C458 294 495 267 585 254 C710 235 636 165 674 81" fill="none" stroke="#dff1ff" strokeWidth="3" strokeLinecap="round" opacity=".96" filter="url(#roadGlow)" /><path d="M48 481 C180 470 162 411 303 413 C480 415 563 374 505 330 C458 294 495 267 585 254 C710 235 636 165 674 81" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="12 18" strokeLinecap="round" opacity=".75" /></svg>
    <div className="roadmap-fog fog-one" /><div className="roadmap-fog fog-two" />
    {roadmap.map(({ number, title, copy, Icon }, index) => <motion.article key={number} className={`roadmap-card roadmap-card-${index + 1}`} initial={{ opacity: 0, scale: 0.94, y: 15 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.46, delay: 0.25 + index * 0.1 }}><span className="roadmap-pin"><MapPin size={16} fill="currentColor" /></span><span className="roadmap-icon">{React.createElement(Icon, { size: 20 })}</span><div><p><b>{number}</b></p><h3>{title}</h3><small>{copy}</small></div></motion.article>)}
    <span className="roadmap-flag" aria-hidden="true" />
  </motion.div>;
}

export function JourneyShowcase({ compact = false }) {
  return <section className={`journey-section ${compact ? "journey-compact" : ""}`}><div className="journey-orb journey-orb-left" /><div className="journey-orb journey-orb-right" /><div className="journey-shell"><div className="journey-main"><motion.div {...rise()} className="journey-copy"><Eyebrow>{compact ? "OUR APPROACH" : "OUR JOURNEY"}</Eyebrow><h1>{compact ? "A clearer way to build digital products." : <>Turning Ideas into <em>Impactful Digital</em> Solutions.</>}</h1><p>We are a software engineering collective focused on building scalable, reliable, and modern digital products. From the first idea to launch day, we help businesses grow through technology, automation, and AI-powered solutions.</p><div className="journey-promises"><span><CheckCircle2 /> <b>Execution</b><strong>Reliable Delivery</strong></span><span><Code2 /> <b>Architecture</b><strong>Clean &amp; Scalable</strong></span><span><ShieldCheck /> <b>Partnership</b><strong>Long-Term Growth</strong></span></div><Link to="/about" className="journey-button">Meet Our Team <ArrowRight size={17} /></Link></motion.div><div className="journey-roadmap"><motion.div {...rise(0.08)} className="roadmap-heading"><span /><div><h2>Our <em>Roadmap</em></h2><p>A clear path to build innovative, reliable, and future-ready digital solutions.</p></div></motion.div><RoadmapVisual /></div></div>{!compact && <motion.div {...rise(0.12)} className="journey-stats">{journeyStats.map(({ value, label, Icon }) => <div key={label}>{React.createElement(Icon)}<p><b>{value}</b><span>{label}</span></p></div>)}</motion.div>}</div></section>;
}

export function ExpertiseCulture() {
  return <section className="expertise-section"><div className="expertise-orb" /><div className="expertise-shell"><motion.div {...rise()} className="expertise-intro"><Eyebrow>OUR EXPERTISE</Eyebrow><h2>Skills that <em>Build Real Solutions.</em></h2><p>We combine engineering expertise with modern technologies to deliver end-to-end digital solutions for businesses across industries.</p><Link to="/services" className="expertise-link">Our Tech Stack <ArrowRight size={16} /></Link></motion.div><div className="expertise-grid">{journeyServices.map(({ title, Icon, tone }, index) => <motion.article {...rise(index * 0.035)} key={title} className="skill-card"><span className={tone}>{React.createElement(Icon, { size: 22 })}</span><h3>{title}</h3></motion.article>)}</div><motion.div {...rise(0.1)} className="culture-intro"><Eyebrow>OUR CULTURE</Eyebrow><h2>A People-First <em>Engineering Culture.</em></h2><p>We believe in a collaborative, growth-oriented, and transparent work culture that helps our team deliver their best for clients and the community.</p><div className="culture-grid">{values.map(({ title, copy, Icon, tone }) => <article key={title} className="culture-card"><span className={tone}>{React.createElement(Icon, { size: 21 })}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></motion.div></div></section>;
}

const industries = [
  { title: "Retail & E-Commerce", copy: "Storefronts that make discovery and conversion feel easy." },
  { title: "Service Businesses", copy: "Clearer operations, client portals, and growth systems." },
  { title: "Startups & SaaS", copy: "Focused product engineering from idea to launch." },
  { title: "Teams & Operations", copy: "Automation that removes manual work and creates momentum." },
];

const IndustryFocus = () => <section className="hero-industry-focus"><div className="hero-industry-shell"><div className="hero-industry-heading"><span>INDUSTRIES WE SUPPORT</span><h2>Built around the way your business works.</h2></div><div className="hero-industry-grid">{industries.map(({ title, copy }, index) => <motion.article key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }}><b>0{index + 1}</b><h3>{title}</h3><p>{copy}</p></motion.article>)}</div></div></section>;

const Hero = () => <><LegacyHero /><IndustryFocus /></>;

export default Hero;
