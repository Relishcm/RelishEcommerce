import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartlistCount, setCartlistCount] = useState(0);

    async function addToCart(product, quantity, selectedSize) {
        const requiredFields = ['category', 'name', 'description', 'price', 'discountPrice', 'image', 'productId'];
        const missingFields = requiredFields.filter(field => !product[field]);

        if (missingFields.length > 0) {
            alert(`Invalid product data: missing required fields: ${missingFields.join(', ')}`);
            return;
        }

        // If the product is a cosmetic and no size is selected, set a default value (e.g., 'N/A')
        if (product.category === 'Cosmetics' && !selectedSize) {
            selectedSize = 'N/A'; // Default size for cosmetics
        }
        console.log("Sending data to API:", {
            category: product.category,
            name: product.name,
            description: product.description,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            productId: product.productId,
            quantity,
            size: selectedSize
          });
          
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_ADD_CART,
                {
                    category: product.category,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    discountPrice: product.discountPrice,
                    image: product.image,
                    productId: product.productId,
                    quantity,
                    size: selectedSize || 'N/A',  // Ensure that size is always defined, especially for cosmetics
                },
                { headers: { Authorization: localStorage.getItem("token") } }
            );

            if (response.status === 201) {
                alert("Added to Cart");
                fetchCount();
            }
        } catch (error) {
            console.error("Failed to add to cart:", error.response?.data || error);
            alert("Failed to add to cart. Maybe it's already in the cart.");
        }
    }

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_REMOVE_CART,
                { productId },
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            if (response.status === 200) {
                alert("Removed from cart");
                fetchCount();
            }
        } catch (error) {
            console.error("Error removing from cart:", error.response?.data || error);
            alert("Failed to remove from cart.");
        }
    };

    const fetchCount = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_CART_COUNT, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            if (response.data && typeof response.data.count === 'number') {
                setCartlistCount(response.data.count);
            } else {
                console.error("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    const checkCartStatus = async (productId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_CART_CHECK_STATUS}/${productId}`,
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            return response.data.isInCart;
        } catch (error) {
            console.error("Error checking cart list status:", error);
            return false;
        }
    };

    useEffect(() => {
        fetchCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartlistCount, setCartlistCount, addToCart, checkCartStatus, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartContextProvider');
    }
    return context;
};

export { CartContextProvider, useCart };
