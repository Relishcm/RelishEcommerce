// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { MobileCardProducts } from './MobileCardProducts';

// export const SearchProduct = () => {
//     const [itemShow, setItemShow] = useState([]); 
//     const [filteredItems, setFilteredItems] = useState([]); 
//     const { term } = useParams();

   
//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 const response = await axios.get(import.meta.env.VITE_API_CART_SHOW); 
//                 setItemShow(response.data.products); 
//             } catch (error) {
//                 console.error("Failed to fetch products", error);
//             }
//         }
//         fetchProducts();
//     }, []);

 
//     useEffect(() => {
//         if (term) {
            
//             const filtered = itemShow.filter((product) =>
//                 product.name.toLowerCase().includes(term.toLowerCase()) ||
//                 product.description.toLowerCase().includes(term.toLowerCase())
//             );
//             setFilteredItems(filtered);
//         } else {
//             setFilteredItems(itemShow); 
//         }
//     }, [term, itemShow]); 

//     return (
//         <div className='p-10'>
//             <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
//                 {filteredItems.length === 0 ? (
//                     <p>No products found matching "{term}".</p>
//                 ) : (
//                     filteredItems.map((item) => (
//                         <div key={item._id}>
//                             <MobileCardProducts
//                                 category={item.category}
//                                 price={item.price}
//                                 image={item.image}
//                                 productId={item._id}
//                                 discountPrice={item.discountPrice}
//                                 name={item.name}
//                                 description={item.description}
//                             />
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };


// import React, { useEffect, useState } from 'react';
// import { MobileCardProducts } from './MobileCardProducts';
// import { useParams } from 'react-router-dom';
// import { useProducts } from '../Contextapi/ShowProduct';
// import { GarmentsCardProducts } from './CardGarmentsProducts';

// export const SearchProduct = () => {
//     const { itemShow, loading } = useProducts();
//     const [filteredItems, setFilteredItems] = useState([]);
//     const { term } = useParams();

//     useEffect(() => {
//         if (term) {
//             const filtered = itemShow.filter((product) =>
//                 product.name.toLowerCase().includes(term.toLowerCase()) ||
//                 product.description.toLowerCase().includes(term.toLowerCase())
//             );
//             setFilteredItems(filtered);
//         } else {
//             setFilteredItems(itemShow);
//         }
//     }, [term, itemShow]);

//     return (
//         <div className="p-10">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 {filteredItems.length === 0 ? (
//                     <p>No products found matching "{term}".</p>
//                 ) : (
//                     filteredItems.map((item) => (
//                         <div key={item._id}>
//                             <MobileCardProducts
//                                 category={item.category}
//                                 price={item.price}
//                                 image={item.image}
//                                 productId={item._id}
//                                 discountPrice={item.discountPrice}
//                                 name={item.name}
//                                 description={item.description}
//                             />
                          
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };


import React, { useEffect, useState } from 'react';
import { MobileCardProducts } from './MobileCardProducts';
import { GarmentsCardProducts } from './CardGarmentsProducts';
import { useParams } from 'react-router-dom';
import { useProducts } from '../Contextapi/ShowProduct';  // Assuming this is for mobile products
import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';  // Assuming this is for garment products

export const SearchProduct = () => {
    const { itemShow: mobileItems, loading: mobileLoading } = useProducts(); // mobile products context
    const { itemShow: garmentsItems, loading: garmentsLoading } = useGarmentsProducts(); // garments products context

    const [filteredItems, setFilteredItems] = useState([]);
    const { term } = useParams();

    // Combine the products from both mobile and garments contexts
    const allItems = [...mobileItems, ...garmentsItems];

    useEffect(() => {
        if (term) {
            const filtered = allItems.filter((product) =>
                product.name.toLowerCase().includes(term.toLowerCase()) ||
                product.description.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(allItems); // If no search term, display all products
        }
    }, [term, mobileItems, garmentsItems]);

    if (mobileLoading || garmentsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {filteredItems.length === 0 ? (
                    <p>No products found matching "{term}".</p>
                ) : (
                    filteredItems.map((item) => (
                        <div key={item._id}>
                            {item.category === 'mobile' ? (
                                <MobileCardProducts
                                    category={item.category}
                                    price={item.price}
                                    image={item.image}
                                    productId={item._id}
                                    discountPrice={item.discountPrice}
                                    name={item.name}
                                    description={item.description}
                                />
                            ) : (
                                <GarmentsCardProducts
                                    category={item.category}
                                    price={item.price}
                                    image={item.image}
                                    productId={item._id}
                                    discountPrice={item.discountPrice}
                                    name={item.name}
                                    description={item.description}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
