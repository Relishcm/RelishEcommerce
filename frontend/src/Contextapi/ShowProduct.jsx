
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();


export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [itemShow, setItemShow] = useState([]);
    const [loading, setLoading] = useState(true);

   
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_CART_SHOW);
                setItemShow(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products", error);
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ itemShow, loading }}>
            {children}
        </ProductContext.Provider>
    );
};
