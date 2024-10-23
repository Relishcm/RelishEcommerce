
// import React from 'react';
// import { FaMobile, FaHeadphonesAlt } from 'react-icons/fa';
// import { MdCable, MdOutlineHeadphonesBattery } from 'react-icons/md';
// import { PiPlugChargingFill } from 'react-icons/pi';
// import Card from './Card';
// import { Link } from 'react-router-dom';
// import { DropDownMobile } from './DropDownMobile';

// const HomeCard = () => {
//   const cardData = [
//     { Icon: "https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147846501.jpg?t=st=1729247753~exp=1729251353~hmac=948af0a700c2ce7d1040c877d523add6e9fd82303e76d6a162554ffee296cbac&w=740", 
//       text: <DropDownMobile />,
//       // link:"/Moblie"
//     },
//     { Icon: "https://img.freepik.com/premium-vector/black-realitic-glasses-white_9573-356.jpg?w=740",
//        text: 'Eyeglesses' 
//       },
//     { Icon: "https://img.freepik.com/free-photo/close-up-flannel-shirt-detail_23-2149575327.jpg?uid=R169119148&ga=GA1.1.715047314.1729245762&semt=ais_hybrid", 
//       text: 'Ready Made Garments' 
//     },
//     { Icon: "https://img.freepik.com/premium-photo/variety-makeup-products-including-brand-makeup_1028566-49389.jpg?uid=R166271515&ga=GA1.1.830621292.1707550020&semt=ais_hybrid", 
//       text: 'Cosmetics' 
//     },
//     { Icon: "teaa.png", 
//       text: 'Tea' 
//     },
//   ];

//   return (
//     <div className="home-card-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5 md:p-5 z-0">
//       {cardData.map((item, index) => (
//        <Card key={index} Icon={item.Icon} text={item.text} link={item.link}/>
//       ))}
//     </div>
//   );
// };

// export default HomeCard;

import React from 'react';
import Card from './Card';
import { DropDownMobile } from './DropDownMobile';
import {  DropDownSunglasses } from './DropDownSunglasses';
import { DropDownCosmetices } from './DropDownCosmetices';
import { DropDownBags } from './DropDownBags';
import { DropDownGarments } from './DropDownGarments';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from './Arrows'; 
import { DropDownJewelry } from './DropDownJewelry';

const HomeCard = () => {
    const cardData = [
        { 
            Icon: "https://img.freepik.com/premium-photo/variety-makeup-products-including-brand-makeup_1028566-49389.jpg?uid=R166271515&ga=GA1.1.830621292.1707550020&semt=ais_hybrid", 
            text: <DropDownCosmetices />,
            dropdownName: 'cosmetices',
        },
        { 
            Icon: "https://img.freepik.com/free-photo/close-up-flannel-shirt-detail_23-2149575327.jpg?uid=R169119148&ga=GA1.1.715047314.1729245762&semt=ais_hybrid", 
            text: <DropDownGarments />,
            dropdownName: 'garments',
        },
        { 
            Icon: "https://thefably.com/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-30-at-9.31.52-AM-300x300.jpeg", 
            text: <DropDownJewelry /> ,
            dropdownName: 'jewelry',
        },
        {
            Icon: "https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147846501.jpg?w=740",
            text: <DropDownMobile />,
            dropdownName: 'mobile',
        },
        {
            Icon: "https://img.freepik.com/premium-vector/black-realitic-glasses-white_9573-356.jpg?w=740",
            text: <DropDownSunglasses />,
            dropdownName: 'sunglasses',
        },
        { 
            Icon: "https://img.freepik.com/premium-photo/black-leather-men-casual-business-bag_555047-3057.jpg?uid=R166271515&ga=GA1.2.830621292.1707550020&semt=ais_hybrid", 
            text: <DropDownBags />,
            dropdownName: 'Bags',
        },
    
    ];

    var settings = {
        dots: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className='p-5'>
    <h1 className='md:text-4xl text-3xl font-semibold  mb-2 flex text-red-800 justify-center'>PRODUCTS </h1>

        <div className="home-card-container max-w-7xl mx-auto relative">
            <Slider {...settings}>
                {cardData.map((item, index) => (
                    <div key={index} className="px-2">
                        <Card 
                            Icon={item.Icon} 
                            text={item.text} 
                            dropdownName={item.dropdownName} 
                        />
                    </div>
                ))}
            </Slider>
        </div>
        </div>
    );
};

export default HomeCard;
