import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Products from "./Pages/Products";
import ProductListing from "./Pages/ProductListing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";

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
    path: "/products/beaded-bags",
    element: <ProductListing type="beaded-bags" />,
  },
  {
    path: "/products/necklaces",
    element: <ProductListing type="necklaces" />,
  },
  {
    path: "/products/all",
    element: <ProductListing type="all" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
