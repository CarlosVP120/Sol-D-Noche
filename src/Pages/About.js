import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8" id="about">
      <h1 className="text-4xl font-bold text-yellow-500 mb-4">About Us</h1>
      <p className="text-xl text-gray-600 w-1/2 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan
        nulla non erat luctus, ac eleifend ipsum commodo. Donec fringilla
        malesuada metus nec fringilla.
      </p>
      <div className="flex justify-center mt-4 gap-8">
        <img src="images/image1.png" alt="About" className="w-1/5 rounded-md" />
        <img src="images/image2.png" alt="About" className="w-1/5 rounded-md" />
        <img src="images/image3.png" alt="About" className="w-1/5 rounded-md" />
      </div>
    </div>
  );
};

export default About;
