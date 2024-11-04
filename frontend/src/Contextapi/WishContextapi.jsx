import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WishContext = createContext();

const WishContextProvider = ({ children }) => {
    const [wishlistCount, setWishlistCount] = useState(0);


    // Add to Wishlist
    const addToWish = async (product) => {
        const wishrequiredFields = ['category', 'name', 'description', 'price', 'discountPrice', 'image', 'productId'];
        const wishmissingFields = wishrequiredFields.filter(field => !product[field]);

        if (wishmissingFields.length > 0) {
            alert(`Invalid product data: missing required fields: ${wishmissingFields.join(', ')}`);
            return;
        }

        try {
            const response = await axios.post(
               import.meta.env.VITE_API_ADD_WISHLIST ,
                {
                    price: product.price,
                    name: product.name,
                    description: product.description,
                    discountPrice: product.discountPrice,
                    category: product.category,
                    image: product.image,
                    productId: product.productId
                },
                {
                    headers: {
                        Authorization:
                            localStorage.getItem("token")
                    }
                }
            );
            if (response.status === 201) {
                alert("Added to Wish");
                fetchCount();
            }
        } catch (error) {
            console.error("Failed to add to wish:", error);
            alert("Failed to add to wish. Maybe it's already in the wish.");
        }

    };

    // Remove from Wishlist
    const removeFromWish = async (productId) => {

        try {
            const response = await axios.post(
               import.meta.env.VITE_API_REMOVE_WISHLIST,
                { productId },
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );
            if (response.status === 200) {
                alert("Removed from Wish");
                fetchCount();
            }
        } catch (error) {
            console.error("Error removing from wish:", error.response?.data || error);
            alert("Failed to remove from wish.");
        }

    };

    // Fetch Wishlist Count
    const fetchCount = async () => {

        try {
            const response = await axios.get(import.meta.env.VITE_API_WISHLIST_COUNT, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            if (response.data && typeof response.data.count === 'number') {
                setWishlistCount(response.data.count);
            } else {
                console.error("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching wishlist count:", error);
        }

    };

    // Check Wishlist Status for a Product
    const checkWishStatus = async (productId) => {

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_CART_CHECK_STATUS}/${productId}`,
               
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            return response.data.isLiked;
        } catch (error) {
            console.error("Error checking wish list status:", error);
            return false;
        }

    };

    useEffect(() => {
        fetchCount(); // Fetch count on mount
    }, []);


    return (
        <WishContext.Provider value={{ wishlistCount, addToWish, removeFromWish, checkWishStatus, setWishlistCount }}>
            {children}
        </WishContext.Provider>
    );
};

const useWish = () => {
    const context = useContext(WishContext);
    if (!context) {
        throw new Error('useWish must be used within a WishContextProvider');
    }
    return context;
};

export { WishContextProvider, useWish };
