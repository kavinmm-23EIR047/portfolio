import React from "react";
import Portfolio from "../components/Portfolio";
import Reviews from "../components/Reviews";

const ProductsPage = () => {
  return (
    <div className="bg-[#0057FF] min-h-screen">
      <Portfolio />
      <div className="bg-[#F1F5F9]">
        <Reviews />
      </div>
    </div>
  );
};

export default ProductsPage;
