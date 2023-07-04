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
        {/* <div>
          <ul className="flex flex-wrap space-x-4">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#customer-love">Customer Love</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
