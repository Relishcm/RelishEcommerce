import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);


    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    const MobileLiClosed = () => {
        setIsOpen(false)
    }

    const navdata = [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About' },
        // { path: '/brand', name: 'Brand' },
        { path: '/contact', name: 'Contact' },
        { path: '/wishlist', name: <div className='flex items-center gap-1'><FaHeart className='text-green-800'/> Wishlist</div> },
        { path: '/cart', name: <div className='flex items-center gap-1'><GiShoppingBag className='text-green-800'/> Cart</div> },


    ];

    const location = useLocation();

    return (
        <div className="bg-gray-100    sm:p-2 md:p-3 shadow-md font-medium">
            <div className="flex items-center justify-evenly max-w-screen-xl mx-auto ">

                <div className='flex items-center gap-20'>
                    <div className="text-2xl sm:text-3xl md:text- font-bold text-lime-500">
                        <img src='logorelish.png' className='h-20 w-auto ' />
                    </div>

                    <div className="p-4 flex md:flex items-center  space-x-10">
                        <input
                            type="text"
                            placeholder="Search..."
                          className="p-2 w-full md:w-96 lg:w-12/12 bg-gray-800 border border-gray-600 rounded"
                        />

                    </div>
                    <button className="text-xl hover:text-green-800 bg-green-800 p-2 text-white rounded-lg">
                    <Link to="auth" className='flex items-center gap-4'>   <FaUser /> Signup&SignIn</Link> 
                    </button>
                </div>
            </div>



            <div className="hidden md:flex flex-1 justify-center ">
                <ul className="flex flex-row space-x-20 p-1">

                    {navdata.map((item) => (

                        <li key={item.path} className="relative group">
                            <Link
                                to={item.path}
                                className={`hover:text-yellow-900 cursor-pointer text-lg ${location.pathname === item.path ? 'text-green-800' : ''
                                    }`}
                            >
                                {item.name}
                            </Link>
                            <span
                                className={`absolute left-0 bottom-0 top-8 w-full h-1 bg-green-800 transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                            ></span>
                        </li>
                    ))}


                </ul>
            </div>






            <div className="md:hidden flex items-center">
                <button onClick={handleMenuToggle} className="text-2xl">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Navigation Links */}
            <div
                className={`fixed z-50 left-0 bg-black text-white md:hidden transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}

            >
                <ul className={`flex flex-col space-y-4 p-4 ${isOpen ? 'mt-40' : ''}`}>
                    {navdata.map((item) => (
                        <li key={item.path} className="relative group">
                            <Link
                                to={item.path}
                                onClick={MobileLiClosed}
                                className={`hover:text-green-800 cursor-pointer text-lg ${location.pathname === item.path ? 'text-green-800' : ''
                                    }`}
                            >
                                {item.name}
                            </Link>
                            <span
                                className={`absolute left-0 bottom-0 w-full h-0.5 bg-green-800 transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                            ></span>
                        </li>
                    ))}

                </ul>


            </div>
        </div>

    );
};
