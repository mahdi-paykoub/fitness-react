import { React, useContext } from 'react';
import './style.css';
import Image from 'react-bootstrap/Image';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoMdNotificationsOutline } from "react-icons/io";
import { AuthContext } from "../../../Context/AuthContext";

export default function Topbar() {
    const authContext = useContext(AuthContext)

    return (
        <>
            <div className='w-100 d-flex justify-content-between mt-3 align-items-center'>
                <div>
                    <div className='fw800 text-secondary mt-2'>
                        <span className='c-text-secondary'>پنل ادمین</span>
                        <IoMdNotificationsOutline className='fs20 me-2 cursor' />
                    </div>

                </div>
                <div>
                    <MdKeyboardArrowDown className='fs20' />
                    <span className='fs14 ms-2'>{authContext.userInfo.data.name} </span>
                    {/* <Image src="/images/wqsnxv0pfdwl2abdakf5.jpg" className='admin-img' roundedCircle /> */}
                </div>
            </div>
        </>
    )
}
