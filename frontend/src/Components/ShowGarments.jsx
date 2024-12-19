import React from 'react';
import { GarmentsCardProducts } from './CardGarmentsProducts';
import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';

export const ShowGarments = ({ category }) => {
    const { itemShow, loading } = useGarmentsProducts();


    const filteredItems = category ? itemShow.filter(item => item.category === category) : itemShow;

 
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredItems.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    filteredItems.map((item) => (
                        <div key={item._id}>
                            <GarmentsCardProducts
                                category={item.category}
                                price={item.price}
                                image={item.image}
                                image1={item.image1}
                                image2={item.image2}
                                image3={item.image3}
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