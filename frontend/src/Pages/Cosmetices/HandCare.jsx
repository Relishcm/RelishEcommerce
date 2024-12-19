
import React from 'react';
import { ShowGarments } from '../../Components/ShowGarments';


const HandCare = () => {
    return (
        <div className='p-5'>
            <h1 className='md:text-4xl text-3xl font-semibold mb-2 flex text-red-800 justify-center'>Hand Care Product</h1>
            <ShowGarments category="HandCare" />
        </div>
    );
};

export default HandCare;