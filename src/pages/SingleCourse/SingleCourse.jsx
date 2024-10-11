import { React, useState } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyModal from '../../components/MyModal/MyModal';

export default function SingleCourse() {
    const [tab, setTab] = useState('sections')
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Container fluid className='bg-global-light mt-3 px-lg-5'>
                <Row>
                    <Col lg={12}>
                        <div className='course-top-box d-flex align-items-center justify-content-center position-relative'>
                            <div className=''>
                                <div className='fw-bold text-white header-txt fflalezar'>
                                    نام دوره مورد نظر
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
                <Row className='mt-4'>
                    <Col xs={{ order: 1 }} lg={{ span: 8, order: 1 }}>
                        <div className='bg-white p-4 br-10'>
                            <div className='fw-bold fs30 lh-1-8 c-text-secondary ps-5 fflalezar color-2'>
                                دوره آموزشی برنامه نویسی بدن سازی از صفر تلا صد به صورت حرفه ای با آموزش های ویدیویی
                            </div>

                            <div className='d-flex align-items-center mt-4 '>
                                <div className='course-status-badge  fflalezar'>
                                    وضعیت دوره
                                </div>
                                <div className='fflalezar fs14 text-secondary'>
                                    <GoDotFill fontSize={15} className='me-3 ms-1 color-2' />
                                    <span>آخرین آپدیت: </span>
                                    <span className='me-2'>1403/3/3</span>
                                </div>
                                <div className='fflalezar text-secondary'>
                                    <GoDotFill fontSize={15} className='me-3 ms-1 color-2' />
                                    <span className='fs14'>تعداد دانشجویان دوره : </span>
                                    <span className='me-2'>63</span>
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
                                <h2>
                                    در این دوره چه چیزی یاد میگییرد؟
                                </h2>
                                <p className='mt-3'>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

                                </p>
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
                                            <Accordion.Header className='fflalezar'>جلسات بازو</Accordion.Header>
                                            <Accordion.Body>
                                                <div className='d-flex justify-content-between align-items-center border-bottom onhover-sections'>
                                                    <div className='d-flex align-items-center py-4'>
                                                        <div className='count-number c-text-secondary fflalezar d-flex justify-content-center align-items-center br-10 bg-white'>
                                                            1
                                                        </div>
                                                        <div className='fs15 me-2'>
                                                            ابزار های مختلف برای تست API
                                                        </div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='ms-2 mt-1'>
                                                            02:54
                                                        </div>
                                                        <FiLock fontSize={20} />
                                                    </div>
                                                </div>


                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item className='mt-3' eventKey="1">
                                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                culpa qui officia deserunt mollit anim id est laborum.
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
                                        <img src="/images/instructor-03-02-2.webp" className='w-100 br-10' alt="" />
                                    </Col>
                                    <Col className=''>
                                        <div className='fflalezar fs20'>آرمان کرد بچه</div>
                                        <div className=' mt-2 fs13 color-2'>مربی بدن سازی</div>
                                        <div className='mt-3 fs15 lh2 c-text-secondary text-justify'>
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فر نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.                                    </div>
                                    </Col>

                                </Row>
                            </div>
                        }

                    </Col>
                    {/* left side */}
                    <Col xs={{ order: 1 }} lg={{ span: 4, order: 2 }} >
                        <div className='w-100 position-relative'>
                            <img src="/images/courses/icvgops1gqcosgv3dxde.jpg" className='w-100 main-img' alt="" />
                            <div className='position-absolute bg-white rounded-circle play-video-btn ' variant="primary" onClick={() => setModalShow(true)}>
                                <FaPlay fontSize={25} />
                            </div>
                        </div>
                        {/* course info */}
                        <div className='w-100 course-info-box'>
                            <div className='d-flex justify-content-between border-padd-b pt-4 px-4'>
                                <div className='fs15 text-secondary'>
                                    تخفیف : <span className='text-white fs12 discount-course'>50%</span>
                                </div>
                                <div className='fs20 fw-bold color-2'>
                                    {Number(965000).toLocaleString()}
                                    <span className='fs14 me-1'>تومان</span>
                                </div>
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
                                    <span className='fs13'>قابل دانلود</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4 border-bottom'>
                                <div>
                                    <MdLiveTv className='fs20 color-2' />
                                    <span className='me-2 text-secondary -ver-2'>تعداد جلسات</span>
                                </div>
                                <div>
                                    <span className='fs13'>قابل دانلود</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4 border-bottom'>
                                <div>
                                    <BiSupport className='fs20 color-2 ' />
                                    <span className='me-2 text-secondary -ver-2'>پشتیبانی</span>
                                </div>
                                <div>
                                    <span className='fs13'>قابل دانلود</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4 border-bottom'>
                                <div>
                                    <MdInfoOutline className='fs20 color-2 ' />
                                    <span className='me-2 text-secondary -ver-2'>وضعیت دوره</span>
                                </div>
                                <div>
                                    <span className='fs13'>قابل دانلود</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between fs14 px-4 mt-4 pb-4'>
                                <div>
                                    <PiChalkboardTeacher className='fs20 color-2 ' />
                                    <span className='me-2 text-secondary -ver-2'>مدرس</span>
                                </div>
                                <div>
                                    <span className='fs13'>قابل دانلود</span>
                                </div>
                            </div>
                            <div className='mt-4 pb-4'>
                                <div className='px-4'>
                                    <button className='buy-course-btn'>
                                        خرید دوره
                                    </button>
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
    )
}
