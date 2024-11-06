import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useWish } from '../Contextapi/WishContextapi';
import { useCart } from '../Contextapi/CartContextapi';

export const WishView = () => {
    const navigate = useNavigate();
    const [wishs, setWishs] = useState([]);
    const { removeFromWish } = useWish();
    const { addToCart } = useCart(); // Access the addToCart function from the CartContext

    // Fetch wishlist items
    useEffect(() => {
        const fetchWishes = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_WISHLIST_VIEW, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setWishs(response.data.items || []); // Set empty array if no items are returned
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    navigate("/auth");
                } else {
                    alert("Error fetching wishlist. Please try again later.");
                }
            }
        };
        fetchWishes();
    }, [navigate]);

    // Remove product from wishlist
    const handleRemoveFromWish = async (productId) => {
        if (localStorage.getItem("token")) {
            try {
                await removeFromWish(productId);
                setWishs(prevWishes => prevWishes.filter(item => item.productId !== productId));
            } catch (error) {
                console.error("Error removing from wishlist:", error);
            }
        } else {
            navigate("/signup");
        }
    };

    // Add product to cart
    const handleAddToCart = (product) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                addToCart(product, 1); 
              
            } catch (error) {
                console.error("Failed to add to cart:", error);
                alert("Failed to add to cart.");
            }
        } else {
            navigate("/auth"); 
        }
    };

    return (
        <div className="p-10 mx-auto max-w-6xl">
            <h1 className="text-4xl text-red-800 font-semibold mb-6">Wish List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {wishs.length === 0 ? (
                    <p>No items in your wishlist.</p>
                ) : (
                    wishs.map((wish) => (
                        <div key={wish.productId} className="bg-white w-4/5 border rounded-lg shadow-lg overflow-hidden ">
                            <img src={wish.image} alt={wish.name} className="w-full h-48 object-cover" />
                            <div className="p-4 text-center">
                                <p className="text-xl font-semibold">{wish.name}</p>
                                <p className="text-lg">
                                    ₹{wish.discountPrice} <span className="line-through text-gray-500">₹{wish.price}</span>
                                </p>
                                <button
                                    onClick={() => handleAddToCart(wish)} // Pass the wish object
                                    className="mt-4 bg-red-600 text-white text-lg px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 mr-3"
                                >
                                    Add to cart
                                </button>
                                <button
                                    onClick={() => handleRemoveFromWish(wish.productId)}
                                    className="mt-4 bg-red-600 text-white text-lg px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
