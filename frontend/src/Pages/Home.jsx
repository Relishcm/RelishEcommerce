import React from 'react'

import HomeCard from '../Components/homeIconscard';
import { HomeSlider } from '../Components/HomeSilder';
import { BestSellers } from '../Components/BestSellers';
import { FavoritePick } from '../Components/FavoritePick';

export const Home = () => {
  return (
    <>
      <div >
        <HomeSlider />
      </div>

      <div>
        <HomeCard />
      </div>

      <div>
        <BestSellers />
      </div>

      <div>
        <FavoritePick />
      </div>
    </>

  )
}
