import { React, useState, useEffect, useContext } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { MdTimeline } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { FaDumbbell } from "react-icons/fa";
import { HiOutlineSupport } from "react-icons/hi";
import { RxCube } from "react-icons/rx";
import { LiaDumbbellSolid } from "react-icons/lia";
import { CartContext } from "../../Context/CartContext";
import { GoDotFill } from "react-icons/go";
import DOMPurify from 'dompurify';



export default function SinglePlan() {
    const [plan, setPlan] = useState([])
    const [tab, setTab] = useState('sections')

    const [modalShow, setModalShow] = useState(false);
    const courseSlug = useParams().title

    const baseUrl = process.env.REACT_APP_BASE_URL
    const cartContext = useContext(CartContext)
    const navigate = useNavigate();
    const userTokenLS = JSON.parse(localStorage.getItem('user'))



    useEffect(() => {
        let newLsToken = userTokenLS != null ? userTokenLS.token : '';
        fetch(`${baseUrl}plan/${courseSlug}`, {
            headers: {
                Authorization: `Bearer ${newLsToken}`
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);

                setPlan(res.data)
            })



    }, [])



    function handleAddToCart(plan) {
        cartContext.addToCart([plan, 'plan']);
        navigate('/checkout');
    }

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
                                <img src="/images/breadcrumb_shape02.26314598.svg" alt="" className='position-absolute float-shape-1 d-none d-lg-block' />
                                <img src="/images/breadcrumb_shape01.df47cee2.svg" alt="" className='position-absolute float-shape-2 d-none d-lg-block' />
                                <img src="/images/breadcrumb_shape05.925251.svg" alt="" className='position-absolute float-shape-3  d-none d-lg-block' />
                                <img src="/images/star.svg" alt="" className='position-absolute float-shape-4 d-none d-lg-block' />
                            </div>
                        </Col>
                    </Row>

                    <Row className='mt-4 align-items-center pe-3'>
                        <Col lg={6}>
                            <div className='text-50 c-text-secondary fflalezar'>
                                جزئیات برنامه
                            </div>
                            <div className='mt-1 c-text-secondary fs15 lh2 text-justify'>
                                {plan.description}
                            </div>

                            <div className='d-flex justify-content-between align-items-center mt-5'>
                                {plan.canBuy == true ?
                                    <button onClick={(e) => handleAddToCart(plan)} className='fflalezar send-btn cc-btn'>
                                        <svg className='ms-2' width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.50847 10.9168C12.107 14.744 12.9322 14.744 19.5307 10.9168C26.1292 7.08956 26.1292 7.08956 19.5307 3.26237C12.9322 -0.564826 12.107 -0.564837 5.50847 3.26237C2.20921 5.17597 0.55957 6.13277 0.55957 7.08957V15.7008C0.55957 16.2292 0.987944 16.6576 1.51637 16.6576C2.0448 16.6576 2.47317 16.2292 2.47317 15.7008L2.47317 9.45617C2.47317 9.30453 2.64132 9.21274 2.76975 9.29336C3.50113 9.75249 4.41404 10.282 5.50847 10.9168Z" fill="#fff"></path>
                                            <path d="M5.50847 11.8736C12.107 15.7008 12.9322 15.7008 19.5307 11.8736L19.9071 11.6553C20.2058 11.4819 20.5824 11.672 20.6043 12.0167C20.6375 12.5376 20.6524 13.125 20.6524 13.7872C20.6524 18.5712 18.7388 19.528 12.4867 19.528C5.81641 19.528 4.38677 18.5712 4.38677 13.7872C4.38677 13.1253 4.40096 12.5382 4.43295 12.0175C4.45418 11.672 4.83143 11.4807 5.13075 11.6545L5.50847 11.8736Z" fill="#fff"></path>
                                        </svg>
                                        خرید برنامه تمرینی

                                    </button>
                                    :
                                    <div className='text-secondary fflalezar'>برای خرید اطلاعات خرید قبلی را تکمیل کنید</div>
                                }
                                <div className='color-2 fflalezar'>
                                    {
                                        plan.off_price === null ?
                                            <div className=''>
                                                <span className='fs30'>  {Number(plan.price).toLocaleString()}</span>
                                                <span  className='fs16 me-1'>تومان</span>
                                            </div>
                                            :
                                            <>
                                                <div className='fs30'>
                                                    {Number(plan.off_price).toLocaleString()}
                                                    <span className='fs16 me-1'>تومان</span>
                                                </div>
                                                <div className='d-flex align-items-center mt-2'>
                                                    <div className=' text-decoration-line-through ffir fs17'>  {Number(plan.price).toLocaleString()}  </div>
                                                    <div className='fs14 me-1 ffir'>تومان</div>
                                                    <div className='badge bg-danger ffir me-auto'>
                                                        {
                                                            100 - (Math.round(plan.off_price / plan.price * 100))
                                                        }
                                                        ٪
                                                    </div>
                                                </div>

                                            </>
                                    }
                                </div>
                            </div>

                        </Col>
                        <Col lg={6} >
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
                                    این دوره برای مدت {plan.duration} ماه طراحی و اجرا خواهد شد
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
                                    با خرید این دوره قابلیت ارسال تیکت  برای شما فراهم می‌شود
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
                                    مراجعه حضوری
                                </div>
                                <div className='mt-3 fs12 text-white ps-5 lh2'>


                                    در این دوره امکان مراجعه حضوری فراهم
                                    {
                                        plan.visit === 0 ? ' نسیت ' : ' است '
                                    }

                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='12'>
                            <div className='bg-white br-10 p-4 mt-4'>

                                <div className='color-2 fw-bold c-text-secondary d-flex align-items-center'>
                                    <GoDotFill fontSize={20} />
                                    <div className='me-1 fs20'> توضیحات</div>
                                </div>
                                <div className='text-editor mt-2'>
                                    <div className='text-secondary text-justify lh2 fs18'
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(plan.body) }}>

                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }

        </>
    )
}
