import React from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  return (
    <div className="h-screen relative overflow-hidden bg-black" id="home">
      <div className="absolute w-screen z-30">
        <Navbar />
      </div>

      <video
        className={`absolute w-screen h-screen z-10 object-cover transition-all duration-500 bg-black ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="/videos/sea1.mp4" type="video/mp4" />
      </video>
      <div className="absolute w-screen h-screen bg-black bg-opacity-30 flex flex-col justify-center items-center z-20">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4">
          Sol <span className="text-yellow-500">D</span> Noche
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl text-white text-center max-w-lg mb-8">
          Welcome to <span className="font-semibold">Sol D Noche</span>. Explore
          the magic of day and night by the beach.
        </p>
      </div>
    </div>
  );
};

export default Home;
