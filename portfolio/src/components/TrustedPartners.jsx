import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { getOptimizedImageUrl } from "./OptimizedImage";

const fallbackPartners = [
  {
    name: "Mock Meat FoodTech",
    icon: "https://res.cloudinary.com/l1gckxwy/image/upload/v1791207703/0610ef9e-5918-4974-be4f-4117d4fa868e.png",
  },
  {
    name: "Memories Platform Holidays",
    icon: "https://res.cloudinary.com/l1gckxwy/image/upload/v1791207677/82f8462c-eac5-4a5f-a1a3-4902b8ed4542.png",
  },
  {
    name: "Crazy Capture Studio",
    icon: "https://res.cloudinary.com/l1gckxwy/image/upload/v1791207660/28b09e1c-07fe-4861-9143-4cae7f2058de.png",
  },
  {
    name: "The Chocolate Mine",
    icon: "https://res.cloudinary.com/l1gckxwy/image/upload/v1791207739/f9959545-851e-4f49-9bfc-149158ff73e2.png",
  },
  {
    name: "SunLoop Energy",
    icon: "https://res.cloudinary.com/l1gckxwy/image/upload/v1791207736/707f38ac-cd4e-4830-8474-689c842f9a0d.png",
  },
  {
    name: "HM Apparel Store",
    icon: "https://res.cloudinary.com/l1gckxwy/image/upload/v1791208369/5297a27e-9a66-4b9f-834d-6070841b4b54.png",
  },
];

const TrustedPartners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/partners`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPartners(data);
        } else {
          setPartners(fallbackPartners);
        }
      })
      .catch(() => setPartners(fallbackPartners));
  }, []);

  const displayList = partners.length > 0 ? partners : fallbackPartners;

  return (
    <section className="w-full bg-[#0639A8] py-12 sm:py-16 text-white border-y border-[#0A4FE0] overflow-hidden relative select-none">
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8">
        
        {/* HEADER WITH BLUE BACKGROUND & HIGH CONTRAST BADGE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-white uppercase tracking-widest mb-2 bg-white/15 px-4 py-1.5 rounded-full border border-white/25 shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            PROVEN CLIENT PARTNERSHIPS
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-black tracking-widest uppercase text-white">
            TRUSTED BY INDUSTRY LEADERS & INNOVATIVE COMPANIES
          </h3>
        </div>

        {/* MARQUEE CONTAINER */}
        <div className="marquee-container w-full overflow-hidden flex relative py-2">
          {/* Gradient Fades for Blue Background */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#0639A8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#0639A8] to-transparent z-10 pointer-events-none" />

          <div className="marquee-content flex items-center whitespace-nowrap gap-4 sm:gap-6">
            {[...displayList, ...displayList, ...displayList, ...displayList].map((partner, idx) => {
              const isImageUrl =
                partner.icon &&
                (partner.icon.startsWith("http://") ||
                  partner.icon.startsWith("https://") ||
                  partner.icon.startsWith("/") ||
                  partner.icon.startsWith("data:"));

              const IconComponent = FaIcons[partner.icon] || FaIcons.FaBuilding;

              return (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center justify-center bg-white/10 hover:bg-white border border-white/20 hover:border-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  {isImageUrl ? (
                    <div className="h-9 sm:h-11 md:h-12 flex items-center justify-center">
                      <img
                        src={getOptimizedImageUrl(partner.icon, 300)}
                        alt={partner.name || "Trusted Brand"}
                        className="h-6 sm:h-8 md:h-9 w-auto max-w-[120px] sm:max-w-[150px] object-contain filter brightness-0 invert group-hover:invert-0 group-hover:brightness-0 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-white group-hover:text-[#0A4FE0] transition-colors duration-300">
                      <div className="text-xl sm:text-2xl text-white group-hover:text-[#0A4FE0]">
                        <IconComponent />
                      </div>
                      <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white group-hover:text-[#0A4FE0]">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-content {
          animation: marquee 32s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustedPartners;
