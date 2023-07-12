import React from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  return (
    <div className="h-screen relative overflow-hidden bg-black " id="home">
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
        <source src="/videos/sea3.mp4" type="video/mp4" />
      </video>
      <div className="absolute w-screen h-screen bg-black bg-opacity-30 flex flex-col justify-center items-center z-20">
        <img
          src="/images/sol-d-noche-15.png"
          alt="logo"
          className="w-11/12 sm:w-1/2"
        />
      </div>
    </div>
  );
};

export default Home;
