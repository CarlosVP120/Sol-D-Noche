import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavbarForProducts";
import ProductCard from "../Components/ProductCard";
import LoginModal from "../Components/LoginModal";
import UseAuth from "../custom-hooks/UseAuth";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../Firebase/firebase-config";
import toast, { Toaster } from "react-hot-toast";

const DummyData = [
  {
    name: "Yellow bag",
    price: 100,
    images: ["../images/Bolsa-Amarilla.png"],
    type: "beaded-bags",
    availability: "Available",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
  {
    name: "Necklaces",
    price: 100,
    images: ["../images/Collar.png"],
    type: "necklaces",
    availability: "Available",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
  {
    name: "Pearl necklaces",
    price: 100,
    images: ["../images/image3.png"],
    type: "necklaces",
    availability: "Available",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
  {
    name: "Pink bag",
    price: 100,
    images: ["../images/image4.png"],
    type: "beaded-bags",
    availability: "Sold",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
  {
    name: "Orange bag",
    price: 100,
    images: ["../images/image8.png"],
    type: "beaded-bags",
    availability: "Sold",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
  {
    name: "Sea necklaces",
    price: 100,
    images: ["../images/image10.png"],
    type: "necklaces",
    availability: "Available",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
  {
    name: "Silver bag",
    price: 100,
    images: ["../images/image13.png"],
    type: "beaded-bags",
    availability: "Available",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
  {
    name: "Color necklaces",
    price: 100,
    images: ["../images/image11.png"],
    type: "necklaces",
    availability: "Sold",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
  {
    name: "Blue necklaces",
    price: 100,
    images: ["../images/image12.png"],
    type: "necklaces",
    availability: "Available",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facilis rerum quibusdam architecto aliquid. Aperiam quidem cupiditate, excepturi sit eos facilis a culpa eveniet hic quis neque facere iusto odit odio sequi dolore ab? Quam eaque beatae earum est neque, quia aliquam eveniet quaerat itaque, veritatis vero molestiae facilis aliquid.",
  },
];

const ProductListing = ({ type }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const currentUser = UseAuth();
  const [products, setProducts] = useState([]);
  const productsRef = collection(db, "products");

  // * To get the data from database
  const getData = async () => {
    try {
      onSnapshot(productsRef, (res) => {
        const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProducts(data);
      });

      console.log(products);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      toast.success(`Bienvenido ${currentUser.email}`);
    }
    getData();
  }, []);

  useEffect(() => {
    if (type === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.type === type));
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
      <Toaster />
    </div>
  );
};

export default ProductListing;
