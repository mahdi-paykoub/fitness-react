import React from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FiLock } from "react-icons/fi";
import Accordion from 'react-bootstrap/Accordion';
import { GoDotFill } from "react-icons/go";
import { BiAlbum } from "react-icons/bi";

export default function Section() {
    return (
        <>
            <Container fluid className='bg-global-light mt-2 px-lg-5'>
                <Row>
                    <Col>
                        <div className='bg-white  br-4'>
                            <div className='pt-4'>
                                <Link className='text-secondary px-4 '>
                                    <IoIosArrowRoundForward fontSize={20} />
                                    <span className=' fs13'> بازگشت به دوره</span>
                                </Link>
                                <div className='mt-2 fw-bold c-text-secondary px-4'>معرفی دوره
                                </div>
                            </div>
                            <Row className='mt-3'>
                                <Col lg={9} className='ps-0'>

                                    <div>
                                        <video className='w-100' controls>
                                            <source src="movie.mp4" type="video/mp4" />
                                            <source src="movie.ogg" type="video/ogg" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </Col>
                                <Col lg={3} className='pe-0'>
                                    <Accordion className='section-accor' defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header className='fflalezar'>جلسات بازو</Accordion.Header>
                                            <Accordion.Body>
                                                <div className='d-flex justify-content-between align-items-center border-bottom onhover-sections'>
                                                    <div className='d-flex align-items-center py-4'>
                                                        <div className='count-number c-text-secondary fflalezar d-flex justify-content-center align-items-center br-10 bg-white'>
                                                            1
                                                        </div>
                                                        <div className='fs13 me-2'>
                                                            ابزار های مختلف برای تست API
                                                        </div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='ms-2 mt-1 fs13'>
                                                            02:54
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-between align-items-center onhover-sections'>
                                                    <div className='d-flex align-items-center py-4'>
                                                        <div className='count-number c-text-secondary fflalezar d-flex justify-content-center align-items-center br-10 bg-white'>
                                                            1
                                                        </div>
                                                        <div className='fs13 me-2'>
                                                            ابزار های مختلف برای تست API
                                                        </div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='ms-2 mt-1 fs13'>
                                                            02:54
                                                        </div>

                                                    </div>
                                                </div>

                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>
                                </Col>
                            </Row>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col lg={9} className='mt-3'>
                        <div className='bg-white br-4 p-4'>
                            <div className='fw-bold fs20 color-2'>
                                <GoDotFill fontSize={17} />
                                <span className='me-1 fflalezar'>  برنامه نویسی بدنی به صورت کامل و پروژه محور</span>
                            </div>
                            <div className='mt-3'>
                                <div class="d-flex justify-content-between align-items-center onhover-sections">
                                    <div class="d-flex align-items-center py-4">
                                        <div class="count-number bg-secondary c-text-secondary fflalezar d-flex justify-content-center align-items-center br-10 text-white">1</div>
                                        <div class="me-2">ابزار های مختلف برای تست API</div>
                                    </div>
                                    <div>
                                        <button className='fflalezar send-btn px-4 py-2'>دانلود ویدیو</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} className='mt-3'>
                        <div className='bg-white br-4 p-3'>
                            <div className='fflalezar c-text-secondary'>
                                <BiAlbum fontSize={20} className='color-2 ms-1' />

                                <span className='color-2 -ver-2'>توضیحات قسمت</span>
                            </div>
                            <div className='fs13 lh2 text-secondary'>
                                از مدرسین و پشتیبانان انتظارات منطقی و مرتبط با خدمات دریافتی خود داشته باشید. حل مشکلات خارج از مباحث و پروژه های دوره در حیطه وظایف پشتیبانان/مدرسین نیست. اگر نیاز به مشاوره دارید میتوانید از طریق تیکت ها به واحد مشاوره پیام دهید
                            </div>
                        </div>

                    </Col>

                </Row>
            </Container>
        </>
    )

}
