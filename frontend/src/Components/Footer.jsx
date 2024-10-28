import React from 'react';
import { FaFacebookF, FaInstagram, FaAmazon } from 'react-icons/fa';
import { SiFlipkart } from 'react-icons/si';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="bg-gray-50  py-6 px-4 sm:px-8 md:px-12 lg:px-20 mt-10">

      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-10 mt-10">
     
        <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold text-red-800 inline-block ">Quick Links</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">About Us</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Contact Us</li>
         
        </ul>
     
       
       
       

        
        <ul className="flex flex-col space-y-3">
          <li className="text-xl font-semibold  text-red-800 inline-block ">Information</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Privacy Policy</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Terms & Conditions</li>
          <li className="hover:text-red-800 transition-colors cursor-pointer">Returns and Cancellation</li>
        </ul>

      </div>

      
      <div className="text-center mt-8 border-t border-red-800 pt-4">
  
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10 ">

      <ul className="flex flex-col space-y-3 ">
          
          <div className="">
            <h2 className="md:text-2xl text-xl font-semibold mb-2 text-red-800">Renban Completed Address</h2>
            <div className="text-base sm:text-lg mb-2 ">
              <p>Sco.21 Dashmesh Market Balongi</p>
              <p>SAS Nagar (Mohali) Punjab-160055</p>
              
            </div>
            <div className="text-base sm:text-lg ">
              <p className="mb-1">Phone : <Link to="" className=" hover:underline">+91 172 505 2228</Link></p>
              <p className="mb-1">Mobile :
                <Link to="" className=" hover:underline"> +91 896 882 7071</Link>,
                <Link to="" className=" hover:underline"> +91 991 515 9671</Link>
                <p className="mb-1">Email : <Link to="" className=" hover:underline">renban@gmail.com</Link></p>
                <p className="mb-1">  <Link to="" className=" hover:underline">www.renban.com</Link></p>
              </p>

            </div>
          </div>

        </ul>

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
</div>
        <div className="text-center mt-8 border-t border-red-800 pt-4  container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
        <p>© 2024 Renban. All rights reserved.</p>
        <div className='flex justify-center items-center gap-7'>
          <h3>We Accept Payments          </h3>
          <img src='Razorpay-Payment-Options.png'></img>
          

        </div>
      </div>
    </div>
  );
};
