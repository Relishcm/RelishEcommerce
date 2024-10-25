import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

import { GiShoppingBag } from "react-icons/gi";

import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
import { useCart } from '../Contextapi/CartContextapi';
import { useWish } from '../Contextapi/WishContextapi';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const DropHoverCart = ({ dropdownName, product}) => {
    const { openDropdown, setOpenDropdown, dropdownRef } = useHoverDropdown();
    const { addToCart, removeFromCart, isLoggedIn, carts } = useCart();
    const [isLike, setIsLike] = useState(false);
    const { addToWish, removeFromWish, checkWishStatus } = useWish();

    useEffect(() => {
        const fetchWishListStatus = async () => {
            const liked = await checkWishStatus(product.productId);
            setIsLike(liked);
        };

        fetchWishListStatus();
    }, [product.productId, checkWishStatus]);


    const handleAddWish = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await addToWish(product);
                setIsLike(true);
            } catch (error) {
                console.error("Failed to add to wishlist:", error);
            }
        } else {
            navigate("/auth");
        }
    };

    const handleRemoveWish = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await removeFromWish(product.productId);
                setIsLike(false);
            } catch (error) {
                console.error("Failed to remove from wishlist:", error);
            }
        } else {
            navigate("/auth");
        }
    };

    const handleLikeClick = () => {
        if (isLike) {
            handleRemoveWish();
        } else {
            handleAddWish();
        }
    };

    const isInCart = carts.some(cartItem => cartItem.productId === product.productId);

    const handleAddToCart = async (quantity = 1) => {
    if (localStorage.getItem("token")) {
        
        if (!isLoggedIn) {
            alert("You need to log in to add items to the cart.");
        } else {
            addToCart(product, quantity);
        }
        setOpenDropdown(null);
    
    }else{
        navigate("/auth")
    }
};
    const handleRemoveFromCart = () => {
    if (localStorage.getItem("token")) {

        if (isInCart) {
            removeFromCart(product.productId);
        }
        setOpenDropdown(null);
         }else{
        navigate("/auth")
    }
    };

    const navigate = useNavigate(); 

    const handleClick = () => {
        console.log("Navigating to view with product:", product);
        navigate('/view', { state: { product } });
    };

    return (
        <div className="relative z-50" onClick={() => setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)}>
            <div className="flex items-center cursor-pointer">
                <h1 className="font-medium text-center"></h1>
            </div>
            {openDropdown === dropdownName && (
                <ul ref={dropdownRef} className="list-none absolute font-medium bg-white z-50 border border-gray-300 rounded-md shadow-lg flex w-full justify-center">
                    <li
                        className={`py-1 px-4  hover:bg-red-50 cursor-pointer transition-colors duration-300 ${isInCart ? 'text-red-800' : ''}`}
                        onClick={() => isInCart ? handleRemoveFromCart() : handleAddToCart(1)}
                    >
                        <GiShoppingBag className='text-2xl' />
                    </li>
                    <li className={`py-1 px-4 hover:bg-red-50 cursor-pointer transition-colors duration-300  ${isLike ? 'text-red-800' : ''}`}
                        onClick={handleLikeClick}>
                        <FaHeart className='text-2xl' />
                    </li>
                    <li className='py-1 px-4 hover:bg-red-50 cursor-pointer transition-colors duration-300 ' onClick={handleClick}>
                    <FaEye className='text-2xl'/>
                    </li>
                </ul>
            )}
        </div>
    );
};
