import { React, useState, useEffect } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { MdTimeline } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { FaDumbbell } from "react-icons/fa";
import { HiOutlineSupport } from "react-icons/hi";
import { RxCube } from "react-icons/rx";
import { LiaDumbbellSolid } from "react-icons/lia";



export default function SinglePlan() {
    const [plan, setPlan] = useState([])
    const [tab, setTab] = useState('sections')

    const [modalShow, setModalShow] = useState(false);
    const courseSlug = useParams().title

    const baseUrl = process.env.REACT_APP_BASE_URL




    useEffect(() => {
        fetch(`${baseUrl}plan/${courseSlug}`)
            .then(res => res.json())
            .then(res => {
                setPlan(res.data)
            })
    }, [])

    return (
        <>
            {
                plan.length !== 0 &&
                <Container className='pb-5 mb-5'>
                    <div className='ball single-plan-ball-1'></div>
                    <Row className='mt-3'>
                        <Col lg={12}>
                            <div className='course-top-box d-flex align-items-center justify-content-center position-relative'>
                                <div className=''>
                                    <div className='fw-bold text-white header-txt'>
                                        {plan.title}
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center text-center text-white mt-3'>
                                        <div>
                                            <Link to='/' className='text-white'>
                                                خانه
                                            </Link>
                                        </div>
                                        <IoIosArrowBack className='mx-2' />
                                        <div>
                                            دوره ها
                                        </div>
                                    </div>
                                </div>
                                <img src="/images/breadcrumb_shape02.26314598.svg" alt="" className='position-absolute float-shape-1' />
                                <img src="/images/breadcrumb_shape01.df47cee2.svg" alt="" className='position-absolute float-shape-2' />
                                <img src="/images/breadcrumb_shape05.925251.svg" alt="" className='position-absolute float-shape-3' />
                                <img src="/images/star.svg" alt="" className='position-absolute float-shape-4' />
                            </div>
                        </Col>
                    </Row>

                    <Row className='mt-4 align-items-center pe-3'>
                        <Col lg={6}>
                            <div className='text-50 c-text-secondary fflalezar'>

                                جزئیات برنامه
                                <LiaDumbbellSolid className='me-4 mb-3' />
                            </div>
                            <div className='mt-1 c-text-secondary fs15 lh2 text-justify'>
                                {plan.description}
                            </div>

                            <div className='d-flex justify-content-between align-items-center mt-5'>
                                <Link to='/checkout'>
                                    <button className='fflalezar send-btn cc-btn'>
                                        <svg className='ms-2' width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.50847 10.9168C12.107 14.744 12.9322 14.744 19.5307 10.9168C26.1292 7.08956 26.1292 7.08956 19.5307 3.26237C12.9322 -0.564826 12.107 -0.564837 5.50847 3.26237C2.20921 5.17597 0.55957 6.13277 0.55957 7.08957V15.7008C0.55957 16.2292 0.987944 16.6576 1.51637 16.6576C2.0448 16.6576 2.47317 16.2292 2.47317 15.7008L2.47317 9.45617C2.47317 9.30453 2.64132 9.21274 2.76975 9.29336C3.50113 9.75249 4.41404 10.282 5.50847 10.9168Z" fill="#fff"></path>
                                            <path d="M5.50847 11.8736C12.107 15.7008 12.9322 15.7008 19.5307 11.8736L19.9071 11.6553C20.2058 11.4819 20.5824 11.672 20.6043 12.0167C20.6375 12.5376 20.6524 13.125 20.6524 13.7872C20.6524 18.5712 18.7388 19.528 12.4867 19.528C5.81641 19.528 4.38677 18.5712 4.38677 13.7872C4.38677 13.1253 4.40096 12.5382 4.43295 12.0175C4.45418 11.672 4.83143 11.4807 5.13075 11.6545L5.50847 11.8736Z" fill="#fff"></path>
                                        </svg>
                                        خرید برنامه تمرینی

                                    </button>
                                </Link>

                                <div className='fflalezar color-2'>
                                    <span className='fs30'>  {Number(plan.price).toLocaleString()}</span>
                                    <span>تومان</span>
                                </div>
                            </div>

                        </Col>
                        <Col lg={6}>
                            <img src="/images/banner/Sport Illustration Kit-08.png" className='w-100' alt="" />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col lg={3} className='mt-4'>
                            <div className='box-1 p-4 br-10 '>
                                <div className='inner-box-1 rounded-circle bg-white w-fit d-flex justify-content-center align-items-center'>
                                    <MdTimeline fontSize={30} />
                                </div>
                                <div className='fflalezar fs20 c-text-secondary mt-3 text-white'>
                                    مدت زمان دوره
                                </div>
                                <div className='mt-3 fs12 text-white ps-5 lh2'>
                                    این دوره برای مدت دو ماه طراحی و اجرا خواهد شده
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} className='mt-4'>
                            <div className='box-1 p-4 br-10 '>
                                <div className='inner-box-1 rounded-circle bg-white w-fit d-flex justify-content-center align-items-center'>
                                    <BiMessageSquareDots fontSize={30} />
                                </div>
                                <div className='fflalezar fs20 c-text-secondary mt-3 text-white'>
                                    امکان ارسال تیکت
                                </div>
                                <div className='mt-3 fs12 text-white ps-5 lh2'>
                                    با خرید این دوره قابلیت ارسال تیکت و دریافت مشاوره برای شما فراهم می‌شود
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} className='mt-4'>
                            <div className='box-1 p-4 br-10 '>
                                <div className='inner-box-1 rounded-circle bg-white w-fit d-flex justify-content-center align-items-center'>
                                    <HiOutlineSupport fontSize={30} />
                                </div>
                                <div className='fflalezar fs20 c-text-secondary mt-3 text-white'>
                                    طراحی مکمل
                                </div>
                                <div className='mt-3 fs12 text-white ps-5 lh2'>
                                    با خرید این دوره  مکمل غذایی و رژیمی را دریافت میکنید.
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} className='mt-4'>
                            <div className='box-1 p-4 br-10 '>
                                <div className='inner-box-1 rounded-circle bg-white w-fit d-flex justify-content-center align-items-center'>
                                    <RxCube fontSize={30} />
                                </div>
                                <div className='fflalezar fs20 c-text-secondary mt-3 text-white'>
                                    مدت زمان دوره
                                </div>
                                <div className='mt-3 fs12 text-white ps-5 lh2'>
                                    این دوره برای مدت دو ماه طراحی و اجرا خواهد شده
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }

        </>
    )
}
