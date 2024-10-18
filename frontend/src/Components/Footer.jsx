import React from 'react';
import { FaFacebookF, FaInstagram, FaAmazon } from 'react-icons/fa';
import { SiFlipkart } from 'react-icons/si';

export const Footer = () => {
  return (
    <div className="bg-gray-100  py-6 px-4 sm:px-8 md:px-12 lg:px-20 mt-10">
<div className="text-xl font-semibold border-b-2 border-green-800 md:border-b-4 inline-block mb-4 ">
Relish Consultancy & Marketing
</div>





      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-10 mt-10">
      <ul className="flex flex-col space-y-3">
          <li className="text-2xl font-semibold text-green-800">  <div className="text-2xl sm:text-3xl md:text- font-bold text-lime-500">
                        <img src='logo8.png' className='h-10 w-auto ' />
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
        </ul>

     
        <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold border-b-2 border-green-800 md:border-b-4 inline-block ">Services</li>
          <li className="hover:text-green-800 transition-colors">Mobile</li>
          <li className="hover:text-green-800 transition-colors">Opticals</li>
          <li className="hover:text-green-800 transition-colors">cars</li>
     
        </ul>
       
       

        
        <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold border-b-2 border-green-800 md:border-b-4 inline-block ">About</li>
          <li className="hover:text-green-800 transition-colors">We Are Hiring</li>
          <li className="hover:text-green-800 transition-colors">Refer And Earn</li>
          <li className="hover:text-green-800 transition-colors">About us</li>
          <li className="hover:text-green-800 transition-colors">Lenskart Coupons</li>
        </ul>

        <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold border-b-2 border-green-800 md:border-b-4 inline-block ">Help</li>
          <li className="hover:text-green-800 transition-colors">FAQ's</li>
      
        </ul>
      </div>

      
      <div className="text-center mt-8 border-t border-green-800 pt-4">
        <p>Relish Consultancy & Marketing. All rights reserved.</p>
      </div>
    </div>
  );
};
