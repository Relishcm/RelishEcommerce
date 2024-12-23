// import React, { useState } from 'react';
// import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
// import { DropHoverCart } from './DropHoverCart';
// import '../CSS/Spinner.css';

// export const GarmentsCardProducts = ({ category, price, image, image1, image2, image3, productId, discountPrice,productNumber, name, description,size }) => {
//     const { setOpenDropdown } = useHoverDropdown();
//     const [loading, setLoading] = useState(true);

//     return (
//         <div
//             className="card p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer relative"
//             onClick={() => setOpenDropdown(name)}
//             onMouseEnter={() => setOpenDropdown(name)}
//             onMouseLeave={() => setOpenDropdown(null)}
//         >
//             <div className="text-center mb-3">
//                 <h2 className="text-md sm:text-xs md:text-lg lg:text-xl font-semibold">{name}</h2>
//             </div>
//             <div>
//                 {size}
//             </div>
//             <div className='text-lg flex justify-center items-center gap-3 mb-2'>
//                 <p className="text-red-600 font-bold">₹{discountPrice}</p>
//                 <p className='text-gray-500 line-through'>₹{price}</p>
//             </div>
//             <DropHoverCart
//                 dropdownName={name}
//                 product={{ category, price, image, image1, image2, image3, productId, discountPrice, name, description,productNumber,size }}
//             />

//             <div className="icon h-60 flex items-center justify-center relative">
//                 {loading && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="spinner-border animate-spin inline-block w-8 h-8 rounded-full" role="status">
//                             <span className="visually-hidden"></span>
//                         </div>
//                     </div>
//                 )}
//                 <img
//                     src={image}
//                     className={`h-full w-full rounded-lg border object-cover ${loading ? 'hidden' : 'block'}`}
//                     alt={name}
//                     onLoad={() => setLoading(false)}
//                 />
//             </div>
//         </div>
//     );
// };

import React, { useState } from 'react';
import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
import { DropHoverCart } from './DropHoverCart';
import '../CSS/Spinner.css';

export const GarmentsCardProducts = ({ category, price, image, image1, image2, image3, productId, discountPrice, productNumber, name, description, size }) => {
    const { setOpenDropdown } = useHoverDropdown();
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedProductNumber, setSelectedProductNumber] = useState('');


    const sizes = size || [];
    const productNumbers = productNumber || [];

    return (
        <div
            className="card p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer relative"
            onClick={() => setOpenDropdown(name)}
            onMouseEnter={() => setOpenDropdown(name)}
            onMouseLeave={() => setOpenDropdown(null)}
        >
            <div className="text-center mb-1 ">
                <h2 className="text-md sm:text-xs md:text-lg lg:text-xl font-semibold">{name}</h2>
               
            </div>


            <div className="flex space-x-4 mt-2 text-center justify-center mb-4">
                <h3 className="">Select Size :</h3>

                {sizes.length > 0 ? (
                    sizes.map((sizeOption, index) => (
                        <button
                            key={index}
                              className={`rounded-md  `}
                        >
                            {sizeOption}
                        </button>
                    ))
                ) : (
                    productNumbers.map((productNumberOption, index) => (
                        <div
                            key={index}
 className={` rounded-md 
                     `}
                        >
                            {productNumberOption}
                        </div>
                    ))
                )}
            </div>
          
            <DropHoverCart
                dropdownName={name}
                product={{ category, price, image, image1, image2, image3, productId, discountPrice, name, description, productNumber, size }}
            />
<div className="text-lg flex justify-center items-center gap-3 mb-">
                <p className="text-red-600 font-bold">₹{discountPrice}</p>
                <p className="text-gray-500 line-through">₹{price}</p>
            </div>
            <div className="icon h-60 flex items-center justify-center relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 rounded-full" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                )}
                <img
                    src={image}
                    className={`h-full w-full rounded-lg border object-cover ${loading ? 'hidden' : 'block'}`}
                    alt={name}
                    onLoad={() => setLoading(false)}
                />
            </div>
        </div>
    );
};
