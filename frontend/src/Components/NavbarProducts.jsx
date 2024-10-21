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
<div className='bg-gray-50   border-t sm:p-2 md:p-2 shadow-md font-medium'>
    <ul className='flex gap-5 justify-around'>
    <li  onMouseEnter={() => handleMouseEnter('cosmetices')} 
            onMouseLeave={handleMouseLeave} className=''><DropDownCosmetices /></li>
            <li  onMouseEnter={() => handleMouseEnter('garments')} 
            onMouseLeave={handleMouseLeave} className=''><DropDownGarments/></li>
             <li  onMouseEnter={() => handleMouseEnter('jewelry')} 
            onMouseLeave={handleMouseLeave} className=''><DropDownJewelry /></li>
        <li      onMouseEnter={() => handleMouseEnter('mobile')} 
            onMouseLeave={handleMouseLeave} className=''><DropDownMobile /></li>
        <li  onMouseEnter={() => handleMouseEnter('eyeglasses')} 
            onMouseLeave={handleMouseLeave} className=''><DropDownEyeglasses /></li>
        <li  onMouseEnter={() => handleMouseEnter('tea')} 
            onMouseLeave={handleMouseLeave} className=''><DropDowntea /></li>
    </ul>
</div>
</>
  )
}
