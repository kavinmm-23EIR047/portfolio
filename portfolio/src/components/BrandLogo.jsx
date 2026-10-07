import React from "react";

/**
 * AK WebFlair Technologies - Official Brand Logo
 * Pixel-perfect scalable vector matching the company's geometric architectural "A" monogram.
 */
const BrandLogo = ({
  className = "w-10 h-10",
  primaryColor = "#E2E8F0", // Silver / White base structure
  accentColor = "#0A4FE0",  // Royal Blue pill & glyphs
  badgeColor = "#E2E8F0",   // Center medallion fill
  showText = false,
  textColor = "#FFFFFF",
  subTextColor = "#CBD5E1"
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${showText ? "" : "inline-block"}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} drop-shadow-sm`}
      >
        {/* Outer A-Shape Architectural Frame */}
        <path
          d="M 100 12 L 185 95 L 152 192 L 130 192 L 130 134 L 70 134 L 70 192 L 48 192 L 15 95 Z"
          fill={primaryColor}
        />

        {/* Top Triangle Cutout */}
        <path
          d="M 100 38 L 134 78 L 66 78 Z"
          fill={accentColor}
        />

        {/* Center Horizontal Stadium / Pill Capsule */}
        <rect
          x="25"
          y="85"
          width="150"
          height="42"
          rx="21"
          fill={accentColor}
        />

        {/* Center Circular Medallion */}
        <circle
          cx="100"
          cy="106"
          r="17"
          fill={badgeColor}
        />

        {/* 4 Tech Geometry Glyphs inside Center Badge */}
        {/* Top-Left: Triangle */}
        <polygon
          points="93.5,97 97.5,103.5 89.5,103.5"
          fill={accentColor}
        />

        {/* Top-Right: Rectangle */}
        <rect
          x="102"
          y="97"
          width="7"
          height="6.5"
          rx="0.75"
          fill={accentColor}
        />

        {/* Bottom-Left: Circle */}
        <circle
          cx="93.5"
          cy="111"
          r="3.5"
          fill={accentColor}
        />

        {/* Bottom-Right: Square */}
        <rect
          x="102"
          y="107.5"
          width="7"
          height="7"
          rx="0.75"
          fill={accentColor}
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span
            className="text-2xl md:text-3xl font-extrabold tracking-tight leading-none"
            style={{ color: textColor }}
          >
            WebFlair
          </span>
          <span
            className="text-[10px] uppercase font-bold tracking-widest mt-1"
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
