import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // If you're using React Router for navigation

export const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Extract the orderId from the query string (URL)
      const orderId = new URLSearchParams(window.location.search).get("orderId");
      console.log("Order ID from URL:", orderId);

      // Check if the orderId is present in the URL
      if (!orderId) {
        setError("Order ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://renbanecommerce.onrender.com/paymentRouter/showorder', {
          params: { orderId },  // Send orderId as query parameter
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,  // Add Bearer token from localStorage
          },
        });

        // If request is successful, store order details
        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Could not fetch order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [navigate]);  // Ensure re-fetching on navigation

  // Show loading message while fetching
  if (loading) return <div>Loading...</div>;

  // Show error message if fetching fails
  if (error) return <div>{error}</div>;

  // If order details are found, display them
  return (
    <div>
      <h2>Order Details</h2>
      {orderDetails ? (
        <div>
          <p><strong>Username:</strong> {orderDetails.username}</p>
          <p><strong>Email:</strong> {orderDetails.email}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
          <p><strong>Phone:</strong> {orderDetails.phone}</p>
          <p><strong>Razorpay Order ID:</strong> {orderDetails.razorpayOrderId}</p>
          <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
          <p><strong>Payment Time:</strong> {orderDetails.paymentTime}</p>
          <p><strong>Delivery Time:</strong> {orderDetails.deliveryTime}</p>
          <h3>Ordered Items:</h3>
          <ul>
            {orderDetails.orders.map((item, index) => (
              <li key={index}>
                {item.name} (x{item.quantity}) - ₹{item.discountPrice}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Order Details</div>
      )}
    </div>
  );
};
