import React from "react";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: (
      <div>
        <div className="text-black">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-yellow-500 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="text-black left-0">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-yellow-500 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
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
    <div className="w-fullpy-8" id="gallery">
      <Slider {...settings} className="w-11/12 mx-auto my-8">
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
  );
};

export default Gallery;
