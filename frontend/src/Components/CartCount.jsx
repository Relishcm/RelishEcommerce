import React from 'react';
import { GiShoppingBag } from "react-icons/gi";
import { useCart } from '../Contextapi/CartContextapi';

const CartlistCount = () => {
  const { cartlistCount } = useCart();

  return (
    <div className='relative cursor-pointer'>
      <GiShoppingBag className='text-3xl text-red-800' />
      <span className='absolute top-3 -right-2 bg-gray-700 text-white text-xs rounded-full px-2 py-1'>
        {cartlistCount > 0 ? cartlistCount : 0}
      </span>
    </div>
  );
};

export default CartlistCount;
