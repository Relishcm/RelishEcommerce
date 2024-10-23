import React from 'react';
import { FaFacebookF, FaInstagram, FaAmazon } from 'react-icons/fa';
import { SiFlipkart } from 'react-icons/si';

export const Footer = () => {
  return (
    <div className="bg-gray-50  py-6 px-4 sm:px-8 md:px-12 lg:px-20 mt-10">
{/* <div className="text-xl font-semibold border-b-2 border-green-800 md:border-b-4 inline-block mb-4 ">
Relish Consultancy & Marketing
</div> */}





      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-10 mt-10">
      {/* <ul className="flex flex-col space-y-3">
          <li className="text-2xl font-semibold text-green-800">  <div className="text-2xl sm:text-3xl md:text- font-bold text-lime-500">
                        <img src='logorelish.png' className='h-28 w-auto ' />
                    </div>
          </li>
          <li className="text-lg">1800 207 2777</li>
          <li className="flex space-x-4">
            <div className="hover:text-blue-600 transition-colors text-2xl cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="hover:text-pink-500 transition-colors text-2xl cursor-pointer">
              <FaInstagram />
            </div>
            <div className="hover:text-yellow-500 transition-colors text-2xl cursor-pointer">
              <FaAmazon />
            </div>
            <div className="hover:text-blue-600 transition-colors text-2xl cursor-pointer">
              <SiFlipkart />
            </div>
          </li>
        </ul> */}
        <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold text-red-800 inline-block ">Quick Links</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">About Us</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Contact Us</li>
         
        </ul>
     
        {/* <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold  text-green-800 inline-block ">Products</li>
          <li className="hover:text-green-800 transition-colors cursor-pointer">Mobile</li>
          <li className="hover:text-green-800 transition-colors cursor-pointer">EyeGlasses</li>
          <li className="hover:text-green-800 transition-colors cursor-pointer">Cosmetices</li>
          <li className="hover:text-green-800 transition-colors cursor-pointer">Tea</li>
     
        </ul> */}
       
       <ul className="flex flex-col space-y-3">
       <h1 className='text-2xl font-semibold mb-2 relative z-10 flex justify-center items-center'>Get In Touch</h1>
      <li className="flex relative justify-center  mb-10   space-x-4 z-10">
            <div className="bg-white text-red-800 p-2 rounded-full transition-colors text-2xl cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="bg-white text-red-800 p-2 rounded-full transition-colors text-2xl cursor-pointer">
              <FaInstagram />
            </div>
            <div className="bg-white text-red-800 p-2 rounded-full transition-colors text-2xl cursor-pointer">
              <FaAmazon />
            </div>
            <div className="bg-white text-red-800 p-2 rounded-full transition-colors text-2xl cursor-pointer">
              <SiFlipkart />
            </div>
          </li> 
         
        </ul>

        
        <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold  text-red-800 inline-block ">Information</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Privacy Policy</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Terms & Conditions</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Returns and Cancellation</li>
        </ul>
{/* 
        <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold border-b-2 border-green-800 md:border-b-4 inline-block ">Help</li>
          <li className="hover:text-green-800 transition-colors">FAQ's</li>
      
        </ul> */}
      </div>

      
      <div className="text-center mt-8 border-t border-red-800 pt-4">
        <p>Renban. All rights reserved.</p>
      </div>
    </div>
  );
};
