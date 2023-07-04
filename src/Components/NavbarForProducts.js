import React from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, provider } from "../Firebase/firebase-config";

const Navbar = ({ type, setOpen, currentUser }) => {
  const logout = async () => {
    try {
      await signOut(auth);
      alert("logout");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-8 md:px-16 py-2 mt-8">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
        <div className="text-2xl font-bold text-stone-300">Sol D Noche</div>
      </div>

      {/* Links in the center */}
      <ul className="hidden sm:flex gap-4 text-xl text-stone-400 font-bold">
        <li>
          <a
            href="/products/beaded-bags"
            className={`p-2 hover:text-stone-100 transition-all duration-300 cursor-pointer
            ${type === "beaded-bags" ? "text-yellow-500" : ""}
            `}
          >
            Beaded Bags
          </a>
        </li>
        <li>
          <a
            href="/products/necklaces"
            className={`p-2 hover:text-stone-100 transition-all duration-300 cursor-pointer
            ${type === "necklaces" ? "text-yellow-500" : ""}
            `}
          >
            Necklaces
          </a>
        </li>
        <li>
          <a
            href="/products/all"
            className={`p-2 hover:text-stone-100 transition-all duration-300 cursor-pointer
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
          className="relative bg-transparent bg-opacity-40 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-yellow-500 rounded-full shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-yellow-500 group-hover:translate-x-0 ease">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-yellow-500 transition-all duration-300 transform group-hover:translate-x-full ease font-bold">
            Cerrar Sesión
          </span>
          <span className="relative invisible">Cerrar Sesión</span>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
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
            Iniciar Sesión
          </span>
          <span className="relative invisible">Iniciar Sesión</span>
        </button>
      )}
    </div>
  );
};

export default Navbar;
