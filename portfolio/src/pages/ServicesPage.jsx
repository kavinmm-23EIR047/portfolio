import React from "react";
import Services from "../components/Services";
import MySkills from "../components/MySkills";
import FAQ from "../components/FAQ";
import Seo from "../components/Seo";

const ServicesPage = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Seo path="/services" />
      <Services headingAs="h1" />
      <MySkills />
      <FAQ />
    </div>
  );
};

export default ServicesPage;
