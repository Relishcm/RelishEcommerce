import React, { useState } from 'react';
import { DropDownMobile } from './DropDownMobile';
import { DropDownGarments } from './DropDownGarments';
import { DropDownCosmetices } from './DropDownCosmetices';
import { DropDownBags } from './DropDownBags';
import { useDropdown } from '../Contextapi/DropdownContext';
import { DropDownJewelry } from './DropDownJewelry';
import { DropDownSunglasses } from './DropDownSunglasses';
import { FaBars, FaTimes } from 'react-icons/fa';

export const NavbarProducts = () => {
    const { handleMouseEnter, handleMouseLeave } = useDropdown();
    const [isOpen, setIsOpen] = useState(false);  // For mobile menu toggling

    const handleMenuToggle = () => {
        setIsOpen(prev => !prev); // Toggle the state of mobile menu
    };

    return (
        <>
            <div className='bg-gray-50 border-t p-2 shadow-md font-medium'>


                {/* Desktop Menu */}
                <ul className={`hidden md:flex  gap-1 text-xs md:text-base items-center justify-around max-w-screen-2xl mx-auto`}>
                    <li
                        onMouseEnter={() => handleMouseEnter('cosmetices')}
                        onMouseLeave={handleMouseLeave}
                        className='transition duration-300 ease-in-out'>
                        <DropDownCosmetices />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('jewelry')}
                        onMouseLeave={handleMouseLeave}
                        className='transition duration-300 ease-in-out'>
                        <DropDownJewelry />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('garments')}
                        onMouseLeave={handleMouseLeave}
                        className='transition duration-300 ease-in-out'>
                        <DropDownGarments />
                    </li>
          
                    <li
                        onMouseEnter={() => handleMouseEnter('mobile')}
                        onMouseLeave={handleMouseLeave}
                        className='transition duration-300 ease-in-out'>
                        <DropDownMobile />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('sunglasses')}
                        onMouseLeave={handleMouseLeave}
                        className='transition duration-300 ease-in-out'>
                        <DropDownSunglasses />
                    </li>
                    <li
                        onMouseEnter={() => handleMouseEnter('Bags')}
                        onMouseLeave={handleMouseLeave}
                        className='transition duration-300 ease-in-out'>
                        <DropDownBags />
                    </li>
                </ul>

                <div className='flex  justify-between'>
                    <div className="md:hidden flex items-center ">
                        {/* Mobile Menu Toggle Button */}
                        <button onClick={handleMenuToggle} className="text-3xl text-black">
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                    <div>
                        <ul className='md:hidden flex  items-center gap-10'>
                            <li
                                onClick={() => handleMouseEnter('cosmetices')}

                                className='transition duration-300 ease-in-out'>
                                <DropDownCosmetices />
                            </li>
                            <li
                                onClick={() => handleMouseEnter('garments')}

                                className='transition duration-300 ease-in-out'>
                                <DropDownGarments />
                            </li>

                        </ul>
                    </div>    </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <ul className='md:hidden flex flex-col space-y-10 mt-10'>
                        {/* <li
                            onClick={handleMenuToggle}
                            className='transition duration-300 ease-in-out'>
                            <DropDownCosmetices />
                        </li>
                        <li
                            onClick={handleMenuToggle}
                            className='transition duration-300 ease-in-out'>
                            <DropDownGarments />
                        </li> */}
                        <li
                            onClick={() => handleMouseEnter('jewelry')}

                            className='transition duration-300 ease-in-out'>
                            <DropDownJewelry />
                        </li>
                        <li
                            onClick={() => handleMouseEnter('mobile')}

                            className='transition duration-300 ease-in-out'>
                            <DropDownMobile />
                        </li>
                        <li
                            onClick={() => handleMouseEnter('sunglasses')}

                            className='transition duration-300 ease-in-out'>
                            <DropDownSunglasses />
                        </li>
                        <li
                            onClick={() => handleMouseEnter('Bags')}

                            className='transition duration-300 ease-in-out'>
                            <DropDownBags />
                        </li>
                    </ul>
                )}
            </div>

        </>
    );
};
