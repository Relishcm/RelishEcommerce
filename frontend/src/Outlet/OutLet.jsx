import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Components/Navbar'
import { Footer } from '../Components/Footer'
import { NavbarProducts } from '../Components/NavbarProducts'

export const OutLet = () => {
  return (
    <div>
        <div className='w-full'>
            <Navbar />
          <NavbarProducts />
          <Outlet/>     
          <Footer />   
        </div>
    </div>
  )
}
