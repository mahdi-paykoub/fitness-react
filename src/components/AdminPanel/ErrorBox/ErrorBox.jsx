import React from 'react';
import './style.css';



export default function ErrorBox({text}) {
    return (
        <>
       <div className='px-3'>
           <div className='admin-error-box w-100 p-3 text-white br-10'>
               {text}
           </div>
       </div>
        </>
    )
}
