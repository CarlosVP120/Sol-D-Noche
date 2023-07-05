import React, { useState } from "react";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProductModal open={open} setOpen={setOpen} product={product} />
      <div
        className="rounded-lg m-4 shadow-md p-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          // Make the images responsive and not squezed or stretched in all screen sizes
          className="w-full h-[30vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh]  object-cover rounded-lg"
        />
        <div className="flex flex-row mt-1 justify-between items-center">
          <h2 className="text-gray-600">{product.name}</h2>
          <p className="text-gray-600">{product.price} MXN</p>
        </div>

        {product.availability === "Sold" && (
          <div className="flex flex-row justify-between items-center">
            <p className="text-red-500">{product.availability}</p>
            <div className="rounded-full h-4 w-4 bg-red-500"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
