import React from 'react';
import './style.css';
import Image from 'react-bootstrap/Image';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {IoMdNotificationsOutline} from "react-icons/io";
export default function Topbar() {
    return (
        <>
            <div className='w-100 d-flex justify-content-between mt-3'>
                <div>
                    <div className='fw800 text-secondary mt-2'>
                        <span className='c-text-secondary'>خوش آمدی مهدی</span>
                        <IoMdNotificationsOutline className='fs20 me-2 cursor'/>
                    </div>

                </div>
                <div>
                    <MdKeyboardArrowDown className='fs20'/>
                    <span className='fs14 ms-2'>مهدی پایکوب</span>
                    <Image src="/images/wqsnxv0pfdwl2abdakf5.jpg" className='admin-img' roundedCircle  />
                </div>
            </div>
        </>
    )
}
