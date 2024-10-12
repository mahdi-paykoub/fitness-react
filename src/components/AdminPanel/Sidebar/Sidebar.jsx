import React from 'react';
import './style.css';
import { Link, NavLink } from "react-router-dom";


export default function Sidebar() {
    return (
        <>
            <div className='admin-menu'>
                <div className='admin-logo text-center py-4'>
                    <img src="/images/logo-morabihamrah-light.png" className='w-50' alt="" />
                </div>
                <div className='admin-links border-top'>
                    <ul className='mt-4 px-0'>
                        <li>
                            <NavLink
                                to='/admin-panel'
                                className={({ isActive, isPending }) =>
                                    isActive ? "active-menu" : ""
                                }
                                end >
                                صفحه اصلی
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                              to='/admin-panel/plans'
                              className={({ isActive, isPending }) =>
                                  isPending ? "" : isActive ? "active-menu" : ""
                              }
                            >
                                برنامه ورزشی
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/courses'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                دوره های ویدیویی
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

                        <li>
                            <NavLink
                                to='/admin-panel/users'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                کاربران
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to=''

                            >
                                سوالات متداول
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to=''

                            >
                                تیکت ها
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin-panel/offs'
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active-menu" : ""
                                }
                            >
                                کدهای تخفیف
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
