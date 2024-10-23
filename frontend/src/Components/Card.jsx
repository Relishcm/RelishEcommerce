import React from 'react';
import { useDropdown } from '../Contextapi/DropdownContext';

const Card = ({ Icon, text, dropdownName }) => {
    const { handleMouseEnter, handleMouseLeave } = useDropdown();

    return (
       
            <div 
                className="card p-2 border rounded-lg hover:shadow-inner cursor-pointer z-0 "
                onMouseEnter={() => handleMouseEnter(dropdownName)} 
                onMouseLeave={handleMouseLeave}
            >
                <div className="text text-md mb-3 mt- sm:text-xs md:text-lg lg:text-xl font-semibold text-wrap flex items-center justify-center">
                    {text}
                </div>
                <div className="icon h-60 z-0 flex items-center justify-center">
                    <img src={Icon} className='h-full w-full rounded-lg border' alt="Card Icon" />
                </div>
            </div>
        
    );
};

export default Card;
