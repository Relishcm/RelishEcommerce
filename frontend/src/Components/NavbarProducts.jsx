import React, { useState } from 'react'
import { DropDownMobile } from './DropDownMobile'
import { DropDownGarments } from './DropDownGarments'
import { DropDownCosmetices } from './DropDownCosmetices'
import { DropDownBags } from './DropDownBags'
import { useDropdown } from '../Contextapi/DropdownContext'
import { DropDownJewelry } from './DropDownJewelry'
import { DropDownSunglasses } from './DropDownSunglasses'
import { FaBars, FaTimes } from 'react-icons/fa';

export const NavbarProducts = () => {
    const { handleMouseEnter, handleMouseLeave } = useDropdown();
 
    return (
        <>
            <div className='bg-gray-50 border-t p-2  shadow-md font-medium'>
                <ul className={`flex md:text-sm md:gap-5 gap-1 text-xs justify-around items-center max-w-screen-2xl mx-auto `}>
                 
                    <li
                        onMouseEnter={() => handleMouseEnter('cosmetices')}
                        onMouseLeave={handleMouseLeave} 
                        className=' transition duration-300 ease-in-out'>
                        <DropDownCosmetices />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('garments')}
                        onMouseLeave={handleMouseLeave} 
                        className=' transition duration-300 ease-in-out'>
                        <DropDownGarments />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('jewelry')}
                        onMouseLeave={handleMouseLeave} 
                        className=' transition duration-300 ease-in-out'>
                        <DropDownJewelry />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('mobile')}
                        onMouseLeave={handleMouseLeave} 
                        className=' transition duration-300 ease-in-out'>
                        <DropDownMobile />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('sunglasses')}
                        onMouseLeave={handleMouseLeave} 
                        className=' transition duration-300 ease-in-out'>
                        <DropDownSunglasses />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('Bags')}
                        onMouseLeave={handleMouseLeave} 
                        className=' transition duration-300 ease-in-out'>
                        <DropDownBags />
                    </li>
                </ul>
            </div>
        </>
    )
}
