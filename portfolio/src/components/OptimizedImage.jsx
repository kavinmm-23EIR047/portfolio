import React, { useState } from "react";

/**
 * Cloudinary & WebP Auto-Optimizer
 * Automatically appends f_auto,q_auto,w_{width} for Cloudinary images
 * Reduces size by up to 80% without quality loss
 */
export const getOptimizedImageUrl = (url, width = 800) => {
  if (!url || typeof url !== "string") return "";
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    if (!url.includes("f_auto")) {
      return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
    }
  }
  return url;
};

/**
 * High-Performance Image with Shimmering Skeleton Loader
 */
const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  width = 800,
  objectFit = "object-contain",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const optimizedSrc = getOptimizedImageUrl(src, width);

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      {/* Animated Skeleton Shimmer overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 bg-slate-900/80 animate-pulse flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Actual Optimized Image */}
      <img
        src={optimizedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full ${objectFit} transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
