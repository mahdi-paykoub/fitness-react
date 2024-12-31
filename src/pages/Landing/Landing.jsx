import { React, useContext } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HiMiniPlay } from "react-icons/hi2";
import { FaDumbbell } from "react-icons/fa6";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { AuthContext } from "../../Context/AuthContext";
import swal from "sweetalert";
import { FaPlus } from 'react-icons/fa';


export default function Landing() {
    const authContext = useContext(AuthContext)


    const handleLogout = () => {
        swal({
            title: 'آیا از خروج اطمینان دارید؟',
            icon: "error",
            buttons: ['خیر', 'بله']
        }).then(response => {
            if (response) {
                authContext.logout()
            }
        })
    }
    return (
        <>
            <Container className='bg-global-light mt-5 mb-5'>
                <Row>
                    <Col xs={{ order: 'last' }} xl={{ order: 'first', span: 5 }} className='align-content-center position-relative '>
                        <svg className='d-none d-lg-block' width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle className='color-1' cx="10" cy="24" r="10" fill="currentColor"></circle>
                            <circle className='color-1' cx="30" cy="13" r="7" fill="currentColor" fillOpacity="0.4"></circle>
                            <circle className='color-1' cx="15" cy="4" r="4" fill="currentColor" fillOpacity="0.7"></circle>
                        </svg>
                        <div className='header-text mt-lg-4 text-center text-lg-end'>
                            با کمک <span className='color-1'>مربی همراه </span> بهترین خودت باش!
                            {/* آکادمی ورزشی
                            <br />
                            مدال آوران <span className='color-1'>مربی همراه</span> */}
                        </div>
                        <p className='mt-3 header-subtext text-center text-lg-end'>
                            مربی همراه در کنار شما تا رسیدن به یک تناسب اندام ایده آل خواهد بود.
                        </p>
                        <div className='mt-4 pt-4 d-flex justify-content-center justify-content-lg-start'>
                            <Link to="/plans" className='first-program-btn text-white'>
                                مشاهده برنامه‌های ویژه
                            </Link>
                            <Link to='/courses'>
                                <div className='d-flex align-items-center'>

                                    <div className='second-program-btn rounded-circle me-3 d-flex justify-content-center align-items-center'>
                                        <HiMiniPlay className='text-white' />
                                    </div>

                                    <div className='me-2 text-dark'>
                                        دوره‌های آموزشی
                                    </div>


                                </div>
                            </Link>
                        </div>
                        {authContext.isLoggedIn ?
                            <div className='mt-5 pb-4 pt-2 d-flex align-items-center justify-content-center justify-content-lg-start'>
                                <div className=''></div>
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle opacity="0.15" cx="19.7208" cy="19.8873" r="13.8275" transform="rotate(-36.651 19.7208 19.8873)" fill="#5b69bf"></circle>
                                    <path d="M3 13C3 15.4477 3.13246 17.3463 3.46153 18.827C3.78807 20.2963 4.29478 21.2921 5.00136 21.9986C5.70794 22.7052 6.70365 23.2119 8.17298 23.5385C9.65366 23.8675 11.5523 24 14 24C16.4477 24 18.3463 23.8675 19.827 23.5385C21.2963 23.2119 22.2921 22.7052 22.9986 21.9986C23.7052 21.2921 24.2119 20.2963 24.5385 18.827C24.8675 17.3463 25 15.4477 25 13C25 10.5523 24.8675 8.65366 24.5385 7.17298C24.2119 5.70365 23.7052 4.70794 22.9986 4.00136C22.2921 3.29478 21.2963 2.78807 19.827 2.46153C18.3463 2.13246 16.4477 2 14 2C11.5523 2 9.65366 2.13246 8.17298 2.46153C6.70365 2.78807 5.70794 3.29478 5.00136 4.00136C4.29478 4.70794 3.78807 5.70365 3.46153 7.17298C3.13246 8.65366 3 10.5523 3 13Z" stroke="#5b69bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M13.1577 9.18182L14.9195 7.33429C15.3244 6.90978 16.0046 6.88646 16.4388 7.2822L19.658 10.2159C20.0923 10.6117 20.1161 11.2766 19.7113 11.7011L17.8182 13.6864M13.1577 9.18182L8.28868 14.2877C8.08633 14.4999 7.98271 14.7844 8.00236 15.0738L8.20234 18.0187C8.23993 18.5724 8.71141 19.0021 9.27903 19L12.2983 18.9888C12.595 18.9877 12.8781 18.8667 13.0805 18.6545L17.8182 13.6864M13.1577 9.18182L17.8182 13.6864" stroke="#5b69bf" strokeWidth="2" strokeLinejoin="round"></path>
                                </svg>


                                <div className='me-1 fs15'>
                                    شما عضو سایت هستید.
                                </div>

                                <div className='me-1'>
                                    {authContext.userInfo.data.status != null ?
                                        <Link to='/dashboard' className='color-2 fs14'
                                        >
                                            پنل کاربری
                                        </Link>
                                        :
                                        <div className='color-2 fs14'
                                            onClick={() => {
                                                handleLogout()
                                            }}>خروج</div>
                                    }

                                </div>
                            </div>
                            :
                            <div className='mt-5 pt-2 d-flex align-items-center justify-content-center justify-content-lg-start'>
                                <div className=''></div>
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle opacity="0.15" cx="19.7208" cy="19.8873" r="13.8275" transform="rotate(-36.651 19.7208 19.8873)" fill="#5b69bf"></circle>
                                    <path d="M3 13C3 15.4477 3.13246 17.3463 3.46153 18.827C3.78807 20.2963 4.29478 21.2921 5.00136 21.9986C5.70794 22.7052 6.70365 23.2119 8.17298 23.5385C9.65366 23.8675 11.5523 24 14 24C16.4477 24 18.3463 23.8675 19.827 23.5385C21.2963 23.2119 22.2921 22.7052 22.9986 21.9986C23.7052 21.2921 24.2119 20.2963 24.5385 18.827C24.8675 17.3463 25 15.4477 25 13C25 10.5523 24.8675 8.65366 24.5385 7.17298C24.2119 5.70365 23.7052 4.70794 22.9986 4.00136C22.2921 3.29478 21.2963 2.78807 19.827 2.46153C18.3463 2.13246 16.4477 2 14 2C11.5523 2 9.65366 2.13246 8.17298 2.46153C6.70365 2.78807 5.70794 3.29478 5.00136 4.00136C4.29478 4.70794 3.78807 5.70365 3.46153 7.17298C3.13246 8.65366 3 10.5523 3 13Z" stroke="#5b69bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M13.1577 9.18182L14.9195 7.33429C15.3244 6.90978 16.0046 6.88646 16.4388 7.2822L19.658 10.2159C20.0923 10.6117 20.1161 11.2766 19.7113 11.7011L17.8182 13.6864M13.1577 9.18182L8.28868 14.2877C8.08633 14.4999 7.98271 14.7844 8.00236 15.0738L8.20234 18.0187C8.23993 18.5724 8.71141 19.0021 9.27903 19L12.2983 18.9888C12.595 18.9877 12.8781 18.8667 13.0805 18.6545L17.8182 13.6864M13.1577 9.18182L17.8182 13.6864" stroke="#5b69bf" strokeWidth="2" strokeLinejoin="round"></path>
                                </svg>


                                <div className='me-1 fs15'>
                                    آیا قبلا در سایت ثبت نام کرده اید؟
                                </div>

                                <div className='me-1'>
                                    <Link to='/login/1' className='color-2'>
                                        ورود
                                    </Link>
                                </div>

                                
                            </div>
                        }


                        <div className='ball ball-1'></div>
                        <div className='ball ball-2'></div>
                    </Col>
                    <Col xs={{ order: 'first' }} xl={{ order: 'last' }} className='position-relative text-center mb-5 mb-lg-0'>
                        <img className='w-100' src="/images/banner/Sport Illustration Kit-02.png" alt="" />
                        {/* floats */}
                        <div className='position-absolute dumbbell-float-box align-items-center d-none justify-content-center d-lg-flex up-down-animation'>
                            <FaDumbbell className='text-white' />
                        </div>
                        <div className='position-absolute fit-float-box align-items-center justify-content-center d-none d-lg-flex right-left-animation'>
                            <SiGoogledisplayandvideo360 className='text-white' />
                        </div>
                        <div className='glass-box position-absolute d-lg-flex align-items-center d-flex d-none'>
                            <img src="/images/shape-2.svg" width={45} height={45} alt="" />
                            <Link to='/cooperate-with-us' className='fs13 me-1 text-white'> همکاری با ما <span className='text-warning'>(دریافت کد معرف)</span> </Link>
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}
