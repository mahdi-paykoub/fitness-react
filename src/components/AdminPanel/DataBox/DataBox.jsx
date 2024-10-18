import React from 'react';
import './style.css';


export default function DataBox({children , title}) {
    return (
        <>
            <div className='admin-Data-box w-100 py-4 br-10 px-2'>
                <div className='px-3'>
                    لیست   <span className='text-primary'> {title} </span>
                </div>
                {children}
            </div>
        </>
    )
}
