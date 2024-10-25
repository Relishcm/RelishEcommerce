
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const [carts, setCart] = useState([]);
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
   
  });
  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    async function servercall() {
      try {
        const response = await axios.get("http://localhost:5300/cartRouter/cart", {
          headers: { Authorization: localStorage.getItem("token") }
        });
        const cartItems = response.data.items;
        setCart(cartItems);
        setShow(cartItems.length > 0);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!form.name) {
      errors.name = "Name is required";
    }
    if (!form.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email address is invalid";
    }
    if (!form.address) {
      errors.address = "Address is required";
    }
    if (!form.phone) {
      errors.phone = "Phone number is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    const stripe = await loadStripe("pk_test_51PlSmvBVqwC1cwL1qefUahtgxNEGn4As25bqlDK4X4UMZON5238fNQDFU1QSMhD7ySLczpu8OPe2a1lh1j7cO3aI0085FT4Jtl");

    const body = { products: carts, ...form };

    try {
      const response = await fetch("http://localhost:5300/paymentRouter/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      localStorage.setItem("sessionId", sessionId)

      const result = await stripe.redirectToCheckout({ sessionId });

      const rs = result.stringify
      localStorage.setItem("result", rs)

      console.log("result :", rs)


      if (result.error) {
        console.error(result.error.message);
      } else {
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };


  return (
    <>
      <div>
        <div className='text-center'>
          <h2>Order</h2>
        </div>

        <div>
          <form className='w-full max-w-lg ml-40 mt-20' onClick={validateForm}>
            <h5>Completed Address</h5>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={form.name}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
              {errors.name && <span className="error text-red-600">{errors.name}</span>}
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={form.email}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
              {errors.email && <span className="error text-red-600">{errors.email}</span>}
            </div>
            <div className='mb-4'>
              <label htmlFor='address' className='block text-gray-700'>Address</label>
              <input
                type='text'
                id='address'
                name='address'
                value={form.address}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
              {errors.address && <span className="error text-red-600">{errors.address}</span>}
            </div>
            <div className='mb-4'>
              <label htmlFor='phone' className='block text-gray-700'>Phone Number</label>
              <input
                type='text'
                id='phone'
                name='phone'
                value={form.phone}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
              {errors.phone && <span className="error text-red-600">{errors.phone}</span>}
            </div>

          </form>
        </div>

        <div className='min-h-screen'>
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
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((item, index) => (
                        <tr key={index} className='border-b'>
                          <td className='border text-center border-gray-300 px-4 py-2'>
                            <img src={item.image} className='w-24 h-auto text-center' alt={item.name} />
                          </td>
                          <td className='border text-center border-gray-300 px-4 py-2'>{item.name}</td>
                          <td className='border text-center border-gray-300 px-4 py-2'>₹{item.discountPrice}</td>
                          <td className='border text-center border-gray-300 px-4 py-2'>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className='border-l flex flex-col items-center w-full p-6'>
                <h1 className='text-center text-2xl font-bold mb-4'>Total: ₹{price}</h1>
                <button type='button' onClick={handlePayment} className='text-2xl px-6 py-2 rounded-md bg-black text-white'>
                  Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};



