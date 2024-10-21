import React from 'react';
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useHoverDropdown } from '../Contextapi/CartDropDownHover';

export const DropHoverCart = ({ dropdownName }) => {
    const { openDropdown, setOpenDropdown, dropdownRef } = useHoverDropdown();

    return (
        <div className="relative z-50" onClick={() => setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)}>
            <div className="flex items-center cursor-pointer">
                <h1 className="font-medium text-center"></h1>
            </div>
            {openDropdown === dropdownName && (
                <ul ref={dropdownRef} className="list-none absolute font-medium bg-white z-50 border border-gray-300 rounded-md shadow-lg flex w-full justify-center">
                    <Link to="/cart">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300"><HiOutlineShoppingBag className='text-2xl' /></li>
                    </Link>
                    <Link to="/wishlist">
                        <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300"><CiHeart className='text-2xl' /></li>
                    </Link>
                </ul>
            )}
        </div>
    );
};
