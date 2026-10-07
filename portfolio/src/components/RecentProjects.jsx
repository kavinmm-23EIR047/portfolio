import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FiExternalLink, FiArrowUpRight, FiEye } from "react-icons/fi";
import OptimizedImage from "./OptimizedImage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const RecentProjects = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

        setProjects(data);
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

  const hasImage = (image) => typeof image === "string" && image.trim().length > 0;

  return (
    <section className="py-24 sm:py-32 px-5 md:px-10 lg:px-16 bg-[#F1F5F9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-6 uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0A4FE0]" />
              Portfolio Highlights
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] leading-[1.12] tracking-tight mb-4">
              Featured <span className="text-[#0A4FE0]">Developments</span>
            </h2>
            
            <p className="text-[#64748B] text-lg max-w-xl mx-auto font-medium">
              Explore our software solutions deployed across industries and clients worldwide.
            </p>
          </motion.div>
        </div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <style>{`
            .recent-projects-swiper .swiper-slide {
              transition: opacity 0.4s ease, transform 0.4s ease;
            }
            .recent-projects-swiper .swiper-slide:not(.swiper-slide-active) {
              opacity: 0.5;
              transform: scale(0.94);
            }
            .recent-projects-swiper .swiper-slide-active {
              opacity: 1;
              transform: scale(1);
            }
            .recent-projects-swiper .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              border-radius: 9999px;
              background: #CBD5E1;
              opacity: 1;
              transition: all 0.3s;
            }
            .recent-projects-swiper .swiper-pagination-bullet-active {
              width: 32px;
              background: #0A4FE0;
            }
          `}</style>
          {projects.length > 0 ? (
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation={true}
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides={true}
              breakpoints={{
                640: { slidesPerView: 1.3, spaceBetween: 16 },
                1024: { slidesPerView: 2.2, spaceBetween: 24 },
                1280: { slidesPerView: 2.5, spaceBetween: 24 },
              }}
              className="w-full !pb-16 recent-projects-swiper"
            >
              {projects.map((project, index) => (
                <SwiperSlide key={project._id} className="h-auto">
                  <div
                    className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-[0_15px_40px_-10px_rgba(15,23,42,0.12)] hover:shadow-[0_25px_60px_-10px_rgba(10,79,224,0.25)] transition-all duration-500 border border-[#E2E8F0] hover:border-[#0A4FE0]/40 bg-[#090D1A]"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      if (project.website) {
                        window.open(project.website, "_blank", "noopener,noreferrer");
                      }
                    }}
                  >
                    {hasImage(project.img) ? (
                      <OptimizedImage
                        src={project.img}
                        alt={project.title}
                        className="p-2 group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        width={800}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                        <span className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-extrabold tracking-[0.2em] text-white backdrop-blur-sm">
                          Coming Soon
                        </span>
                      </div>
                    )}

                    {/* Non-intrusive Top & Bottom Gradients (keeps screenshot clear) */}
                    {hasImage(project.img) && (
                      <div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 40%, transparent 65%)",
                        }}
                      />
                    )}

                    {/* Live Badge */}
                    {project.website && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-[10px] font-extrabold text-[#0A4FE0] tracking-wider uppercase z-10 flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" /> Live Site
                      </div>
                    )}

                    {/* Bottom Title & Action Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex items-end justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#93C5FD] uppercase tracking-wider block mb-1">
                          {project.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight mb-1 group-hover:text-[#93C5FD] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/70 text-xs font-medium leading-relaxed line-clamp-1">
                          {project.description}
                        </p>
                      </div>

                      {project.website && (
                        <div className="flex-shrink-0">
                          <span className="w-10 h-10 rounded-full bg-white text-[#0A4FE0] group-hover:bg-[#0A4FE0] group-hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                            <FiArrowUpRight size={18} strokeWidth={2.5} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex min-h-48 items-center justify-center text-center text-sm font-semibold text-[#64748B]">
              {isLoading ? "Loading projects..." : loadError || "No projects found."}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentProjects;
