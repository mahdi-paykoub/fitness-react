import { React, useState, useEffect, useContext } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import { MdLiveTv } from 'react-icons/md';
import { FiClock } from "react-icons/fi";
import { IoMdKey } from 'react-icons/io';
import { BiSupport } from "react-icons/bi";
import { MdInfoOutline } from "react-icons/md";
import { PiChalkboardTeacher } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import Accordion from 'react-bootstrap/Accordion';
import { FiLock } from "react-icons/fi";
import { FaPlay } from "react-icons/fa6";
import { CartContext } from "../../Context/CartContext";
import MyModal from '../../components/MyModal/MyModal';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoLockOpenOutline } from "react-icons/io5";
import DOMPurify from 'dompurify';


export default function SingleCourse() {
    const [course, setCourse] = useState([])
    const [isUserRegister, setIsUserRegister] = useState([])
    const [tab, setTab] = useState('sections')
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const [modalShow, setModalShow] = useState(false);
    const courseSlug = useParams().title

    const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const cartContext = useContext(CartContext)




    useEffect(() => {
        let newLsToken = userTokenLS != null ? userTokenLS.token : '';

        fetch(`${baseUrl}course/${courseSlug}`, {
            headers: {
                Authorization: `Bearer ${newLsToken}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setIsUserRegister(res.data.info.isUserRegisteredToThisCourse)
                setCourse(res.data)
            })
    }, [])

    function handleAddToCart(plan) {
        cartContext.addToCart([course, 'course']);
        navigate('/checkout');
    }

    return (
        <>
            {
                course.length !== 0 &&
                <>
                    <Container className='bg-global-light mt-3 px-lg-5 pb-5'>
                        <Row>
                            <Col lg={12}>
                                <div className='course-top-box d-flex align-items-center justify-content-center position-relative'>
                                    <div className=''>
                                        <div className='fw-bold text-white header-txt fflalezar'>
                                            {course.title}
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center text-center text-white mt-3'>
                                            <div>
                                                <Link to='/' className='text-white'>
                                                    خانه
                                                </Link>
                                            </div>
                                            <IoIosArrowBack className='mx-2' />
                                            <Link to='/courses' className='text-white'>
                                                دوره ها
                                            </Link>
                                        </div>
                                    </div>
                                    <img src="/images/breadcrumb_shape02.26314598.svg" alt="" className='position-absolute float-shape-1 d-none d-lg-block' />
                                    <img src="/images/breadcrumb_shape01.df47cee2.svg" alt="" className='position-absolute float-shape-2 d-none d-lg-block' />
                                    <img src="/images/breadcrumb_shape05.925251.svg" alt="" className='position-absolute float-shape-3  d-none d-lg-block' />
                                    <img src="/images/star.svg" alt="" className='position-absolute float-shape-4 d-none d-lg-block' />
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col xs={{ order: 1 }} lg={{ span: 8, order: 1 }}>
                                <div className='bg-white p-4 br-10'>
                                    <div className='fw-bold fs30 lh-1-8 c-text-secondary ps-5 fflalezar'>
                                        {course.title}
                                    </div>

                                    <div className='d-flex align-items-center mt-4 '>
                                        <div className='course-status-badge  fflalezar'>
                                            تکمیل شده
                                        </div>
                                        <div className='fflalezar fs14 text-secondary'>
                                            <GoDotFill fontSize={15} className='me-3 ms-1 color-2' />
                                            <span>آخرین آپدیت: </span>
                                            <span className='me-2' dir='ltr'>{course.updated_at.substring(0, 10)}</span>
                                        </div>
                                        <div className='fflalezar text-secondary'>
                                            <GoDotFill fontSize={15} className='me-3 ms-1 color-2' />
                                            <span className='fs14'>تعداد جلسات دوره : </span>
                                            <span className='me-2'>{course.info.session_count}</span>
                                        </div>
                                    </div>
                                    <div className='mt-4 d-flex'>
                                        <div className='d-flex align-items-center'>
                                            <img src="/images/avatar-1.jpg" className='rounded-circle' width={55} height={55} alt="" />
                                            <div className='fs14 fflalezar me-2'>
                                                <span className='c-text-secondary'> مدرس دوره:</span>
                                                <span className='me-2 color-2'>آرمان کرد بچه</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* text editor */}

                                {/* sections */}
                                <div className='mt-3 section-of-course-tab bg-white br-4'>
                                    <div className='d-flex '>
                                        <div className={`py-4 px-3 me-2 fflalezar cursor-pointer ${tab === 'sections' ? 'active' : ''}`} onClick={(e) => setTab('sections')}>
                                            جلسات دوره
                                        </div>
                                        <div className={`py-4 px-3 me-2 fflalezar cursor-pointer ${tab === 'description' ? 'active' : ''}`} onClick={(e) => setTab('description')}>
                                            توضیحات دوره
                                        </div>
                                        <div className={`py-4 px-3 me-2 fflalezar cursor-pointer ${tab === 'teacher' ? 'active' : ''}`} onClick={(e) => setTab('teacher')}>
                                            درباره مدرس
                                        </div>
                                    </div>
                                </div>
                                {/* parts 1*/}
                                {
                                    tab === 'description' &&
                                    <div className='lh2 mt-3 text-editor px-3 bg-white br-4 p-4'>
                                        <div className='text-secondary text-justify lh2 fs18'
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.body) }}>

                                        </div>
                                    </div>
                                }
                                {
                                    tab === 'sections' &&
                                    <div className='mt-3 bg-white p-4 br-4'>
                                        <div className='fflalezar fs20 d-flex align-items-center'>
                                            <svg className='ms-2 color-2' width="30" height="30" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M4.73678 9.95638C10.9561 13.5636 11.7339 13.5637 17.9532 9.95638C24.1726 6.3491 24.1726 6.3491 17.9532 2.74183C11.7339 -0.865436 10.9561 -0.865446 4.73678 2.74183C1.62711 4.54547 0.0722656 5.44729 0.0722656 6.34911V14.4655C0.0722656 14.9635 0.476023 15.3673 0.974084 15.3673C1.47214 15.3673 1.8759 14.9635 1.8759 14.4655L1.8759 8.57971C1.8759 8.43679 2.03439 8.35027 2.15544 8.42626C2.84479 8.85901 3.70524 9.35808 4.73678 9.95638Z"></path>
                                                <path fill="currentColor" d="M4.73678 10.8583C10.9561 14.4655 11.7339 14.4655 17.9532 10.8583L18.308 10.6524C18.5895 10.489 18.9445 10.6682 18.9652 10.9931C18.9965 11.4841 19.0104 12.0377 19.0104 12.6618C19.0104 17.1709 17.2068 18.0728 11.314 18.0728C5.02702 18.0728 3.67954 17.1709 3.67954 12.6618C3.67954 12.038 3.69291 11.4846 3.72307 10.9938C3.74307 10.6682 4.09864 10.4879 4.38077 10.6517L4.73678 10.8583Z"></path>
                                            </svg>
                                            <span className='fs30 color-2'>   سرفصل ها</span>
                                        </div>
                                        <div className='mt-4'>
                                            <Accordion defaultActiveKey="0">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header className='fflalezar'>جلسات دوره</Accordion.Header>
                                                    <Accordion.Body>
                                                        {
                                                            course.sessions.length !== 0 ?
                                                                course.sessions.map((session, index) =>
                                                                    session.is_free == true ?
                                                                        <Link key={session.id} to={`/courses/${course.slug}/${session.id}`} className='c-text-secondary'>
                                                                            <div className='d-flex justify-content-between align-items-center border-bottom onhover-sections'>
                                                                                <div className='d-flex align-items-center py-4'>
                                                                                    <div className='count-number c-text-secondary fflalezar d-flex justify-content-center align-items-center br-10 bg-white'>
                                                                                        {index + 1}
                                                                                    </div>
                                                                                    <div className='fs15 me-2'>
                                                                                        {session.title}
                                                                                    </div>
                                                                                </div>
                                                                                <div className='d-flex align-items-center'>
                                                                                    <div className='ms-2 mt-1'>
                                                                                        {session.time}
                                                                                    </div>

                                                                                    <IoLockOpenOutline fontSize={20} />
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                        :
                                                                        isUserRegister == null ?
                                                                            <div className='d-flex justify-content-between align-items-center border-bottom onhover-sections'>
                                                                                <div className='d-flex align-items-center py-4'>
                                                                                    <div className='count-number c-text-secondary fflalezar d-flex justify-content-center align-items-center br-10 bg-white'>
                                                                                        {index + 1}
                                                                                    </div>
                                                                                    <div className='fs15 me-2'>
                                                                                        {session.title}
                                                                                    </div>
                                                                                </div>
                                                                                <div className='d-flex align-items-center'>
                                                                                    <div className='ms-2 mt-1'>
                                                                                        {session.time}
                                                                                    </div>
                                                                                    <FiLock fontSize={20} />
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            <Link to={`/courses/${course.slug}/${session.id}`} className='c-text-secondary'>
                                                                                <div className='d-flex justify-content-between align-items-center border-bottom onhover-sections'>
                                                                                    <div className='d-flex align-items-center py-4'>
                                                                                        <div className='count-number c-text-secondary fflalezar d-flex justify-content-center align-items-center br-10 bg-white'>
                                                                                            {index + 1}
                                                                                        </div>
                                                                                        <div className='fs15 me-2'>
                                                                                            {session.title}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='d-flex align-items-center'>
                                                                                        <div className='ms-2 mt-1'>
                                                                                            {session.time}
                                                                                        </div>

                                                                                        <IoLockOpenOutline fontSize={20} />
                                                                                    </div>
                                                                                </div>
                                                                            </Link>

                                                                ) :
                                                                <div className='fflalezar fs20'>
                                                                    جلسه‌ای وجود ندارد!
                                                                </div>

                                                        }

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>

                                }
                                {/* sections */}

                                {/* about teacher */}
                                {
                                    tab === 'teacher' &&
                                    <div className='bg-white p-4 br-4 mt-3'>
                                        <Row>
                                            <Col lg={3}>
                                                <img src="/images/avatar-1.jpg" className='w-100 br-10 ' alt="" />
                                            </Col>
                                            <Col className=''>
                                                <div className='fflalezar fs20'>آرمان کرد بچه</div>
                                                <div className=' mt-2 fs13 color-2'>مربی بدن سازی</div>
                                                <div className='mt-3 fs15 lh2 c-text-secondary text-justify'>
                                                    این دوره چکیده ده ها کتاب ورزشی بدنسازی و فیتنس و همینطور نتیجه سالها تحقیقات من در دوران تحصیل آکادمیک(دانشگاهی) در رشته فیزیولوژی ورزش و همینطور به صورت آزاد هست
.
                                                </div>
                                            </Col>

                                        </Row>
                                    </div>
                                }

                            </Col>
                            {/* left side */}
                            <Col xs={{ order: 1 }} lg={{ span: 4, order: 2 }} >
                                <div className='w-100 position-relative'>
                                    <img src={baseUrl + course.image} className='w-100 main-img' alt="" />
                                    <div className='position-absolute bg-white rounded-circle play-video-btn ' variant="primary" onClick={() => setModalShow(true)}>
                                        <FaPlay fontSize={25} />
                                    </div>
                                </div>
                                {/* course info */}
                                <div className='w-100 course-info-box'>
                                    <div className='d-flex justify-content-between border-padd-b pt-4 px-4'>

                                        {
                                            course.off_price === null ?
                                                <>
                                                    <div className='fs15 text-secondary'>
                                                        <span className='fs13'>هزینه دوره:</span>
                                                    </div>
                                                    <div className='fs20 fw-bold color-2 fflalezar'>
                                                        {Number(course.price).toLocaleString()}
                                                        <span className='fs14 me-1'>تومان</span>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className='fs15 text-secondary'>
                                                        تخفیف : <span className='text-white fs12 discount-course fflalezar'>
                                                            {
                                                                100 - (Math.round(course.off_price / course.price * 100))
                                                            }
                                                            ٪
                                                        </span>
                                                    </div>
                                                    <div className='color-2 fflalezar'>
                                                        <div >
                                                            <span className='fs20'>{Number(course.off_price).toLocaleString()}</span>
                                                            <span className='me-1'>تومان</span>
                                                        </div>
                                                        <div className='d-flex align-items-center mt-2 text-secondary'>
                                                            <div className=' text-decoration-line-through ffir fs15 me-auto'>  {Number(course.price).toLocaleString()}  </div>
                                                            <div className='fs12 me-1 ffir'>تومان</div>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                    <div className='d-flex justify-content-between fs14 px-4 mt-4 pt-3 pb-4 border-bottom'>
                                        <div>
                                            <MdLiveTv className='fs20 color-2' />
                                            <span className='me-2 text-secondary -ver-2'>نوع مشاهده</span>
                                        </div>
                                        <div>
                                            <span className='fs13'>قابل دانلود</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4 border-bottom'>
                                        <div>
                                            <FiClock className='fs20 color-2' />
                                            <span className='me-2 text-secondary -ver-2'>مدت دوره</span>
                                        </div>
                                        <div>
                                            <span className='fs13'>...</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4 border-bottom'>
                                        <div>
                                            <MdLiveTv className='fs20 color-2' />
                                            <span className='me-2 text-secondary -ver-2'>تعداد جلسات</span>
                                        </div>
                                        <div>
                                            <span className='fs13'>{course.info.session_count}</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4 border-bottom'>
                                        <div>
                                            <BiSupport className='fs20 color-2 ' />
                                            <span className='me-2 text-secondary -ver-2'>پشتیبانی</span>
                                        </div>
                                        <div>
                                            <span className='fs13'>تیکت </span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4 border-bottom'>
                                        <div>
                                            <MdInfoOutline className='fs20 color-2 ' />
                                            <span className='me-2 text-secondary -ver-2'>وضعیت دوره</span>
                                        </div>
                                        <div>
                                            <span className='fs13'>تکمیل شده</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4'>
                                        <div>
                                            <PiChalkboardTeacher className='fs20 color-2 ' />
                                            <span className='me-2 text-secondary -ver-2'>مدرس</span>
                                        </div>
                                        <div>
                                            <span className='fs13'>...</span>
                                        </div>
                                    </div>
                                    <div className='mt-4 pb-4'>
                                        <div className='px-4'>
                                            {course.canBuy ?
                                                <button className='buy-course-btn' onClick={(e) => handleAddToCart(course)}>
                                                    خرید دوره
                                                </button>
                                                :
                                                <button className='btn btn-secondary fflalezar w-100'>
                                                    خریداری شده
                                                </button>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <MyModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </>
            }

        </>
    )
}
