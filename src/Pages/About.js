import React from "react";
import Gallery from "../Components/Gallery";

const About = () => {
  return (
    <div
      className="bg-white flex flex-col items-center justify-center py-12"
      id="about"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-tertiary mb-12 font-[Aboreto]">
        About Us
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 w-4/5 sm:w-3/5 md:w-1/2 text-center">
        Welcome to our online store! We are passionate about crafting handmade
        bead and gemstone accessories, including bags and necklaces. Each piece
        is meticulously created, showcasing the natural beauty of beads and
        mineralized stones. Discover unique designs, high-quality materials, and
        timeless elegance. Explore our collection and embrace the artistry of
        handmade creations.
      </p>
      <Gallery />
    </div>
  );
};

export default About;
