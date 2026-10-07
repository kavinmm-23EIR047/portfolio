import React, { useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import { FaStar, FaRegStar, FaStarHalfAlt, FaCheckCircle } from "react-icons/fa";

const googleLogo = "https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png";

const COMPANY = {
  name: "AK WebFlair Technologies",
  address: "Tiruppur, Tamil Nadu, India",
  logo: "/logoak.jpeg",
  reviewLink: "https://g.page/r/CURsRl_W_no4EAE/review",
};

const fallbackReviews = [
  {
    name: "JAGATHEESHVAR S 23EIR042",
    profileUrl: "https://www.google.com/maps/contrib/114795116737950803920/reviews?hl=en-GB",
    rating: 5,
    comment: "Outstanding service and top quality work!",
    date: "21 hours ago",
    badge: "0 reviews • 0 photos",
    source: "Google Maps"
  },
  {
    name: "Sarvathan C",
    profileUrl: "https://www.google.com/maps/contrib/111646020432378435636/reviews?hl=en-GB",
    rating: 5,
    comment: "Great!!",
    date: "24 hours ago",
    badge: "0 reviews • 0 photos",
    source: "Google Maps"
  },
  {
    name: "LOGESH B N 23EIR053",
    profileUrl: "https://www.google.com/maps/contrib/111784499382330115132/reviews?hl=en-GB",
    rating: 5,
    comment: "Great work man. I like your designs and punctuality.",
    date: "Yesterday",
    badge: "0 reviews • 0 photos",
    source: "Google Maps"
  },
  {
    name: "its me _kavin",
    profileUrl: "https://www.google.com/maps/contrib/102132354756005317221/reviews?hl=en-GB",
    rating: 5,
    comment: "Great work, mate! Looking forward to more collaborations in the future.",
    date: "Yesterday",
    badge: "0 reviews • 0 photos",
    source: "Google Maps"
  },
  {
    name: "Sakthi Dhasan",
    profileUrl: "https://www.google.com/maps/contrib/118213517804775249372/reviews?hl=en-GB",
    rating: 5,
    comment: "Good work..",
    date: "12 weeks ago",
    ownerReply: "Thank you! Best client experience.",
    badge: "3 reviews • 1 photo",
    source: "Google Maps"
  },
  {
    name: "PRABA PRINCE",
    profileUrl: "https://www.google.com/maps/contrib/112385449089373527377/reviews?hl=en-GB",
    rating: 5,
    comment: "Awesome work",
    date: "27 weeks ago",
    badge: "Local Guide • 11 reviews • 6 photos",
    source: "Google Maps"
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
    axios
      .get(`${backendUrl}/api/reviews`)
      .then((res) => {
        const cleaned = (res.data.reviews || []).map((r) => ({ ...r, rating: Number(r.rating) || 5 }));
        if (cleaned.length > 0) {
          setReviews(cleaned);
        } else {
          axios
            .get(`${backendUrl}/api/feedback`)
            .then((res2) => {
              const cleaned2 = (res2.data.reviews || []).map((r) => ({ ...r, rating: Number(r.rating) || 5 }));
              setReviews(cleaned2.length > 0 ? cleaned2 : fallbackReviews);
            })
            .catch(() => setReviews(fallbackReviews));
        }
      })
      .catch(() => {
        axios
          .get(`${backendUrl}/api/feedback`)
          .then((res2) => {
            const cleaned2 = (res2.data.reviews || []).map((r) => ({ ...r, rating: Number(r.rating) || 5 }));
            setReviews(cleaned2.length > 0 ? cleaned2 : fallbackReviews);
          })
          .catch(() => setReviews(fallbackReviews));
      });
  }, []);

  const reviewList = reviews.length > 0 ? reviews : fallbackReviews;

  const avgRating = useMemo(() => {
    if (!reviewList.length) return "5.0";
    const total = reviewList.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviewList.length).toFixed(1);
  }, [reviewList]);

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= full) stars.push(<FaStar key={i} className="text-[#0A4FE0] text-sm" />);
      else if (i === full + 1 && half) stars.push(<FaStarHalfAlt key={i} className="text-[#0A4FE0] text-sm" />);
      else stars.push(<FaRegStar key={i} className="text-[#CBD5E1] text-sm" />);
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  const getInitials = (name = "") => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <section className="py-12 sm:py-16 px-5 md:px-10 lg:px-16 bg-[#F1F5F9] relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0A4FE0]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white text-[#0A4FE0] text-xs font-extrabold px-5 py-2 rounded-full tracking-widest mb-6 uppercase shadow-sm border border-[#CBD5E1]">
            <span className="w-2 h-2 rounded-full bg-[#0A4FE0]" />
            Verified Client Reviews
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
            Trusted by Founders & Teams
          </h2>
          
          <p className="text-base sm:text-lg text-[#64748B] font-medium mt-3 max-w-xl">
            Real feedback from clients who partner with us for scalable software and digital growth.
          </p>

          {/* Rating Pill Bar */}
          <div className="flex items-center justify-center gap-4 mt-8 bg-white py-3.5 px-8 rounded-full border border-[#CBD5E1] shadow-sm">
            <img src={googleLogo} alt="Google" className="w-5 h-5 object-contain" />
            <span className="text-xl font-black text-[#0F172A]">{avgRating}</span>
            {renderStars(Number(avgRating))}
            <span className="text-xs text-[#64748B] font-bold">({reviewList.length} Verified Reviews)</span>
          </div>

          <a 
            href={COMPANY.reviewLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-extrabold text-white bg-[#0A4FE0] hover:bg-[#0639A8] transition-all duration-200 shadow-md hover:scale-105"
          >
            + Write a Review
          </a>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          speed={800}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          className="pb-14"
        >
          {reviewList.slice(0, 12).map((review, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="bg-white rounded-[2.2rem] p-7 shadow-sm border border-[#E2E8F0] min-h-[250px] flex flex-col justify-between hover:border-[#0A4FE0] hover:shadow-md transition-all duration-300">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3.5 items-center">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold bg-[#0A4FE0] text-white shadow-sm flex-shrink-0">
                        {getInitials(review.name)}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0F172A] leading-tight flex items-center gap-1.5">
                          {review.profileUrl ? (
                            <a href={review.profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0A4FE0] transition-colors">
                              {review.name}
                            </a>
                          ) : (
                            review.name
                          )}
                          <FaCheckCircle className="text-[#0A4FE0] flex-shrink-0" size={12} />
                        </h4>
                        <div className="mt-1">{renderStars(review.rating)}</div>
                      </div>
                    </div>
                    <img src={googleLogo} alt="Google" className="w-4 h-4 opacity-80 flex-shrink-0" />
                  </div>
                  
                  <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed line-clamp-3 mb-2">
                    "{review.comment || "Great work and excellent service!"}"
                  </p>

                  {review.ownerReply && (
                    <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-2.5 rounded-xl text-[11px] text-[#1E40AF] font-medium my-2">
                      <span className="font-extrabold block text-[10px] text-[#0A4FE0]">Owner Reply:</span>
                      {review.ownerReply}
                    </div>
                  )}
                </div>
                
                <div className="text-[11px] text-[#94A3B8] font-mono font-bold flex items-center justify-between border-t border-[#F1F5F9] pt-3 mt-2">
                  <span className="truncate max-w-[60%]">{review.badge || "Google Review"}</span>
                  <span className="flex-shrink-0">{review.date ? (isNaN(Date.parse(review.date)) ? review.date : new Date(review.date).toLocaleDateString()) : "Recent"}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;