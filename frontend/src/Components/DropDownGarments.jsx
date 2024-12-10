import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDropdown } from '../Contextapi/DropdownContext';


export const DropDownGarments = () => {
    const { openDropdown,dropdownRef } = useDropdown();
    console.log('Dropdown Open:', openDropdown);
    return (
        <div className="relative z-50">
            <div className="flex items-center cursor-pointer ">
                <h1 className="font-medium mr-2 text-center z-0">Ready Made Garments</h1>
                {/* {openDropdown === 'garments' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />} */}
            </div>
            {openDropdown === 'garments' && (
                <ul  className="list-none font-medium absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg text-xs md:text-sm" >
                    <Link to="/Man">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300 " onClick={() => console.log('Navigating to Man')}>Man</li>
                    </Link>
                    <Link to="/Woman">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300">Woman</li>
                    </Link>
                    <Link to="/Child">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300">Child</li>
                    </Link>
              
                </ul>
            )}
        </div>
    );
};
