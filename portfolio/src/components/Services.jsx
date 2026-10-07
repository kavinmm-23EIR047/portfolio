import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiLayers,
  FiCode,
  FiSmartphone,
  FiCpu,
  FiDatabase,
  FiCheckCircle,
  FiPenTool,
  FiTrendingUp,
  FiSearch,
  FiShoppingBag,
  FiActivity,
} from "react-icons/fi";
import { FaPenNib, FaRobot, FaServer, FaChartLine, FaMobileAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiFigma,
  SiFlutter,
  SiReact,
  SiPostgresql,
  SiPython,
  SiExpress,
} from "react-icons/si";
import BrandLogo from "./BrandLogo";

/* =========================================================================
   CUSTOM HIGH-FIDELITY TECH ICONS & ILLUSTRATIONS
   ========================================================================= */

// Custom PostgreSQL Vector Icon
const PostgresIcon = ({ className = "w-5 h-5" }) => (
  <SiPostgresql className={className} />
);

// Custom Python Vector Icon
const PythonIcon = ({ className = "w-5 h-5" }) => (
  <SiPython className={className} />
);

/* =========================================================================
   ANIMATED ILLUSTRATOR PREVIEWS
   1. Landing, E-Commerce & UI Dashboards (Figma + React + SEO)
   2. CRM & AI Automation Agents (Python + LangChain + PostgreSQL)
   3. Full-Stack & Mobile (MERN + Postgres + Flutter + React Native)
   ========================================================================= */

// 1. Landing Pages, E-Commerce & UI Dashboard Illustration
const DashboardEcommerceIllustration = () => (
  <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#DBEAFE] rounded-2xl p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
    {/* Ambient Blur */}
    <div className="absolute top-0 right-0 w-36 h-36 bg-[#0A4FE0]/15 rounded-full blur-2xl pointer-events-none" />

    {/* Canvas Top Bar */}
    <div className="flex items-center justify-between z-10">
      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg shadow-xs">
        <SiFigma className="text-[#F24E1E]" size={13} />
        <span className="text-[10px] font-extrabold text-[#0F172A]">Landing & UI Dashboard</span>
      </div>
      <motion.span
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="bg-[#10B981] text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1"
      >
        <FiSearch size={10} /> 100% SEO Score
      </motion.span>
    </div>

    {/* Interactive Metric Chart & Store Stats */}
    <div className="w-full bg-white/95 backdrop-blur-xs rounded-xl p-2.5 shadow-sm relative z-10 space-y-2">
      {/* Top Mini Metrics */}
      <div className="grid grid-cols-3 gap-1.5 text-center">
        <div className="bg-[#F8FAFC] p-1 rounded-lg border border-[#F1F5F9]">
          <p className="text-[7.5px] font-bold text-[#64748B]">Store Performance</p>
          <p className="text-[10px] font-mono font-extrabold text-[#0F172A]">99.8% Speed</p>
        </div>
        <div className="bg-[#ECFDF5] p-1 rounded-lg border border-[#D1FAE5]">
          <p className="text-[7.5px] font-bold text-[#059669]">Conversion</p>
          <p className="text-[10px] font-mono font-extrabold text-[#059669] flex items-center justify-center gap-0.5">+4.8% <FiTrendingUp size={10} /></p>
        </div>
        <div className="bg-[#EEF2FF] p-1 rounded-lg border border-[#E0E7FF]">
          <p className="text-[7.5px] font-bold text-[#0A4FE0]">Page Speed</p>
          <p className="text-[10px] font-mono font-extrabold text-[#0A4FE0]">0.4s (99.8)</p>
        </div>
      </div>

      {/* Dynamic Animated Curve Graphic */}
      <div className="w-full h-12 bg-[#F8FAFC] rounded-lg p-1 relative flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 240 36" className="w-full h-full">
          {/* Subtle Grid */}
          <line x1="0" y1="18" x2="240" y2="18" stroke="#E2E8F0" strokeDasharray="2 2" strokeWidth="0.8" />
          <line x1="80" y1="0" x2="80" y2="36" stroke="#E2E8F0" strokeDasharray="2 2" strokeWidth="0.8" />
          <line x1="160" y1="0" x2="160" y2="36" stroke="#E2E8F0" strokeDasharray="2 2" strokeWidth="0.8" />

          {/* Glowing Area Fill */}
          <path
            d="M 10 30 C 50 25, 80 8, 120 16 C 160 24, 190 6, 230 4 L 230 36 L 10 36 Z"
            fill="rgba(10, 79, 224, 0.08)"
          />

          {/* Animated Smooth Trend Line */}
          <motion.path
            d="M 10 30 C 50 25, 80 8, 120 16 C 160 24, 190 6, 230 4"
            stroke="#0A4FE0"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          />

          {/* Anchor Points */}
          <circle cx="10" cy="30" r="3" fill="#0A4FE0" />
          <circle cx="120" cy="16" r="3" fill="#10B981" />
          <circle cx="230" cy="4" r="3.5" fill="#0A4FE0" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>

        {/* Floating Cursor */}
        <motion.div
          animate={{ x: [0, 60, 120, 0], y: [10, 0, 8, 10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1 left-2 pointer-events-none flex items-center gap-1"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-[#0A4FE0] drop-shadow-xs">
            <path d="M0 0 L6 14 L8.5 8.5 L14 6 Z" />
          </svg>
          <span className="bg-[#0A4FE0] text-white text-[7.5px] font-bold px-1.5 py-0.2 rounded shadow-xs">
            Kavin (Lead Dev)
          </span>
        </motion.div>
      </div>
    </div>

    {/* Color Palette & Grid Bar */}
    <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl shadow-xs z-10">
      <div className="flex items-center gap-1.5">
        <span className="w-3.5 h-3.5 rounded-md bg-[#0A4FE0] shadow-xs" title="Royal Blue" />
        <span className="w-3.5 h-3.5 rounded-md bg-[#10B981] shadow-xs" title="Emerald Green" />
        <span className="w-3.5 h-3.5 rounded-md bg-[#F43F5E] shadow-xs" title="Rose Accent" />
        <span className="w-3.5 h-3.5 rounded-md bg-[#0F172A] shadow-xs" title="Slate Dark" />
      </div>
      <span className="text-[9px] font-mono font-bold text-[#64748B]">Frictionless Checkout & SEO</span>
    </div>
  </div>
);

// 2. CRM & AI Automation Agents Illustration (Python, LangChain, PostgreSQL)
const CRMAutomationIllustration = () => (
  <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-[#FFFBEB] via-[#F8FAFC] to-[#FEF3C7] rounded-2xl p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
    {/* Ambient Blur */}
    <div className="absolute bottom-0 right-0 w-36 h-36 bg-[#F59E0B]/15 rounded-full blur-2xl pointer-events-none" />

    {/* Studio Header */}
    <div className="flex items-center justify-between z-10">
      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg shadow-xs">
        <SiPython className="text-[#3776AB]" size={14} />
        <span className="text-[10px] font-extrabold text-[#0F172A]">AI Automation Control Centre</span>
      </div>
      <span className="bg-[#F59E0B] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
        Agent Autonomous
      </span>
    </div>

    {/* Multi-Track Sequencer & Automation Engine */}
    <div className="w-full bg-white/95 backdrop-blur-xs rounded-xl p-2 shadow-sm space-y-1.5 relative overflow-hidden z-10">
      {/* Animated Playhead Sweeper */}
      <motion.div
        animate={{ left: ["5%", "92%", "5%"] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 w-[2px] bg-[#EF4444] z-30 flex flex-col items-center pointer-events-none"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] -mt-1 shadow-sm" />
      </motion.div>

      {/* Track 1: Lead Capture */}
      <div className="h-5 bg-[#FFFBEB] rounded-lg px-2 flex items-center justify-between text-[8.5px] font-mono font-bold text-[#B45309]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          <span>Lead captured & enriched</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#F59E0B] rotate-45" />
          <span className="w-2 h-2 bg-[#F59E0B] rotate-45" />
        </div>
      </div>

      {/* Track 2: Python AI Agent Routing */}
      <div className="h-5 bg-[#EFF6FF] rounded-lg px-2 flex items-center justify-between text-[8.5px] font-mono font-bold text-[#1D4ED8]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A4FE0]" />
          <span>Python AI Agent qualifies intent</span>
        </div>
        <span className="text-[8px] bg-white px-1.5 py-0.5 rounded text-[#0A4FE0] font-bold">Auto-Routed</span>
      </div>

      {/* Track 3: CRM & Database Sync */}
      <div className="h-5 bg-[#F8FAFC] rounded-lg px-2 flex items-center justify-between text-[8.5px] font-mono text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>PostgreSQL CRM sync & alert</span>
        </div>
        <span className="text-[8px] font-bold text-[#10B981] inline-flex items-center gap-1">Synced <FiCheck size={10} /></span>
      </div>
    </div>

    {/* Bottom Status */}
    <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl shadow-xs z-10">
      <span className="text-[9px] font-extrabold text-[#0F172A] flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
        CRM + Python AI live
      </span>
      <span className="text-[9px] font-mono font-bold text-[#F59E0B]">24/7 Operations</span>
    </div>
  </div>
);

// 3. Full-Stack & Mobile (MERN, Postgres, Python, Flutter, React Native)
const FullStackMobileIllustration = () => (
  <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-[#ECFDF5] via-[#F8FAFC] to-[#DBEAFE] rounded-2xl p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
    {/* Ambient Blur */}
    <div className="absolute top-0 right-0 w-36 h-36 bg-[#10AA50]/15 rounded-full blur-2xl pointer-events-none" />

    {/* Header with Framework Badges */}
    <div className="flex items-center justify-between z-10">
      <div className="flex items-center gap-1 bg-[#0F172A] text-white px-2.5 py-1 rounded-lg shadow-xs">
        <SiReact size={11} className="text-[#61DAFB]" />
        <span className="text-[10px] font-mono font-bold">MERN</span>
      </div>
      <div className="flex items-center gap-1 bg-[#336791]/15 text-[#1E40AF] px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold">
        <SiPostgresql size={11} />
        <span>Postgres</span>
      </div>
      <div className="flex items-center gap-1 bg-[#3776AB]/15 text-[#1D4ED8] px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold">
        <SiPython size={11} />
        <span>Python</span>
      </div>
    </div>

    {/* Interactive Sprint Board & Code Terminal Split */}
    <div className="w-full bg-white/95 backdrop-blur-xs rounded-xl p-2.5 shadow-sm space-y-2 z-10">
      {/* Sprint Milestone Tracker */}
      <div className="grid grid-cols-3 gap-1.5 text-center">
        <div className="bg-[#F8FAFC] p-1 rounded-lg border border-[#F1F5F9]">
          <p className="text-[7.5px] font-bold text-[#64748B]">MERN API</p>
          <p className="text-[10px] font-mono font-extrabold text-[#0F172A]">REST & Node</p>
        </div>
        <div className="bg-[#EEF2FF] p-1 rounded-lg border border-[#E0E7FF]">
          <p className="text-[7.5px] font-bold text-[#0A4FE0]">Database</p>
          <p className="text-[10px] font-mono font-extrabold text-[#0A4FE0]">Postgres + Mongo</p>
        </div>
        <div className="bg-[#ECFDF5] p-1 rounded-lg border border-[#D1FAE5]">
          <p className="text-[7.5px] font-bold text-[#059669]">Live Apps</p>
          <p className="text-[10px] font-mono font-extrabold text-[#059669] flex items-center justify-center gap-1">Flutter & RN <FiCheck size={10} /></p>
        </div>
      </div>

      {/* Live Sync Engine Bar */}
      <div className="flex items-center justify-between pt-1 border-t border-[#F1F5F9] text-[8.5px] font-mono">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[#0284C7] font-bold">
            <SiFlutter size={10} /> Flutter
          </span>
          <span className="text-[#CBD5E1]">&bull;</span>
          <span className="flex items-center gap-1 text-[#2563EB] font-bold">
            <SiReact size={10} /> React Native
          </span>
        </div>
        <span className="text-[#10B981] font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          Production Ready
        </span>
      </div>
    </div>

    {/* Bottom Cloud Architecture Metric */}
    <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl shadow-xs z-10">
      <span className="text-[9px] font-mono font-extrabold text-[#0A4FE0] flex items-center gap-1">
        <FiCpu size={11} /> 99.99% Uptime &bull; Sub-100ms
      </span>
      <span className="text-[9px] font-mono font-bold text-[#64748B]">CI/CD Pipeline</span>
    </div>
  </div>
);

/* =========================================================================
   SERVICES DATA (Explicitly featuring CRM, UI Dashboards, Landing & E-Commerce,
                  AI Automation Agents, SEO, MERN, Postgres, Python, Flutter, React Native)
   ========================================================================= */

const coreServices = [
  {
    id: "landing-dashboards",
    category: "UI Dashboards & E-Commerce",
    title: "Landing, E-Commerce & UI Dashboards",
    shortTitle: "Landing & UI Dashboards",
    headline: "High-converting storefronts, landing pages & intuitive SaaS dashboards",
    description:
      "Modern company landing pages, D2C/B2B e-commerce stores, and intuitive SaaS UI dashboards built with responsive design tokens, frictionless checkout, and high conversion flow.",
    icon: FaPenNib,
    accentBg: "bg-[#EFF6FF]",
    accentText: "text-[#0A4FE0]",
    accentBorder: "border-[#BFDBFE]",
    pillBg: "bg-[#0A4FE0]",
    illustration: DashboardEcommerceIllustration,
    primaryTools: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "React / Next.js", icon: SiReact, color: "#61DAFB" },
      { name: "UI Dashboards", icon: FiLayers, color: "#0A4FE0" },
      { name: "SEO Engine", icon: FiSearch, color: "#10B981" },
    ],
    deliverables: [
      "Landing Pages",
      "E-Commerce Stores",
      "SaaS UI Dashboards",
      "SEO Optimizations",
    ],
    highlightPill: "High-conversion & UX",
  },
  {
    id: "crm-ai-automation",
    category: "CRM & AI Automation",
    title: "CRM Platforms & AI Automation Agents",
    shortTitle: "CRM & AI Automation",
    headline: "Intelligent autonomous agents & automated business CRM pipelines",
    description:
      "Custom CRM systems, Python-powered AI agents, and workflow automations that capture leads, analyze customer data, automate routine operations, and alert teams without manual friction.",
    icon: FaRobot,
    accentBg: "bg-[#FFFBEB]",
    accentText: "text-[#F59E0B]",
    accentBorder: "border-[#FDE68A]",
    pillBg: "bg-[#F59E0B]",
    illustration: CRMAutomationIllustration,
    primaryTools: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "AI Agents", icon: FiCpu, color: "#D97706" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "CRM Workflows", icon: FiDatabase, color: "#B45309" },
    ],
    deliverables: [
      "Custom CRM Platforms",
      "AI Automation Agents",
      "Lead & Sales Pipelines",
      "Smart API Integrations",
    ],
    highlightPill: "Autonomous AI workflows",
  },
  {
    id: "fullstack-mobile",
    category: "MERN, Postgres & Mobile",
    title: "MERN, Postgres & Mobile App Development",
    shortTitle: "MERN & Mobile Apps",
    headline: "Scalable MERN web platforms, Postgres databases & mobile applications",
    description:
      "End-to-end full-stack architectures engineered with the MERN stack and PostgreSQL for scalable APIs, paired with Flutter and React Native for fluid, cross-platform mobile apps.",
    icon: FiCode,
    accentBg: "bg-[#ECFDF5]",
    accentText: "text-[#059669]",
    accentBorder: "border-[#A7F3D0]",
    pillBg: "bg-[#10B981]",
    illustration: FullStackMobileIllustration,
    primaryTools: [
      { name: "MERN Stack", icon: SiReact, color: "#10AA50" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Flutter", icon: SiFlutter, color: "#0284C7" },
      { name: "React Native", icon: SiReact, color: "#2563EB" },
    ],
    deliverables: [
      "MERN Web Applications",
      "PostgreSQL Relational DB",
      "Flutter Mobile Apps",
      "React Native iOS/Android",
    ],
    highlightPill: "MERN + Postgres + Mobile",
  },
];

/* =========================================================================
   CONNECTED TECHNOLOGY MINDMAP / FLOW GRAPH
   Features exact stacks: MERN, PostgreSQL, Python, Flutter, React Native,
   Figma, Next.js connected to WebFlair Technologies Central Hub
   ========================================================================= */

const TechFlowMap = () => {
  return (
    <div className="w-full relative mb-12 select-none">
      
      {/* -------------------------------------------------------------
          1. DESKTOP & TABLET VIEW: Interactive Mindmap Network Architecture
          ------------------------------------------------------------- */}
      <div className="hidden md:block relative bg-white/70 backdrop-blur-md rounded-[3rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.06)] border border-[#E2E8F0]/80 overflow-hidden">
        
        {/* Soft Ambient Radial Background Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-r from-[#0A4FE0]/8 via-[#38BDF8]/10 to-[#F43F5E]/6 rounded-full blur-[100px] pointer-events-none" />

        {/* Dynamic Curved SVG Circuit Connector Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
          viewBox="0 0 1000 360"
        >
          <defs>
            <linearGradient id="wire-left-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F24E1E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0A4FE0" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="wire-left-mid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3776AB" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0A4FE0" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="wire-left-bot" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#336791" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0A4FE0" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="wire-right-top" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#10AA50" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0A4FE0" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="wire-right-mid" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0A4FE0" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="wire-right-bot" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0A4FE0" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="wire-down" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A4FE0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0A4FE0" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Left Circuit Traces -> WebFlair Hub */}
          <path
            d="M 230 75 C 340 75, 410 130, 440 160"
            stroke="url(#wire-left-top)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 230 165 C 330 165, 400 170, 440 170"
            stroke="url(#wire-left-mid)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 230 255 C 340 255, 410 200, 440 180"
            stroke="url(#wire-left-bot)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Right Circuit Traces -> WebFlair Hub */}
          <path
            d="M 770 75 C 660 75, 590 130, 560 160"
            stroke="url(#wire-right-top)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 770 165 C 670 165, 600 170, 560 170"
            stroke="url(#wire-right-mid)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 770 255 C 660 255, 590 200, 560 180"
            stroke="url(#wire-right-bot)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Downward Energy Connector Lines leading to 3 Pillars */}
          <path
            d="M 500 230 C 500 280, 210 290, 210 360"
            stroke="url(#wire-down)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M 500 230 L 500 360"
            stroke="url(#wire-down)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M 500 230 C 500 280, 790 290, 790 360"
            stroke="url(#wire-down)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Glowing Animated Pulse Beads */}
          <circle cx="230" cy="75" r="4.5" fill="#F24E1E" />
          <circle cx="230" cy="165" r="4.5" fill="#3776AB" />
          <circle cx="230" cy="255" r="4.5" fill="#336791" />
          <circle cx="770" cy="75" r="4.5" fill="#10AA50" />
          <circle cx="770" cy="165" r="4.5" fill="#0F172A" />
          <circle cx="770" cy="255" r="4.5" fill="#0284C7" />
        </svg>

        {/* 3-Column Node Layout */}
        <div className="relative z-10 grid grid-cols-12 items-center gap-4 min-h-[300px]">
          
          {/* Left Wing Nodes: Figma, Python (AI), PostgreSQL */}
          <div className="col-span-4 flex flex-col gap-5 justify-center">
            {/* 1. Figma */}
            <motion.div
              whileHover={{ x: 6, scale: 1.02 }}
              className="bg-white hover:bg-[#FFF1F2] px-5 py-3.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)] border border-[#F1F5F9] flex items-center justify-between transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F24E1E]/10 flex items-center justify-center text-[#F24E1E] group-hover:bg-[#F24E1E] group-hover:text-white transition-colors">
                  <SiFigma size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#F24E1E] transition-colors">
                    Figma & UI/UX
                  </h4>
                  <p className="text-[10px] font-bold text-[#64748B]">UI Dashboards & Systems</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F24E1E] shadow-xs" />
            </motion.div>

            {/* 2. Python & AI Automation */}
            <motion.div
              whileHover={{ x: 6, scale: 1.02 }}
              className="bg-white hover:bg-[#EFF6FF] px-5 py-3.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)] border border-[#F1F5F9] flex items-center justify-between transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3776AB]/10 flex items-center justify-center text-[#3776AB] group-hover:bg-[#3776AB] group-hover:text-white transition-colors">
                  <SiPython size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#3776AB] transition-colors">
                    Python & AI Agents
                  </h4>
                  <p className="text-[10px] font-bold text-[#64748B]">Automations & LLM Tools</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#3776AB] shadow-xs" />
            </motion.div>

            {/* 3. PostgreSQL */}
            <motion.div
              whileHover={{ x: 6, scale: 1.02 }}
              className="bg-white hover:bg-[#F0F9FF] px-5 py-3.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)] border border-[#F1F5F9] flex items-center justify-between transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#336791]/10 flex items-center justify-center text-[#336791] group-hover:bg-[#336791] group-hover:text-white transition-colors">
                  <SiPostgresql size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#336791] transition-colors">
                    PostgreSQL
                  </h4>
                  <p className="text-[10px] font-bold text-[#64748B]">Relational & High-Speed DB</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#336791] shadow-xs" />
            </motion.div>
          </div>

          {/* Central Core: WebFlair Technologies Hub */}
          <div className="col-span-4 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group cursor-pointer"
            >
              {/* Pulsating Glowing Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0A4FE0] to-[#38BDF8] rounded-[2.2rem] blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />

              {/* Main Central Card */}
              <div className="relative bg-[#0A4FE0] text-white px-7 py-6 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(10,79,224,0.5)] flex flex-col items-center text-center border-2 border-white/30">
                <div className="w-14 h-14 rounded-2xl bg-white/15 p-2.5 flex items-center justify-center border border-white/30 mb-3 shadow-inner">
                  <BrandLogo className="w-full h-full" primaryColor="#FFFFFF" accentColor="#0A4FE0" badgeColor="#FFFFFF" />
                </div>
                <h3 className="text-2xl font-black tracking-tight leading-none text-white">
                  WebFlair
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#93C5FD] mt-1.5">
                  TECHNOLOGIES
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono font-bold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" />
                  Unified Architecture
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Wing Nodes: MERN Stack, Next.js & SEO, React Native & Flutter */}
          <div className="col-span-4 flex flex-col gap-5 justify-center">
            {/* 4. MERN Stack */}
            <motion.div
              whileHover={{ x: -6, scale: 1.02 }}
              className="bg-white hover:bg-[#F0FDF4] px-5 py-3.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)] border border-[#F1F5F9] flex items-center justify-between transition-all group cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#10AA50] shadow-xs" />
              <div className="flex items-center gap-3 text-right">
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#10AA50] transition-colors">
                    MERN Stack
                  </h4>
                  <p className="text-[10px] font-bold text-[#64748B]">Mongo, Express, React, Node</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#10AA50]/10 flex items-center justify-center text-[#10AA50] group-hover:bg-[#10AA50] group-hover:text-white transition-colors">
                  <SiMongodb size={20} />
                </div>
              </div>
            </motion.div>

            {/* 5. Next.js & SEO Engine */}
            <motion.div
              whileHover={{ x: -6, scale: 1.02 }}
              className="bg-white hover:bg-[#F8FAFC] px-5 py-3.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)] border border-[#F1F5F9] flex items-center justify-between transition-all group cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A] shadow-xs" />
              <div className="flex items-center gap-3 text-right">
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F172A] transition-colors">
                    Next.js & SEO
                  </h4>
                  <p className="text-[10px] font-bold text-[#64748B]">Landing, E-Com & Speed</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#0F172A]/10 flex items-center justify-center text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white transition-colors">
                  <SiNextdotjs size={20} />
                </div>
              </div>
            </motion.div>

            {/* 6. React Native & Flutter */}
            <motion.div
              whileHover={{ x: -6, scale: 1.02 }}
              className="bg-white hover:bg-[#F0F9FF] px-5 py-3.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)] border border-[#F1F5F9] flex items-center justify-between transition-all group cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] shadow-xs" />
              <div className="flex items-center gap-3 text-right">
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                    React Native & Flutter
                  </h4>
                  <p className="text-[10px] font-bold text-[#64748B]">iOS & Android Mobile</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                  <SiFlutter size={18} />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------------------
          2. MOBILE VIEW (375px - 767px): Sleek Connected Tech Bar
          ------------------------------------------------------------- */}
      <div className="md:hidden bg-white rounded-3xl p-5 shadow-sm border border-[#E2E8F0]/80">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-[#0A4FE0] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-md">
            <BrandLogo className="w-5 h-5" primaryColor="#FFFFFF" accentColor="#0A4FE0" badgeColor="#FFFFFF" />
            <span className="text-sm font-extrabold tracking-tight">WebFlair Core Hub</span>
          </div>
        </div>

        {/* Tech Chips Grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "MERN Stack", icon: SiReact, color: "#10AA50", desc: "Mongo/Node/React" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", desc: "Relational DB" },
            { name: "Python", icon: SiPython, color: "#3776AB", desc: "AI & Automation" },
            { name: "Flutter & RN", icon: SiFlutter, color: "#0284C7", desc: "iOS & Android" },
            { name: "Landing & E-Com", icon: SiNextdotjs, color: "#0F172A", desc: "Next.js & SEO" },
            { name: "Figma UI/UX", icon: SiFigma, color: "#F24E1E", desc: "Dashboards" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] p-2.5 rounded-xl flex items-center gap-2 border border-[#F1F5F9]"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <Icon size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">{item.name}</p>
                  <p className="text-[9px] font-medium text-[#64748B]">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

/* =========================================================================
   MAIN SERVICES COMPONENT
   ========================================================================= */

const Services = () => {
  return (
    <section id="services" className="py-12 sm:py-16 px-4 sm:px-8 lg:px-14 bg-[#F8FAFC] relative overflow-hidden">
      
      {/* Background Subtle Silver Dot Matrix */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0A4FE0 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#0A4FE0]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1560px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Pill Badge matching reference */}
            <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm border border-[#E2E8F0]/80">
              <span className="w-2 h-2 rounded-full bg-[#0A4FE0] animate-pulse" />
              OUR CORE CAPABILITIES
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              Services Built for <span className="text-[#0A4FE0]">Real Impact</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#64748B] font-medium leading-relaxed max-w-2xl mx-auto">
              We design and construct production-grade CRM platforms, UI dashboards, high-converting landing & e-commerce pages, Python AI automation agents, and cross-platform mobile apps with SEO excellence.
            </p>
          </motion.div>
        </div>

        {/* -------------------------------------------------------------
            CONNECTED TECHNOLOGY FLOW / ECOSYSTEM GRAPH
            ------------------------------------------------------------- */}
        <TechFlowMap />

        {/* -------------------------------------------------------------
            THE 3 CORE CAPABILITY CARDS (Side-by-Side Desktop & Responsive)
            ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            const Illustration = service.illustration;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2.5rem] p-6 sm:p-7 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.07)] hover:shadow-[0_25px_60px_-15px_rgba(10,79,224,0.14)] transition-all duration-300 flex flex-col justify-between border border-[#F1F5F9] relative overflow-hidden group"
              >
                <div>
                  
                  {/* Card Header: Squircle Icon + Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${service.accentBg} ${service.accentText} flex items-center justify-center text-2xl shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight group-hover:text-[#0A4FE0] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <span className={`inline-block text-[11px] font-extrabold uppercase tracking-wider ${service.accentText} mt-0.5`}>
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#64748B] font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Animated Illustrator Graphic Canvas */}
                  <div className="mb-6 rounded-2xl overflow-hidden shadow-xs">
                    <Illustration />
                  </div>

                  {/* Explicit Tech Stack Pills */}
                  <div className="mb-5">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] font-bold mb-2">
                      Core Technology Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.primaryTools.map((tool, tIdx) => {
                        const ToolIcon = tool.icon;
                        return (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#F8FAFC] text-[#334155] px-3 py-1.5 rounded-xl border border-[#F1F5F9] hover:bg-white transition-colors"
                          >
                            <ToolIcon size={12} style={{ color: tool.color }} />
                            <span>{tool.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Deliverables Checklist Bar matching user image */}
                <div className="pt-5 border-t border-[#F1F5F9] mt-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {service.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#475569]"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center flex-shrink-0">
                          <FiCheck size={11} />
                        </span>
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="flex items-center justify-between pt-2">
                    <Link
                      to="/support"
                      className="inline-flex items-center gap-2 bg-[#0A4FE0] hover:bg-[#0639A8] text-white px-5 py-2.5 rounded-full text-xs font-extrabold shadow-sm hover:shadow-md transition-all duration-200 group/btn"
                    >
                      <span>Explore Capability</span>
                      <FiArrowUpRight
                        size={14}
                        className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform stroke-[2.5px]"
                      />
                    </Link>

                    <span className="text-xs font-mono font-black text-[#CBD5E1]">
                      0{index + 1}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
