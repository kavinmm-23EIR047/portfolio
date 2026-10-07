import React from "react";
import Services from "../components/Services";
import MySkills from "../components/MySkills";
import FAQ from "../components/FAQ";

const ServicesPage = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Services />
      <MySkills />
      <FAQ />
    </div>
  );
};

export default ServicesPage;
