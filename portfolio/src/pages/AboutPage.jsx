import React from "react";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import TrustedPartners from "../components/TrustedPartners";

const AboutPage = () => {
  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <About />
      <TrustedPartners />
      <WhyChooseUs />
    </div>
  );
};

export default AboutPage;
