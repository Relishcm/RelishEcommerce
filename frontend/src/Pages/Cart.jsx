import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useCart } from '../Contextapi/CartContextapi';
import { useUpdatedCarts } from '../Contextapi/CartTablecontextapi';
import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';

const Cart = () => {
  const { removeFromCart } = useCart();
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const { carts, updateCart, setCarts } = useUpdatedCarts();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      async function serverCall() {
        try {
          const response = await axios.get(import.meta.env.VITE_API_CART_VIEW, {
            headers: { Authorization: token }
          });
          const cartItems = response.data.items || [];
          setCarts(cartItems);
          setShow(cartItems.length > 0);
          updateTotalPrice(cartItems);
        } catch (error) {
          console.error("Error fetching cart data:", error);
          alert("Error fetching cart data");
        }
      }
      serverCall();
    } else {
      navigate('/auth');
    }
  }, []);


  const handleRemoveFromCart = async (productId) => {
    if (localStorage.getItem("token")) {
      try {
        await removeFromCart(productId);
        const updatedCart = carts.filter(item => item.productId !== productId);
        setCarts(updatedCart);
        updateTotalPrice(updatedCart);
      } catch (error) {
        console.error("Error removing from Cart:", error.response?.data || error);
        alert("Failed to remove from Cart.");
      }
    } else {
      navigate("/auth");
    }
  };

  const updateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.discountPrice) || 0;
      const itemQuantity = parseInt(item.quantity, 10) || 0;
      return acc + (itemPrice * itemQuantity);
    }, 0);
    setPrice(totalPrice);
  };

  const incrementQuantity = async (productId) => {
    try {
      const updatedCart = carts.map(item => {
        if (item.productId === productId) {
          item.quantity += 1;
        }
        return item;
      });
      await updateCart(updatedCart);
      const response = await axios.put(import.meta.env.VITE_API_CART_ADD_QUANTITY, { productId, quantity: updatedCart.find(item => item.productId === productId).quantity }, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setCarts(updatedCart);
      setPrice(response.data.totalPrice);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity.");
    }
  };

  const decrementQuantity = async (productId) => {
    try {
      const updatedCart = carts.map(item => {
        if (item.productId === productId && item.quantity > 1) {
          item.quantity -= 1;
        }
        return item;
      });
      await updateCart(updatedCart);
      const response = await axios.put(import.meta.env.VITE_API_CART_ADD_QUANTITY, { productId, quantity: updatedCart.find(item => item.productId === productId).quantity }, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setCarts(updatedCart);
      setPrice(response.data.totalPrice);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity.");
    }
  };

  const handleOrder = () => {
    navigate("/PlaceOrder");
  };


  const { itemShow } = useGarmentsProducts();

  const filteredItems = itemShow.filter((item) => item.Productcategory === 'garments');

  return (
    <div className=''>
      {!show && (
        <div className="flex justify-center items-center min-h-[40vh]">
          <h2>No items in your cart.</h2>
        </div>
      )}
      {show && (
        <div className='pt-[10vh] min-h-[100%]'>
          <div className='w-full flex flex-col items-center'>
            <h1 className='text-2xl font-bold mb-4'>Items in Cart</h1>
            <div className='w-full max-w-5xl'>
              <table className='w-full border-collapse border border-gray-300'>
                <thead>
                  <tr className='bg-gray-200'>
                    <th className='border text-center border-gray-300 px-4 py-2'>Image</th>
                    <th className='border text-center border-gray-300 px-4 py-2'>Category</th>
                    <th className='border text-center border-gray-300 px-4 py-2'>Price</th>
                    <th className='border text-center border-gray-300 px-4 py-2'>Quantity</th>
                    <th className='border text-center border-gray-300 px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item, index) => (
                    <tr key={index} className='border-b'>
                      <td className='text-center flex justify-center items-center px-4 py-2'>
                        <img src={item.image} className='w-24 h-auto' alt={item.name} />
                      </td>
                      <td className='border text-center border-gray-300 px-4 py-2'>{item.name}
                        {item.Productcategory === 'garments' && filteredItems.length > 0 && (

                          <p>size:{item.size}</p>

                        )}
                      </td>
                      <td className='border text-center border-gray-300 px-4 py-2'>₹{item.discountPrice}</td>
                      <td className='border text-center border-gray-300 px-4 py-2'>
                        <button onClick={() => decrementQuantity(item.productId)} className='px-2 text-2xl'>-</button>
                        {item.quantity}
                        <button onClick={() => incrementQuantity(item.productId)} className='px-2 text-xl'>+</button>
                      </td>
                      <td className=' px-2 py-1'>
                        <div onClick={() => {
                          if (confirm("Are You Sure,want remove from cart")) {
                            handleRemoveFromCart(item.productId)
                          }
                        }} className='text-white bg-red-600 text-center flex justify-center items-center
                        px-2 py-2  cursor-pointer' >
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='border-l flex flex-col items-center w-full p-6'>
            <h1 className='text-center text-2xl font-bold mb-4'>Total: ₹{price}</h1>
            <button onClick={handleOrder} className='text-2xl px-6 py-2 rounded-md bg-black text-white'>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );

};

export default Cart;
