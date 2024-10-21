import React from 'react';
import InnerCard from '../../Components/InnerCard';

const CtypeUSB = () => {
    const cardData = [
        {
            Icon: "https://images.samsung.com/is/image/samsung/in-cable-combo-dg930-ep-dg930ibegin-frontblack-119451395?$2052_1641_PNG$",
            text: 'Samsung C type',
            price:'5,500',
            discountprice:'3,000',
            dropdownName: 'samsungDropdown',
        },
        {
            Icon: "https://m.media-amazon.com/images/I/41NkEn026DL._SY445_SX342_QL70_FMwebp_.jpg",
            text: 'One Plus C type',
            price:'2,500',
            discountprice:'2,000',
            dropdownName: 'onePlusDropdown',
        },
        {
            Icon: "https://m.media-amazon.com/images/I/41ZvK8c6j+L._SX342_SY445_.jpg",
            text: 'Readme C type',
            price:'500',
            discountprice:'300',
            dropdownName: 'readmeDropdown',
        },
    ];

    return (
        <div className='p-5'>
            <h1 className='md:text-4xl text-3xl font-semibold mb-2 flex text-red-800 justify-center'>C type USB</h1>
            <div className="home-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-5">
                {cardData.map((item, index) => (
                    <InnerCard key={index} Icon={item.Icon} text={item.text} dropdownName={item.dropdownName} price={item.price} discountprice={item.discountprice} />
                ))}
            </div>
        </div>
    );
};

export default CtypeUSB;
