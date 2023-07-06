import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Products from "./Pages/Products";
import ProductListing from "./Pages/ProductListing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/DashboardPage";
import Success from "./Pages/Success";
import { ChakraProvider } from "@chakra-ui/react";

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
    element: <ProductListing type="Beaded Bags" />,
  },
  {
    path: "/products/necklaces",
    element: <ProductListing type="Necklaces" />,
  },
  {
    path: "/products/all",
    element: <ProductListing type="all" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/success",
    element: <Success />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
