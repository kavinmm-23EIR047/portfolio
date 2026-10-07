import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaRobot,
  FaChartLine,
  FaMobileAlt,
  FaRocket,
  FaAward,
  FaDatabase,
  FaServer,
  FaLock,
  FaStar,
} from "react-icons/fa";
import {
  SiReact,
  SiPostgresql,
  SiPython,
  SiNextdotjs,
  SiFlutter,
  SiMongodb,
  SiFigma,
} from "react-icons/si";
import { FiActivity, FiCpu, FiLayers, FiSearch, FiShoppingBag, FiZap, FiCheck } from "react-icons/fi";

import Hero from "../components/Hero";
import TrustedPartners from "../components/TrustedPartners";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";

/* =========================================================================
   INTERACTIVE SPECTRUM & BACKEND-INTEGRATED FEATURE SHOWCASE FOR HOME
   ========================================================================= */

const capabilitiesTabs = [
  {
    id: "crm",
    title: "CRM & UI Dashboards",
    pill: "MERN & Postgres Core",
    icon: FaChartLine,
    color: "#0A4FE0",
    bg: "bg-[#EFF6FF]",
    summary:
      "Custom CRM systems, analytics control centers, sales pipelines, and role-based access portals built for operational speed.",
    deliverables: ["Custom CRM Platforms", "SaaS UI Dashboards", "Sales Pipelines", "Role-Based Auth"],
    stack: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Node.js", icon: FaServer, color: "#22C55E" },
      { name: "MongoDB", icon: SiMongodb, color: "#10AA50" },
    ],
    metric: "MERN & Postgres Core",
    widgetTitle: "Sales & Pipeline Analytics",
    widgetValue: "99.9%",
    widgetStatus: "+22.4% Revenue Growth",
  },
  {
    id: "ecommerce",
    title: "Landing & E-Commerce",
    pill: "100/100 Core Web Vitals",
    icon: FaRocket,
    color: "#059669",
    bg: "bg-[#ECFDF5]",
    summary:
      "High-converting landing pages, D2C storefronts, instant checkout engines, and technical SEO foundations for maximum revenue.",
    deliverables: ["Landing Pages", "D2C/B2B Storefronts", "Instant Checkout", "Technical SEO"],
    stack: [
      { name: "Next.js", icon: SiNextdotjs, color: "#0F172A" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "SEO Engine", icon: FiSearch, color: "#10B981" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
    ],
    metric: "100/100 Core Web Vitals",
    widgetTitle: "Direct Storefront Checkout",
    widgetValue: "0.4s",
    widgetStatus: "Frictionless Conversion",
  },
  {
    id: "ai",
    title: "Python AI Agents",
    pill: "24/7 Autonomous Sync",
    icon: FaRobot,
    color: "#D97706",
    bg: "bg-[#FFFBEB]",
    summary:
      "Autonomous Python AI agents, LangChain workflow routing, lead qualification, and 24/7 automated business task execution.",
    deliverables: ["Autonomous AI Agents", "Workflow Automation", "LLM Customer Bots", "Database Webhooks"],
    stack: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "AI Agents", icon: FiCpu, color: "#D97706" },
      { name: "FastAPI", icon: FaServer, color: "#0A4FE0" },
    ],
    metric: "24/7 Autonomous Sync",
    widgetTitle: "AI Automation Agent Engine",
    widgetValue: "1,240+",
    widgetStatus: "Tasks Auto-Executed / day",
  },
  {
    id: "mobile",
    title: "Flutter & React Native",
    pill: "60fps Cross-Platform UI",
    icon: FaMobileAlt,
    color: "#0284C7",
    bg: "bg-[#F0F9FF]",
    summary:
      "Cross-platform mobile apps engineered with 60fps animations, native camera/sensor integrations, offline sync, and app store deployment.",
    deliverables: ["Flutter iOS & Android", "React Native Apps", "Offline Sync", "Store Deployment"],
    stack: [
      { name: "Flutter", icon: SiFlutter, color: "#0284C7" },
      { name: "React Native", icon: SiReact, color: "#2563EB" },
      { name: "Mobile UI/UX", icon: FaMobileAlt, color: "#0A4FE0" },
    ],
    metric: "60fps Cross-Platform UI",
    widgetTitle: "iOS & Android Mobile Apps",
    widgetValue: "60 FPS",
    widgetStatus: "Native Device Caching",
  },
];

const HomeInteractiveSpectrum = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [projectCount, setProjectCount] = useState(6);
  const currentTab = capabilitiesTabs[activeIdx];

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectCount(data.length);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <section className="py-12 sm:py-16 px-5 md:px-10 lg:px-16 bg-[#F8FAFC] relative overflow-hidden select-none border-b border-[#E2E8F0]">
      {/* Background Subtle Silver Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0A4FE0 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1520px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <Motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-4 uppercase shadow-sm border border-[#E2E8F0]">
              <span className="w-2 h-2 rounded-full bg-[#0A4FE0] animate-pulse" />
              AK WEBFLAIR CORE SPECTRUM
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] leading-[1.12] tracking-tight">
              Engineering Built for <span className="text-[#0A4FE0]">Real Business Impact</span>
            </h2>

            <p className="mt-3 text-[#64748B] text-base sm:text-lg font-medium max-w-2xl mx-auto">
              Click through our live capability matrix to explore how we engineer CRM platforms, e-commerce stores, AI automation agents, and mobile apps.
            </p>
          </Motion.div>
        </div>

        {/* Interactive Capability Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {capabilitiesTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeIdx === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#0A4FE0] text-white shadow-[0_10px_25px_-5px_rgba(10,79,224,0.4)] scale-105"
                    : "bg-white text-[#334155] hover:bg-[#F1F5F9] border border-[#E2E8F0]"
                }`}
              >
                <Icon className={isActive ? "text-white" : "text-[#0A4FE0]"} size={15} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Animated Canvas Box */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] border border-[#E2E8F0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-extrabold bg-[#EFF6FF] text-[#0A4FE0] border border-[#BFDBFE]">
                <FiZap size={13} /> {currentTab.pill}
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-snug">
                {currentTab.title}
              </h3>

              <p className="text-base text-[#64748B] font-medium leading-relaxed">
                {currentTab.summary}
              </p>

              {/* Deliverables Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {currentTab.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-center gap-2 bg-[#F8FAFC] px-3.5 py-2.5 rounded-xl border border-[#F1F5F9] text-xs font-extrabold text-[#334155]"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center flex-shrink-0">
                      <FiCheck size={11} />
                    </span>
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-3 border-t border-[#F1F5F9]">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] font-bold mb-2.5">
                  Core Technology Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentTab.stack.map((t, tIdx) => {
                    const TIcon = t.icon;
                    return (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]"
                      >
                        <TIcon size={14} style={{ color: t.color }} />
                        <span>{t.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Animated Visual Canvas */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#090D1A] via-[#0F172A] to-[#1E293B] rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[320px] border border-white/20">
              {/* Ambient Radial Lights */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#0A4FE0]/30 rounded-full blur-2xl pointer-events-none" />

              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 z-10 w-full">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 px-2.5 sm:px-3 py-1 rounded-lg backdrop-blur-md border border-white/20 min-w-0 max-w-[70%]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold truncate">{currentTab.widgetTitle}</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono bg-[#0A4FE0] text-white px-2 sm:px-2.5 py-1 rounded-full font-bold flex-shrink-0 whitespace-nowrap">
                  Live Engine
                </span>
              </div>

              {/* Central Widget Stats */}
              <div className="my-6 z-10 text-center">
                <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white mb-2">
                  {currentTab.widgetValue}
                </p>
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold">
                  <FiActivity size={12} /> {currentTab.widgetStatus}
                </div>
              </div>

              {/* Bottom Live Sync Strip */}
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15 flex items-center justify-between text-[11px] font-mono z-10">
                <span className="text-white/80 font-bold">AK WebFlair Architecture</span>
                <span className="text-[#38BDF8] font-bold inline-flex items-center gap-1">Synced <FiCheck size={12} /></span>
              </div>
            </div>
          </Motion.div>
        </AnimatePresence>

        {/* Dynamic Backend Stat Banner */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 w-full bg-[#0A4FE0] text-white rounded-[2.2rem] p-6 sm:p-10 shadow-[0_20px_50px_-15px_rgba(10,79,224,0.35)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/20"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="max-w-xl text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white mb-3 border border-white/20">
              <FaAward size={14} /> Production Engineering
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Ready to deploy your next digital platform?
            </h3>
            <p className="text-[#F1F5F9] text-sm font-medium mt-1">
              From discovery to production engineering, we deliver robust software systems.
            </p>
          </div>

          {/* DYNAMIC BACKEND STATS GRID - Sleek Grid on Mobile/Tablet */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto relative z-10">
            {[
              { val: `${projectCount}+`, label: "Projects Shipped" },
              { val: "24/7", label: "Autonomous Sync" },
              { val: "100/100", label: "Core Web Vitals" },
              { val: "5.0", isRating: true, label: "Client Rating" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 sm:p-4 rounded-2xl text-center flex flex-col justify-center min-w-0"
              >
                <p className="text-base sm:text-2xl font-black text-white font-mono leading-none mb-1 inline-flex items-center justify-center gap-1 truncate">
                  <span>{stat.val}</span>
                  {stat.isRating && <FaStar size={12} className="text-amber-300 flex-shrink-0" />}
                </p>
                <p className="text-[9px] sm:text-xs font-bold text-[#CBD5E1] truncate">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] hover:bg-[#F1F5F9] font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>Start Project</span>
              <FaArrowRight size={13} />
            </Link>
          </div>
        </Motion.div>

      </div>
    </section>
  );
};

/* =========================================================================
   MAIN HOME PAGE COMPONENT WITH ZERO GAPS & CLEAN PAGE FLOW
   ========================================================================= */

const Home = () => {
  return (
    <div className="pt-0 bg-[#F8FAFC]">
      <Hero />
      <TrustedPartners />
      <HomeInteractiveSpectrum />
      <Services />
      <Portfolio />
      <Reviews />
      <FAQ />
    </div>
  );
};

export default Home;
