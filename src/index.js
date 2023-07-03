import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Products from "./Pages/Products";
import ProductListing from "./Pages/ProductListing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/bolsas",
    element: <ProductListing type="bolsas" />,
  },
  {
    path: "/products/collares",
    element: <ProductListing type="collares" />,
  },
  {
    path: "/products/all",
    element: <ProductListing type="all" />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
