import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

const googleLogo =
  "https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/feedback`
        );
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchFeedback();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const num = parseInt(rating, 10);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= num ? (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ) : (
          <FaRegStar key={i} className="text-gray-400 dark:text-gray-500 text-sm" />
        )
      );
    }

    return <div className="flex gap-1 mt-1">{stars}</div>;
  };

  return (
    <section
      id="reviews"
      className="relative py-20 px-5 bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sky-500 uppercase tracking-[4px] text-sm mb-3">
            Client Trust
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Google{" "}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              Reviews
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-sm">
            Trusted by clients through quality delivery and innovation.
          </p>
        </motion.div>

        {reviews.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="
                  rounded-2xl p-6 min-h-[260px] flex flex-col justify-between
                  bg-white/70 dark:bg-white/5
                  backdrop-blur-xl
                  border border-black/10 dark:border-white/10
                  shadow-lg hover:shadow-sky-500/20
                  transition
                  "
                >
                  {/* Top */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center font-semibold">
                        {review.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.name}
                        </h4>
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <div className="bg-white rounded-full p-2 shadow-md">
                      <img src={googleLogo} alt="Google" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Text */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-7 italic flex-1">
                    “{review.comment}”
                  </p>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 flex justify-between text-xs text-gray-500">
                    <span>Verified Google Review</span>
                    <span>
                      {review.date
                        ? new Date(review.date).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No reviews available.
          </p>
        )}

        {/* Button */}
        <div className="text-center mt-10">
          <a
            href="https://g.co/kgs/d1NUPo4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            View all on Google →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;