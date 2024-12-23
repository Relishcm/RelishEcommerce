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



// import React, { useEffect, useState } from 'react';
// import { MobileCardProducts } from './MobileCardProducts';
// import { useProducts } from '../Contextapi/ShowProduct';

// export const RelatedProduct = ({ category }) => {
//     const { itemShow, loading } = useProducts();
//     const [relatedProduct, setRelatedProduct] = useState([]);

//     useEffect(() => {
//         setRelatedProduct(
//             itemShow.filter((data) => data.category.toLowerCase() === category.toLowerCase())
//         );
//     }, [category, itemShow]);

//     return (
//         <div className="text-center px-4">
//             <h1 className="mt-5 text-3xl">Related Products</h1>
//             {loading ? (
//                 <p>Loading...</p> 
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-5">
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
import { GarmentsCardProducts } from './CardGarmentsProducts'; 
import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts'; 
import { useProducts } from '../Contextapi/ShowProduct';

export const RelatedProduct = ({ category }) => {
  const { itemShow: mobileItems, loading: mobileLoading } = useProducts(); 
  const { itemShow: garmentsItems, loading: garmentsLoading } = useGarmentsProducts(); // garments products context
  const [relatedProducts, setRelatedProducts] = useState([]);

  
  useEffect(() => {
    // Filtering mobile products by category
    const filteredMobileItems = mobileItems.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );


    const filteredGarmentsItems = garmentsItems.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );


    setRelatedProducts([...filteredMobileItems, ...filteredGarmentsItems]);
  }, [category, mobileItems, garmentsItems]);


  if (mobileLoading || garmentsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-center px-4">
      <h1 className="mt-5 text-3xl">Related Products</h1>
      {relatedProducts.length === 0 ? (
        <p>No related products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-5">
          {relatedProducts.map((item) => (
            <div key={item._id}>
              {item.category === 'Mobile' ? (
                <MobileCardProducts
                  category={item.category}
                  price={item.price}
                  image={item.image}
                  productId={item._id}
                  discountPrice={item.discountPrice}
                  name={item.name}
                  description={item.description}
                  image1={item.image1}
                  image2={item.image2}
                  image3={item.image3}
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
                  size={item.size}
                  image1={item.image1}
                  image2={item.image2}
                  image3={item.image3}
                  productNumber={item.productNumber}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};





















// import React, { useEffect, useState } from 'react';
// import { useProducts } from '../Contextapi/ProductsContext'; // Mobile product context
// import { MobileCardProducts } from './MobileCardProducts';
// import { GarmentsCardProducts } from './CardGarmentsProducts'; // Garment product component
// import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts'; // Garment product context
// import { useCosmeticsProducts } from '../Contextapi/CosmeticsContext'; // Cosmetics product context

// export const RelatedProduct = ({ category }) => {
//   // Fetch data from the context for Mobile, Garments, and Cosmetics
//   const { itemShow: mobileItems, loading: mobileLoading } = useProducts(); // Mobile product context
//   const { itemShow: garmentsItems, loading: garmentsLoading } = useGarmentsProducts(); // Garment product context
//   const { itemShow: cosmeticsItems, loading: cosmeticsLoading } = useCosmeticsProducts(); // Cosmetics product context
  
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   // Filter related products by category
//   useEffect(() => {
//     // Filter mobile items based on the selected category
//     const filteredMobileItems = mobileItems.filter(
//       (product) => product.category.toLowerCase() === category.toLowerCase()
//     );

//     // Filter garment items based on the selected category
//     const filteredGarmentsItems = garmentsItems.filter(
//       (product) => product.category.toLowerCase() === category.toLowerCase()
//     );

//     // Filter cosmetics items based on the selected category
//     const filteredCosmeticsItems = cosmeticsItems.filter(
//       (product) => product.category.toLowerCase() === category.toLowerCase()
//     );

//     // Combine all filtered items
//     setRelatedProducts([
//       ...filteredMobileItems,
//       ...filteredGarmentsItems,
//       ...filteredCosmeticsItems,
//     ]);
//   }, [category, mobileItems, garmentsItems, cosmeticsItems]); // Re-run whenever any product list changes

//   // Loading state check for any of the categories
//   if (mobileLoading || garmentsLoading || cosmeticsLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="text-center px-4">
//       <h1 className="mt-5 text-3xl">Related Products</h1>
//       {relatedProducts.length === 0 ? (
//         <p>No related products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-5">
//           {relatedProducts.map((item) => (
//             <div key={item._id}>
//               {item.category === 'Mobile' ? (
//                 <MobileCardProducts
//                   category={item.category}
//                   price={item.price}
//                   image={item.image}
//                   productId={item._id}
//                   discountPrice={item.discountPrice}
//                   name={item.name}
//                   description={item.description}
//                 />
//               ) : item.category === 'Garment' ? (
//                 <GarmentsCardProducts
//                   category={item.category}
//                   price={item.price}
//                   image={item.image}
//                   productId={item._id}
//                   discountPrice={item.discountPrice}
//                   name={item.name}
//                   description={item.description}
//                 />
//               ) : item.category === 'Cosmetics' ? (
//                 <div key={item._id}>
//                   {/* Render Cosmetics card, you can create a component for Cosmetics like MobileCardProducts */}
//                   <div className="product-card">
//                     <img src={item.image} alt={item.name} />
//                     <h2>{item.name}</h2>
//                     <p>{item.description}</p>
//                     <p>₹{item.discountPrice}</p>
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
