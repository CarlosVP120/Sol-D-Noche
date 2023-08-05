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

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleAudio = () => {
    const audioElement = document.getElementById("sound");
    if (audioElement) {
      audioElement.volume = 0.2; // Set the volume of the audio element
      if (isMuted) {
        audioElement.play().catch((error) => {
          console.error("Error while trying to play audio:", error);
        });
      } else {
        audioElement.pause();
      }
    }
  };

  return (
    <div>
      <div
        className={`flex items-center justify-between px-4 sm:px-8 md:px-16 pt-6 sm:py-6 sticky top-0 bg-[#f5f5f5] z-10 transition-all duration-300 ${
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
              className={`p-2 hover:text-secondary transition-all duration-300 cursor-pointer
            ${type === "Beaded Bags" ? "text-secondary" : ""}
            `}
            >
              Beaded Bags
            </a>
          </li>
          <li>
            <a
              href="/products/jewelry"
              className={`p-2 hover:text-secondary transition-all duration-300 cursor-pointer
            ${type === "Necklaces" ? "text-secondary" : ""}
            `}
            >
              Jewelry
            </a>
          </li>
          <li>
            <a
              href="/products/all"
              className={`p-2 hover:text-secondary transition-all duration-300 cursor-pointer
            ${type === "all" ? "text-secondary" : ""}
            `}
            >
              All
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* <div className="flex items-center">
            <button
              onClick={() => {
                toggleMute();
                handleAudio();
              }}
              className="text-black hover:text-secondary transition-all duration-300 cursor-pointer"
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              )}
            </button>
          </div>

 
          <audio id="sound" loop>
            <source src="/audios/sea.mp3" type="audio/mpeg" />
          </audio>{" "}
          */}

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
                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                    <span className="relative">Dashboard</span>
                  </span>
                  <span
                    className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0"
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
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                  <span className="relative">Logout</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0"
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
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                <span className="relative">Login</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0"
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
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
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
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-secondary rounded-full text-white flex items-center justify-center">
                    {cartLength}
                  </div>
                </span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
          )}
        </div>
        <Toaster />
      </div>
      {/* Links in the center */}
      <ul className="sm:hidden flex flex-row items-center justify-center gap-4 text-xl text-stone-600 font-bold mt-16">
        <li>
          <a
            href="/products/beaded-bags"
            className={`px-2 hover:text-secondary transition-all duration-300 cursor-pointer
            ${type === "Beaded Bags" ? "text-secondary" : ""}
            `}
          >
            Beaded Bags
          </a>
        </li>
        <li>
          <a
            href="/products/jewelry"
            className={`px-2 hover:text-secondary transition-all duration-300 cursor-pointer
            ${type === "Necklaces" ? "text-secondary" : ""}
            `}
          >
            Jewelry
          </a>
        </li>
        <li>
          <a
            href="/products/all"
            className={`px-2 hover:text-secondary transition-all duration-300 cursor-pointer
            ${type === "all" ? "text-secondary" : ""}
            `}
          >
            All
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
