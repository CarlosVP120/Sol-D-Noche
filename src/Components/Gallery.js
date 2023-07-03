import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const images = [
    {
      src: "/images/image1.png",
      alt: "Gallery",
    },
    {
      src: "/images/image2.png",
      alt: "Gallery",
    },
    {
      src: "/images/image3.png",
      alt: "Gallery",
    },
    {
      src: "/images/image4.png",
      alt: "Gallery",
    },
    {
      src: "/images/image5.png",
      alt: "Gallery",
    },
    {
      src: "/images/image6.png",
      alt: "Gallery",
    },
    {
      src: "/images/image7.png",
      alt: "Gallery",
    },
    {
      src: "/images/image8.png",
      alt: "Gallery",
    },
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const interval = setInterval(() => {
      slider.slickNext();
    }, 6000); // slide duration

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    nextArrow: (
      <div>
        <div className="flex text-black">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 hover:text-yellow-500 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="flex text-black">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 hover:text-yellow-500 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full pt-8" id="gallery">
      <div className="w-9/12 sm:w-11/12 mx-auto my-8">
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full transition duration-300 ease-in-out transform hover:scale-105"
              />

              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-75 transition-opacity">
                <div className="flex items-center justify-center h-full">
                  <button className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    See More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
