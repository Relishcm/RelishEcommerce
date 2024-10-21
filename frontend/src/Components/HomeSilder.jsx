// import React from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export const HomeSlider = () => {
//   const slides = [
//     {
//       src: "silderhome2.png",
//       alt: "Slide 1",
//       title: "Mobile Phone",
//       description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
//     },
//     {
//       src: "garments1.png",
//       alt: "Slide 2",
//       title: "Accessories",
//       description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
//     },
//     {
//       src: "silderhome1.png",
//       alt: "Slide 3",
//       title: "Headphones",
//       description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
//     },
//   ];

//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,            
//     autoplaySpeed: 3000,       
//     nextArrow: <CustomNextArrow />,
//     prevArrow: <CustomPrevArrow />,
//   };

//   return (
//     <div className='flex justify-center items-center text-center'>
//     <div className="relative w-full overflow-hidden z-10 h-full  lg:h-[480px] text-center ">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index} className="relative">
//             <img
//               className="h-full w-full object-cover"
//               src={slide.src}
//               alt={slide.alt}
//             />
//             {/* <div className="absolute  inset-0 flex  text-center  justify-center bg-black bg-opacity-40 text-white ">
//               <div className="    max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 sm:py-40 ">
//                 <h1 className="text-xl  sm:text-2xl md:text-3xl lg:text-4xl font-bold  sm:mb-4">
//                   {slide.title}
//                 </h1>
//                 <p className="text-xs top-1/4 sm:text-sm md:text-base lg:text-lg mx-auto">
//                   {slide.description}
//                 </p>
//               </div>
//             </div> */}
//           </div>
//         ))}
//       </Slider>
//     </div>
//     </div>
//   );
// };


// const CustomNextArrow = (props) => (
//   <div
//     className="absolute md:top-44 lg:top-60 top-20 sm:top-40 rounded-tl-xl rounded-bl-xl right-0 z-10 transform -translate-y-1/2 sm:p-3 text-center  bg-white text-green-500  shadow-lg cursor-pointer"
//     onClick={props.onClick}
//     aria-label="Next slide"
//   >
//     <span className="md:text-3xl text-xl font-extrabold ">&rarr;</span>
//   </div>
// );

// const CustomPrevArrow = (props) => (
//   <div
//     className="absolute md:top-44 lg:top-60 top-20 sm:top-40 rounded-tr-xl rounded-br-xl left-0 z-10 transform -translate-y-1/2 sm:p-3 bg-white text-green-500 shadow-lg cursor-pointer"
//     onClick={props.onClick}
//     aria-label="Previous slide"
//   >
//     <span className="md:text-3xl text-xl font-extrabold ">&larr;</span>
//   </div>
// );
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomeSlider = () => {
  const slides = [
    // {
    //   mobileSrc: "silderhome2.png",
    //   desktopSrc: "silderhome2.png",
    //   alt: "Slide 1",
    //   title: "Mobile Phone",
    //   description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
    // },
    // {
    //   mobileSrc: "mobilegarments1.png",
    //   desktopSrc: "garments1.png",
    //   alt: "Slide 2",
    //   title: "Accessories",
    //   description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
    // },
    {
      mobileSrc: "cosmetices.png",
      desktopSrc: "cosmetices.png",
      alt: "Slide 3",
      title: "Headphones",
      description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
    },
    {
      mobileSrc: "garments4.png",
      desktopSrc: "garments4.png",
      alt: "Slide 2",
      title: "Accessories",
      description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
    },
    {
      mobileSrc: "mobile.png",
      desktopSrc: "mobile.png",
      alt: "Slide 2",
      title: "Accessories",
      description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
    },

    {
      mobileSrc: "garments3.png",
      desktopSrc: "garments3.png",
      alt: "Slide 1",
      title: "Mobile Phone",
      description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
    },
    {
      mobileSrc: "cosmetices1.png",
      desktopSrc: "cosmetices1.png",
      alt: "Slide 1",
      title: "Mobile Phone",
      description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
    },
    {
      mobileSrc: "garments5.png",
      desktopSrc: "garments5.png",
      alt: "Slide 1",
      title: "Mobile Phone",
      description: "This podcast features conversations with nonprofit leaders to brainstorm ways they can grow their organizations and do more good. Read how"
    },
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
      <div className="relative w-full overflow-hidden z-10 h-full  text-center">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative">
              <picture>
                <source media="(min-width: 768px)" srcSet={slide.desktopSrc} />
                <img
                  className="h-full w-full object-cover"
                  src={slide.mobileSrc}
                  alt={slide.alt}
                />
              </picture>
              {/* Optionally include overlay for title and description */}
              {/* <div className="absolute inset-0 flex text-center justify-center bg-black bg-opacity-40 text-white">
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 sm:py-40">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold sm:mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xs top-1/4 sm:text-sm md:text-base lg:text-lg mx-auto">
                    {slide.description}
                  </p>
                </div>
              </div> */}
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
  >
    <span className="md:text-3xl text-xl font-extrabold ">&rarr;</span>
  </div>
);

const CustomPrevArrow = (props) => (
  <div
    className="absolute md:top-44 lg:top-60 top-20 sm:top-40 rounded-tr-xl rounded-br-xl left-0 z-10 transform -translate-y-1/2 sm:p-3 bg-white text-red-800 shadow-lg cursor-pointer"
    onClick={props.onClick}
    aria-label="Previous slide"
  >
    <span className="md:text-3xl text-xl font-extrabold ">&larr;</span>
  </div>
);
