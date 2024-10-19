
import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDropdown } from '../Contextapi/DropdownContext';


export const DropDownCosmetices = () => {
    const { openDropdown, handleMouseLeave } = useDropdown();

    return (
        <div className="relative" onMouseLeave={handleMouseLeave}>
            <div className="flex items-center cursor-pointer">
                <h1 className="font-medium mr-2 text-center">Cosmetices</h1>
                {openDropdown === 'cosmetices' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />}
            </div>
            {openDropdown === 'cosmetices' &&  (
                <ul className="list-none font-medium absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg w-52">
                    <Link to="/man">
                        <li className="py-1 px-4 hover:bg-green-100 cursor-pointer transition-colors duration-300">Skin care products</li>
                    </Link>
                    <Link to="/woman">
                        <li className="py-1 px-4 hover:bg-green-100 cursor-pointer transition-colors duration-300">Hand care products</li>
                    </Link>
                    <Link to="/child">
                        <li className="py-1 px-4 hover:bg-green-100 cursor-pointer transition-colors duration-300">Body care product</li>
                    </Link>
              
                </ul>
            )}
        </div>
    );
};
