
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
// HomeCard.js
// HomeCard.js
// HomeCard.js
import React from 'react';
import Card from './Card';
import { useDropdown } from '../Contextapi/DropdownContext';
import { DropDownMobile } from './DropDownMobile';
import { DropDownEyeglasses } from './DropDownEyeglasses';
import { DropDownCosmetices } from './DropDownCosmetices';
import { DropDowntea } from './DropDowntea';
import { DropDownGarments } from './DropDownGarments';
// Import other dropdown components as needed...

const HomeCard = () => {
    const { handleMouseEnter, handleMouseLeave } = useDropdown();

    const cardData = [
        {
            Icon: "https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147846501.jpg?w=740",
            text: <DropDownMobile />,
            dropdownName: 'mobile',

        },
        {
            Icon: "https://img.freepik.com/premium-vector/black-realitic-glasses-white_9573-356.jpg?w=740",
            text: <DropDownEyeglasses />,
            dropdownName: 'eyeglasses',
        
        },
        { 
          Icon: "https://img.freepik.com/free-photo/close-up-flannel-shirt-detail_23-2149575327.jpg?uid=R169119148&ga=GA1.1.715047314.1729245762&semt=ais_hybrid", 
          text: <DropDownGarments />,
          dropdownName: 'garments',

        },
        { 
          Icon: "https://img.freepik.com/premium-photo/variety-makeup-products-including-brand-makeup_1028566-49389.jpg?uid=R166271515&ga=GA1.1.830621292.1707550020&semt=ais_hybrid", 
          text: <DropDownCosmetices />,
          dropdownName: 'cosmetices',

        },
        { 
          Icon: "teaa.png", 
          text: <DropDowntea />,
          dropdownName: 'tea',

        },
    ];

    return (
        <div className="home-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {cardData.map((item, index) => (
                <div key={index} className="relative">
                    <Card 
                        Icon={item.Icon} 
                        text={item.text} 
                    
                        dropdownName={item.dropdownName} 
                    />
                </div>
            ))}
        </div>
    );
};

export default HomeCard;


