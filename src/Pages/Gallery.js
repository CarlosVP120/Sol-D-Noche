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
      src: "/images/image1.png",
      alt: "Gallery",
    },
    {
      src: "/images/image1.png",
      alt: "Gallery",
    },
    {
      src: "/images/image1.png",
      alt: "Gallery",
    },
    {
      src: "/images/image1.png",
      alt: "Gallery",
    },
    {
      src: "/images/image1.png",
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
          <div key={index} className="p-0.5">
            <img
              src={image.src}
              alt={image.alt}
              className="mx-auto w-full h-auto rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery;
