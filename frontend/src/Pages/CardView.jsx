// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useCart } from '../Contextapi/CartContextapi';
// import { RelatedProduct } from '../Components/RelatedProduct';

// const CardView = () => {
//   const { addToCart,checkCartStatus } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const product = location.state?.product;

//   // State for quantity, total price, and the current image displayed
//   const [quantity, setQuantity] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(product?.discountPrice || 0);
//   const [currentImage, setCurrentImage] = useState(product?.image); 
//   // const [selectedSize, setSelectedSize] = useState('');
//   const [selectedproductNumber, setSelectedproductNumber] = useState('');

//   useEffect(() => {
//     if (product) {
//       setTotalPrice(product.discountPrice * quantity);
//       setCurrentImage(product.image);
//     }
//   }, [quantity, product]);

//   if (!product) {
//     return <div>No product details available.</div>;
//   }

//   // const handleAddToCart = () => {
//   //   if (!selectedSize && !selectedproductNumber) {
//   //     alert("Please select a size or product number before adding to cart.");
//   //     return;
//   //   }

//   //   if (localStorage.getItem('token')) {
      
//   //     addToCart(product, quantity, selectedSize, selectedproductNumber);
//   //   } else {
//   //     navigate("/auth");  
//   //   }
//   // };
//   const handleAddToCart = async () => {
//     if (!selectedSize) {
//         alert("Please select a size before adding to cart.");
//         return;
//     }

//     if (!localStorage.getItem('token')) {
//         navigate("/auth");
//         return;
//     }

//     const isInCart = await checkCartStatus(product.productId);

//     if (isInCart) {
//         alert("This item is already in your cart.");
//     } else {
//         addToCart(product, quantity);
//     }
// };

//   const incrementQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
//   };

//   // Function to change the image when one is clicked
//   const handleImageClick = (image) => {
//     setCurrentImage(image);
//   };
  
//   const sizes = product?.size || [];
//   const productNumbers = product?.productNumber || [];

//   return (
//     <>
//       <div className="pt-[5vh] max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Product Images */}
//         <div className="flex justify-center items-center space-x-4">
//           <div className="w-16 md:w-28 h-auto flex flex-col gap-4">
//             {/* Clickable images to change the main image */}
//            {product.image && ( 
//             <img
//               src={product.image}
//               alt="Product Image"
//               className="w-full h-auto object-cover cursor-pointer"
//               onClick={() => handleImageClick(product.image)}
//             />
//             )}
//             {product.image1 && (
//               <img
//                 src={product.image1}
//                 alt="Product Image 1"
//                 className="w-full h-auto object-cover cursor-pointer"
//                 onClick={() => handleImageClick(product.image1)}
//               />
//             )}
//             {product.image2 && (
//               <img
//                 src={product.image2}
//                 alt="Product Image 2"
//                 className="w-full h-auto object-cover cursor-pointer"
//                 onClick={() => handleImageClick(product.image2)}
//               />
//             )}
//             {product.image3 && (
//               <img
//                 src={product.image3}
//                 alt="Product Image 3"
//                 className="w-full h-auto object-cover cursor-pointer"
//                 onClick={() => handleImageClick(product.image3)}
//               />
//             )}
//           </div>

//           <div className='md:w-[500px] ml-40 p-6'>
//             <img src={currentImage} alt={product.name} className='w-full h-auto border' />
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <h1 className="text-3xl font-semibold">{product.name}</h1>
//           <p className="text-lg">{product.description}</p>
//           <div>
//             {/* <h3 className="font-semibold">Select Size</h3> */}
//             <div className="flex space-x-4 mt-2">
//               {sizes.length > 0 ? (
//                 sizes.map((size, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedSize(size)}
//                     className={`border-2 px-4 py-2 rounded-md 
//                       ${selectedSize === size ? 'bg-red-700 text-white' : 'bg-white text-gray-700'}`}
//                   >
//                     {size}
//                   </button>
//                 ))
//               ) : (
//                 productNumbers.map((productNumber, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedproductNumber(productNumber)}
//                     className={`border-2 px-4 py-2 rounded-md 
//                       ${selectedproductNumber === productNumber ? 'bg-red-700 text-white' : 'bg-white text-gray-700'}`}
//                   >
//                     {productNumber}
//                   </button>
//                 ))
//               )}
//             </div>
//           </div>
//           <div>
//           {}
//           </div>
//           <p className="text-3xl mt-5">
//             ₹{totalPrice.toFixed(0)} <span className="line-through text-gray-500">₹{product.price}</span>
//           </p>

//           {/* Quantity Controls */}
//           <div className="flex items-center mt-5">
//             <button
//               onClick={decrementQuantity}
//               className="px-3 py-1 border border-gray-300 rounded-md text-xl"
//             >
//               -
//             </button>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               readOnly
//               className="w-16 mx-2 px-2 py-1 border border-gray-300 rounded-md text-center text-xl"
//             />
//             <button
//               onClick={incrementQuantity}
//               className="px-3 py-1 border border-gray-300 rounded-md text-xl"
//             >
//               +
//             </button>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-red-700 text-white text-2xl py-2 rounded-md hover:bg-red-900 transition duration-300"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Related Products Section */}
//       <RelatedProduct category={product?.category} />
//     </>
//   );
// }

// export default CardView;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../Contextapi/CartContextapi';
import { RelatedProduct } from '../Components/RelatedProduct';

const CardView = () => {
  const { addToCart, checkCartStatus } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
    const { openDropdown, setOpenDropdown, dropdownRef } = useHoverDropdown();

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product?.discountPrice || 0);
  const [currentImage, setCurrentImage] = useState(product?.image);
  
  // Uncomment and define the selectedSize state
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedproductNumber, setSelectedproductNumber] = useState('');

  useEffect(() => {
    if (product) {
      setTotalPrice(product.discountPrice * quantity);
      setCurrentImage(product.image);
    }
  }, [quantity, product]);

  if (!product) {
    return <div>No product details available.</div>;
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    if (!localStorage.getItem('token')) {
      navigate("/auth");
      return;
    }

    const isInCart = await checkCartStatus(product.productId);

    if (isInCart) {
      alert("This item is already in your cart.");
    } else {
      addToCart(product, quantity, selectedSize); // Pass selectedSize as an argument
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  const sizes = product?.size || [];
  const productNumbers = product?.productNumber || [];

  return (
    <>
      <div className="pt-[5vh] max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Images */}
        <div className="flex justify-center items-center space-x-4">
          <div className="w-16 md:w-28 h-auto flex flex-col gap-4">
            {/* Clickable images to change the main image */}
            {product.image && ( 
              <img
                src={product.image}
                alt="Product Image"
                className="w-full h-auto object-cover cursor-pointer"
                onClick={() => handleImageClick(product.image)}
              />
            )}
            {product.image1 && (
              <img
                src={product.image1}
                alt="Product Image 1"
                className="w-full h-auto object-cover cursor-pointer"
                onClick={() => handleImageClick(product.image1)}
              />
            )}
            {product.image2 && (
              <img
                src={product.image2}
                alt="Product Image 2"
                className="w-full h-auto object-cover cursor-pointer"
                onClick={() => handleImageClick(product.image2)}
              />
            )}
            {product.image3 && (
              <img
                src={product.image3}
                alt="Product Image 3"
                className="w-full h-auto object-cover cursor-pointer"
                onClick={() => handleImageClick(product.image3)}
              />
            )}
          </div>

          <div className='md:w-[500px] ml-40 p-6'>
            <img src={currentImage} alt={product.name} className='w-full h-auto border' />
          </div>
        </div>

        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-lg">{product.description}</p>
          <div>
            {/* Select Size */}
            <div className="flex space-x-4 mt-2">
              {sizes.length > 0 ? (
                sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`border-2 px-4 py-2 rounded-md 
                      ${selectedSize === size ? 'bg-red-700 text-white' : 'bg-white text-gray-700'}`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                productNumbers.map((productNumber, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedproductNumber(productNumber)}
                    className={`border-2 px-4 py-2 rounded-md 
                      ${selectedproductNumber === productNumber ? 'bg-red-700 text-white' : 'bg-white text-gray-700'}`}
                  >
                    {productNumber}
                  </button>
                ))
              )}
            </div>
          </div>

          <p className="text-3xl mt-5">
            ₹{totalPrice.toFixed(0)} <span className="line-through text-gray-500">₹{product.price}</span>
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center mt-5">
            <button
              onClick={decrementQuantity}
              className="px-3 py-1 border border-gray-300 rounded-md text-xl"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              readOnly
              className="w-16 mx-2 px-2 py-1 border border-gray-300 rounded-md text-center text-xl"
            />
            <button
              onClick={incrementQuantity}
              className="px-3 py-1 border border-gray-300 rounded-md text-xl"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-700 text-white text-2xl py-2 rounded-md hover:bg-red-900 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProduct category={product?.category} />
    </>
  );
}

export default CardView;
