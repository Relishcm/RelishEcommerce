import React from 'react';
import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
import { DropHoverCart } from './DropHoverCart';

const InnerCard = ({ Icon, text,price,discountprice, dropdownName }) => {
    const { setOpenDropdown } = useHoverDropdown();

    

    return (
        <div 
            className="card p-2 border rounded-lg hover:shadow-inner cursor-pointer z-0"
            onMouseEnter={() => setOpenDropdown(dropdownName)} 
            onMouseLeave={() => setOpenDropdown(null)} 
        >
            <div className="text text-md mb-3 mt- sm:text-xs md:text-lg lg:text-xl font-semibold text-wrap flex items-center justify-center">
                {text}
                </div>
              <div className='text-lg flex justify-center items-center gap-3'>
              <p>₹{discountprice}</p>
              <p className='line-through'>₹{price}</p>
              </div>  
            
            <DropHoverCart dropdownName={dropdownName} />
            <div className="icon h-60 z-0 flex items-center justify-center">
                <img src={Icon} className='h-full w-full rounded-lg border' alt="Card Icon" />
            </div>
        </div>
    );
};

export default InnerCard;
