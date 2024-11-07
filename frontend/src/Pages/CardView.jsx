import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../Contextapi/CartContextapi';
import { RelatedProduct } from '../Components/RelatedProduct';

const CardView = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product?.discountPrice || 0);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.discountPrice * quantity);
    }
  }, [quantity, product]);

  if (!product) {
    return <div>No product details available.</div>;
  }

  const handleAddToCart = () => {
    if (localStorage.getItem('token')) {
      addToCart(product, quantity);
    } else {
      navigate("/auth");
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  return (
    <> 
    <div className='xl:grid pt-[5vh] grid-cols-2'>
      <div className='md:w-[500px] ml-40 p-6'>
        <img src={product.image} alt={product.name} className='w-full h-auto border' />
      </div>
      <div className='gap-8 justify-center p-8'>
        <h1 className='font-semibold text-3xl'>{product.name}</h1>
        <p className='ml-2 text-lg'>{product.description}</p>
        <p className='text-3xl mt-5'>
          ₹{totalPrice.toFixed(0)} <span className='line-through'>₹{product.price}</span>
        </p>
        
        <div className='flex items-center mt-5'>
          <button 
            onClick={decrementQuantity} 
            className='border border-gray-300 px-3 py-1 rounded-md'
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            readOnly
            className='w-16 px-2 py-1 border border-gray-300 rounded-md text-center mx-2'
          />
          <button 
            onClick={incrementQuantity} 
            className='border border-gray-300 px-3 py-1 rounded-md'
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className='mt-5 bg-red-700 text-white text-2xl px-4 py-2 rounded-md hover:bg-red-900 border transition-all ease-linear duration-300'
        >
          Add to Cart
        </button>
      </div>
       </div>
       
    <RelatedProduct category={product?.category}/>
    </>
  );
}

export default CardView;
