// import React, { useState, useEffect, useRef } from 'react';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";

// export const DropDownMobile = () => {
//     const [isOpen, setOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const handleClick = () => {
//         setOpen(!isOpen);
//     };

//     const handleOutsideClick = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setOpen(false);
//         }
//     };

//     const handleScroll = () => {
//         setOpen(false);
//     };
// const MobileLiClosed =()=>{
//     setOpen(false)
// }
//     useEffect(() => {

//         document.addEventListener('mousedown', handleOutsideClick);
//         window.addEventListener('scroll', handleScroll);


//         return () => {
//             document.removeEventListener('mousedown', handleOutsideClick);
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     return (
//         <div className="relative" ref={dropdownRef}>
//             <div 
//                 className="flex items-center cursor-pointer "
//                 onClick={handleClick}
//             >
//                 <h1 className=" font-medium mr- text-center">Mobile & Mobile Accessories</h1>
//                 {/* {isOpen ? (
//                     <IoMdArrowDropup className=" text-md  " />
//                 ) : (
//                     <IoMdArrowDropdown className=" text-md" />
//                 )} */}
//             </div>
//             {isOpen && (
//                 <ul className="mt-2 list-none  font-medium absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg "
//                 onClick={MobileLiClosed}>
//                      <Link to="/mobile">
//                         <li className="py-1 px-4 hover:bg-green-100 cursor-pointer transition-colors duration-300">Mobile</li>
//                     </Link>
//                     <Link to="/cable">
//                         <li className="py-1 px-4 hover:bg-green-100 cursor-pointer transition-colors duration-300">C type USB</li>
//                     </Link>
//                      <Link to="/Charge">
//                         <li className="py-1 px-4 hover:bg-green-100 cursor-pointer transition-colors duration-300">Charge</li>
//                     </Link>
//                     <Link to="/Headphone">
//                         <li className="py-1 px-4 hover:bg-green-100 cursor-pointer transition-colors duration-300">Headphone </li>
//                     </Link>


//                 </ul>
//             )}
//         </div>
//     );
// };

import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDropdown } from '../Contextapi/DropdownContext';

export const DropDownMobile = () => {
    const { openDropdown, handleMouseLeave, dropdownRef } = useDropdown();

    return (
        <div className="relative z-50">
            <div className="flex items-center cursor-pointer z-50">
                <h1 className="font-medium mr- text-center">Mobile & Accessories</h1>
                {/* {openDropdown === 'mobile' ? <IoMdArrowDropup className="text-md" /> : <IoMdArrowDropdown className="text-md" />} */}
            </div>
            {openDropdown === 'mobile' && (
                <ul ref={dropdownRef} className="list-none md:ml-2 font-medium absolute bg-white z-50 border border-gray-300 rounded-md shadow-lg text-sm">
                    <Link to="/cable">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">C type USB</li>
                    </Link>
                    <Link to="/Headphone">
                        <li className="py-1 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Headphone</li>
                    </Link>
                    <Link to="/charge">
                        <li className="py-1 px-2 z-50 hover:bg-red-100 cursor-pointer transition-colors duration-300">Charger</li>
                    </Link>
                    <Link to="/Moblie">
                        <li className="py-1 z-50 px-2 hover:bg-red-100 cursor-pointer transition-colors duration-300">Mobile</li>
                    </Link>
                </ul>
            )}
        </div>
    );
};
