
import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDropdown } from '../Contextapi/DropdownContext';

export const DropDownBags = () => {
    const { openDropdown, handleMouseLeave } = useDropdown();

    return (
        <div className="relative" onMouseLeave={handleMouseLeave}>
            <div className="flex items-center cursor-pointer">
                <h1 className="font-medium mr-2 text-center">Bags</h1>
                {openDropdown === 'Bags' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />}
            </div>
            {openDropdown === 'Bags' && (
                <ul className="list-none font-medium absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg ">
                    <Link to="/man">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300 w-full ">Backpack Bags</li>
                    </Link>
                    <Link to="/woman">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300 w-full ">Basket Bags</li>
                    </Link>
                    <Link to="/child">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300 w-full ">Crossbody Bags</li>
                    </Link>
              
                </ul>
            )}
        </div>
    );
};
