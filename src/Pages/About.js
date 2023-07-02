import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8" id="about">
      <h1 className="text-4xl font-bold text-yellow-500 mb-4">About Us</h1>
      <p className="text-xl text-gray-600 w-1/2 text-center">
        Welcome to our online store! We are passionate about crafting handmade
        bead and gemstone accessories, including bags and necklaces. Each piece
        is meticulously created, showcasing the natural beauty of beads and
        mineralized stones. Discover unique designs, high-quality materials, and
        timeless elegance. Explore our collection and embrace the artistry of
        handmade creations.
      </p>
      {/* <div className="flex justify-center mt-4 gap-8">
        <img src="images/image1.png" alt="About" className="w-1/5 rounded-md" />
        <img src="images/image2.png" alt="About" className="w-1/5 rounded-md" />
        <img src="images/image3.png" alt="About" className="w-1/5 rounded-md" />
      </div> */}
    </div>
  );
};

export default About;
