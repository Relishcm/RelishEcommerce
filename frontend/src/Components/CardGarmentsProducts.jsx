// import React, { useState } from 'react';
// import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
// import { DropHoverCart } from './DropHoverCart';
// import '../CSS/Spinner.css';
// import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';

// export const GarmentsCardProducts = ({
//   category,
//   Productcategory,
//   price,
//   image,
//   image1,
//   image2,
//   image3,
//   productId,
//   discountPrice,
//   productNumber,
//   name,
//   description,
//   size
// }) => {
//   const { setOpenDropdown } = useHoverDropdown();
//   const [loading, setLoading] = useState(true);


//   const { itemShow } = useGarmentsProducts();

//   const filteredItems = itemShow.filter((item) => item.Productcategory === 'garments');


//   const sizes = size || [];

//   return (
//     <div
//       className="card p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer relative"
//       onClick={() => setOpenDropdown(name)}
//       onMouseEnter={() => setOpenDropdown(name)}
//       onMouseLeave={() => setOpenDropdown(null)}
//     >
//       <div className="text-center mb-1">
//         <h2 className="text-md sm:text-xs md:text-lg lg:text-xl font-semibold">{name}</h2>
//       </div>

//       {/* Check if Productcategory is 'garments' to show size selection */}
//       {Productcategory === 'garments' && filteredItems.length > 0 && (
//         <div className="flex space-x-4 mt-2 text-center justify-center mb-4">
//           <h3>Select Size :</h3>

//           {sizes.length > 0 ? (
//             sizes.map((sizeOption, index) => (
//               <button
//                 key={index}
//                 className="rounded-md"
//               >
//                 {sizeOption}
//               </button>
//             ))
//           ) : (
//             <p>No sizes available</p>
//           )}
//         </div>
//       )}

//       <DropHoverCart
//         dropdownName={name}
//         product={{
//           category,
//           price,
//           image,
//           image1,
//           image2,
//           image3,
//           productId,
//           discountPrice,
//           name,
//           description,
//           productNumber,
//           size,
//           Productcategory
//         }}
//       />

//       <div className="text-lg flex justify-center items-center gap-3 mb-">
//         <p className="text-red-600 font-bold">₹{discountPrice}</p>
//         <p className="text-gray-500 line-through">₹{price}</p>
//       </div>

//       <div className="icon h-60 flex items-center justify-center relative">
//         {loading && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="spinner-border animate-spin inline-block w-8 h-8 rounded-full" role="status">
//               <span className="visually-hidden"></span>
//             </div>
//           </div>
//         )}
//         <img
//           src={image}
//           className={`h-full w-full rounded-lg border object-cover ${loading ? 'hidden' : 'block'}`}
//           alt={name}
//           onLoad={() => setLoading(false)}
//         />
//       </div>
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; 
import { useHoverDropdown } from '../Contextapi/CartDropDownHover';
import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';
import { useCart } from '../Contextapi/CartContextapi';
import { useWish } from '../Contextapi/WishContextapi';
import ContentLoader from 'react-content-loader'; // Import ContentLoader

export const GarmentsCardProducts = ({
  category,
  Productcategory,
  price,
  image,
  image1,
  image2,
  image3,
  productId,
  discountPrice,
  productNumber,
  name,
  description,
  size
}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { itemShow } = useGarmentsProducts();
  const { addToWish, removeFromWish, checkWishStatus } = useWish();

  const filteredItems = itemShow.filter((item) => item.Productcategory === 'garments');
  const sizes = size || [];

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const fetchWishListStatus = async () => {
      const liked = await checkWishStatus(productId);  
      setIsLike(liked);
    };

    fetchWishListStatus();
  }, [productId, checkWishStatus]);

  const handleClick = () => {
    navigate('/view', { state: { product: { category, price, image, image1, image2, image3, productId, discountPrice, name, description, productNumber, size, Productcategory } } });
  };

  const handleAddWish = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await addToWish({ productId, category, price, image, image1, image2, image3, productId, discountPrice, name, description, productNumber, size, Productcategory });
        setIsLike(true);
      } catch (error) {
        console.error('Failed to add to wishlist:', error);
      }
    } else {
      navigate('/auth');
    }
  };

  const handleRemoveWish = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await removeFromWish(productId);
        setIsLike(false);
      } catch (error) {
        console.error('Failed to remove from wishlist:', error);
      }
    } else {
      navigate('/auth');
    }
  };

  const handleLikeClick = () => {
    if (isLike) {
      handleRemoveWish();
    } else {
      handleAddWish();
    }
  };

  return (
    <div className="card p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer relative">
      <div className="absolute top-2 right-2">
        <Tooltip text={isLike ? "Remove from Wishlist" : "Add to Wishlist"}>
          <FaHeart
            className={`text-2xl ${isLike ? 'text-red-600' : 'text-gray-400'}`}
            onClick={handleLikeClick}
          />
        </Tooltip>
      </div>
      <div onClick={handleClick}>
        <div className="text-center mb-1">
          <h2 className="text-md sm:text-xs md:text-lg lg:text-xl font-semibold">{name}</h2>
        </div>

        {Productcategory === 'garments' && filteredItems.length > 0 && (
          <div className="flex space-x-4 mt-2 text-center justify-center mb-4">
            <h3>Select Size :</h3>
            {sizes.length > 0 ? (
              sizes.map((sizeOption, index) => (
                <button key={index} className="rounded-md">
                  {sizeOption}
                </button>
              ))
            ) : (
              <p>No sizes available</p>
            )}
          </div>
        )}

        <div className="text-lg flex justify-center items-center gap-3 mb-4">
          <p className="text-red-600 font-bold">₹{discountPrice}</p>
          <p className="text-gray-500 line-through">₹{price}</p>
        </div>

        <div className="icon h-60 flex items-center justify-center relative">
          {loading && (
            <ContentLoader
              speed={2}
              width="100%"
              height="100%"
              viewBox="0 0 400 160"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
            </ContentLoader>
          )}
          <img
            src={image}
            className={`h-full w-full rounded-lg border object-cover ${loading ? 'hidden' : 'block'}`}
            alt={name}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
};

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute hidden group-hover:block bg-black text-white text-sm rounded py-1 px-2 max-w-xs whitespace-nowrap transform -translate-x-1/2 -translate-y-2 bottom-full left-1/2">
        {text}
        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black" />
      </div>
    </div>
  );
};
