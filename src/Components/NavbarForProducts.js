import React, { useState } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, provider } from "../Firebase/firebase-config";

const Navbar = ({ type, setOpen, currentUser }) => {
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
      alert("logout");
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
      <a className="flex items-center gap-4" href="/">
        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
        <div className="text-2xl font-bold text-stone-500">Sol D Noche</div>
      </a>

      {/* Links in the center */}
      <ul className="hidden sm:flex gap-4 text-xl text-stone-600 font-bold">
        <li>
          <a
            href="/products/beaded-bags"
            className={`p-2 hover:text-yellow-400 transition-all duration-300 cursor-pointer
            ${type === "beaded-bags" ? "text-yellow-500" : ""}
            `}
          >
            Beaded Bags
          </a>
        </li>
        <li>
          <a
            href="/products/necklaces"
            className={`p-2 hover:text-yellow-400 transition-all duration-300 cursor-pointer
            ${type === "necklaces" ? "text-yellow-500" : ""}
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

      {/* Contact Button */}
      {currentUser ? (
        <button
          onClick={logout}
          className="relative inline-block text-lg group"
        >
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-500 group-hover:-rotate-180 ease"></span>
            <span className="relative">Cerrar Sesión</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-yellow-500 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </button>
      ) : (
        <button
          className="relative inline-block text-lg group"
          onClick={() => setOpen(true)}
        >
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-500 group-hover:-rotate-180 ease"></span>
            <span className="relative">Iniciar Sesión</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-yellow-500 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </button>
      )}
    </div>
  );
};

export default Navbar;
