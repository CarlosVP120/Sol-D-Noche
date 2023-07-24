import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import CheckoutLoading from "./CheckoutLoading";

export default function Cart({
  open,
  setOpen,
  cartItems,
  setCartItems,
  currentUser,
}) {
  const cancelButtonRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const removeFromCart = (product) => {
    const newCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(newCartItems);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );

  const showToast = () => {
    toast.error("You must be logged in to checkout");
  };

  const checkout = async () => {
    setLoading(true);

    await fetch("https://soldnoche-server.onrender.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.assign(data.url);
        }
      });
  };

  return (
    <>
      {loading && <CheckoutLoading />}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </Dialog.Overlay>
            </Transition.Child>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:w-1/3">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Shopping Cart
                      </Dialog.Title>
                      <div className="mt-2">
                        {cartItems.length === 0 ? (
                          <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                          <div className="space-y-2">
                            {cartItems.map((product) => (
                              <div
                                key={product.id}
                                className="flex justify-between border-b border-gray-200 py-2 sm:py-4"
                              >
                                <div className="flex items-center space-x-4">
                                  <img
                                    className="h-12 w-12 object-cover rounded-lg"
                                    src={product.images[0]}
                                    alt={product.name}
                                  />
                                  <div>
                                    <p className="text-gray-900 font-medium">
                                      {product.name}
                                    </p>
                                    <p className="text-gray-500 font-medium flex justify-start items-center">
                                      ${product.price}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => removeFromCart(product)}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <div className="flex justify-between items-center border-b border-gray-200 py-2">
                              <p className="font-medium">Total:</p>
                              <p className="font-bold">${totalPrice}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* If current user is logged out dont permit checkout else permit checkout */}
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {cartItems.length === 0 || !currentUser ? (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={showToast}
                    >
                      Checkout
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={checkout}
                    >
                      Checkout
                    </button>
                  )}
                  {/* <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>{" "} */}
                  {/* Close button */}
                  <div className="absolute top-0 right-0 p-4">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-600 transition-all duration-300"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#000000"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
