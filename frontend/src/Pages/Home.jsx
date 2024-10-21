import React from 'react'

import HomeCard from '../Components/homeIconscard';
import { HomeSlider } from '../Components/HomeSilder';
export const Home = () => {
  return (
    <>
   <div ><HomeSlider /></div>

    <div className='p-5 '> 
    <h1 className='md:text-4xl text-3xl font-semibold  mb-2 flex text-red-800 justify-center'>Products </h1>
    <div className="flex items-center justify-center text-center mb-6">
                    <span className=" text-red-500 text-center">✨</span>
                    <div className="border-b-2  border-red-500 w-1/6"></div>
                    <span className=" text-red-500 text-center">✨</span>
                </div>
   <div><HomeCard /></div> 
   
    </div>

    </>

  )
}
