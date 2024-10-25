import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartlistCount, setCartlistCount] = useState(0);
    const [carts, setCarts] = useState([]); 
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    async function addToCart(product, quantity) {
        if (!isLoggedIn) {
            alert("You need to log in to add items to the cart.");
            return;
        }

        
        const requiredFields = ['category', 'name', 'description', 'price', 'discountPrice', 'image', 'productId'];
        const missingFields = requiredFields.filter(field => !product[field]);

        if (missingFields.length > 0) {
            alert(`Invalid product data: missing required fields: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5500/cartRouter/addcart",
                {
                    category: product.category,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    discountPrice: product.discountPrice,
                    image: product.image,
                    productId: product.productId,
                    quantity
                },
                { headers: { Authorization: localStorage.getItem("token") } }
            );

            if (response.status === 201) {
                alert("Added to Cart");
                fetchCount();
                fetchCart();
            }
        } catch (error) {
            console.error("Failed to add to cart:", error.response?.data || error);
            alert("Failed to add to cart. Maybe it's already in the cart.");
        }
    }

        const removeFromCart = async (productId) => {
        try {
            const response = await axios.post(
                "http://localhost:5500/cartRouter/removeCart",
                { productId },
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            if (response.status === 200) {
                alert("Removed from cart");
                fetchCount();
                fetchCart(); // Fetch updated cart items
            }
        } catch (error) {
            console.error("Error removing from cart:", error.response?.data || error);
            alert("Failed to remove from cart.");
        }
    };


    const fetchCount = async () => {
        if (!isLoggedIn) {
            setCartlistCount(0);
            return;
        }

        try {
            const response = await axios.get("http://localhost:5500/cartRouter/count", {
                headers: { Authorization: localStorage.getItem("token") }
            });
            if (response.data && typeof response.data.count === 'number') {
                setCartlistCount(response.data.count);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    const fetchCart = async () => {
        if (!isLoggedIn) {
            setCarts([]);
            return;
        }

        try {
            const response = await axios.get("http://localhost:5500/cartRouter/cart", {
                headers: { Authorization: localStorage.getItem("token") }
            });
            setCarts(response.data.items || []);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const checkWishStatus = async (productId) => {

        try {
            const response = await axios.get(
                `http://localhost:5500/cartRouter/cartcheckStatus/${productId}`,
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            return response.data.isInCart;
        } catch (error) {
            console.error("Error checking wish list status:", error);
            return false;
        }

    };
    useEffect(() => {
        fetchCount();
        fetchCart();
    }, [isLoggedIn]);

    return (
        <CartContext.Provider value={{ cartlistCount,setCartlistCount, addToCart,checkWishStatus, isLoggedIn,removeFromCart, setIsLoggedIn, carts }}>
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
