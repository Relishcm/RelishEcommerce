import React from 'react';
import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
import { useNavigate } from 'react-router-dom'; 
import { DropHoverCart } from './DropHoverCart';

export const MobileCardProducts = ({ category, price, image, productId, discountPrice, name, description }) => {
    const { setOpenDropdown } = useHoverDropdown();
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate('/view', { state: { product: { category, price, image, productId, discountPrice, name, description } } });
    };

    return (
        <>
        
            <div>
                
        <div 
            className="card p-2 border rounded-lg hover:shadow-inner cursor-pointer z-0"
            onMouseEnter={() => setOpenDropdown(name)} 
            onMouseLeave={() => setOpenDropdown(null)} 
            onClick={handleClick} 
        >
            <div></div>
            <div className="text text-md mb-3 mt- sm:text-xs md:text-lg lg:text-xl font-semibold text-wrap flex items-center justify-center">
                {name} 
            </div>
            <div className='text-lg flex justify-center items-center gap-3'>
                <p>₹{discountPrice}</p>
                <p className='line-through'>₹{price}</p>
            </div>  
            <DropHoverCart dropdownName={name}  product={{ category, price, image, productId, discountPrice, name, description }} />
            <div className="icon h-60 z-0 flex items-center justify-center">
                <img src={image} className='h-full w-full rounded-lg border' alt={name} /> 
            </div>
        </div>
        </div>
        </>
    );
};
