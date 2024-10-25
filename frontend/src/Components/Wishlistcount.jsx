
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useWish } from '../Contextapi/WishContextapi';


const WishlistCount = () => {
  const { wishlistCount } = useWish();

  return (
    <div className='relative cursor-pointer'>
      <FaHeart  className='text-3xl text-red-800' />
      
        <span className='absolute top-3 -right-2 bg-gray-700 text-white text-xs rounded-full px-2 py-1'>
   
        {wishlistCount > 0 ? wishlistCount:0}
        </span>
     
    </div>
  );
};

export default WishlistCount;
