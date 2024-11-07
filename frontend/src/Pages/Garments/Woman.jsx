
import React from 'react';
import { ShowGarments } from '../../Components/ShowGarments';

const Woman = () => {
    return (
        <div className='p-5'>
            <h1 className='md:text-4xl text-3xl font-semibold mb-2 flex text-red-800 justify-center'>Woman</h1>
            <ShowGarments category="woman" />
        </div>
    );
};

export default Woman;