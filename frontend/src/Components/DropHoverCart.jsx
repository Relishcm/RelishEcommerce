import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { GiShoppingBag } from "react-icons/gi";
import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
import { useCart } from '../Contextapi/CartContextapi';
import { useWish } from '../Contextapi/WishContextapi';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const DropHoverCart = ({ dropdownName, product }) => {
    const { openDropdown, setOpenDropdown, dropdownRef } = useHoverDropdown();
    const { addToCart, removeFromCart, checkCartStatus } = useCart();
    const { addToWish, removeFromWish, checkWishStatus } = useWish();
    const navigate = useNavigate();
                 
    const [isLike, setIsLike] = useState(false);
    const [cartisLike, setCartisLike] = useState(false);

    useEffect(() => {
        const fetchWishListStatus = async () => {
        const liked = await checkWishStatus(product.productId);
            setIsLike(liked);
        };

        const fetchCartStatus = async () => {
            const cartStatus = await checkCartStatus(product.productId);
            setCartisLike(cartStatus);
            
        };

        fetchWishListStatus();
        fetchCartStatus();
    }, [product.productId, checkWishStatus, checkCartStatus]);

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
        isLike ? handleRemoveWish() : handleAddWish();
    };

    const handleAddToCart = async (quantity = 1) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await addToCart(product, quantity);
                setCartisLike(true);
            } catch (error) {
                console.error("Failed to add to cart:", error);

            }
            setOpenDropdown(null);
        } else {
            navigate("/auth");
        }
    };

    const handleRemoveFromCart = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await removeFromCart(product.productId);
                setCartisLike(false);
            } catch (error) {
                console.error("Failed to remove from cart:", error);
            }
            setOpenDropdown(null);
        } else {
            navigate("/auth");
        }
    };

    const handleCartLikeClick = () => {
        cartisLike ? handleRemoveFromCart() : handleAddToCart();
    };

    const handleClick = () => {
        navigate('/view', { state: { product } });
    };

    return (
        <>
            <div className="relative z-50" onClick={() => setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)}>
                <div className="flex items-center cursor-pointer">
                    <h1 className="font-medium text-center"></h1>
                </div>
                {openDropdown === dropdownName && (
                    <ul ref={dropdownRef} className="list-none absolute font-medium bg-white z-50 border border-gray-300 rounded-md shadow-lg flex w-full justify-evenly   ">
                        <li
                            className={`py-1 px-4 hover:bg-red-50 cursor-pointer transition-colors duration-300 ${cartisLike ? 'text-red-800' : ''}`}
                            onClick={handleCartLikeClick}
                        >
                            <Tooltip text={cartisLike ? "Remove from Cart" : "Add to Cart"}><GiShoppingBag className='text-2xl' /></Tooltip>
                        </li>
                        <li className={`py-1 px-4 hover:bg-red-50 cursor-pointer transition-colors duration-300 ${isLike ? 'text-red-800' : ''}`}
                            onClick={handleLikeClick}>
                            <Tooltip text={isLike ? "Remove from Wishlist" : "Add to Wishlist"}><FaHeart className='text-2xl' /></Tooltip>
                        </li>
                        <li className='py-1 px-4 hover:bg-red-50 cursor-pointer transition-colors duration-300' onClick={handleClick}>
                            <Tooltip text="View Page"><FaEye className='text-2xl' /></Tooltip>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
};


const Tooltip = ({ children, text }) => {
    return (
        <div className="relative group inline-block">
            {children}
            <div className="absolute hidden group-hover:block bg-black text-white text-sm rounded py-1 px-2 max-w-xs whitespace-nowrap transform -translate-x-1/2 -translate-y-2 bottom-full left-1/2">
                {text}
                <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black" />
            </div>
        </div>
    );
};
