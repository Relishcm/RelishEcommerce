import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch userId from localStorage
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setError('User is not logged in.');
            setLoading(false);
            return;
        }

        // Make API call to fetch orders
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/paymentRouter/showorders?userId=${userId}`);
                setOrders(response.data.orders);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.orderId} className="order">
                        <h3>Order ID: {order.orderId}</h3>
                        <p><strong>Username:</strong> {order.username}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                        <p><strong>Payment Time:</strong> {new Date(order.paymentTime).toLocaleString()}</p>
                        <p><strong>Delivery Time:</strong> {new Date(order.deliveryTime).toLocaleString()}</p>
                        <h4>Items:</h4>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    <p><strong>{item.name}</strong></p>
                                    <p>Category: {item.category}</p>
                                    <p>Price: ₹{item.discountPrice}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};
