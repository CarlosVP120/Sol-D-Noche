import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center">
        <div>
          <p>
            &copy; {new Date().getFullYear()} Sol D Noche. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
