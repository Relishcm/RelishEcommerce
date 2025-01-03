import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDropdown } from '../Contextapi/DropdownContext';


export const DropDownCosmetices = () => {
    const { openDropdown, handleMouseLeave,dropdownRef } = useDropdown();

    return (
        <div className="relative" >
            <div className="flex items-center cursor-pointer ">
                <h1 className="font-medium  text-center">Cosmetics</h1>
                {/* {openDropdown === 'cosmetices' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />} */}
            </div>
            {openDropdown === 'cosmetices' &&  (
                <ul  className="list-none font-medium absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg w-36 text-sm">
                    <Link to="/SkinCare">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Skin care products</li>
                    </Link>
                    <Link to="/HandCare">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Hand care products</li>
                    </Link>
                    <Link to="/child">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Body care product</li>
                    </Link>
              
                </ul>
            )}
        </div>
    );
};
