import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { GiArchiveRegister } from "react-icons/gi";

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
        { path: '/about', name: 'About Us' },
        // { path: '/brand', name: 'Brand' },
        { path: '/contact', name: 'Contact' },
        // { path: '/wishlist', name: <div className='flex items-center gap-1'> SignIn<FaUser className='text-red-800 text-xl' /></div> },
        // { path: '/cart', name: <div className='flex items-center gap-1'> Register <GiArchiveRegister className='text-red-800 text-2xl' /></div> },
        { path: '/wishlist', name: <div className='flex items-center gap-1'> Wishlist<FaHeart className='text-red-800 text-xl' /></div> },
        { path: '/cart', name: <div className='flex items-center gap-1'> Cart <GiShoppingBag className='text-red-800 text-2xl' /></div> },
    ];

    const location = useLocation();

    return (
        <div className="bg-gray-50    sm:p-2 md:p-2 shadow-md font-medium ">

            <div className="flex items-center  justify-between max-w-screen-xl mx-auto ">

                <div className='flex items-center justify-center gap-10'>
                    <div className="text-2xl sm:text-3xl md:text- font-bold  ml-3">
                        <img src='logo2.png' className='h-24 w-auto ' />
                    </div>
                </div>
                <div className="hidden md:flex flex-1 justify-center ml-">
                <ul className="flex flex-row md:space-x-11 space-x-5 p-1">

                    {navdata.map((item) => (

                        <li key={item.path} className="relative group">
                            <Link
                                to={item.path}
                                className={`hover:text-red-900 cursor-pointer text-lg ${location.pathname === item.path ? 'text-red-800' : ''
                                    }`}
                            >
                                {item.name}
                            </Link>
                            <span
                                className={`absolute left-0 bottom-0 top-8 w-full h-1 bg-red-800 transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                            ></span>
                        </li>
                    ))}


                </ul>
            </div>

                <div className="p- md:ml-20  items-center text-gray-200 space-x-2 md:flex hidden">

                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 w-full  bg-gray-800 border border-gray-600 rounded"
                    />
               </div>
               <div className='p-1 md:flex hidden gap-3 text-black text-lg'>
                    <div className='flex items-center justify-end  mr-3 gap-1 p-1'>SignIn<FaUser className='text-red-800 text-2xl' /></div>
                    <div className='flex items-center gap-1'>Register <GiArchiveRegister className='text-red-800 text-2xl' /></div>
                </div>
                {/* <div className='p-1 md:flex hidden gap-3 text-black text-lg'>
                    <div className='flex items-center justify-end  mr-3 gap-1 p-1'>Wishlist<FaHeart className='text-red-800 text-3xl' /></div>
                    <div className='flex items-center gap-1'>Cart <GiShoppingBag className='text-red-800 text-3xl' /></div>
                </div> */}
                
                <div className="md:hidden flex items-center mr-3">
                    <button onClick={handleMenuToggle} className="text-3xl text-black">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>


                <div
                    className={`fixed z-50 left-0  bg-gray-100  md:hidden transition-transform duration-300 ${isOpen ? 'translate-y-12' : '-translate-y-full'
                        }`}

                >
                    <ul className={`flex flex-col space-y-4 p-4 ${isOpen ? '' : ''}`}>
                        {navdata.map((item) => (
                            <li key={item.path} className="relative group">
                                <Link
                                    to={item.path}
                                    onClick={MobileLiClosed}
                                    className={`hover:text-red-800 cursor-pointer text-xl ${location.pathname === item.path ? 'text-red-800' : ''
                                        }`}
                                >
                                    {item.name}
                                </Link>
                                <span
                                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-red-800 transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'
                                        }`}
                                ></span>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>


            <div className='md:hidden flex justify-around'>
                <div className="p-4 flex  items-center text-gray-200 space-x-1">

                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 w-full md:w-[400px] lg:w-[600px] bg-gray-800 border border-gray-600 rounded"
                    />
                </div>
                <div className='flex items-center justify- text-4xl  gap-1 p-1'><FaHeart className='text-red-800' />
                    <div className='flex items-center gap-1'><GiShoppingBag className='text-red-800' /> </div> <div className='p-1 '>
                        <button className="md:text-lg hover:bg-red-900   bg- p-2 text-red-800 rounded-lg">
                            <Link to="auth" className='flex items-center gap-4'>   <FaUser className='text-4xl' /></Link>
                        </button>
                    </div>
                </div></div>

           
        </div>

    );
};
