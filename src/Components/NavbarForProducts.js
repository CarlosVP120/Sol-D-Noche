import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import toast, { Toaster } from "react-hot-toast";

const Navbar = ({ type, setOpen, currentUser, setOpenCart, cartLength }) => {
  // On scroll, add shadow to navbar

  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 1) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-8 md:px-16 py-6 sticky top-0 bg-[#f5f5f5] z-10 transition-all duration-300 ${
        scroll ? "shadow-md" : ""
      }`}
    >
      {/* Logo */}
      <a className="flex items-center gap-4 flex-col sm:flex-row" href="/">
        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full">
          <img src="/images/logo2.png" alt="logo" className="w-full h-full" />
        </div>
        {/* <div className="text-2xl font-bold text-stone-500">Sol D Noche</div> */}
        <img
          src="/images/sol-d-noche-blue.png"
          alt="logo"
          className="w-20 sm:w-40 lg:w-48"
        />
      </a>

      {/* Links in the center */}
      <ul className="hidden sm:flex gap-4 text-xl text-stone-600 font-bold">
        <li>
          <a
            href="/products/beaded-bags"
            className={`p-2 hover:text-yellow-400 transition-all duration-300 cursor-pointer
            ${type === "Beaded Bags" ? "text-yellow-500" : ""}
            `}
          >
            Beaded Bags
          </a>
        </li>
        <li>
          <a
            href="/products/necklaces"
            className={`p-2 hover:text-yellow-400 transition-all duration-300 cursor-pointer
            ${type === "Necklaces" ? "text-yellow-500" : ""}
            `}
          >
            Necklaces
          </a>
        </li>
        <li>
          <a
            href="/products/all"
            className={`p-2 hover:text-yellow-400 transition-all duration-300 cursor-pointer
            ${type === "all" ? "text-yellow-500" : ""}
            `}
          >
            All
          </a>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {/* Contact Button */}
        {currentUser ? (
          <div className="flex items-center gap-4">
            {currentUser.email === "admin@admin.com" && (
              <a
                href="/dashboard"
                className="relative inline-block text-lg group"
              >
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-500 group-hover:-rotate-180 ease"></span>
                  <span className="relative">Dashboard</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-yellow-500 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </a>
            )}
            <button
              onClick={logout}
              className="relative inline-block text-lg group"
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-500 group-hover:-rotate-180 ease"></span>
                <span className="relative">Logout</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-yellow-500 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
          </div>
        ) : (
          <button
            className="relative inline-block text-lg group"
            onClick={() => setOpen(true)}
          >
            <span className="relative z-10 block px-3 sm:px-5 py-3 overflow-hidden text-sm sm:text-base font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-500 group-hover:-rotate-180 ease"></span>
              <span className="relative">Login</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-yellow-500 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </button>
        )}

        {/* Cart Button */}
        {/* If the admin is logged in, don't show the cart button */}
        {currentUser && currentUser.email === "admin@admin.com" ? null : (
          <button
            className="relative inline-block text-lg group"
            onClick={() => setOpenCart(true)}
          >
            <span className="relative z-10 block px-2 sm:px-5 py-3 overflow-hidden text-sm sm:text-base font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-500 group-hover:-rotate-180 ease"></span>
              <span className="relative flex flex-row items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-500 rounded-full text-white flex items-center justify-center">
                  {cartLength}
                </div>
              </span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-yellow-500 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
