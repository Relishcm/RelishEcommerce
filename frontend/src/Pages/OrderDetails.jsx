import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

 
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            navigate("/auth"); 
            return;
        }

        const userId = localStorage.getItem('userId');
        // console.log('User ID:', userId);

        if (!userId) {
            setError('User is not logged in.');
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_SHOW_ORDER}/?userId=${userId}`,{
                    headers: { Authorization: token }
                });
                console.log('API Response:', response); 

                setOrders(response.data.orders || []);
               

            } catch (err) {
                console.error('Error fetching orders:', err);
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

    // if (error) {
    //     return <div>{error}</div>;
    // }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => {
                    const totalPrice = order.items.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
                    const totalQuantity = order.items.reduce((acc, item) => acc + item.quantity, 0);

                    return (
                        <div key={order.orderId} className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap">
                            <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
                                <h3 className="text-xl font-semibold mb-2">Order ID: {order.orderId}</h3>
                                <p><strong>Username:</strong> {order.username}</p>
                                <p><strong>Email:</strong> {order.email}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>Phone:</strong> {order.phone}</p>
                                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                                <p><strong>Payment Time:</strong> {new Date(order.paymentTime).toLocaleString()}</p>
                                <p><strong>Delivery Time:</strong> {new Date(order.deliveryTime).toLocaleString()}</p>
                            </div>

                            <div className="w-full md:w-1/2">
                                <h4 className="text-lg font-semibold mb-2">Items:</h4>
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 text-left border-b">Name</th>
                                            <th className="px-4 py-2 text-left border-b">Category</th>
                                            <th className="px-4 py-2 text-left border-b">Price</th>
                                            <th className="px-4 py-2 text-left border-b">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2">{item.name}</td>
                                                <td className="px-4 py-2">{item.category}</td>
                                                <td className="px-4 py-2">₹{item.discountPrice}</td>
                                                <td className="px-4 py-2">{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="w-full mt-4 flex justify-end gap-10">
                                    <div className="font-semibold">
                                        <p>Total Price: ₹{totalPrice}</p>
                                    </div>
                                    <div className="font-semibold">
                                        <p>Total Quantity: {totalQuantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
