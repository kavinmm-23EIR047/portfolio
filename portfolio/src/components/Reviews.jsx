import React, { useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const googleLogo =
  "https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png";

const COMPANY = {
  name: "AK WebFlair Technologies",
  address: "Tiruppur, Tamil Nadu",
  logo: "/images/logo.jpg",
  reviewLink: "https://g.page/r/CURsRl_W_no4EAE/review",
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  /* FETCH + CLEAN DATA */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`)
      .then((res) => {
        const cleaned = (res.data.reviews || []).map((r) => ({
          ...r,
          rating: Number(r.rating) || 0,
        }));
        setReviews(cleaned);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  /* AVERAGE RATING FIX */
  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  /* STAR RENDER WITH HALF STAR */
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= full) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
      } else if (i === full + 1 && half) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-xs" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-xs" />);
      }
    }

    return <div className="flex gap-0.5">{stars}</div>;
  };

  return (
    <section className="py-14 px-4 bg-transparent font-[Inter]">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10 flex flex-col items-center">
          <img
            src={COMPANY.logo}
            alt="logo"
            className="w-14 h-14 rounded-lg object-cover shadow-sm border border-primary/20"
          />

          <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-primary dark:text-accent">
            {COMPANY.name}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {COMPANY.address}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-semibold text-primary dark:text-accent">
              {avgRating}
            </span>
            {renderStars(Number(avgRating))}
            <span className="text-xs text-gray-500">
              ({reviews.length})
            </span>
          </div>

          <a
            href={COMPANY.reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 px-5 py-2 rounded-full text-sm font-medium bg-primary text-white hover:bg-secondary transition"
          >
            Write a Review
          </a>
        </div>

        {/* SLIDER */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop
          speed={700}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
        >
          {reviews.slice(0, 12).map((review, i) => (
            <SwiperSlide key={i}>
              <div
                className="
                  rounded-xl p-4 h-[220px]
                  bg-white/60 dark:bg-white/5
                  backdrop-blur-md
                  border border-gray-200 dark:border-white/10
                  shadow-sm hover:shadow-md
                  transition-all duration-300
                  flex flex-col justify-between
                "
              >
                {/* TOP */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.photo}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${review.name}`;
                      }}
                      alt={review.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {review.name}
                      </h4>
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  <img src={googleLogo} alt="Google" className="w-4 h-4 opacity-70" />
                </div>

                {/* COMMENT */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2 line-clamp-3">
                  "{review.comment}"
                </p>

                {/* DATE */}
                <div className="text-[11px] text-gray-400 mt-2">
                  {review.date
                    ? new Date(review.date).toLocaleDateString()
                    : "Recent"}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* EMPTY STATE */}
        {reviews.length === 0 && (
          <p className="text-center text-gray-400 mt-6 text-sm">
            No reviews available
          </p>
        )}

        {/* VIEW MORE */}
        <div className="text-center mt-8">
          <a
            href={COMPANY.reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary dark:text-accent font-medium hover:underline"
          >
            View more reviews →
          </a>
        </div>

      </div>
    </section>
  );
};

export default Reviews;