import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomeSlider = () => {
  const slides = [
    { mobileSrc: "cosmetices1.png", desktopSrc: "cosmetices1.png", alt: "Slide 1" },
    { mobileSrc: "garments4.png", desktopSrc: "garments4.png", alt: "Slide 2" },
    { mobileSrc: "Jewellry1.png", desktopSrc: "Jewellry1.png", alt: "Slide 3" },
    { mobileSrc: "mobile3.png", desktopSrc: "mobile3.png", alt: "Slide 4" },
    { mobileSrc: "Sunglasses1.png", desktopSrc: "Sunglasses1.png", alt: "Slide 5" },
    { mobileSrc: "bags.png", desktopSrc: "bags.png", alt: "Slide 6" },
    { mobileSrc: "cosmetices2.png", desktopSrc: "cosmetices2.png", alt: "Slide 7" },
   { mobileSrc: "garments3.png", desktopSrc: "garments3.png", alt: "Slide 8" },
    { mobileSrc: "garments5.png", desktopSrc: "garments5.png", alt: "Slide 9" },
    { mobileSrc: "mobile2.png", desktopSrc: "mobile2.png", alt: "Slide 10" },
    { mobileSrc: "Jewellry2.png", desktopSrc: "Jewellry2.png", alt: "Slide 11" },
    { mobileSrc: "garments7.png", desktopSrc: "garments7.png", alt: "Slide 12" },
    { mobileSrc: "Sunglasses2.png", desktopSrc: "Sunglasses2.png", alt: "Slide 13" },
    { mobileSrc: "bags1.png", desktopSrc: "bags1.png", alt: "Slide 14" },
    { mobileSrc: "garments8.png", desktopSrc: "garments8.png", alt: "Slide 15" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className='flex justify-center items-center text-center'>
      <div className="relative w-full overflow-hidden z-10 h-full">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative">
              <picture>
                <source media="(min-width: 768px)" srcSet={slide.desktopSrc} />
                <img
                  className="h-full w-full object-cover"
                  src={slide.mobileSrc}
                  alt={slide.alt}
                  loading="lazy" // Lazy load images
                />
              </picture>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const CustomNextArrow = (props) => (
  <div
    className="absolute md:top-44 lg:top-60 top-20 sm:top-40 rounded-tl-xl rounded-bl-xl right-0 z-10 transform -translate-y-1/2 sm:p-3 text-center bg-white text-red-800 shadow-lg cursor-pointer"
    onClick={props.onClick}
    aria-label="Next slide"
    role="button"
  >
    <span className="md:text-3xl text-xl font-extrabold">&rarr;</span>
  </div>
);

const CustomPrevArrow = (props) => (
  <div
    className="absolute md:top-44 lg:top-60 top-20 sm:top-40 rounded-tr-xl rounded-br-xl left-0 z-10 transform -translate-y-1/2 sm:p-3 bg-white text-red-800 shadow-lg cursor-pointer"
    onClick={props.onClick}
    aria-label="Previous slide"
    role="button"
  >
    <span className="md:text-3xl text-xl font-extrabold">&larr;</span>
  </div>
);
