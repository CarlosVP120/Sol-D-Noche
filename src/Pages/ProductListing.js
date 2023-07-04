import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavbarForProducts";
import ProductCard from "../Components/ProductCard";
import LoginModal from "../Components/LoginModal";
import UseAuth from "../custom-hooks/UseAuth";

const DummyData = [
  {
    name: "Yellow bag",
    price: 100,
    image: "../images/Bolsa-Amarilla.png",
    type: "beaded-bags",
    availability: "Available",
  },
  {
    name: "Necklaces",
    price: 100,
    image: "../images/Collar.png",
    type: "necklaces",
    availability: "Available",
  },
  {
    name: "Pearl necklaces",
    price: 100,
    image: "../images/image3.png",
    type: "necklaces",
    availability: "Available",
  },
  {
    name: "Pink bag",
    price: 100,
    image: "../images/image4.png",
    type: "beaded-bags",
    availability: "Sold",
  },
  {
    name: "Orange bag",
    price: 100,
    image: "../images/image8.png",
    type: "beaded-bags",
    availability: "Sold",
  },
  {
    name: "Sea necklaces",
    price: 100,
    image: "../images/image10.png",
    type: "necklaces",
    availability: "Available",
  },
  {
    name: "Silver bag",
    price: 100,
    image: "../images/image13.png",
    type: "beaded-bags",
    availability: "Available",
  },
  {
    name: "Color necklaces",
    price: 100,
    image: "../images/image11.png",
    type: "necklaces",
    availability: "Sold",
  },
  {
    name: "Blue necklaces",
    price: 100,
    image: "../images/image12.png",
    type: "necklaces",
    availability: "Available",
  },
];

const ProductListing = ({ type }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const currentUser = UseAuth();

  useEffect(() => {
    if (type === "all") {
      setFilteredProducts(DummyData);
    } else {
      setFilteredProducts(DummyData.filter((product) => product.type === type));
    }
  }, [type]);

  return (
    <div className="flex flex-col ">
      <LoginModal open={open} setOpen={setOpen} />
      <Navbar type={type} setOpen={setOpen} currentUser={currentUser} />

      <div className="w-full sm:w-4/5 mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
