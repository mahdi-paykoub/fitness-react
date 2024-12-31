import { React } from 'react'
import './style.css'

export default function SniperLoader({ newstyle }) {


    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className={`loader ${newstyle}`}></div>
            </div>
        </>
    )
}
