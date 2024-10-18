import React from 'react'

import HomeCard from '../Components/homeIconscard';
import { HomeSlider } from '../Components/HomeSilder';
export const Home = () => {
  return (
    <>
   <div ><HomeSlider /></div>

    <div className='p-10 '> 
    <p className='text-5xl font-semibold  mb-9 flex text-green-800 justify-center'>Products </p>
   <div><HomeCard /></div> 
   
    </div>

    </>

  )
}
