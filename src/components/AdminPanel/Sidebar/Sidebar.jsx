import { React, useState } from 'react';
import './style.css';
import { Link, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { PiClipboardTextDuotone } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { TbFreeRights, TbMessage2Down, TbRosetteDiscount } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { FaRegUser } from 'react-icons/fa';

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    return (
        <>
            <div className='admin-menu'>
                <div className='admin-logo text-center py-4'>
                    <Link to='/admin-panel'>
                        <img src="/images/logo-morabihamrah-light.png" className='w-50' alt="" />
                    </Link>
                </div>
                <div className='admin-links border-top' style={{
                    // 'height': '100vh',
                    'maxHeight': '100vh',
                    'overflowY': 'scroll'
                }}>
                    <ul className='mt-4 px-0'>
                        {/* users */}
                        <div className='ffir text-secondary fs13 mt-3 mb-2 me-1'>
                            <FaRegUser fontSize={15} />
                            <span className='me-1'>کاربران</span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/users/1'
                                className={({ isActive, isPending }) =>
                                    isActive ? "active-menu" : ""
                                }
                                end >
                                کاربران
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/add-user'
                                className={({ isActive, isPending }) =>
                                    isActive ? "active-menu" : ""
                                }
                                end >
                                افزودن کاربر
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/add-user-prev-infos'
                                className={({ isActive, isPending }) =>
                                    isActive ? "active-menu" : ""
                                }
                                end >
                                افزودن اطلاعات کاربر
                            </NavLink>
                        </li>


                        {/* plans */}

                        <div className='ffir text-secondary fs13 mt-3 mb-2 me-1'>
                            <PiClipboardTextDuotone fontSize={20} />
                            <span className='me-'> برنامه ورزشی</span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/add-plans'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                افزودن برنامه
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/all-plans'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                همه برنامه ها
                            </NavLink>
                        </li>




                        {/* plans */}

                        <div className='ffir text-secondary fs13 mt-3 mb-2 me-1'>
                            <TbFreeRights fontSize={20} />

                            <span className='me-'> برنامه رایگان</span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/add-free-plans'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                برنامه رایگان
                            </NavLink>
                        </li>






                        {/* courses */}

                        <div className='ffir text-secondary fs13 mt-2 mb-2 me-1'>

                            <FaPlay fontSize={20} />
                            <span className='me-'> دوره ها </span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/add-courses'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                افزودن دوره
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/all-courses'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                همه دوره ها
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/session'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                افزودن جلسه ویدیویی
                            </NavLink>

                        </li>




                        {/* orders */}

                        <div className='ffir text-secondary fs13 mt-2 mb-2 me-1'>

                            <FaStar fontSize={20} />
                            <span className='me-'>  سفارش </span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/orders'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                سفارشات
                            </NavLink>
                        </li>

                        <div className='ffir text-secondary fs13 mt-2 mb-2 me-1'>
                            <TbRosetteDiscount fontSize={20} />
                            <span className='me-'>  کد تخفیف </span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/offs'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                کد تخفیف
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/add-offs'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                افزودن کد تخفیف
                            </NavLink>
                        </li>


                        {/* code moaref */}
                        <div className='ffir text-secondary fs13 mt-2 mb-2 me-1'>
                            <TbRosetteDiscount fontSize={20} />
                            <span className='me-'>  کد معرف </span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/request-lists'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                درخواست های کد معرف
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to='/admin-panel/subscribe-codes'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                کدهای معرف
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/settlement-requests'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                درخواست های تسویه
                            </NavLink>
                        </li>


                        {/* tickets */}
                        <div className='ffir text-secondary fs13 mt-2 mb-2 me-1'>
                            <TbMessage2Down fontSize={20} />
                            <span className='me-'>  تیکت </span>
                        </div>

                        <li>
                            <NavLink
                                to='/admin-panel/tickets/1'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                تیکت های کاربران
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/admin-tickets/1'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                تیکت های ادمین
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/ticketable-users/1'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                ارسال تیکت
                            </NavLink>
                        </li>
                        <div className='ffir text-secondary fs13 mt-2 mb-2 me-1'>
                            <MdPayment
                                fontSize={20} />
                            <span className='me-'>   پرداخت  </span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/payments/1'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                پرداخت ها
                            </NavLink>
                        </li>

                        <div className='ffir text-secondary fs13 mt-2 mb-2 me-1'>

                            <IoSettingsOutline
                                fontSize={20} />
                            <span className='me-'>  تنظیمات سایت </span>
                        </div>
                        <li>
                            <NavLink
                                to='/admin-panel/setting'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                تنظیمات
                            </NavLink>
                        </li>
                        <li>
                            <Link to='exit'>
                                خروج
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
