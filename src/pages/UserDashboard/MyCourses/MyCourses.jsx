import React from 'react'
import './style.css'
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FiUserCheck } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';


export default function MyCourses() {
    return (
        <>
            <Container>
                <Row>
                    <Col lg={4}>
                        <Card className='buyed-course-box-card border-0 mt-4'>
                            <div className='position-relative img-overly-course-p'>
                                <Card.Img variant="top" src="/images/courses/icvgops1gqcosgv3dxde.jpg" />
                                <div className='img-overly-course d-flex align-items-center justify-content-center position-absolute text-center w-100 h-100 '>
                                    <a href="">
                                        <li>
                                            <BsFillPlayFill className='fs40icon' />
                                        </li>
                                    </a>
                                </div>
                            </div>
                            <Card.Body>
                                <div className='lh1-8 fw600 mt-2'>
                                    آموزش جامع برنامه نویسی بدنسازی
                                </div>
                                <div className='mt-4 d-flex justify-content-between'>
                                    <div>
                                        <FiUserCheck className='fs20 porple-text-color2' />
                                        <span className='fs14 text-secondary me-2'>آرمان کرد بچه</span>
                                    </div>
                                    <div className='mb-3'>
                                        <Link href="" className='btn-more-course-detail'>مشاهده دوره</Link>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className='buyed-course-box-card border-0 mt-4'>
                            <div className='position-relative img-overly-course-p'>
                                <Card.Img variant="top" src="/images/courses/icvgops1gqcosgv3dxde.jpg" />
                                <div className='img-overly-course d-flex align-items-center justify-content-center position-absolute text-center w-100 h-100 '>
                                    <a href="">
                                        <li>
                                            <BsFillPlayFill className='fs40icon' />
                                        </li>
                                    </a>
                                </div>
                            </div>
                            <Card.Body>
                                <div className='lh1-8 fw600 mt-2'>
                                    آموزش جامع برنامه نویسی بدنسازی
                                </div>
                                <div className='mt-4 d-flex justify-content-between'>
                                    <div>
                                        <FiUserCheck className='fs20 porple-text-color2' />
                                        <span className='fs14 text-secondary me-2'>آرمان کرد بچه</span>
                                    </div>
                                    <div className='mb-3'>
                                        <Link href="" className='btn-more-course-detail'>مشاهده دوره</Link>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className='buyed-course-box-card border-0 mt-4'>
                            <div className='position-relative img-overly-course-p'>
                                <Card.Img variant="top" src="/images/courses/icvgops1gqcosgv3dxde.jpg" />
                                <div className='img-overly-course d-flex align-items-center justify-content-center position-absolute text-center w-100 h-100 '>
                                    <a href="">
                                        <li>
                                            <BsFillPlayFill className='fs40icon' />
                                        </li>
                                    </a>
                                </div>
                            </div>
                            <Card.Body>
                                <div className='lh1-8 fw600 mt-2'>
                                    آموزش جامع برنامه نویسی بدنسازی
                                </div>
                                <div className='mt-4 d-flex justify-content-between'>
                                    <div>
                                        <FiUserCheck className='fs20 porple-text-color2' />
                                        <span className='fs14 text-secondary me-2'>آرمان کرد بچه</span>
                                    </div>
                                    <div className='mb-3'>
                                        <Link href="" className='btn-more-course-detail'>مشاهده دوره</Link>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
