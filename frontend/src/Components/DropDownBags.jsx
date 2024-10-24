
import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDropdown } from '../Contextapi/DropdownContext';

export const DropDownBags = () => {
    const { openDropdown, handleMouseLeave,dropdownRef } = useDropdown();

    return (
        <div className="relative">
            <div className="flex items-center cursor-pointer" >
                <h1 className="font-medium mr-2 text-center">Bags</h1>
                {/* {openDropdown === 'Bags' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />} */}
            </div>
            {openDropdown === 'Bags' && (
                <ul ref={dropdownRef} className="list-none font-medium right-0 absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg  w-32 text-sm">
                    <Link to="/man">
                        <li className="py-1 px-2  hover:bg-red-100 cursor-pointer transition-colors duration-300  ">Backpack Bags</li>
                    </Link>
                    <Link to="/woman">
                        <li className="py-1 px-2  hover:bg-red-100 cursor-pointer transition-colors duration-300  ">Basket Bags</li>
                    </Link>
                    <Link to="/child">
                        <li className="py-1 px-2  hover:bg-red-100 cursor-pointer transition-colors duration-300  ">Crossbody Bags</li>
                    </Link>
              
                </ul>
            )}
        </div>
    );
};
