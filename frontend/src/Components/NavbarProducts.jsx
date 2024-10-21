import React from 'react'
import { DropDownMobile } from './DropDownMobile'
import { DropDownEyeglasses } from './DropDownEyeglasses'
import { DropDownGarments } from './DropDownGarments'
import { DropDownCosmetices } from './DropDownCosmetices'
import { DropDowntea } from './DropDowntea'
import { useDropdown } from '../Contextapi/DropdownContext'
import { DropDownJewelry } from './DropDownJewelry'

export const NavbarProducts = () => {
    const { handleMouseEnter, handleMouseLeave } = useDropdown();
    return (
        <>
            <div className='bg-gray-50 border-t sm:p-2 md:p-2 shadow-md font-medium'>
                <ul className='md:flex gap-5 justify-around items-center max-w-screen-2xl  mx-auto'>
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
                        onMouseEnter={() => handleMouseEnter('eyeglasses')}
                        onMouseLeave={handleMouseLeave} 
                        className=' transition duration-300 ease-in-out'>
                        <DropDownEyeglasses />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('tea')}
                        onMouseLeave={handleMouseLeave} 
                        className=' transition duration-300 ease-in-out'>
                        <DropDowntea />
                    </li>
                </ul>
            </div>
        </>
    )
}
