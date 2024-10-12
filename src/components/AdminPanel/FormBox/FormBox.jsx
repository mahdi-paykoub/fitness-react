import React from 'react';
import './style.css';



export default function FormBox({children , title}) {
    return (
        <>
            <div className='admin-form py-5 px-4 br5 bg-white br-10'>
                <h3>
                    افزودن <span className='text-primary'> {title} </span>
                </h3>
                {children}
            </div>
        </>
    )
}
