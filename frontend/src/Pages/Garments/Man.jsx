
import React from 'react';
import { ShowGarments } from '../../Components/ShowGarments';


const Man = () => {
    return (
        <div className='p-5'>
            <h1 className='md:text-4xl text-3xl font-semibold mb-2 flex text-red-800 justify-center'>Man</h1>
            <ShowGarments category="man" />
        </div>
    );
};

export default Man;