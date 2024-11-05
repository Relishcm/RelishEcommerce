import React, { useState, useEffect } from 'react';

export const OrderDetails = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://renbanecommerce.onrender.com/showorder?userId=${userId}`);
        
        // Check if response is ok before parsing it
        if (response.ok) {
          const data = await response.json();
          setOrders(data); // Set the fetched orders
        } else {
          const data = await response.json();
          setError(data.message || 'Something went wrong!'); // Handle error response
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("An error occurred while fetching orders.");
      } finally {
        setLoading(false); // Stop loading when request is finished
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div>
      <h1>Order Details</h1>

      {loading && <p>Loading orders...</p>} {/* Loading indicator */}

      {error && !loading && <p>{error}</p>} {/* Error message */}

      {orders.length === 0 && !loading && !error && (
        <p>No orders found for this user.</p>  // Empty orders message
      )}

      {orders.length > 0 && !loading && (
        orders.map((order, index) => (
          <div key={index}>
            <h3>Order ID: {order.razorpayOrderId}</h3>
            <p>Status: {order.paymentStatus}</p>
            <p>Delivery Time: {order.deliveryTime ? order.deliveryTime : 'Not set yet'}</p>
            {/* Render other order details here */}
            <ul>
              {order.orders.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.quantity} x {item.discountPrice} INR
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};
