import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDropdown } from '../Contextapi/DropdownContext';

export const DropDownJewelry = () => {
    const { openDropdown, handleMouseLeave,dropdownRef } = useDropdown();

    return (
        <div className="relative" >
            <div className="flex items-center cursor-pointer">
                <h1 className="font-medium mr-2 text-center">Ready Made Garments</h1>
                {/* {openDropdown === 'jewelry' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />} */}
            </div>
            {openDropdown === 'jewelry' && (
                <ul ref={dropdownRef} className="list-none font-medium  absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg text-sm">
                    <Link to="/man">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Man</li>
                    </Link>
                    <Link to="/woman">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Woman</li>
                    </Link>
                    <Link to="/child">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Child</li>
                    </Link>
              
                </ul>
            )}
        </div>
    );
};
