import React from 'react'
import { MobileNavbar } from '../../Components/Mobile/MobileNavbar'
import Card from '../../Components/Card';



const MobileHome = () => {
  const cardData = [
    {
      Icon: "https://img.freepik.com/free-vector/realistic-smartphone-with-red-back-cover_23-2148385253.jpg?uid=R166271515&ga=GA1.2.830621292.1707550020&semt=ais_hybrid",
      text: 'Infinix  Note 12',

      link: "/Moblie"
    },
    {
      Icon: "https://img.freepik.com/premium-photo/sleek-modern-luxury-phone_1065566-15695.jpg?uid=R166271515&ga=GA1.2.830621292.1707550020&semt=ais_hybrid",
      text: 'Oppo '
    },
    {
      Icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRV2RuZx_mcuavdOHbgmN8cmP2TCw2MBY2RJQRXNrE9HaE-MtaGvmJQELKrR74i9FiwHe--SPAMub12115oYR3RcevfOjTlKq7TNYBcRpPDSCxM0NdgUsVv",
      text: 'Redmi Note 13'
    },
    {
      Icon: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTSI8f4wwBePbqkGo1ct_4SFLgQXGqqiUXwcttGa-kMK90_oL6fYvjbN0NOpApH4YavrXlpbkRlp08QYs7N5eanxIj6UgxVT8AoqsOIDtb3m4X5csa1j_0G_cwGjXJMlkqssGdz7So&usqp=CAc",
      text: 'Realme'
    },
    {
      Icon: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQW89Ir_vLJSmfMhVUe3NBpqs5hhBCwhZH5Kl4ksELqBy94uUCaosNaJInkP5AoSDDSIfYqiPSj3KH5j-UcHcKiG0Eqg_ZZ9UMkXvb9MJUDG9B5zT1wCAi-",
      text: 'Readmi'
    },
  ];

  return (
    <>
      {/* <div>
    <MobileNavbar />
   </div> */}
      <div className="home-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5">
        {cardData.map((item, index) => (
          <Card key={index} Icon={item.Icon} text={item.text} link={item.link} />
        ))}
      </div>
    </>
  );
};

export default MobileHome;
