import React, { useState } from "react";

/**
 * AK WebFlair Technologies - Official Brand Logo Component
 * High-definition image logo (/logoak.jpeg) with SVG monogram fallback.
 */
const BrandLogo = ({
  className = "w-10 h-10",
  showText = false,
  textColor = "#FFFFFF",
  subTextColor = "#CBD5E1",
  useImage = true,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 select-none ${showText ? "" : "inline-block"}`}>
      {useImage && !imgError ? (
        <img
          src="/logoak.jpeg"
          alt="AK WebFlair Technologies Logo"
          className={`${className} object-cover rounded-xl shadow-sm`}
          onError={() => setImgError(true)}
          loading="eager"
        />
      ) : (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} drop-shadow-sm`}
        >
          <path
            d="M 100 12 L 185 95 L 152 192 L 130 192 L 130 134 L 70 134 L 70 192 L 48 192 L 15 95 Z"
            fill="#E2E8F0"
          />
          <path d="M 100 38 L 134 78 L 66 78 Z" fill="#0A4FE0" />
          <rect x="25" y="85" width="150" height="42" rx="21" fill="#0A4FE0" />
          <circle cx="100" cy="106" r="17" fill="#E2E8F0" />
        </svg>
      )}

      {showText && (
        <div className="flex flex-col">
          <span
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-none"
            style={{ color: textColor }}
          >
            WebFlair
          </span>
          <span
            className="text-[9px] sm:text-[10px] uppercase font-mono font-extrabold tracking-widest mt-1"
            style={{ color: subTextColor }}
          >
            Technologies
          </span>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
