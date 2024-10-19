
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ Icon, text,link }) => {
    const shadowStyle = {
        filter: 'drop-shadow(0 4px px green)' 
      };
  return (
    <Link to={link}><div className="card p- border  rounded-lg hover:shadow-inner cursor-pointer text-center ">
      <div className="icon  h-60   mb-5 flex items-center justify-center   " 
      // style={shadowStyle}
      >
        <img src={Icon} className='h-full w-full rounded-lg border' />
        {/* <Icon /> */}
      </div>
      <div className="text text-md mb-2 sm:text-xs md:text-lg lg:text-xl font-semibold text-wrap flex items-center justify-center">
        {text}
      </div>
    </div></Link>
  );
};

export default Card;
