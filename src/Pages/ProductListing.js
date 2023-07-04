import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavbarForProducts";
import ProductCard from "../Components/ProductCard";

const DummyData = [
  {
    name: "Bolsa Amarilla",
    price: 100,
    image: "images/Bolsa-Amarilla.png",
    type: "beaded-bags",
  },
  {
    name: "Collar",
    price: 100,
    image: "images/Collar.png",
    type: "necklaces",
  },
  {
    name: "Bolsa Amarilla",
    price: 100,
    image: "images/Bolsa-Amarilla.png",
    type: "beaded-bags",
  },
];

const ProductListing = ({ type }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (type === "all") {
      setFilteredProducts(DummyData);
    } else {
      setFilteredProducts(DummyData.filter((product) => product.type === type));
    }
  }, [type]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar type={type} />
      {filteredProducts.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default ProductListing;
