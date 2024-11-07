
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GarmentsProductContext = createContext();

export const useGarmentsProducts = () => {
    return useContext(GarmentsProductContext);
};

export const GarmentsProductProvider = ({ children }) => {
    const [itemShow, setItemShow] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_GARMENTS_SHOW);
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
        <GarmentsProductContext.Provider value={{ itemShow, loading }}>
            {children}
        </GarmentsProductContext.Provider>
    );
};
