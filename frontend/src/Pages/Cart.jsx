import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useCart } from '../Contextapi/CartContextapi';

const Cart = () => {
  const { removeFromCart } = useCart();
  const [carts, setCart] = useState([]);
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function servercall() {
      try {
        const response = await axios.get("http://localhost:5500/cartRouter/cart", {
          headers: { Authorization: localStorage.getItem("token") }
        });
        const cartItems = response.data.items;
        setCart(cartItems);
        setShow(cartItems.length > 0);

        // Calculate total price considering quantity
        const totalPrice = cartItems.reduce((acc, item) => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQuantity = parseInt(item.quantity, 10) || 0;
          return acc + (itemPrice * itemQuantity);
        }, 0);
        setPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        alert("Error fetching cart data");
      }
    }
    servercall();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    if (localStorage.getItem("token")) {
      try {
        await removeFromCart(productId);
        const updatedCart = carts.filter(item => item.productId !== productId);
        setCart(updatedCart);
        const newTotalPrice = updatedCart.reduce((acc, item) => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQuantity = parseInt(item.quantity, 10) || 0;
          return acc + (itemPrice * itemQuantity);
        }, 0);
        setPrice(newTotalPrice);
      } catch (error) {
        console.error("Error removing from Cart:", error.response?.data || error);
        alert("Failed to remove from Cart.");
      }
    } else {
      navigate("/signup");
    }
  };

  
const handleorder = ()=>{
  navigate("/order")
}
  

  return (
    <div className='min-h-screen'>
      {show && (
        <div className='pt-[10vh] min-h-[100%] '>
          <div className='w-full flex flex-col items-center'>
            <h1 className='text-2xl font-bold mb-4'>Items in Cart</h1>
            <div className='w-full max-w-5xl'>
              <table className='w-full border-collapse border border-gray-300'>
                <thead>
                  <tr className='bg-gray-200'>
                    <th className='border text-center  border-gray-300 px-4 py-2'>Image</th>
                    <th className='border text-center   border-gray-300 px-4 py-2'>Category</th>
                    <th className='border text-center  border-gray-300 px-4 py-2'>Price</th>
                    <th className='border text-center  border-gray-300 px-4 py-2'>Quantity</th>
                    <th className='border text-center  border-gray-300 px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item, index) => (
                    <tr key={index} className='border-b'>
                      <td className='border text-center  border-gray-300 px-4 py-2'>
                        <img src={item.image} className='w-24 h-auto text-center ' alt={item.category} />
                      </td>
                      <td className='border text-center  border-gray-300 px-4 py-2'>{item.category}</td>
                      <td className='border text-center border-gray-300 px-4 py-2'>₹{item.price}</td>
                      <td className='border text-center  border-gray-300 px-4 py-2'>
                        {item.quantity}
                        {/* <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value, 10))}
                          className='w-16 px-2 py-1 border border-gray-300 rounded-md'
                        /> */}
                      </td>
                      <td className='border text-center  border-gray-300 px-4 py-2'>
                        <MdDelete onClick={() => handleRemoveFromCart(item.productId)} className='text-center  text-red-600 size-6 cursor-pointer' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='border-l flex flex-col items-center w-full p-6'>
            <h1 className='text-center text-2xl font-bold mb-4'>Total: ₹{price}</h1>
            <button onClick={handleorder} className='text-2xl px-6 py-2 rounded-md bg-black text-white'>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
