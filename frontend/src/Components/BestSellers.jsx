import React from 'react';
import Card from './Card';


export const BestSellers = () => {
  const cardData = [
    { 
      Icon: "https://img.freepik.com/premium-photo/bathroom-sink-with-three-bottles-soap-bottle-shampoo_337384-179530.jpg?uid=R166271515&ga=GA1.2.830621292.1707550020&semt=ais_hybrid", 
      text: "Skin Care Products",
    },
    { 
      Icon: "https://image.shutterstock.com/image-photo/black-white-folded-tshirt-label-260nw-1789750532.jpg", 
      text: 'T-Shirt Dresses' 
    },
    { 
      Icon: "https://img.freepik.com/free-photo/headphones-displayed-against-dark-background_157027-4466.jpg?uid=R166271515&ga=GA1.1.830621292.1707550020&semt=ais_hybrid", 
      text: 'Boat' 
    },
  ];

  return (
    <div className='p-5  md:ml-28 md:mr-28'>
      <h1 className='md:text-4xl text-3xl font-semibold mb- flex text-red-800 justify-center'>
        TOP CATEGORY PICKS
      </h1>
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5 md:p-5 z-0">
        {cardData.map((item, index) => (
          <Card key={index} Icon={item.Icon} text={item.text} />
        ))}
      </div>
    </div>
  );
};