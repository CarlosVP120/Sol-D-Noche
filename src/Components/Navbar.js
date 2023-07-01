import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center px-4 py-2 mt-8 min-w-screen">
      <ul className="flex gap-4 text-xl text-stone-400 font-bold">
        <li>
          <a href="#" className="p-2 hover:text-stone-100">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="p-2 hover:text-stone-100">
            About
          </a>
        </li>
        <li>
          <a href="#" className="p-2 hover:text-stone-100">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="p-2 hover:text-stone-100">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
