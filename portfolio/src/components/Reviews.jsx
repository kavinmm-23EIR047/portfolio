import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

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
        console.error("❌ Error fetching reviews:", error);
      }
    };
    fetchFeedback();
  }, []);

  // ⭐ Convert number to star icons
  const renderStars = (rating) => {
    const stars = [];
    const num = parseInt(rating, 10);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= num ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-500" />
        )
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  };

 return (
  <motion.div
    id="reviews"
    className="py-16 px-4 md:px-10 bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <motion.h2
      className="text-center text-3xl md:text-5xl font-extrabold mb-10 flex items-center justify-center gap-3"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <img
        src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
        alt="Google"
        className="w-8 h-8"
      />
      <span>
        Google <span className="text-blue-500">Reviews</span>
      </span>
    </motion.h2>



      {reviews.length > 0 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold shadow-md">
                    {review.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{review.name}</h4>
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-300 italic line-clamp-5">{review.comment}</p>
                <p className="text-right mt-4 text-xs text-gray-500">
                  {review.date
                    ? new Date(review.date).toLocaleDateString()
                    : "Date not available"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-400">No reviews available.</p>
      )}

      <div className="text-center mt-6">
        <a
          href="https://www.google.com/search?q=memories+platform+tiruppur&hl=en#lrd=0x3ba90f4c145601e7:0x96e8b5c54ab3379,1,,,"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          View all on Google →
        </a>
      </div>
    </motion.div>
  );
};

export default Reviews;
