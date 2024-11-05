import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUpdatedCarts } from '../Contextapi/CartTablecontextapi';

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const { carts, setCarts } = useUpdatedCarts();

  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [form, setForm] = useState({
    username: '',
    email: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    async function servercall() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_CART_VIEW

          , {
            headers: { Authorization: localStorage.getItem("token") }
          });
        const cartItems = response.data.items;
        setShow(cartItems.length > 0);

        const totalPrice = cartItems.reduce((acc, item) => {
          const itemPrice = parseFloat(item.discountPrice) || 0;
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

  useEffect(() => {
    const totalPrice = carts.reduce((acc, item) => {
      const itemPrice = parseFloat(item.discountPrice) || 0;
      const itemQuantity = parseInt(item.quantity, 10) || 0;
      return acc + (itemPrice * itemQuantity);
    }, 0);
    setPrice(totalPrice);
  }, [carts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!form.username) {
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

  // const handlePayment = async () => {
  //   if (!validateForm()) {
  //     return;
  //   }

  //   setLoading(true); // Start loading

  //   const stripe = await loadStripe("pk_test_51QE3jVP3r5ZEd0SdgUn0tUeUxAfEPVXKfdzWmi0pjYm8mYgyZMjO8inYqYaEcu0pVauqVXd2HES1AX1xbYCd8NnE00ycU4yzUK");

  //   const body = { products: carts, ...form };

  //   try {
  //     const response = await fetch("http://localhost:5500/paymentRouter/checkout-session", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create checkout session');
  //     }

  //     const { sessionId } = await response.json();
  //     console.log('Stripe Session ID:', sessionId); // Log the session ID

  //     const result = await stripe.redirectToCheckout({ sessionId });

  //     if (result.error) {
  //       console.error('Stripe Error:', result.error.message); // Log the Stripe error
  //       alert(result.error.message); // Alert the error message to the user
  //     } else {
  //       setPaymentSuccess(true);
  //     }
  //   } catch (error) {
  //     console.error('Error during payment:', error);
  //     alert('Payment processing failed. Please try again.'); // Alert a user-friendly message
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
  
    const body = { products: carts, ...form };
  
    // Get the token from localStorage
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
    if (!token) {
      console.error("User is not authenticated!");
      alert("Please log in to proceed with the payment.");
      return;
    }
  
    // Decode token to get userId (optional, based on your needs)
    const decodedToken = jwt_decode(token);
    const userId = decodedToken._id; // or however the userId is stored in your token
  
    // Attach token and userId to the request body
    const orderRequestBody = { ...body, userId };
  
    try {
      const response = await axios.post(import.meta.env.VITE_API_ORDER, orderRequestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the header
        },
      });
  
      const { orderId } = response.data;
  
      if (!window.Razorpay) {
        console.error("Razorpay script not loaded.");
        alert("Razorpay is not available. Please try again.");
        return;
      }
  
      const options = {
        key: import.meta.env.VITE_KEY,
        amount: price * 100,
        currency: "INR",
        name: "Renban",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(import.meta.env.VITE_API_ORDER_CHECK_STATUS, {
              orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }, {
              headers: { 'Content-Type': 'application/json' },
            });
  
            alert(verificationResponse.data.message);
            setPaymentSuccess(true);
            navigate("/SuccessPayment");
          } catch (error) {
            console.error('Error during payment verification:', error);
            alert('Payment verification failed: ' + (error.response?.data?.message || 'Please try again.'));
          }
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment processing failed: ' + (error.response?.data?.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' p-4 '>
      <div className='text-center'>
        <h2 className='text-4xl text-red-800 p-2 font-semibold'>Order</h2>
      </div>

      <div className=''>
        <div>
          <form className='w-full max-w-lg mx-auto mb-8 ' onSubmit={(e) => e.preventDefault()}>
            <h5 className='text-2xl mb-2'>Shipping Address</h5>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700'>Name</label>
              <input
                type='text'
                id='name'
                name='username'
                value={form.username}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
              {errors.name && <span className="error text-red-600">{errors.username}</span>}
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
        <div>
          {show && (
            <div className='pt-4'>
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


            </div>
          )}
        </div>
      </div>
      <div className='border-l flex flex-col items-center w-full p-6'>
        <h1 className='text-center text-2xl font-bold mb-4'>Total: ₹{price}</h1>
        <button
          type='button'
          onClick={handlePayment}
          className={`text-2xl px-6 py-2 rounded-md bg-black text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            'Buy Now'
          )}
        </button>
      </div>
    </div>
  );
};
