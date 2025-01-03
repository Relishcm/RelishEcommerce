// import React from 'react';
// import { GarmentsCardProducts } from './CardGarmentsProducts';
// import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';

// export const ShowGarments = ({ category }) => {
//     const { itemShow, loading } = useGarmentsProducts();
//     const filteredItems = category ? itemShow.filter(item => item.category === category) : itemShow;

 
//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 {filteredItems.length === 0 ? (
//                     <p>No products available.</p>
//                 ) : (
//                     filteredItems.map((item) => (
//                         <div key={item._id}>
//                             <GarmentsCardProducts
//                               Productcategory={item.Productcategory}
//                                 category={item.category}
//                                 price={item.price}
//                                 image={item.image}
                              
//                                 productId={item._id}
//                                 discountPrice={item.discountPrice}
//                                 name={item.name}
//                                 description={item.description}
//                                 size={item.size}
//                                 image1={item.image1}
//                                 image2={item.image2}
//                                 image3={item.image3}
//                                 productNumber={item.productNumber}
//                             />
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };


import React from 'react';
import { GarmentsCardProducts } from './CardGarmentsProducts';
import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';
import ContentLoader from 'react-content-loader';

export const ShowGarments = ({ category }) => {
    const { itemShow, loading } = useGarmentsProducts();
    const filteredItems = category ? itemShow.filter(item => item.category === category) : itemShow;

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div key={index}>
                        <ContentLoader
                            speed={2}
                            width={250}
                            height={400}
                            viewBox="0 0 250 400"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="1" y="220" rx="5" ry="5" width="150" height="15" />
                            <rect x="0" y="250" rx="5" ry="5" width="200" height="15" />
                            <rect x="0" y="280" rx="5" ry="5" width="80" height="15" />
                            <rect x="0" y="310" rx="5" ry="5" width="100" height="15" />
                            <rect x="0" y="10" rx="10" ry="10" width="250" height="200" />

                        </ContentLoader>
                    </div>
                ))}
            </div>
        );
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
                                Productcategory={item.Productcategory}
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
