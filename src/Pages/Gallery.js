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
                  See details
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
