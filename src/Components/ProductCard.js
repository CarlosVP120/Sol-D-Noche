import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-lg m-4 shadow-md p-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <img src={product.image} alt={product.name} className="w-full h-96" />
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
  );
};

export default ProductCard;
