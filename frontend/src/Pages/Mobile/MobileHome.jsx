import React from 'react'
import Card from '../../Components/Card';
import InnerCard from '../../Components/InnerCard';

const MobileHome = () => {
  const cardData = [
    {
      Icon: "https://img.freepik.com/free-vector/realistic-smartphone-with-red-back-cover_23-2148385253.jpg?uid=R166271515&ga=GA1.2.830621292.1707550020&semt=ais_hybrid",
      text: 'Infinix  Note 12',
      price:'500',
      discountprice:'300',
      dropdownName: 'Infinix  Note 12',
      link: "/Moblie"
    },
    {
      Icon: "https://img.freepik.com/premium-photo/sleek-modern-luxury-phone_1065566-15695.jpg?uid=R166271515&ga=GA1.2.830621292.1707550020&semt=ais_hybrid",
      price:'500',
      discountprice:'300',
      dropdownName: 'Oppo',
      text: 'Oppo '
    },
    {
      Icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRV2RuZx_mcuavdOHbgmN8cmP2TCw2MBY2RJQRXNrE9HaE-MtaGvmJQELKrR74i9FiwHe--SPAMub12115oYR3RcevfOjTlKq7TNYBcRpPDSCxM0NdgUsVv",
      price:'500',
      discountprice:'300',
      dropdownName: 'Redmi Note 13',
      text: 'Redmi Note 13'
    },
    {
      Icon: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTSI8f4wwBePbqkGo1ct_4SFLgQXGqqiUXwcttGa-kMK90_oL6fYvjbN0NOpApH4YavrXlpbkRlp08QYs7N5eanxIj6UgxVT8AoqsOIDtb3m4X5csa1j_0G_cwGjXJMlkqssGdz7So&usqp=CAc",
      price:'500',
      discountprice:'300',
      dropdownName: 'Realme',
      text: 'Realme'
    },
    {
      Icon: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQW89Ir_vLJSmfMhVUe3NBpqs5hhBCwhZH5Kl4ksELqBy94uUCaosNaJInkP5AoSDDSIfYqiPSj3KH5j-UcHcKiG0Eqg_ZZ9UMkXvb9MJUDG9B5zT1wCAi-",
      price:'500',
      discountprice:'300',
      dropdownName: 'Readmi',
      text: 'Readmi'
    },
  ];

  return (
    <>
    <div className='p-5'>
   <h1 className='md:text-4xl text-3xl font-semibold  mb-2 flex text-red-800 justify-center'>Mobile</h1>
  
      <div className="home-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5">
        {cardData.map((item, index) => (
          <InnerCard key={index} Icon={item.Icon} text={item.text} link={item.link} dropdownName={item.dropdownName} price={item.price} discountprice={item.discountprice}/>
        ))}
      </div>
      </div>
    </>
  );
};

export default MobileHome;
