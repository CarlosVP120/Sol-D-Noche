import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, provider } from "../Firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default function Example({ open, setOpen, product }) {
  const cancelButtonRef = useRef(null);

  const [currentImage, setCurrentImage] = useState(product.images[0]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto w-screen h-screen">
          <div className="flex min-h-full h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 w-[45%]">
                <div className="bg-white px-4 py-5 flex w-full">
                  {/* Image of 1/2 */}
                  <div className="flex flex-col w-1/2 justify-center ">
                    <img
                      className="h-full max-h-[60vh] object-cover rounded-lg"
                      src={currentImage}
                      alt={product.name}
                    />
                    {/* Images to select */}
                    <div className="flex justify-center items-center space-x-2 mt-3">
                      {/* PrevArrow */}
                      {product.images.length > 1 && (
                        <div
                          className="rounded-full h-4 w-4 bg-white cursor-pointer"
                          onClick={() =>
                            setCurrentImage(
                              setCurrentImage(
                                product.images[
                                  product.images.indexOf(currentImage) - 1
                                ] || product.images[product.images.length - 1]
                              )
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.707 4.293a1 1 0 010 1.414L7.414 9H15a1 1 0 110 2H7.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      {/* Images */}
                      {product.images.map((image) => (
                        <img
                          className="h-20 object-cover rounded-lg cursor-pointer"
                          src={image}
                          alt={product.name}
                          onClick={() => setCurrentImage(image)}
                        />
                      ))}
                      {/* NextArrow */}
                      {product.images.length > 1 && (
                        <div
                          className="rounded-full h-4 w-4 bg-white cursor-pointer"
                          onClick={() =>
                            // Find the positon of the current image and add 1 to it, but only if it exists
                            setCurrentImage(
                              product.images[
                                product.images.indexOf(currentImage) + 1
                              ] || product.images[0]
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 010-2h7.586l-3.293-3.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/2 flex-col p-4 justify-between pb-24">
                    {/* Close button */}
                    <div className="absolute top-0 right-0 p-4">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-600 transition-all duration-300"
                        onClick={() => setOpen(false)}
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

                    <h1 className="text-4xl font-bold text-gray-800 text-left">
                      {product.name}
                      <div className="w-1/2 h-1 bg-gray-200 rounded-full mt-4"></div>
                      <span className="text-2xl text-stone-500">
                        {product.type
                          .split("-")
                          .join(" ")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                    </h1>
                    {/* Divider */}

                    <p className="text-gray-600 text-left text-xl">
                      {product.description}
                      {/* Divider */}
                      <div className="w-1/2 h-1 bg-gray-200 rounded-full my-4"></div>
                    </p>

                    <div className="flex flex-row justify-between items-center border-y-2 border-gray-200 py-4">
                      <h2 className="text-gray-600 text-left text-2xl">
                        ${product.price}.00 MXN
                      </h2>
                      <div className="text-gray-600 text-left text-2xl flex flex-row justify-between items-center gap-2">
                        <p className="text-gray-600 text-left">
                          {product.availability}
                        </p>
                        <div
                          className={`rounded-full h-4 w-4 ${
                            product.availability === "Sold"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                      </div>
                    </div>

                    {/* Buttons to buy, add to cart, and share */}

                    <div className="flex flex-row justify-center gap-5 items-center">
                      {product.availability !== "Sold" && (
                        <>
                          <button className="w-1/3 flex justify-center items-center gap-1 bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-stone-600 transition-all duration-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>
                            Buy
                          </button>
                          <button className="w-1/3 flex justify-center items-center gap-1 bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-stone-600 transition-all duration-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              />
                            </svg>
                            Add to cart
                          </button>
                        </>
                      )}
                      <button className="w-1/3 flex justify-center items-center gap-1 bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-stone-600 transition-all duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                          />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
