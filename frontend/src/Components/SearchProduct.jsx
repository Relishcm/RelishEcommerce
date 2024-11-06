import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MobileCardProducts } from './MobileCardProducts';

export const SearchProduct = () => {
    const [itemShow, setItemShow] = useState([]); // To store all products
    const [filteredItems, setFilteredItems] = useState([]); // To store filtered items
    const { term } = useParams(); // Get search term from the URL

    // Fetch all products from the backend
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_CART_SHOW); // Adjust the API URL
                setItemShow(response.data.products); // Store products
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        }
        fetchProducts();
    }, []);

    // Filter products based on search term
    useEffect(() => {
        if (term) {
            // Filter products by name or description matching the term
            const filtered = itemShow.filter((product) =>
                product.name.toLowerCase().includes(term.toLowerCase()) ||
                product.description.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(itemShow); // If no term, show all products
        }
    }, [term, itemShow]); // Re-run when the term or items change

    return (
        <div className='p-10'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {filteredItems.length === 0 ? (
                    <p>No products found matching "{term}".</p>
                ) : (
                    filteredItems.map((item) => (
                        <div key={item._id}>
                            <MobileCardProducts
                                category={item.category}
                                price={item.price}
                                image={item.image}
                                productId={item._id}
                                discountPrice={item.discountPrice}
                                name={item.name}
                                description={item.description}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
