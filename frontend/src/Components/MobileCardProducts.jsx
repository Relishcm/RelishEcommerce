import React, { useState } from 'react';
import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
import { DropHoverCart } from './DropHoverCart';

export const MobileCardProducts = ({ category, price, image, productId, discountPrice, name, description }) => {
    const { setOpenDropdown } = useHoverDropdown();
    const [loading, setLoading] = useState(true); 

    return (
        <div
            className="card p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer relative"
            onMouseEnter={() => setOpenDropdown(name)}
            onMouseLeave={() => setOpenDropdown(null)}
        >
            <div className="text-center mb-3">
                <h2 className="text-md sm:text-xs md:text-lg lg:text-xl font-semibold">{name}</h2>
            </div>
            <div className='text-lg flex justify-center items-center gap-3 mb-2'>
                <p className="text-red-600 font-bold">₹{discountPrice}</p>
                <p className='text-gray-500 line-through'>₹{price}</p>
            </div>
            <DropHoverCart 
                dropdownName={name}  
                product={{ category, price, image, productId, discountPrice, name, description }} 
            />
            <div className="icon h-60 flex items-center justify-center relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-red-700 rounded-full" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                )}
                <img 
                    src={image} 
                    className={`h-full w-full rounded-lg border object-cover ${loading ? 'hidden' : 'block'}`} 
                    alt={name} 
                    onLoad={() => setLoading(false)} 
                /> 
            </div>
        </div>
    );
};
