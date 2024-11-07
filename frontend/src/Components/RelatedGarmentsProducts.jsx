
import React, { useEffect, useState } from 'react';
import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';
import { GarmentsCardProducts } from './CardGarmentsProducts';

export const RelatedGarmentsProducts = ({ category }) => {
    const { itemShow, loading } = useGarmentsProducts();
    const [relatedProduct, setRelatedProduct] = useState([]);

    useEffect(() => {
        setRelatedProduct(
            itemShow.filter((data) => data.category.toLowerCase() === category.toLowerCase())
        );
    }, [category, itemShow]);

    return (
        <div className="text-center px-4">
            <h1 className="mt-5 text-3xl">Related Products</h1>
            {loading ? (
                <p>Loading...</p> 
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-5">
                    {Array.isArray(relatedProduct) && relatedProduct.length > 0 ? (
                        relatedProduct.map((item) => (
                            <div key={item._id}>
                                <GarmentsCardProducts
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
                    ) : (
                        <p>No related products available.</p>
                    )}
                </div>
            )}
        </div>
    );
};
