import React, { useEffect } from "react";

const CheckoutLoading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center animate-appear fixed top-0 left-0 z-[100] bg-black bg-opacity-50 ">
      {/* Spinning green circle */}
      <div className="w-20 h-20 rounded-full border-3 border-green-500 border-t-4 border-b-1 animate-spin"></div>
    </div>
  );
};

export default CheckoutLoading;
