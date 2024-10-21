import React from 'react'
import { DropDownMobile } from './DropDownMobile'
import { DropDownEyeglasses } from './DropDownEyeglasses'
import { DropDownGarments } from './DropDownGarments'
import { DropDownCosmetices } from './DropDownCosmetices'
import { DropDowntea } from './DropDowntea'

export const NavbarProducts = () => {
  return (
<>
<div className='bg-gray-50   border-t sm:p-2 md:p-2 shadow-md font-medium'>
    <ul className='flex  '>
        <li className=''><DropDownMobile /></li>
        <li className=''><DropDownEyeglasses /></li>
        <li className=''><DropDownGarments/></li>
        <li className=''><DropDownCosmetices /></li>
        <li className=''><DropDowntea /></li>
    </ul>
</div>
</>
  )
}
