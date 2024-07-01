import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-main-bg bg-cover bg-center min-h-screen flex flex-col">
      <Header />
      <Hero />
    </div>
  );
};

export default LandingPage;
