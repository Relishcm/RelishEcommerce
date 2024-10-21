import React from 'react'

import HomeCard from '../Components/homeIconscard';
import { HomeSlider } from '../Components/HomeSilder';
export const Home = () => {
  return (
    <>
   <div ><HomeSlider /></div>

    <div className='p-5 '> 
    <p className='md:text-4xl text-3xl font-semibold  mb-2 flex text-red-800 justify-center'>Products </p>
   <div><HomeCard /></div> 
   
    </div>

    </>

  )
}
