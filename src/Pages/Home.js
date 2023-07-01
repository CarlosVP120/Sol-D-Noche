import React from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute w-screen z-10">
        <Navbar />
      </div>

      <video
        className="absolute w-screen h-screen -z-10 object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/videos/sea1.mp4" type="video/mp4" />
      </video>
      <div className="absolute w-screen h-screen bg-black bg-opacity-30 flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold text-white mb-4">
          Sol <span className="text-yellow-500">D</span> Noche
        </h1>
        <p className="text-3xl text-white mb-8">
          Welcome to <span className="font-semibold">Sol D Noche</span>. Explore
          the magic of day and night by the beach.
        </p>
      </div>
    </div>
  );
};

export default Home;
