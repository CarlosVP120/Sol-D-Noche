import React, { useEffect, useState } from "react";
import UseAuth from "../custom-hooks/UseAuth";
import { collection, onSnapshot } from "@firebase/firestore";
import { auth, db, provider } from "../Firebase/firebase-config";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser = user;
        if (auth.currentUser.email !== "admin@admin.com") {
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
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-stone-500">Dashboard</h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
