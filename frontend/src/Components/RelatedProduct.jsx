// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MobileCardProducts } from './MobileCardProducts';

// export const RelatedProduct = ({ category }) => {
//     const [itemShow, setItemShow] = useState([]);
//     const [relatedProduct, setRelatedProduct] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setRelatedProduct(
//             itemShow.filter((data) => data.category.toLowerCase() === category.toLowerCase())
//         );
//     }, [category, itemShow]);

//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 const response = await axios.get(import.meta.env.VITE_API_CART_SHOW);
//                 setItemShow(response.data.products); 
//                 setLoading(false); 
//             } catch (error) {
//                 console.error("Failed to fetch products", error);
//                 setLoading(false); 
//             }
//         }
//         fetchProducts();
//     }, []);

//     return (
//         <div className='text-center px-4 '>
//             <h1 className='mt-5 text-3xl'>Related Products</h1>
//             {loading ? (
//                 <p>Loading...</p> 
//             ) : (
        
//                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-5'>
//                     {Array.isArray(relatedProduct) && relatedProduct.length > 0 ? (
//                         relatedProduct.map((item) => (
//                             <div key={item._id}>
//                                 <MobileCardProducts
//                                     category={item.category}
//                                     price={item.price}
//                                     image={item.image}
//                                     productId={item._id}
//                                     discountPrice={item.discountPrice}
//                                     name={item.name}
//                                     description={item.description}
//                                 />
//                             </div>
//                         ))
//                     ) : (
//                         <p>No related products available.</p>
//                     )}
//                 </div>
              
//             )}
//         </div>
//     );
// };



import React, { useEffect, useState } from 'react';
import { MobileCardProducts } from './MobileCardProducts';
import { useProducts } from '../Contextapi/ShowProduct';

export const RelatedProduct = ({ category }) => {
    const { itemShow, loading } = useProducts();
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
                    ) : (
                        <p>No related products available.</p>
                    )}
                </div>
            )}
        </div>
    );
};
