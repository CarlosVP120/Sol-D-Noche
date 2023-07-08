import React from "react";

const Products = () => {
  const [purseSelected, setPurseSelected] = React.useState(false);
  const [necklaceSelected, setNecklaceSelected] = React.useState(false);
  const [middleLineAnimated, setMiddleLineAnimated] = React.useState(false);
  const [leftImageLoaded, setLeftImageLoaded] = React.useState(false);
  const [rightImageLoaded, setRightImageLoaded] = React.useState(false);

  return (
    <div className="w-screen h-screen flex flex-col sm:flex-row overflow-hidden">
      {/* Left Container */}
      <div className="h-1/2 sm:w-1/2 sm:h-full flex justify-center items-center">
        <img
          src="images/Bolsa-Amarilla.png"
          alt="Bolsa Amarilla"
          className={`h-full w-full object-cover transition-all duration-300 ${
            leftImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLeftImageLoaded(true)}
        />

        {/* Black Overlay and Text */}
        <a
          href="/products/beaded-bags"
          className={`opacity-100 sm:opacity-0 absolute h-1/2 sm:w-1/2 sm:h-full flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 hover:opacity-100 transition-all duration-300 ${
            purseSelected ? "opacity-100 !important" : ""
          }`}
        >
          <h1 className=" text-xl sm:text-5xl lg:text-6xl font-bold mb-4 font-[Aboreto]">
            Beaded Bags
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white w-4/5 sm:w-3/5 md:w-1/2 text-center">
            Find the perfect purse for you. We have a wide variety of beach
            purses, casual purses, night purses, and more.
          </p>
        </a>
      </div>

      {/* Right Container */}
      <div className="h-1/2 sm:w-1/2 sm:h-full flex justify-center items-center">
        <img
          src="images/Collar.png"
          alt="Bolsa Amarilla"
          className={`h-full w-full object-cover transition-all duration-300 ${
            rightImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setRightImageLoaded(true)}
        />

        {/* Black Overlay and Text */}
        <a
          href="/products/necklaces"
          className={`opacity-100 sm:opacity-0 absolute h-1/2 sm:w-1/2 sm:h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-50  hover:opacity-100 transition-all duration-300 ${
            necklaceSelected ? "opacity-100 !important" : ""
          }`}
        >
          <h1 className="text-xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center font-[Aboreto]">
            Necklaces
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white w-4/5 sm:w-3/5 md:w-1/2 text-center">
            Find the perfect necklace for you. We have a wide variety of beach
            necklaces, casual necklaces, night necklaces, and more.
          </p>
        </a>
      </div>

      {/*  Button in the center*/}
      <a
        href="/products/all"
        className="absolute z-20 flex justify-center items-center left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black text-xl font-bold w-24 h-24 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
        onMouseEnter={() => {
          setPurseSelected(true);
          setNecklaceSelected(true);
          setMiddleLineAnimated(true);
        }}
        onMouseLeave={() => {
          setPurseSelected(false);
          setNecklaceSelected(false);
          setMiddleLineAnimated(false);
        }}
      >
        All
      </a>

      {/* Vertical Middle Line */}
      <div
        className={`hidden sm:flex absolute h-1 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 rotate-90 z-10 rounded-full ${
          middleLineAnimated ? "w-1/2" : "w-0"
        }`}
      ></div>

      {/* Horizontal Middle Line */}
      <div
        className={`sm:hidden absolute h-1 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 rounded-full ${
          middleLineAnimated ? "w-[95vw]" : "w-0"
        }`}
      ></div>
    </div>
  );
};

export default Products;
