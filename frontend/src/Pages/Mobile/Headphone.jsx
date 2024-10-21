import React from 'react'
import Card from '../../Components/Card';
import InnerCard from '../../Components/InnerCard';



const Headphone = () => {
  const cardData = [
    {
      Icon: "https://www.headphonezone.in/cdn/shop/files/Headphone-Zone-FiiO-JD1-Type-C-001_c46bba2f-7c9d-486a-8abd-78489bafb3f1.jpg?v=1725439499&width=600",
      text: 'Headphone Zone',
      price:'500',
      discountprice:'300',
      dropdownName: 'Headphone Zone',
      link: "/Moblie"
    },
    {
      Icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSSvzSTs2dE2EISSDA2u6Rjah37O4pX876wf79bck4WDO_o-hP5UdgFG4lnL_jdcen8TFsuS76KMM2sn6Ddvl_Q3XhWfLcZJNGMT3sea763GXJcLkUEjpqo8nxbUio1cIpb0nuxAw&usqp=CAc",
      text: 'boAt Airdopes 131',
      price:'500',
      discountprice:'300',
      dropdownName: 'boAt Airdopes 131',
      link: "/Moblie"

    },
    {
      Icon: "https://rukminim2.flixcart.com/image/1200/1200/k7285u80/headphone/4/3/u/boat-rockerz-370-original-imafpdzhywghfabu.jpeg",
      text: 'boAt Rockerz 370 ',
      price:'500',
      discountprice:'300',
      dropdownName: 'boAt Rockerz 370',
      link: "/Moblie"

    },

  ];

  return (
    <>
    <div className='p-5'>
   <h1 className='md:text-4xl text-3xl font-semibold  mb-2 flex text-red-800 justify-center'>C type USB </h1>
 
      <div className="home-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5">
        {cardData.map((item, index) => (
          <InnerCard key={index} Icon={item.Icon} text={item.text} link={item.link} dropdownName={item.dropdownName} price={item.price} discountprice={item.discountprice}/>
        ))}
      </div>
      </div>
    </>
  );
};

export default Headphone;
