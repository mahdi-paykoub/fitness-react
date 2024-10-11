import React from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FaRegSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { HiCube } from "react-icons/hi";
import { CgShapeRhombus } from "react-icons/cg";
import { FaArrowCircleLeft } from "react-icons/fa";


export default function Plans() {
    return (
        <>
            <Container className='pb-5 mb-5'>
                <Row >
                    <Col xs={12}>
                        <div className='mx-auto top-text-badge mt-5 color-2'>
                            پلن ها
                        </div>
                        <div className='text-center fw-bold fs30 mt-3'>
                            پلن خود را انتخاب کنید!
                        </div>
                        <Row className='justify-content-center'>
                            <Col xs={6}>
                                <div className='px-5 text-secondary fs14 mt-2 text-center lh2'>
                                    هر پلن ویژگی ها و مزایای خاص خود را دارد و یکسری تفاوت هایی کوچک و یا اساسی با همدیگر دارند.شما ابتدا باید پلن مورد نیاز خود را انتخاب نمایید.
                                </div>
                            </Col>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <div className='bg-white change-page-box mx-auto mt-4 d-flex align-items-center justify-content-around'>
                        <Link>
                            <div className='active fs15'>برنامه‌های رایگان</div>
                        </Link>
                        <Link className='text-secondary fs15'>
                            <div>برنامه‌های ویژه</div>
                        </Link>
                    </div>
                </Row>
                <Row className='mt-5'>
                    <Col lg={4}>
                        <div className='first-custom-card p-4 h-100 position-relative'>
                            <div className='text-white'>
                                <div>
                                    <HiCube fontSize={40} />
                                </div>
                                <div className='mt-3 fw-bold fs30'>
                                    انتخاب برنامه
                                    <br />
                                    های تمرینی مربی همراه
                                </div>
                                <div className='text-white fs14 mt-4 lh2'>
                                    لورم ایپسوم متن ساختگی با تولیدچاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای اوان جامعه و فاده قرار گیرد.
                                </div>
                                <div>
                                    <FaArrowCircleLeft className='mt-4' fontSize={30} />
                                </div>
                            </div>
                            <div>
                                <img src="images/banner/Sport Illustration Kit-08.png" className='w-100' alt="" />
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='custom-card p-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='card-top-shape-right d-flex justify-content-center align-items-center'>
                                    <FaRegSquare />
                                </div>
                                <div className='card-top-shape-left fs14'>
                                    برنامه ویژه
                                </div>
                            </div>
                            <div className='mt-4 fw-bold fs20 text-body-secondary'>
                                نام برنامه
                            </div>
                            <div className='text-secondary fs13 mt-2 lh-1-8 text-justify'>
                                لورم ایپسوم متن ساختگی با تولهوم از صنعت چاپ
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                            </div>
                            <div className='mt-4 pt-2'>
                                <span className='fs30 fw-bold card-price-number color-2'>1.8</span>
                                <span className='fs14 color-2 milioon-text fw-bold fs30 me-2'>میلیون</span>
                            </div>
                            <div className='fs14 mb-4 mt-2 text-secondary'>
                                <IoCardOutline className='color-2' fontSize={20} />
                                <span className='me-2 fs13'>این برنامه برای دو ماه تنظیم خواهد شد</span>
                            </div>
                            <div className='pt-4 border-top w-100'></div>

                            <div className='mt-4'>
                                <FaCheckCircle className='color-2' fontSize={20} />
                                <span className='me-2 fs14'>امکان آنالیز بدنی</span>
                            </div>
                            <div className='mt-4'>
                                <FaCheckCircle className='color-2' fontSize={20} />
                                <span className='me-2 fs14'>طراحی تمرین</span>
                            </div>
                            <div className='mt-4'>
                                <FaCheckCircle className='color-2' fontSize={20} />
                                <span className='me-2 fs14'>طراحی تغذیه</span>
                            </div>
                            <div className='mt-4'>
                                <FaCheckCircle className='color-2' fontSize={20} />
                                <span className='me-2 fs14'>طراحی مکمل های مورد نیاز</span>
                            </div>
                            <div className='d-flex justify-content-center mt-5'>
                                <Link className='card-show-more-detail-btn d-block text-center'>
                                    مشاهده برنامه
                                </Link>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='custom-card p-4 h-100'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='card-top-shape-right d-flex justify-content-center align-items-center'>
                                    <CgShapeRhombus fontSize={18} />
                                </div>
                                <div className='card-top-shape-left fs14'>
                                    برنامه ویژه
                                </div>
                            </div>
                            <div className='mt-4 fw-bold fs20 text-body-secondary'>
                                نام برنامه
                            </div>
                            <div className='text-secondary fs13 mt-2 lh-1-8 text-justify'>
                                لورم ایپسوم متن ساختگی با تولهوم از صنعت چاپ
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                            </div>
                            <div className='mt-4 pt-2'>
                                <span className='fs30 fw-bold card-price-number color-2'>2</span>
                                <span className='fs14 color-2 milioon-text fw-bold fs30 me-2'>میلیون</span>
                            </div>
                            <div className='fs14 mb-4 mt-2 text-secondary'>
                                <IoCardOutline className='color-2' fontSize={20} />
                                <span className='me-2 fs13'>این برنامه برای دو ماه تنظیم خواهد شد</span>
                            </div>
                            <div className='pt-4 border-top w-100'></div>

                            <div className='mt-4'>
                                <FaCheckCircle className='color-2' fontSize={20} />
                                <span className='me-2 fs14'>امکان آنالیز بدنی</span>
                            </div>
                            <div className='mt-4'>
                                <FaCheckCircle className='color-2' fontSize={20} />
                                <span className='me-2 fs14'>طراحی تمرین</span>
                            </div>
                            <div className='mt-4'>
                                <FaCheckCircle className='color-2' fontSize={20} />
                                <span className='me-2 fs14'>طراحی تغذیه</span>
                            </div>
                            <div className='mt-4'>
                                <FaCheckCircle className='color-2' fontSize={20} />
                                <span className='me-2 fs14'>طراحی مکمل های مورد نیاز</span>
                            </div>
                            <div className='d-flex justify-content-center mt-5'>
                                <Link className='card-show-more-detail-btn d-block text-center'>
                                    مشاهده برنامه
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className='top-shadow shadow-ball mx-auto'></div>
            </Container>
        </>
    )
}
