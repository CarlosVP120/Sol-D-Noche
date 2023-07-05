import React, { useEffect, useState } from "react";
import UseAuth from "../custom-hooks/UseAuth";
import { collection, onSnapshot } from "@firebase/firestore";
import { auth, db, provider } from "../Firebase/firebase-config";
import Dashboard from "../Components/Dashboard";
import DashboardNavbar from "../Components/DashboardNavbar";
import NewProduct from "../Components/NewProduct";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  const [showingComponent, setShowingComponent] = useState("Dashboard");

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser = user;
        if (auth.currentUser.email == "admin@admin.com") {
          setLoading(false);
        } else {
          window.location.href = "/";
        }
      } else {
        auth.currentUser = null;
        window.location.href = "/";
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-white">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <>
          <DashboardNavbar
            showingComponent={showingComponent}
            setShowingComponent={setShowingComponent}
          />
          {showingComponent === "Dashboard" ? (
            <Dashboard />
          ) : showingComponent === "NewProduct" ? (
            <NewProduct />
          ) : null}
        </>
      )}
    </>
  );
};

export default DashboardPage;
