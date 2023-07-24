import React, { useState } from "react";

const Navbar = () => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleAudio = () => {
    const audioElement = document.getElementById("sound");
    if (audioElement) {
      audioElement.volume = 0.5; // Set the volume of the audio element
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
    <div className="flex items-center justify-between px-4 sm:px-8 md:px-16 py-2 mt-8">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full">
          <img src="/images/logo1.png" alt="logo" className="w-full h-full" />
        </div>
        <img
          src="/images/sol-d-noche-white.png"
          alt="logo"
          className="w-32 sm:w-40 lg:w-48 hidden sm:block"
        />
        {/* <div className="text-2xl font-bold text-stone-300">Sol D Noche</div> */}
      </div>

      {/* Links in the center */}
      <ul className="hidden sm:flex gap-4 text-xl text-stone-300 font-bold">
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

      {/* Mute sound button */}
      <div className="flex items-center gap-1 sm:gap-4">
        <button
          onClick={() => {
            toggleMute();
            handleAudio();
          }}
          className="p-2 text-stone-300 hover:text-stone-100 transition-all duration-300 cursor-pointer"
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
          )}{" "}
        </button>

        {/* Audio element */}
        <audio id="sound" loop>
          <source src="/audios/sea.mp3" type="audio/mpeg" />
        </audio>

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
    </div>
  );
};

export default Navbar;
