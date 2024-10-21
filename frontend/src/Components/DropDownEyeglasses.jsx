import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import { useDropdown } from '../Contextapi/DropdownContext';

export const DropDownEyeglasses = () => {
    const { openDropdown, handleMouseLeave } = useDropdown();

    return (
        <div className="relative" onMouseLeave={handleMouseLeave}>
            <div className="flex items-center cursor-pointer">
                <h1 className="font-medium mr-2 text-center">Eyeglasses</h1>
                {openDropdown === 'eyeglasses' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />}
            </div>
            {openDropdown === 'eyeglasses' && (
                <ul className="list-none  font-medium absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg md:w-48">
                    <Link to="/eyeglasses1">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300">Eyeglasses Type 1</li>
                    </Link>
                    <Link to="/eyeglasses2">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300">Eyeglasses Type 2</li>
                    </Link>
                </ul>
            )}
        </div>
    );
};
