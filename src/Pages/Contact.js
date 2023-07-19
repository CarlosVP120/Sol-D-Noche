import React from "react";

const Contact = () => {
  return (
    <div className="bg-white pt-12 pb-16" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-tertiary text-center mb-6 font-[Aboreto]">
          Contact
        </h1>
        <div className="flex flex-col items-center">
          <div className="sm:w-1/2">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-center gap-16">
                <a
                  href="https://www.instagram.com/soldnocheaccents/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram text-6xl lg:text-8xl text-pink-500 hover:text-pink-600 transition-all duration-300 transform hover:scale-110"></i>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook text-6xl lg:text-8xl text-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"></i>
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp text-6xl lg:text-8xl text-green-500 hover:text-green-600 transition-all duration-300 transform hover:scale-110"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Go to products button */}
      <div className="flex justify-center mt-16">
        <a
          href="/products"
          className="relative bg-transparent bg-opacity-40 inline-flex items-center justify-center px-16 py-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-secondary rounded-full shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-secondary group-hover:translate-x-0 ease">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex text-2xl items-center justify-center w-full h-full text-secondary transition-all duration-300 transform group-hover:translate-x-full ease">
            Go to products
          </span>
          <span className="relative invisible">Productos</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
