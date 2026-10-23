import React from "react";
import Portfolio from "../components/Portfolio";
import Reviews from "../components/Reviews";
import Seo from "../components/Seo";

const ProductsPage = () => {
  return (
    <div className="bg-[#0057FF] min-h-screen">
      <Seo path="/products" />
      <Portfolio headingAs="h1" />
      <div className="bg-[#F1F5F9]">
        <Reviews />
      </div>
    </div>
  );
};

export default ProductsPage;
