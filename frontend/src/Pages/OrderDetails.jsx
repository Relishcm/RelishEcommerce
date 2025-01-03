// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const OrderDetails = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();


//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem("token");

//         if (!token) {
//             navigate("/auth");
//             return;
//         }

//         const userId = localStorage.getItem('userId');
//         // console.log('User ID:', userId);

//         if (!userId) {
//             setError('User is not logged in.');
//             setLoading(false);
//             return;
//         }

//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_API_SHOW_ORDER}/?userId=${userId}`, {
//                     headers: { Authorization: token }
//                 });
//                 console.log('API Response:', response);
//                 const orderData = response.data.orders;
//                 console.log(orderData);  // Check if paymentMethod is present in the order data
//                 setOrders(orderData);
//                 // setOrders(response.data.orders || []);


//             } catch (err) {
//                 // console.error('Error fetching orders:', err);
//                 setError('Failed to fetch orders. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     if (loading) {
//         return <div>Loading orders...</div>;
//     }

//     // if (error) {
//     //     return <div>{error}</div>;
//     // }

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
//             {orders.length === 0 ? (
//                 <p>No orders found.</p>
//             ) : (
//                 orders.map((order) => {
//                     const totalPrice = order.items.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
//                     const totalQuantity = order.items.reduce((acc, item) => acc + item.quantity, 0);

//                     return (
//                         <div key={order.orderId} className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap">
//                             <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
//                                 <h3 className="text-xl font-semibold mb-2">Order ID: {order.orderId}</h3>
//                                 <p><strong>Username:</strong> {order.username}</p>
//                                 <p><strong>Email:</strong> {order.email}</p>
//                                 <p><strong>Address:</strong> {order.address}</p>
//                                 <p><strong>Phone:</strong> {order.phone}</p>
//                                 {order.paymentMethod ? (
//                                     <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
//                                 ) : (
//                                     <p><strong>Payment Method:</strong> Not available</p>  
//                                 )}
//                                 {order.paymentMethod === "online" && (
//                                     <>
//                                         <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
//                                         <p><strong>Payment Time:</strong> {new Date(order.paymentTime).toLocaleString()}</p>
//                                     </>
//                                 )}

//                                 <p><strong>Delivery Time:</strong> {new Date(order.deliveryTime).toLocaleString()}</p>
//                             </div>

//                             <div className="w-full md:w-1/2">
//                                 <h4 className="text-lg font-semibold mb-2">Items:</h4>
//                                 <table className="min-w-full table-auto">
//                                     <thead>
//                                         <tr className="bg-gray-100">
//                                             <th className="px-4 py-2 text-left border-b">Name</th>
//                                             <th className="px-4 py-2 text-left border-b">Category</th>
//                                             <th className="px-4 py-2 text-left border-b">Price</th>
//                                             <th className="px-4 py-2 text-left border-b">Quantity</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {order.items.map((item, index) => (
//                                             <tr key={index} className="border-b hover:bg-gray-50">
//                                                 <td className="px-4 py-2">{item.name}</td>
//                                                 <td className="px-4 py-2">{item.category}</td>
//                                                 <td className="px-4 py-2">₹{item.discountPrice}</td>
//                                                 <td className="px-4 py-2">{item.quantity}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>

//                                 <div className="w-full mt-4 flex justify-end gap-10">
//                                     <div className="font-semibold">
//                                         <p>Total Price: ₹{totalPrice}</p>
//                                     </div>
//                                     <div className="font-semibold">
//                                         <p>Total Quantity: {totalQuantity}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })
//             )}
//         </div>
//     );
// };



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGarmentsProducts } from '../Contextapi/ShowGarmentsProducts';
import ContentLoader from 'react-content-loader'; // Import the loader

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

        if (!userId) {
            setError('User is not logged in.');
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_SHOW_ORDER}/?userId=${userId}`, {
                    headers: { Authorization: token }
                });
                console.log('API Response:', response);
                const orderData = response.data.orders;
                console.log(orderData);
                setOrders(orderData);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleRemoveOrder = async (orderId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError('You need to be logged in to remove an order.');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_REMOVE_ORDER}`,
                { orderId },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            if (response.data.msg === "Order removed successfully.") {
                setOrders(orders.filter(order => order.orderId !== orderId));
                alert("Order removed successfully.");
            } else {
                setError('Failed to remove the order.');
            }
        } catch (err) {
            setError('Error removing order. Please try again.');
        }
    };

    // Skeleton loader for orders
    const OrderSkeletonLoader = () => (
        <ContentLoader
            speed={2}
            width="100%"
            height={400}
            viewBox="0 0 100% 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="40" rx="5" ry="5" width="100%" height="15" />
            <rect x="0" y="140" rx="5" ry="5" width="100%" height="200" />
        </ContentLoader>
    );

    if (loading) {
        return <OrderSkeletonLoader />; // Show skeleton loader while loading
    }

    const { itemShow } = useGarmentsProducts();
    const filteredItems = itemShow.filter((item) => 
        item.category === 'man' || item.category === 'woman' || item.category === 'child'
    );

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
                                {order.paymentMethod ? (
                                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                ) : (
                                    <p><strong>Payment Method:</strong> Not available</p>
                                )}
                                {order.paymentMethod === "online" && (
                                    <>
                                        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                                        <p><strong>Payment Time:</strong> {new Date(order.paymentTime).toLocaleString()}</p>
                                    </>
                                )}

                                <p><strong>Delivery Time:</strong> {new Date(order.deliveryTime).toLocaleString()}</p>

                                <button
                                    onClick={() => handleRemoveOrder(order.orderId)}
                                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                                >
                                    Remove Order
                                </button>
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
                                                <td className="px-4 py-2">{item.name}
                                                    {(item.category === 'man' || item.category === 'woman' || item.category === 'child') && filteredItems.length > 0 && (
                                                        <p>Size: {item.size}</p>
                                                    )}
                                                </td>
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
            {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
        </div>
    );
};
