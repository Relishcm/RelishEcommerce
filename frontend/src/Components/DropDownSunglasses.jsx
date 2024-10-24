import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import { useDropdown } from '../Contextapi/DropdownContext';

export const DropDownSunglasses = () => {
    const { openDropdown, handleMouseLeave,dropdownRef } = useDropdown();

    return (
        <div className="relative">
            <div className="flex items-center cursor-pointer">
                <h1 className="font-medium mr-2 text-center">Sunglasses</h1>
                {/* {openDropdown === 'sunglasses' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />} */}
            </div>
            {openDropdown === 'sunglasses' && (
                <ul ref={dropdownRef} className="list-none  font-medium absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg w-36 text-sm">
                    <Link to="/Sunglasses1">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Eyeglasses Type 1</li>
                    </Link>
                        <Link to="/Sunglasses2">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Eyeglasses Type 2</li>
                    </Link>
                </ul>
            )}
        </div>
    );
};
