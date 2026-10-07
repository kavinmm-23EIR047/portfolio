import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaLaptopCode, FaRobot, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const fallbackServices = [
  {
    category: "Cloud Engineering",
    title: "Enterprise Web Applications",
    description: "Full-stack scalable architectures with React, Next.js, high-speed databases, and serverless APIs.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    link: "/services"
  },
  {
    category: "AI & Intelligence",
    title: "Custom LLM & Agent Pipelines",
    description: "Automated business workflows, intelligent chatbots, customer service agents, and automated data pipelines.",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop",
    link: "/services"
  },
  {
    category: "Mobile Apps",
    title: "iOS & Android Cross-Platform",
    description: "Ultra-fast mobile experiences with smooth 60fps animations, native sensor integration, and offline persistence.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    link: "/services"
  },
  {
    category: "Design Systems",
    title: "UI/UX & Product Strategy",
    description: "Design systems, interactive prototypes, and frictionless conversion funnels crafted in Figma.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    link: "/services"
  }
];

const ServiceCarousel = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(fallbackServices);
        }
      })
      .catch(() => setServices(fallbackServices));
  }, []);

  const displayList = services.length > 0 ? services : fallbackServices;

  return (
    <section className="py-24 sm:py-32 px-5 md:px-10 lg:px-16 bg-[#F1F5F9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-6 uppercase shadow-sm border border-[#CBD5E1]">
              <span className="w-2 h-2 rounded-full bg-[#0A4FE0]" />
              Strategic Solutions
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] leading-[1.12] tracking-tight mb-4">
              Services Designed for <span className="text-[#0A4FE0]">Rapid Growth</span>
            </h2>
            
            <p className="text-[#64748B] text-lg font-medium">
              Industry-aligned solutions focused on high availability, clean architectures, and scalable results.
            </p>
          </motion.div>

          {/* Custom Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button className="custom-prev w-12 h-12 rounded-full bg-white border border-[#CBD5E1] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-[#0A4FE0] hover:text-white hover:border-[#0A4FE0] transition-all duration-200 cursor-pointer">
              <FaArrowLeft size={14} />
            </button>
            <button className="custom-next w-12 h-12 rounded-full bg-[#0A4FE0] flex items-center justify-center text-white hover:bg-[#0639A8] shadow-md transition-all duration-200 cursor-pointer">
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Swiper
            modules={[Pagination, Navigation]}
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            className="w-full !pb-12"
          >
            {displayList.map((service, index) => (
              <SwiperSlide key={service._id || index} className="h-auto">
                <div className="bg-white rounded-[2.2rem] p-6 shadow-sm border border-[#E2E8F0] flex flex-col h-full hover:border-[#0A4FE0] hover:shadow-[0_15px_35px_-10px_rgba(10,79,224,0.15)] transition-all duration-300 group">
                  {/* Image */}
                  <div className="w-full h-48 rounded-[1.6rem] overflow-hidden mb-6 relative border border-[#E2E8F0]">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#0A4FE0]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <p className="text-[#0A4FE0] text-xs font-extrabold tracking-wider uppercase mb-2">
                      {service.category}
                    </p>
                    
                    <h3 className="text-xl font-extrabold text-[#0F172A] group-hover:text-[#0A4FE0] transition-colors leading-tight mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-[#64748B] text-sm font-medium leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Button */}
                    <div className="pt-4 border-t border-[#F1F5F9] mt-auto">
                      <Link 
                        to={service.link || "/support"} 
                        className="inline-flex items-center gap-2 bg-[#0A4FE0] text-white px-6 py-2.5 rounded-full text-xs font-extrabold hover:bg-[#0639A8] transition-all shadow-sm"
                      >
                        <span>Learn More</span> <FaArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
};

export default ServiceCarousel;
