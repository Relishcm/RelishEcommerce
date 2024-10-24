// import React from 'react';
// import { CiHeart } from "react-icons/ci";
// import { HiOutlineShoppingBag } from "react-icons/hi2";
// import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
// import { useCart } from '../Contextapi/CartContextapi';


// export const DropHoverCart = ({ dropdownName, product }) => {
//     const { openDropdown, setOpenDropdown, dropdownRef } = useHoverDropdown();
//     const { addToCart } = useCart();

//     const handleAddToCart = (quantity = 1) => {
//         addToCart(product, quantity);
//         setOpenDropdown(null);
//     };

//     return (
//         <div className="relative z-50" onClick={() => setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)}>
//             <div className="flex items-center cursor-pointer">
//                 <h1 className="font-medium text-center"></h1>
//             </div>
//             {openDropdown === dropdownName && (
//                 <ul ref={dropdownRef} className="list-none absolute font-medium bg-white z-50 border border-gray-300 rounded-md shadow-lg flex w-full justify-center">
//                     <li 
//                         className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300"
//                         onClick={() => handleAddToCart(1)}
//                     >
//                         <HiOutlineShoppingBag className='text-2xl' />
//                     </li>
//                     <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300">
//                         <CiHeart className='text-2xl' />
//                     </li>
//                 </ul>
//             )}
//         </div>
//     );
// };


import React from 'react';
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
import { useCart } from '../Contextapi/CartContextapi';

export const DropHoverCart = ({ dropdownName, product }) => {
    const { openDropdown, setOpenDropdown, dropdownRef } = useHoverDropdown();
    const { addToCart, removeFromCart, isLoggedIn, carts } = useCart();

    const isInCart = carts.some(cartItem => cartItem.productId === product.productId);

    const handleAddToCart = (quantity = 1) => {
        if (!isLoggedIn) {
            alert("You need to log in to add items to the cart.");
        } else {
            addToCart(product, quantity);
        }
        setOpenDropdown(null);
    };

    const handleRemoveFromCart = () => {
        if (isInCart) {
            removeFromCart(product.productId);
        }
        setOpenDropdown(null);
    };

    return (
        <div className="relative z-50" onClick={() => setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)}>
            <div className="flex items-center cursor-pointer">
                <h1 className="font-medium text-center"></h1>
            </div>
            {openDropdown === dropdownName && (
                <ul ref={dropdownRef} className="list-none absolute font-medium bg-white z-50 border border-gray-300 rounded-md shadow-lg flex w-full justify-center">
                    <li 
                        className={`py-1 px-4 cursor-pointer transition-colors duration-300 ${isInCart ? 'text-red-500' : ''}`}
                        onClick={() => isInCart ? handleRemoveFromCart() : handleAddToCart(1)}
                    >
                        <HiOutlineShoppingBag className='text-2xl' />
                    </li>
                    <li className="py-1 px-4 hover:bg-red-100 cursor-pointer transition-colors duration-300">
                        <CiHeart className='text-2xl' />
                    </li>
                </ul>
            )}
        </div>
    );
};
