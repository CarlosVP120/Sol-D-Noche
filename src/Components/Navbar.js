import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-8 md:px-16 py-2 mt-8">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full">
          <img src="/images/logo1.png" alt="logo" className="w-full h-full" />
        </div>
        <img
          src="/images/sol-d-noche-white.png"
          alt="logo"
          className="w-32 sm:w-40 lg:w-48"
        />
        {/* <div className="text-2xl font-bold text-stone-300">Sol D Noche</div> */}
      </div>

      {/* Links in the center */}
      <ul className="hidden sm:flex gap-4 text-xl text-stone-400 font-bold">
        <li>
          <button
            onClick={() => {
              document
                .getElementById("home")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="p-2 hover:text-stone-100 transition-all duration-300 cursor-pointer"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="p-2 hover:text-stone-100 transition-all duration-300 cursor-pointer"
          >
            About
          </button>
        </li>
        {/* <li className="flex items-center justify-center">
          <a
            href="/products"
            className="p-2 hover:text-stone-100 transition-all duration-300 cursor-pointer"
          >
            Products
          </a>
        </li> */}
        <li>
          <button
            onClick={() => {
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="p-2 hover:text-stone-100 transition-all duration-300 cursor-pointer"
          >
            Contact
          </button>
        </li>
      </ul>

      {/* Contact Button */}
      <a
        href="/products"
        className="relative bg-transparent bg-opacity-40 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-yellow-500 rounded-full shadow-md group"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-yellow-500 group-hover:translate-x-0 ease">
          <svg
            className="w-6 h-6"
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
        <span className="absolute flex items-center justify-center w-full h-full text-yellow-500 transition-all duration-300 transform group-hover:translate-x-full ease">
          Products
        </span>
        <span className="relative invisible">Productos</span>
      </a>
    </div>
  );
};

export default Navbar;
