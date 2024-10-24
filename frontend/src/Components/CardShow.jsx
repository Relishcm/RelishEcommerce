import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MobileCardProducts } from './MobileCardProducts';

export const CardShow = ({ category }) => {
    const [itemShow, setItemShow] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get("http://localhost:5500/MobileProductRouter/getallproducts");
                setItemShow(response.data.products); 
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        }
        fetchProducts();
    }, []);

    // Filter items based on category prop
    const filteredItems = category ? itemShow.filter(item => item.category === category) : itemShow;

    return (
        <div className=''>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {filteredItems.map((item) => (
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
                ))}
            </div>
        </div>
    );
};
