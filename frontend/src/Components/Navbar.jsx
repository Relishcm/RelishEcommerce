// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
// import { FaHeart } from "react-icons/fa";
// import { GiShoppingBag } from "react-icons/gi";
// import { GiArchiveRegister } from "react-icons/gi";
// import CartlistCount from './CartCount';
// import { useCart } from '../Contextapi/CartContextapi';

// export const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [login, setLogin] = useState(false);
//     const [userName, setUserName] = useState('');
//     const [avatar, setAvatar] = useState('');
//     const { setCartlistCount } = useCart()

//     const handleMenuToggle = () => {
//         setIsOpen(!isOpen);
//     };

//     const MobileLiClosed = () => {
//         setIsOpen(false);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (token) {

//                     const cartResponse = await axios.get("http://localhost:5500/cartRouter/count", {
//                         headers: { Authorization: token }
//                     });
//                     setCartlistCount(cartResponse.data.count);

//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const name = localStorage.getItem('name');
//         const avatar = localStorage.getItem('name')?.slice(0, 1);

//         if (token && name) {
//             setLogin(true);
//             setUserName(name);
//             setAvatar(avatar);
//         }
//     }, []);

//     function handlelogout() {
//         localStorage.removeItem("token");
//         localStorage.removeItem("name");
//         localStorage.removeItem("avatar");
//         setCartlistCount(0)
//         setLogin(false);
//         setUserName('');
//         setAvatar('');

//     }

//     const navdata = [
//         { path: '/', name: 'Home' },
//         { path: '/about', name: 'About Us' },
//         { path: '/contact', name: 'Contact' },
//         {
//             path: '/wishlist', name: <div className='md:flex hidden items-center gap-1 '> Wishlist<FaHeart className='text-red-800 text-xl' /></div>
//         },
//         { path: '/cart', name: <div className='md:flex hidden items-center gap-1 '>Cart <CartlistCount /></div> },
//     ];

//     const location = useLocation();

//     return (
//         <div className="bg-gray-50 sm:p-2 md:p-2 shadow-md font-medium ">
//             <div className="flex items-center justify-between max-w-screen-2xl mx-auto p-2">
//                 <div className='flex items-center justify-center gap-10'>
//                     <div className="font-bold lg:ml-10">
//                         <img src='logoRmart.png' className='h-20 md:h-24 w-auto ' />
//                     </div>
//                 </div>

//                 <div className="hidden md:flex flex-1 justify-center ">
//                     <ul className="flex flex-row md:space-x-10 sm:space-x-5 p-1">
//                         {navdata.map((item) => (
//                             <li key={item.path} className="relative group">
//                                 <Link
//                                     to={item.path}
//                                     className={`hover:text-red-900 cursor-pointer text-lg ${location.pathname === item.path ? 'text-red-800' : ''}`}
//                                 >
//                                     {item.name}
//                                 </Link>
//                                 <span className={`absolute left-0 bottom-0 top-8 w-full h-1 bg-red-800 transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'}`}></span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className="items-center md:flex hidden gap-3">
//                     <input type="text" placeholder="Search..." className="p-2 w-full border border-gray-950 rounded" />

//                     {login ? (
//                         <div className="flex items-center gap-2">
//                             <div className='bg-red-800 text-white p-1 rounded-full w-10 h-10 flex justify-center items-center'>{avatar}</div>
//                             <span className="text-lg">{userName}</span>
//                             <button className='buttonn bg-red-800 text-white p-2 rounded-lg' onClick={handlelogout}>Logout</button>
//                         </div>
//                     ) : (
//                         <div className='p-1 md:flex hidden gap-3 text-black text-lg cursor-pointer'>
//                             <Link to='auth'><div className='flex items-center mr-3 gap-1 p-1'>SignIn<FaUser className='text-red-800 text-2xl' /></div></Link>
//                             <div className='flex items-center gap-1'>Register <GiArchiveRegister className='text-red-800 text-2xl' /></div>
//                         </div>
//                     )}
//                 </div>

//                 <div className="md:hidden flex items-center mr-3">
//                     <button onClick={handleMenuToggle} className="text-3xl text-black">
//                         {isOpen ? <FaTimes /> : <FaBars />}
//                     </button>
//                 </div>

//                 <div className={`fixed z-50 left-0 bg-gray-100 md:hidden transition-transform duration-300 ${isOpen ? 'translate-y-52' : '-translate-x-full'}`}>
//                     <ul className={`flex flex-col space-y-4 p-4`}>
//                         {navdata.map((item) => (
//                             <li key={item.path} className="relative group">
//                                 <Link
//                                     to={item.path}
//                                     onClick={MobileLiClosed}
//                                     className={`hover:text-red-800 cursor-pointer text-xl ${location.pathname === item.path ? 'text-red-800' : ''}`}
//                                 >
//                                     {item.name}
//                                 </Link>
//                                 <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-red-800 transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'}`}></span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             <div className='md:hidden flex justify-around '>
//                 <div className="p-4 flex items-center space-x-1">
//                     <input type="text" placeholder="Search..." className="p-2 w-full border border-gray-950 rounded" />
//                 </div>
//                 <div className='flex items-center justify-around text-4xl gap-1 p-1'>
//                     <FaHeart className='text-red-800' />
//                     <div className='flex items-center gap-1'><GiShoppingBag className='text-red-800' /></div>
//                     <div className='p-1 '>
//                         <button className="md:text-lg hover:bg-red-900 bg-p-2 text-red-800 rounded-lg">
//                             <Link to="auth" className='flex items-center gap-4 '><FaUser className='text-4xl' /></Link>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { GiArchiveRegister } from "react-icons/gi";
import CartlistCount from './CartCount';
import { useCart } from '../Contextapi/CartContextapi';
import axios from 'axios'; // Ensure axios is imported
import WishlistCount from './Wishlistcount';
import { useWish } from '../Contextapi/WishContextapi';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState('');
    const { cartlistCount, setCartlistCount } = useCart();
    const { setWishlistCount } = useWish()

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    const MobileLiClosed = () => {
        setIsOpen(false);
    };

    // Fetch cart count on login
    const fetchCartCount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const cartResponse = await axios.get(import.meta.env.VITE_API_CART_COUNT, {
                    headers: { Authorization: token }
                });
                setCartlistCount(cartResponse.data.count);


                const wishlistResponse = await axios.get(import.meta.env.VITE_API_WISHLIST_COUNT, {
                    headers: { Authorization: token }
                });
                setWishlistCount(wishlistResponse.data.count);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const avatar = localStorage.getItem('name')?.charAt(0).toUpperCase();


        if (token && name) {
            setLogin(true);
            setUserName(name);
            setAvatar(avatar);
            fetchCartCount();
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("avatar");
        localStorage.removeItem("userId");
        setCartlistCount(0);
        setWishlistCount(0)
        setLogin(false);
        setUserName('');
        setAvatar('');
    }

    const navdata = [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About Us' },
        { path: '/contact', name: 'Contact' },
        {
            path: '/WishView', name: <div className='md:flex hidden items-center gap-1 '> Wishlist<WishlistCount /></div>
        },
        { path: '/cart', name: <div className='md:flex hidden items-center gap-1 '>Cart <CartlistCount /></div> },
        { path: '/OrderDetails', name: "Orders" },

    ];

    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm.trim()}`);
            setSearchTerm('')
        }
    };

    return (
        <div className="bg-gray-50 sm:p-2 md:p-2 shadow-md font-medium ">
            <div className="flex items-center justify-between max-w-screen-2xl mx-auto p-2">
                <div className='flex items-center justify-center gap-10'>
                    <div className="font-bold lg:ml-10">
                        <img src='logoRmart.png' className='h-20 md:h-24 w-auto ' />
                    </div>
                </div>

                <div className="hidden md:flex flex-1 justify-center ">
                    <ul className="flex flex-row md:space-x-10 sm:space-x-5 p-1">
                        {navdata.map((item) => (
                            <li key={item.path} className="relative group">
                                <Link
                                    to={item.path}
                                    className={`hover:text-red-900 cursor-pointer text-lg ${location.pathname === item.path ? 'text-red-800' : ''}`}
                                >
                                    {item.name}
                                </Link>
                                <span className={`absolute left-0 z-0 bottom-0 top-8 w-full h-1 bg-red-800 transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="items-center md:flex hidden gap-3">

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="p-2 w-full border border-gray-950 rounded"
                        />
                    </form>
                    {login ? (
                        <div className="flex items-center gap-2">
                            <div className='bg-red-800 text-white p-1 rounded-full w-10 h-10 flex justify-center items-center'>{avatar}</div>
                            <span className="text-lg">{userName}</span>
                            <button className='buttonn bg-red-800 text-white p-2 rounded-lg' onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className='p-1 md:flex hidden gap-3 text-black text-lg cursor-pointer'>
                            <Link to='auth'><div className='flex items-center mr-3 gap-1 p-1'>SignIn<FaUser className='text-red-800 text-2xl' /></div></Link>
                            <div className='flex items-center gap-1'>Register <GiArchiveRegister className='text-red-800 text-2xl' /></div>
                        </div>
                    )}
                </div>

                <div className="md:hidden flex items-center mr-3 gap-2">
                {login ? (
                        <div className="flex items-center gap-2">
                            <div className='bg-red-800 text-white p-1 rounded-full w-10 h-10 flex justify-center items-center'>{avatar}</div>
                            <span className="text-lg">{userName}</span>
                            <button className='buttonn bg-red-800 text-white p-2 rounded-lg' onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className='p-1 md:flex hidden gap-3 text-black text-lg cursor-pointer'>
                            <Link to='auth'><div className='flex items-center mr-3 gap-1 p-1'>SignIn<FaUser className='text-red-800 text-2xl' /></div></Link>
                            <div className='flex items-center gap-1'>Register <GiArchiveRegister className='text-red-800 text-2xl' /></div>
                        </div>
                    )}
                    <button onClick={handleMenuToggle} className="text-3xl text-black">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                <div className={`fixed z-50 left-0 bg-gray-100 md:hidden transition-transform duration-300 ${isOpen ? 'translate-y-52' : '-translate-x-full'}`}>
                    <ul className={`flex flex-col space-y-4 p-4`}>
                        {navdata.map((item) => (
                            <li key={item.path} className="relative group">
                                <Link
                                    to={item.path}
                                    onClick={MobileLiClosed}
                                    className={`hover:text-red-800 cursor-pointer text-xl ${location.pathname === item.path ? 'text-red-800' : ''}`}
                                >
                                    {item.name}
                                </Link>
                                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-red-800 transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='md:hidden flex justify-around '>
                
            <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="p-2 w-full border border-gray-950 rounded"
                        />
                    </form>
                <div className='flex items-center justify-around text-4xl gap-5 p-1'>
                 <Link to="/WishView" ><WishlistCount /></Link>
                 <Link to="/cart" > <CartlistCount /></Link>

                    {/* <div className='p-1 '>
                        <button className="md:text-lg hover:bg-red-900 bg-p-2 text-red-800 rounded-lg">
                            <Link to="auth" className='flex items-center gap-4 '><FaUser className='text-4xl' /></Link>
                        </button>
                    </div> */}


                </div>
            </div>
        </div>
    );
};
