import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const SuccessPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state for removing order

    const query = new URLSearchParams(location.search);
    const orderId = query.get('orderId'); 

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get('', {
                    params: { orderId } 
                });
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setOrderDetails(null); // Set to null on error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        if (orderId) {
            fetchOrderDetails();
        } else {
            setOrderDetails(null);
            setLoading(false); // No order ID, stop loading
        }
    }, [orderId]);

    const handleClick = () => {
        navigate('/'); // Navigate to home
    };

    const handleRemoveOrder = async () => {
        try {
            const response = await axios.post(
                '',
                { orderId }, // Send orderId to the backend
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Use token if required for authentication
                    }
                }
            );
            alert('Order removed successfully');
            navigate('/'); // Redirect to home after removal
        } catch (error) {
            console.error('Error removing order:', error);
            setError('Failed to remove the order. Please try again later.');
        }
    };

    if (loading) return <p>Loading...</p>; // Loading state UI

    return (
        <div className='text-center'>
            {orderDetails ? (
                <>
                    <h2>Payment Successful</h2>
                    <p>Your payment was successful! Thank you for your purchase.</p>
                    <h3>Order Details</h3>
                    <p><strong>Order ID:</strong> {orderDetails.razorpayOrderId}</p>
                    <p><strong>Username:</strong> {orderDetails.username}</p>
                    <p><strong>Email:</strong> {orderDetails.email}</p>
                    <p><strong>Address:</strong> {orderDetails.address}</p>
                    <p><strong>Phone:</strong> {orderDetails.phone}</p>
                    <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
                    <p><strong>Payment Time:</strong> {orderDetails.paymentTime ? new Date(orderDetails.paymentTime).toLocaleString() : 'N/A'}</p>
                    <p><strong>Delivery Time:</strong> {orderDetails.deliveryTime ? new Date(orderDetails.deliveryTime).toLocaleString() : 'N/A'}</p>
                    <h4>Ordered Products:</h4>
                    <ul>
                        {orderDetails.orders.map((product, index) => (
                            <li key={index}>
                                {product.name} - Quantity: {product.quantity} - Price: {product.discountPrice}
                            </li>
                        ))}
                    </ul>

                    {/* Remove Order Button */}
                    <button onClick={handleRemoveOrder} className='text-red-700'>
                        Remove Order
                    </button>

                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                </>
            ) : (
                <>
                    <h2>Payment Failed</h2>
                    <p>There was an issue with your payment. Please try again.</p>
                </>
            )}
            <button onClick={handleClick}>Go to Home</button>
        </div>
    );
};
