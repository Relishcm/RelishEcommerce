
import React from 'react';
import Card from './Card';


export const FavoritePick = () => {
  const cardData = [
    { 
      Icon: "https://thefably.com/wp-content/uploads/2023/08/bags1.png", 
      text: "Bag Collections",
    },
    { 
      Icon: "https://thefably.com/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-30-at-9.30.14-AM-300x300.jpeg", 
      text: 'Jewellry' 
    },
    { 
      Icon: "https://img.freepik.com/free-photo/interior-kids-room-decoration-with-clothes_23-2149096039.jpg?uid=R166271515&ga=GA1.1.830621292.1707550020&semt=ais_hybrid", 
      text: 'Kid Dresses' 
    },
    { 
      Icon: "  https://img.freepik.com/premium-photo/sunglasses-white-background-isolate-healthy-eyes-copy-space_187096-888.jpg?uid=R166271515&ga=GA1.1.830621292.1707550020&semt=ais_hybrid", 
      text: 'Sun Glasses' 
      },
  ];

  return (
    <div className='p-5'>
      <h1 className='md:text-4xl text-3xl font-semibold mb- flex text-red-800 justify-center'>
      FAVORITE PICKS
      </h1>
      <div className="home-card-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 md:p-5 z-0 p-1">
        {cardData.map((item, index) => (
          <Card key={index} Icon={item.Icon} text={item.text} />
        ))}
      </div>
    </div>
  );
};