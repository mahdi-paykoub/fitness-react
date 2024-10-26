import React from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, NavLink, Outlet } from 'react-router-dom'
import { RiUserFollowLine } from "react-icons/ri";
import { BiBaguette } from "react-icons/bi";
import { TbMessageQuestion } from "react-icons/tb";
import { FaQuestion } from "react-icons/fa6";
import { PiGooglePlayLogoLight } from "react-icons/pi";
import { FaToggleOff } from "react-icons/fa6";
import { RiArrowGoBackLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { LuFileSpreadsheet } from "react-icons/lu";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { BiBell } from "react-icons/bi";

export default function UserDashboard() {


    const setActive = ({ isActive }) =>
        isActive ? "text-dark active" : "text-dark";
    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={2} className='bg-white p-3 col-2-5 border-start'>
                        <div className='d-flex align-items-center mt-3 border-bottom pb-4'>
                            <div className='user-img-back d-flex justify-content-center align-items-center'>
                                <img src="/images/buddy-idle.svg" width={60} height={60} alt="" />
                            </div>
                            <div className='me-2 pe-1'>
                                <div className='fs14 fw-bold'>مهدی پایکوب</div>
                                <div className='mt-2 ffv text-secondary fs12'>
                                    09309519365
                                    <Link className='me-1' to="/dashboard/user-info">
                                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.15" cx="19.7208" cy="19.8873" r="13.8275" transform="rotate(-36.651 19.7208 19.8873)" fill="#5b69bf"></circle><path d="M3 13C3 15.4477 3.13246 17.3463 3.46153 18.827C3.78807 20.2963 4.29478 21.2921 5.00136 21.9986C5.70794 22.7052 6.70365 23.2119 8.17298 23.5385C9.65366 23.8675 11.5523 24 14 24C16.4477 24 18.3463 23.8675 19.827 23.5385C21.2963 23.2119 22.2921 22.7052 22.9986 21.9986C23.7052 21.2921 24.2119 20.2963 24.5385 18.827C24.8675 17.3463 25 15.4477 25 13C25 10.5523 24.8675 8.65366 24.5385 7.17298C24.2119 5.70365 23.7052 4.70794 22.9986 4.00136C22.2921 3.29478 21.2963 2.78807 19.827 2.46153C18.3463 2.13246 16.4477 2 14 2C11.5523 2 9.65366 2.13246 8.17298 2.46153C6.70365 2.78807 5.70794 3.29478 5.00136 4.00136C4.29478 4.70794 3.78807 5.70365 3.46153 7.17298C3.13246 8.65366 3 10.5523 3 13Z" stroke="#5b69bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.1577 9.18182L14.9195 7.33429C15.3244 6.90978 16.0046 6.88646 16.4388 7.2822L19.658 10.2159C20.0923 10.6117 20.1161 11.2766 19.7113 11.7011L17.8182 13.6864M13.1577 9.18182L8.28868 14.2877C8.08633 14.4999 7.98271 14.7844 8.00236 15.0738L8.20234 18.0187C8.23993 18.5724 8.71141 19.0021 9.27903 19L12.2983 18.9888C12.595 18.9877 12.8781 18.8667 13.0805 18.6545L17.8182 13.6864M13.1577 9.18182L17.8182 13.6864" stroke="#5b69bf" stroke-width="2" stroke-linejoin="round"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <div className='fs13 text-secondary mb-3'>
                                منو اصلی
                            </div>
                            <NavLink to="/dashboard" className={setActive} end >
                                <div className='d-flex align-items-center panel-items'>
                                    <RxDashboard fontSize={20} />
                                    <div className='fs14 me-2'>داشبورد</div>
                                </div>
                            </NavLink>
                            <NavLink to="/dashboard/user-info" className={setActive}>
                                <div className='d-flex align-items-center mt-3 panel-items'>
                                    <RiUserFollowLine fontSize={20} />
                                    <div className='fs14 me-2'>تکمیل اطلاعات</div>
                                </div>
                            </NavLink>
                            <NavLink to="/dashboard/my-programs" className={setActive}>
                                <div className='d-flex align-items-center mt-3 panel-items'>
                                    <BiBaguette fontSize={20} />
                                    <div className='fs14 me-2'>برنامه تمرینی</div>
                                </div>
                            </NavLink>
                            <NavLink to="/dashboard/my-courses" className={setActive}>
                                <div className='d-flex align-items-center justify-content-between mt-3 panel-items'>
                                    <div className='d-flex align-items-center'>
                                        <PiGooglePlayLogoLight fontSize={20} />
                                        <div className='fs14 me-2'>ویدیو های من</div>
                                    </div>
                                    <div className='panel-badge d-flex justify-content-center align-items-center fs14 fw-bold'>
                                        <span className='mt-1'>2</span>
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink to="/dashboard/inqiry" className={setActive}>
                                <div className='d-flex align-items-center mt-3 panel-items'>
                                    <LuFileSpreadsheet fontSize={20} />
                                    <div className='fs14 me-2'>استعلام نوبت</div>
                                </div>
                            </NavLink>
                            <div className='fs13 text-secondary mb-2 mt-4'>
                                ارتباط با ما
                            </div>
                            <NavLink to="/dashboard/tickets" className={setActive}>
                                <div className='d-flex align-items-center mt-3 panel-items '>
                                    <TbMessageQuestion fontSize={20} />
                                    <div className='fs14 me-2'>تیکت ها</div>
                                </div>
                            </NavLink>
                            <NavLink to="/dashboard/faqs" className={setActive}>
                                <div className='d-flex align-items-center mt-3 panel-items'>
                                    <FaQuestion fontSize={20} />
                                    <div className='fs14 me-2'>سوالات متداول</div>
                                </div>
                            </NavLink>

                            <div className='fs13 text-secondary mb-2 mt-4'>
                                خروج
                            </div>
                            <Link className='text-dark'>
                                <div className='d-flex align-items-center mt-3 panel-items'>
                                    <RiArrowGoBackLine fontSize={20} />
                                    <div className='fs14 me-2'>  بازگشت به صفحه اصلی </div>
                                </div>
                            </Link>
                            <Link className='text-dark'>
                                <div className='d-flex align-items-center panel-items'>
                                    <FaToggleOff fontSize={20} />
                                    <div className='fs14 me-2'>خروج  از حساب  </div>
                                </div>
                            </Link>


                        </div>
                    </Col>
                    <Col className='col-9-5' lg={10}>
                        <div className='d-flex mt-3 px-3 align-items-center justify-content-between panel-navbar'>
                            <div style={{ 'color': '#3f3f46' }}>
                                <span className='fs18 fw-bold'>مهدی </span>
                                <span>
                                    <span className='fs18 fw-bold'>عزیز؛ خوش اومدی</span>
                                    <img src="/images/5. Cool.png" width={50} height={50} alt="" />
                                    <span className='fs12 text-secondary pe-3 border-end'>جمعه, 13 مهر 1403</span>
                                </span>
                            </div>
                            <div className='d-flex'>
                                <div className='notify-top-box rounded-circle ms-3 d-flex justify-content-center align-items-center  cursor-pointer'>
                                    <BiBell className='text-white' fontSize={25} />
                                </div>
                                <img src="/images/740b09b7962ead3ce694eb9df04a07a4.jpg" className='rounded-circle' width={50} height={50} alt="" />
                            </div>
                        </div>
                        <Outlet />
                    </Col>
                </Row>
            </Container >
        </>
    )
}
