import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center px-4 py-2 mt-8">
      {/* <div className="text-2xl font-bold text-stone-300">Sol D Noche</div> */}
      <ul className="flex gap-4 text-xl text-stone-300">
        <li>
          <a href="#" className="p-2 hover:font-semibold ">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="p-2 hover:font-semibold">
            About
          </a>
        </li>
        <li>
          <a href="#" className="p-2 hover:font-semibold">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="p-2 hover:font-semibold">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
