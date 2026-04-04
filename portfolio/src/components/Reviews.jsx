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

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

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
        stars.push(<FaRegStar key={i} className="text-gray-400 text-xs" />);
      }
    }

    return <div className="flex gap-0.5">{stars}</div>;
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="py-14 px-4 bg-transparent font-mono">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10 flex flex-col items-center">

          {/* LOGO */}
          <div className="
            w-16 h-16 rounded-lg overflow-hidden
           
          ">
            <img
              src={COMPANY.logo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-accent dark:text-accent">
            {COMPANY.name}
          </h2>

          <p className="text-sm text-lightSubtext dark:text-gray-400 mt-1">
            {COMPANY.address}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-semibold text-primary dark:text-accent">
              {avgRating}
            </span>
            {renderStars(Number(avgRating))}
            <span className="text-xs text-lightSubtext">
              ({reviews.length})
            </span>
          </div>

          <a
            href={COMPANY.reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-5 px-5 py-2 text-sm rounded-md
              border border-primary/40
              text-primary dark:text-accent
              hover:bg-primary hover:text-white
              transition
            "
          >
            + Write Review
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
                  rounded-lg overflow-hidden
                  border

                  /* 🔥 THEME INVERSION */
                  bg-darkCard text-gray-200 border-darkBorder
                  dark:bg-lightCard dark:text-lightText dark:border-gray-300

                  transition-all duration-300
                "
              >
                {/* 🔴🟡🟢 MAC BAR */}
                <div className="
                  flex items-center gap-2 px-3 py-2
                  border-b border-darkBorder
                  dark:border-gray-300
                ">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>

                  <span className="ml-auto text-[10px] opacity-60">
                    review.sh
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-4 h-[190px] flex flex-col justify-between">

                  {/* TOP */}
                  <div className="flex justify-between">
                    <div className="flex gap-3">

                      {/* INITIAL ICON */}
                      <div className="
                        w-9 h-9 rounded-md
                        flex items-center justify-center
                        text-xs font-bold
                        bg-primary text-white
                        dark:bg-accent
                      ">
                        {getInitials(review.name)}
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">
                          {review.name}
                        </h4>
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <img
                      src={googleLogo}
                      alt="Google"
                      className="w-4 h-4 opacity-70"
                    />
                  </div>

                  {/* COMMENT */}
                  <p className="text-xs mt-2 opacity-80 line-clamp-3">
                    "$ {review.comment}"
                  </p>

                  {/* DATE */}
                  <div className="text-[10px] opacity-50">
                    {review.date
                      ? new Date(review.date).toLocaleDateString()
                      : "Recent"}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* EMPTY */}
        {reviews.length === 0 && (
          <p className="text-center text-lightSubtext mt-6 text-sm">
            No reviews available
          </p>
        )}

        {/* VIEW MORE */}
        <div className="text-center mt-8">
          <a
            href={COMPANY.reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary dark:text-accent hover:underline"
          >
            View more reviews →
          </a>
        </div>

      </div>
    </section>
  );
};

export default Reviews;