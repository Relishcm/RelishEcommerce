import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Components/Navbar'
import { Footer } from '../Components/Footer'

export const OutLet = () => {
  return (
    <div>
        <div className='w-full'>
            <Navbar />
          
          <Outlet/>     
          <Footer />   
        </div>
    </div>
  )
}
