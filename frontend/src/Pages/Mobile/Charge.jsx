// import React from 'react'
// import Card from '../../Components/Card';
// import InnerCard from '../../Components/InnerCard';

// const Charge = () => {
//   const cardData = [
//     {
//       Icon: "https://img.freepik.com/free-photo/white-cell-phone-charger-white-isolated-background-with-usb-cabe_58702-4495.jpg?uid=R166271515&ga=GA1.2.830621292.1707550020&semt=ais_hybrid",
//       text: 'Samsung ',
//       price:'5,500',
//       discountprice:'3,000',
//       dropdownName: 'Samsung',
//       link: "/Moblie"
//     },
//     {
//       Icon: "https://img.freepik.com/free-photo/charger-usb-cable-type-c-white-isolated-background_58702-4501.jpg?uid=R166271515&ga=GA1.2.830621292.1707550020&semt=ais_hybrid",
//       text: 'One Plus ',
//       price:'5,500',
//       discountprice:'3,000',
//       dropdownName: 'One Plus',
//       link: "/Moblie"

//     },
//     {
//       Icon: "https://sellg.in/cdn/shop/products/original20wcharger_3a0b6f2e-aa2c-4b3e-9178-5c61d1200e7d_1024x1024@2x.jpg?v=1647607646",
//       text: 'Readme',
//       price:'5,500',
//       discountprice:'3,000',
//       dropdownName: 'Readme',
//       link: "/Moblie"

//     },

//   ];

//   return (
//     <>
 
//    <div className='p-5'>
//    <h1 className='md:text-4xl text-3xl font-semibold  mb-2 flex text-red-800 justify-center'>Charge </h1>

//       <div className="home-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5">
//         {cardData.map((item, index) => (
//           <InnerCard key={index} Icon={item.Icon} text={item.text} link={item.link} dropdownName={item.dropdownName} price={item.price} discountprice={item.discountprice} />
//         ))}
//       </div>
//       </div>
//     </>
//   );
// };

// export default Charge;


import React from 'react'
import InnerCard from '../../Components/InnerCard';
import { CardShow } from '../../Components/CardShow';

const Charge = () => {
 

  return (
    <>
 
   <div className='p-5'>
   <h1 className='md:text-4xl text-3xl font-semibold  mb-2 flex text-red-800 justify-center'>Charger </h1>

     <div>
      <CardShow  category="charge"/>
     </div>
      </div>
    </>
  );
};

export default Charge;
