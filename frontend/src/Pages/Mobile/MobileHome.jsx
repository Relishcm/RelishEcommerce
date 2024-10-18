import React from 'react'
import { MobileNavbar } from '../../Components/Mobile/MobileNavbar'
import Card from '../../Components/Card';



const MobileHome = () => {
  const cardData = [
    { Icon: "https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147846501.jpg?t=st=1729247753~exp=1729251353~hmac=948af0a700c2ce7d1040c877d523add6e9fd82303e76d6a162554ffee296cbac&w=740", 
      text: 'Mobile & Mobile Accessories',
      link:"/Moblie"
    },
    { Icon: "https://img.freepik.com/premium-vector/black-realitic-glasses-white_9573-356.jpg?w=740",
       text: 'Eyeglesses' 
      },
    { Icon: "https://img.freepik.com/free-photo/close-up-flannel-shirt-detail_23-2149575327.jpg?uid=R169119148&ga=GA1.1.715047314.1729245762&semt=ais_hybrid", 
      text: 'Ready Made Garments' 
    },
    { Icon: "https://img.freepik.com/premium-photo/variety-makeup-products-including-brand-makeup_1028566-49389.jpg?uid=R166271515&ga=GA1.1.830621292.1707550020&semt=ais_hybrid", 
      text: 'Cosmetics' 
    },
    { Icon: "teaa.png", 
      text: 'Tea' 
    },
  ];

  return (
    <>
    <div>
    <MobileNavbar />
   </div>
    <div className="home-card-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5">
      {cardData.map((item, index) => (
       <Card key={index} Icon={item.Icon} text={item.text} link={item.link}/>
      ))}
    </div>
    </>
  );
};

export default MobileHome;
