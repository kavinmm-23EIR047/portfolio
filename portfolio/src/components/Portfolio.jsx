import React, { useState, useEffect, useRef } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiExternalLink,
  FiEye,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Globe2,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
} from "lucide-react";
import OptimizedImage from "./OptimizedImage";

const hasImage = (img) => typeof img === "string" && img.trim().length > 0;

/* =========================================================================
   3D COVERFLOW PORTFOLIO WITH CLEAN, HIGH-FIDELITY HOVER & CLICK EXPERIENCE
   ========================================================================= */
const LegacyPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projectList, setProjectList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/projects`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Unable to load projects (${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The projects API returned an invalid response.");
        }

        setProjectList(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setLoadError(error.message || "Unable to load projects.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProjects();
    return () => controller.abort();
  }, []);

  const filterCategories = [
    "all",
    ...new Set(projectList.map((project) => project.category).filter(Boolean)),
  ];
  const filteredProjects =
    activeFilter === "all"
      ? projectList
      : projectList.filter((project) => project.category === activeFilter);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter, projectList]);

  // Auto-play slider only when there are multiple projects and not hovered
  useEffect(() => {
    if (filteredProjects.length <= 1 || isHovered) {
      clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev >= filteredProjects.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(autoPlayRef.current);
  }, [filteredProjects.length, isHovered]);

  const goToSlide = (index) => {
    clearInterval(autoPlayRef.current);
    setActiveIndex(index);
  };

  const goNext = () => {
    if (filteredProjects.length <= 1) return;
    goToSlide(activeIndex >= filteredProjects.length - 1 ? 0 : activeIndex + 1);
  };

  const goPrev = () => {
    if (filteredProjects.length <= 1) return;
    goToSlide(activeIndex <= 0 ? filteredProjects.length - 1 : activeIndex - 1);
  };

  // Touch swipe support
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Helper to get DISTINCT circular offset index
  const getProjectAtOffset = (offset) => {
    const len = filteredProjects.length;
    if (len <= 1) return null;
    if (Math.abs(offset) === 2 && len < 5) return null;
    if (Math.abs(offset) === 1 && len < 2) return null;

    const index = ((activeIndex + offset) % len + len) % len;
    if (index === activeIndex) return null;

    return { project: filteredProjects[index], index };
  };

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];
  const totalCount = filteredProjects.length;
  const formattedActiveNum = String(activeProject ? activeIndex + 1 : 0).padStart(2, "0");
  const formattedTotalNum = String(totalCount).padStart(2, "0");

  const farLeft = getProjectAtOffset(-2);
  const nearLeft = getProjectAtOffset(-1);
  const nearRight = getProjectAtOffset(1);
  const farRight = getProjectAtOffset(2);

  const handleLaunchProject = (e) => {
    if (activeProject?.website) {
      window.open(activeProject.website, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="portfolio"
      className="py-12 sm:py-16 px-2 sm:px-6 lg:px-10 bg-[#0057FF] text-white relative overflow-hidden select-none"
    >
      {/* Background Organic Ambient Lighting */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-[#0047D4] rounded-full blur-[140px] pointer-events-none opacity-80" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#0066FF] rounded-full blur-[160px] pointer-events-none opacity-70" />
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-[#003DB8] rounded-full blur-[140px] pointer-events-none opacity-85" />

      {/* Subtle Fluid Decorative Vectors */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-100,180 Q500,550 1600,120 T3200,650"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />
        <path
          d="M-100,450 Q600,180 1500,750 T3200,280"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
      </svg>

      <div className="w-full max-w-[1580px] mx-auto relative z-10">

        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Featured Tag */}
            <div className="inline-flex items-center gap-2 bg-[#0040BD]/75 text-white text-[10px] sm:text-[11px] font-extrabold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full tracking-widest mb-4 sm:mb-6 uppercase border border-white/20 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              FEATURED CASE STUDIES
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-white leading-[1.1] tracking-tight mb-3 sm:mb-4">
              Selected Client Projects
            </h2>

            <p className="text-white/80 text-xs sm:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              Explore our track record of shipping fast, scalable CRM systems, UI dashboards, e-commerce stores, and AI automations.
            </p>
          </motion.div>
        </div>

        {/* =========================================================================
            CATEGORY FILTER CAPSULES WITH ICONS
            ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
          {filterCategories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white text-[#0057FF] shadow-lg scale-105"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md"
                }`}
              >
                <FiGrid size={13} className={isActive ? "text-[#0057FF]" : "text-white"} />
                <span>{category === "all" ? "All Projects" : category}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            3D PERSPECTIVE COVERFLOW CAROUSEL (CLEAN, INTERACTIVE & CLICKABLE)
            ========================================================================= */}
        <div
          ref={sliderRef}
          className="relative w-full overflow-hidden sm:overflow-visible py-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Circular Navigation Arrow Buttons */}
          {totalCount > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-1 sm:left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#0047D4]/90 hover:bg-[#0039A8] backdrop-blur-xl border border-white/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.4)] cursor-pointer group"
                aria-label="Previous Project"
              >
                <FiChevronLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={goNext}
                className="absolute right-1 sm:right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#0047D4]/90 hover:bg-[#0039A8] backdrop-blur-xl border border-white/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.4)] cursor-pointer group"
                aria-label="Next Project"
              >
                <FiChevronRight size={22} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {/* 3D Track Container */}
          <div
            className="flex items-center justify-center w-full min-h-[220px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[520px] relative px-2"
            style={{ perspective: "1400px" }}
          >
            {/* 1. FAR LEFT (-2) — Desktop only */}
            {farLeft && (
              <motion.div
                key={`far-left-${farLeft.index}`}
                onClick={() => goToSlide(farLeft.index)}
                className="hidden xl:block absolute left-[-3%] z-10 w-[300px] lg:w-[360px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#090d1a] group"
                style={{
                  transform: "perspective(1400px) rotateY(36deg) scale(0.70)",
                  opacity: 0.35,
                }}
                whileHover={{ opacity: 0.75, scale: 0.75 }}
                transition={{ duration: 0.3 }}
                title={`Click to view ${farLeft.project.title}`}
              >
                {hasImage(farLeft.project.img) ? (
                  <OptimizedImage
                    src={farLeft.project.img}
                    alt={farLeft.project.title}
                    className="p-2"
                    width={400}
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-white backdrop-blur-sm">
                      Coming Soon
                    </span>
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-[#0057FF] px-3 py-1 rounded-full text-[10px] font-bold shadow-md">
                    Click to View
                  </span>
                </div>
              </motion.div>
            )}

            {/* 2. NEAR LEFT (-1) — VISIBLE WITH CLEAN HOVER TRANSITION */}
            {nearLeft && (
              <motion.div
                key={`left-${nearLeft.index}`}
                onClick={() => goToSlide(nearLeft.index)}
                className="block absolute left-[-22%] sm:left-[-6%] md:left-[2%] lg:left-[5%] z-20 w-[60%] sm:w-[50%] md:w-[440px] lg:w-[520px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-2 border-white/20 hover:border-white/50 shadow-[0_15px_45px_rgba(0,0,0,0.55)] bg-[#090d1a] group"
                style={{
                  transform: "perspective(1400px) rotateY(22deg) scale(0.82)",
                  opacity: 0.55,
                }}
                whileHover={{ opacity: 0.88, scale: 0.86 }}
                transition={{ duration: 0.3 }}
                title={`Click to switch to ${nearLeft.project.title}`}
              >
                {hasImage(nearLeft.project.img) ? (
                  <OptimizedImage
                    src={nearLeft.project.img}
                    alt={nearLeft.project.title}
                    className="p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-500"
                    width={600}
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-white backdrop-blur-sm">
                      Coming Soon
                    </span>
                  </span>
                )}
                {/* Subtle side shadow and hover indicator */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-[#0057FF] px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <FiEye size={13} /> Click to View
                  </span>
                </div>
              </motion.div>
            )}

            {/* 3. CENTER HERO IMAGE — CRYSTAL CLEAR, INTERACTIVE & EFFORTLESS CLICK */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`center-${activeProject?._id || "empty"}-${activeIndex}`}
                className="relative z-30 w-[82%] sm:w-[78%] md:w-[70%] lg:max-w-[880px] mx-auto cursor-pointer"
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleLaunchProject}
              >
                {activeProject ? (
                  <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl md:rounded-[1.75rem] overflow-hidden border-2 border-white/30 hover:border-white group bg-[#090d1a] flex items-center justify-center p-1.5 sm:p-3 transition-all duration-500 shadow-[0_25px_70px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_90px_rgba(0,87,255,0.45)]">
                    
                    {/* Clear Screenshot Image (Smooth slight zoom without color distortion) */}
                    {hasImage(activeProject.img) ? (
                      <OptimizedImage
                        src={activeProject.img}
                        alt={activeProject.title}
                        className="rounded-lg sm:rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                        width={1000}
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-extrabold tracking-[0.2em] text-white backdrop-blur-sm">
                          Coming Soon
                        </span>
                      </span>
                    )}

                    {hasImage(activeProject.img) && (
                      <>
                        {/* Soft ambient vignettes at top and bottom edges only */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none rounded-xl" />

                        {/* Top Bar Floating Badges */}
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
                          <span className="bg-[#0F172A]/85 backdrop-blur-md text-white border border-white/20 px-2.5 sm:px-3.5 py-1 rounded-full text-[9px] sm:text-xs font-mono font-bold shadow-md truncate max-w-[60%]">
                            {activeProject.category || "Case Study"}
                          </span>

                          {activeProject.website && (
                            <span className="bg-emerald-500 text-white backdrop-blur-md px-2.5 sm:px-3.5 py-1 rounded-full text-[9px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 shadow-md group-hover:scale-105 transition-transform flex-shrink-0 whitespace-nowrap">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-ping flex-shrink-0" />
                              <span>Live Project</span>
                              <FiExternalLink size={10} strokeWidth={2.5} />
                            </span>
                          )}
                        </div>

                        {/* Bottom Floating Interactive Glassmorphism Bar */}
                        {activeProject.website && (
                          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between gap-2">
                            <div className="bg-[#0F172A]/90 backdrop-blur-md border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-left shadow-lg hidden sm:block max-w-[65%]">
                              <p className="text-white text-xs font-extrabold truncate">{activeProject.title}</p>
                              <p className="text-[#93C5FD] text-[10px] font-medium truncate flex items-center gap-1">
                                <span>Click anywhere to visit live project</span>
                                <ArrowUpRight size={12} className="inline flex-shrink-0" />
                              </p>
                            </div>

                            <div className="ml-auto flex items-center gap-2">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-[#0057FF] group-hover:bg-[#0047D4] group-hover:text-white border-2 border-white px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full font-extrabold text-[10px] xs:text-xs sm:text-sm shadow-2xl flex items-center gap-1.5 sm:gap-2 transition-all duration-300 whitespace-nowrap"
                              >
                                <span>Visit Live Site</span>
                                <FiArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-[220px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[520px] items-center justify-center text-center text-sm font-semibold text-white/90">
                    {isLoading ? "Loading projects..." : loadError || "No projects found."}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* 4. NEAR RIGHT (+1) — VISIBLE WITH CLEAN HOVER TRANSITION */}
            {nearRight && (
              <motion.div
                key={`right-${nearRight.index}`}
                onClick={() => goToSlide(nearRight.index)}
                className="block absolute right-[-22%] sm:right-[-6%] md:right-[2%] lg:right-[5%] z-20 w-[60%] sm:w-[50%] md:w-[440px] lg:w-[520px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-2 border-white/20 hover:border-white/50 shadow-[0_15px_45px_rgba(0,0,0,0.55)] bg-[#090d1a] group"
                style={{
                  transform: "perspective(1400px) rotateY(-22deg) scale(0.82)",
                  opacity: 0.55,
                }}
                whileHover={{ opacity: 0.88, scale: 0.86 }}
                transition={{ duration: 0.3 }}
                title={`Click to switch to ${nearRight.project.title}`}
              >
                {hasImage(nearRight.project.img) ? (
                  <OptimizedImage
                    src={nearRight.project.img}
                    alt={nearRight.project.title}
                    className="p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-500"
                    width={600}
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-white backdrop-blur-sm">
                      Coming Soon
                    </span>
                  </span>
                )}
                {/* Subtle side shadow and hover indicator */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-black/10 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-[#0057FF] px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <FiEye size={13} /> Click to View
                  </span>
                </div>
              </motion.div>
            )}

            {/* 5. FAR RIGHT (+2) — Desktop only */}
            {farRight && (
              <motion.div
                key={`far-right-${farRight.index}`}
                onClick={() => goToSlide(farRight.index)}
                className="hidden xl:block absolute right-[-3%] z-10 w-[300px] lg:w-[360px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#090d1a] group"
                style={{
                  transform: "perspective(1400px) rotateY(-36deg) scale(0.70)",
                  opacity: 0.35,
                }}
                whileHover={{ opacity: 0.75, scale: 0.75 }}
                transition={{ duration: 0.3 }}
                title={`Click to view ${farRight.project.title}`}
              >
                {hasImage(farRight.project.img) ? (
                  <OptimizedImage
                    src={farRight.project.img}
                    alt={farRight.project.title}
                    className="p-2"
                    width={400}
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.2em] text-white backdrop-blur-sm">
                      Coming Soon
                    </span>
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-[#0057FF] px-3 py-1 rounded-full text-[10px] font-bold shadow-md">
                    Click to View
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* =========================================================================
              PAGINATION DASHES & COUNTER
              ========================================================================= */}
          {totalCount > 0 && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                      activeIndex === idx
                        ? "w-8 sm:w-12 bg-white"
                        : "w-2.5 sm:w-4 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="text-xs sm:text-base font-mono font-bold text-white/90 tracking-widest">
                — {formattedActiveNum} / {formattedTotalNum}
              </span>
            </div>
          )}

          {/* =========================================================================
              PROJECT DETAILS & TECH STACK (BELOW SLIDER)
              ========================================================================= */}
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={`details-${activeProject._id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-center mt-6 sm:mt-10 max-w-3xl mx-auto px-3"
              >
                <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-extrabold text-[#FDE047] tracking-widest uppercase mb-2 sm:mb-3">
                  <span>{activeProject.category}</span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-4">
                  {activeProject.title}
                </h3>

                {/* Description */}
                <p className="text-white/85 text-xs sm:text-base lg:text-lg font-medium leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
                  {activeProject.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  {activeProject.website && (
                    <a
                      href={activeProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 sm:gap-2.5 bg-white text-[#0057FF] hover:bg-[#F1F5F9] font-extrabold text-xs sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-[0_15px_35px_-5px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 group cursor-pointer"
                    >
                      <span>Open Live Website</span>
                      <FiArrowRight
                        size={16}
                        strokeWidth={2.5}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                  )}

                  <Link
                    to="/support"
                    className="inline-flex items-center gap-2 text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/30 font-bold text-xs sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
                  >
                    <span>Request Similar Project</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Portfolio = LegacyPortfolio;

export default Portfolio;
