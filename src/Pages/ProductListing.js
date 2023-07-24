import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavbarForProducts";
import ProductCard from "../Components/ProductCard";
import LoginModal from "../Components/LoginModal";
import UseAuth from "../custom-hooks/UseAuth";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../Firebase/firebase-config";
import toast, { Toaster } from "react-hot-toast";
import Cart from "../Components/Cart";

const ProductListing = ({ type }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const currentUser = UseAuth();
  const [products, setProducts] = useState([]);
  const productsRef = collection(db, "products");

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // * To get the data from database
  const getData = async () => {
    try {
      onSnapshot(productsRef, (res) => {
        const data = [];
        res.forEach((doc) => {
          data.push(doc.data());
        });

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
  }, [type, products]);

  const cartLength = cartItems.length;

  return (
    <div className="flex flex-col bg-[#f5f5f5] min-h-screen">
      <LoginModal open={open} setOpen={setOpen} />
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
        currentUser={currentUser}
      />
      <Navbar
        type={type}
        setOpen={setOpen}
        currentUser={currentUser}
        setOpenCart={setCartOpen}
        cartLength={cartLength}
      />

      <div className="w-full sm:w-4/5 mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {filteredProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.name}
              cartItems={cartItems}
              setCartItems={setCartItems}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductListing;
